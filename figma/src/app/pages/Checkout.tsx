import { Link } from "react-router";
import { Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { products } from "../data";
import { useState } from "react";

export function Checkout() {
  const [isSuccess, setIsSuccess] = useState(false);
  const cartItems = [{ product: products[0], quantity: 1 }];
  const subtotal = 299;
  const total = 322.92; // + tax

  if (isSuccess) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-32 px-4 text-center bg-[#FDFDFD]">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-black mb-4">Order Confirmed</h2>
        <p className="text-zinc-500 mb-2">Thank you for your purchase. Your order #ORD-84739 is processing.</p>
        <p className="text-zinc-500 mb-8">We'll send a confirmation email to you shortly.</p>
        <Link to="/products" className="px-8 py-4 bg-black text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-[#FDFDFD]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
          
          {/* Checkout Form */}
          <div className="w-full lg:w-[55%] xl:w-[60%] px-4 sm:px-6 lg:px-16 py-12 lg:py-20 bg-white">
            <Link to="/cart" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-black mb-10 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Cart
            </Link>

            <form onSubmit={(e) => { e.preventDefault(); setIsSuccess(true); }} className="max-w-2xl">
              
              {/* Contact */}
              <div className="mb-12">
                <div className="flex justify-between items-end mb-6">
                  <h2 className="text-xl font-bold text-black">Contact Information</h2>
                  <Link to="/login" className="text-sm text-black underline">Log in</Link>
                </div>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="newsletter" className="rounded border-zinc-300 text-black focus:ring-black accent-black" />
                    <label htmlFor="newsletter" className="text-sm text-zinc-500">Email me with news and offers</label>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="mb-12">
                <h2 className="text-xl font-bold text-black mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First name" required className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" />
                    <input type="text" placeholder="Last name" required className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" />
                  </div>
                  <input type="text" placeholder="Address" required className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" />
                  <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" />
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="City" required className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" />
                    <select className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-white">
                      <option>State</option>
                      <option>NY</option>
                      <option>CA</option>
                      <option>TX</option>
                    </select>
                    <input type="text" placeholder="ZIP code" required className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="mb-12">
                <div className="flex justify-between items-end mb-6">
                  <h2 className="text-xl font-bold text-black">Payment</h2>
                  <div className="flex items-center text-xs text-zinc-500">
                    <Lock className="w-3 h-3 mr-1" /> Secure
                  </div>
                </div>
                
                <div className="border border-zinc-300 rounded-xl overflow-hidden bg-zinc-50/50">
                  <div className="p-4 border-b border-zinc-300 flex items-center gap-3">
                    <input type="radio" name="payment" id="cc" defaultChecked className="accent-black w-4 h-4" />
                    <label htmlFor="cc" className="text-sm font-medium text-black">Credit Card</label>
                  </div>
                  <div className="p-4 space-y-4 bg-white">
                    <input type="text" placeholder="Card number" required className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Expiration date (MM/YY)" required className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" />
                      <input type="text" placeholder="Security code" required className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" />
                    </div>
                    <input type="text" placeholder="Name on card" required className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm" />
                  </div>
                  
                  <div className="p-4 border-t border-zinc-300 flex items-center gap-3 bg-zinc-50/50">
                    <input type="radio" name="payment" id="paypal" className="accent-black w-4 h-4" />
                    <label htmlFor="paypal" className="text-sm font-medium text-black">PayPal</label>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-black text-white text-base font-medium rounded-xl hover:bg-zinc-800 transition-colors">
                Pay ${total.toFixed(2)}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[45%] xl:w-[40%] bg-zinc-50 px-4 sm:px-6 lg:px-12 py-12 lg:py-20 border-l border-zinc-200">
            <div className="max-w-md sticky top-12">
              <div className="space-y-6 mb-8">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-xl bg-white border border-zinc-200 overflow-hidden shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white z-10">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-black line-clamp-1">{item.product.name}</h4>
                    </div>
                    <span className="text-sm font-medium text-black">${item.product.price}</span>
                  </div>
                ))}
              </div>

              <hr className="border-zinc-200 mb-6" />

              <div className="flex gap-2 mb-6">
                <input type="text" placeholder="Discount code" className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-white" />
                <button className="px-6 py-3 bg-zinc-200 text-zinc-600 text-sm font-medium rounded-xl hover:bg-zinc-300 transition-colors">
                  Apply
                </button>
              </div>

              <hr className="border-zinc-200 mb-6" />

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-zinc-600">
                  <span>Subtotal</span>
                  <span className="text-black font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-600">
                  <span>Shipping</span>
                  <span className="text-black font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-600">
                  <span>Estimated Tax</span>
                  <span className="text-black font-medium">${(subtotal * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-lg font-bold text-black border-t border-zinc-200 pt-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
