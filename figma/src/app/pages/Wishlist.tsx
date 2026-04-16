import { Link } from "react-router";
import { Trash2, ShoppingBag, Star } from "lucide-react";
import { products } from "../data";
import { useState } from "react";

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 3));

  const removeItem = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="flex-grow bg-[#FDFDFD]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-2">Wishlist</h1>
            <p className="text-zinc-500">{wishlistItems.length} items</p>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h3 className="text-xl font-bold text-black mb-2">Your wishlist is empty</h3>
            <p className="text-zinc-500 max-w-md mb-6">Save items you love to your wishlist to review or purchase later.</p>
            <Link to="/products" className="px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {wishlistItems.map((product) => (
              <div key={product.id} className="group flex flex-col relative">
                <button 
                  onClick={() => removeItem(product.id)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-500 hover:text-red-500 hover:bg-white transition-colors shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <Link to={`/product/${product.id}`} className="relative aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-4 block">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <Link to={`/product/${product.id}`} className="text-sm font-medium text-black hover:text-zinc-600 transition-colors line-clamp-1">{product.name}</Link>
                    <span className="text-sm font-medium text-black ml-4">${product.price}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-4">{product.category}</p>
                  <button className="mt-auto w-full py-3 border border-black text-black text-sm font-medium rounded-xl hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
