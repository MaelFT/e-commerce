import { Link } from "react-router";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { products } from "../data";
import { useState } from "react";

export function Cart() {
  const [cartItems, setCartItems] = useState([
    { product: products[0], quantity: 1 },
    { product: products[2], quantity: 2 },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items => 
      items.map(item => 
        item.product.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.product.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-32 px-4 text-center bg-[#FDFDFD]">
        <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-8">
          <svg className="w-10 h-10 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-black mb-4">Your cart is empty</h2>
        <p className="text-zinc-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Discover our premium collection.</p>
        <Link to="/products" className="px-8 py-4 bg-black text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-[#FDFDFD]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-12">Shopping Bag</h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Cart Items */}
          <div className="w-full lg:w-3/5">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-zinc-200 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="divide-y divide-zinc-200">
              {cartItems.map((item) => (
                <div key={item.product.id} className="py-8 flex flex-col md:grid md:grid-cols-12 gap-6 items-start md:items-center">
                  
                  <div className="col-span-6 flex gap-6 w-full">
                    <Link to={`/product/${item.product.id}`} className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-zinc-100 rounded-xl overflow-hidden">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link to={`/product/${item.product.id}`} className="text-base font-medium text-black hover:text-zinc-600 transition-colors mb-1 line-clamp-2">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-zinc-500 mb-4">${item.product.price}</p>
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-xs text-zinc-400 hover:text-red-500 transition-colors flex items-center w-fit"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3 flex justify-between md:justify-center w-full md:w-auto items-center">
                    <span className="md:hidden text-sm text-zinc-500 font-medium">Quantity</span>
                    <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-lg px-1 h-10">
                      <button onClick={() => updateQuantity(item.product.id, -1)} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-black rounded-md transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-black">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, 1)} className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-black rounded-md transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3 flex justify-between md:justify-end w-full md:w-auto items-center">
                    <span className="md:hidden text-sm text-zinc-500 font-medium">Total</span>
                    <span className="text-lg font-medium text-black">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-zinc-50 rounded-3xl p-8 lg:p-10 sticky top-24">
              <h2 className="text-xl font-bold text-black mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-zinc-600">
                  <span>Subtotal</span>
                  <span className="text-black font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-600">
                  <span>Shipping</span>
                  <span className="text-black font-medium">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-600">
                  <span>Estimated Tax</span>
                  <span className="text-black font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-base font-medium text-black">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-black">${total.toFixed(2)}</span>
                    <p className="text-[10px] text-zinc-500 mt-1">USD including VAT</p>
                  </div>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full py-4 bg-black text-white text-base font-medium rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center mb-6 hover:scale-[1.02] active:scale-[0.98] duration-300"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <div className="flex items-center justify-center text-xs text-zinc-500">
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                Secure, encrypted checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
