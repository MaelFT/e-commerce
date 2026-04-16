import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Star, Truck, Shield, RotateCcw, Heart, Share2, Plus, Minus, ArrowRight } from "lucide-react";
import { products } from "../data";
import { motion } from "motion/react";

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id) || products[0];
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use the same image for gallery mockup
  const images = [product.image, product.image, product.image];

  return (
    <div className="bg-[#FDFDFD] min-h-screen">
      {/* Sticky Top Bar (shows on scroll) */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100 }}
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-zinc-200 z-40 hidden md:block"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
            <div>
              <h4 className="text-sm font-medium text-black">{product.name}</h4>
              <p className="text-xs text-zinc-500">${product.price}</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors">
            Add to Cart
          </button>
        </div>
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <nav className="flex items-center space-x-2 text-xs font-medium text-zinc-500 mb-8">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-black transition-colors">Products</Link>
          <span>/</span>
          <span className="text-black capitalize">{product.category}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Image Gallery */}
          <div className="w-full lg:w-3/5 space-y-4">
            <div className="relative aspect-[4/3] bg-zinc-100 rounded-3xl overflow-hidden group">
              <img 
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover object-center transition-transform duration-700"
              />
              <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md text-black rounded-full hover:bg-black hover:text-white transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 border-2 transition-colors ${activeImage === idx ? 'border-black' : 'border-transparent'}`}
                >
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 flex items-center justify-center cursor-pointer hover:bg-zinc-200 transition-colors">
                <span className="text-xs font-medium text-zinc-500">Video</span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-2/5 flex flex-col pt-4">
            <div className="mb-8">
              {product.isNew && (
                <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-wider text-black uppercase bg-zinc-100 rounded-md">
                  New Arrival
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-2xl text-black font-medium">${product.price}</p>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 rounded-full">
                  <Star className="w-4 h-4 fill-black text-black" />
                  <span className="text-sm font-medium text-black">{product.rating}</span>
                  <span className="text-xs text-zinc-500 underline ml-1 cursor-pointer">{product.reviews} reviews</span>
                </div>
              </div>
              <p className="text-base text-zinc-600 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            <hr className="border-zinc-200 mb-8" />

            <div className="mb-8">
              <h3 className="text-sm font-semibold tracking-wider text-black uppercase mb-4">Key Features</h3>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-zinc-600 font-light">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-2 py-2 h-14">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-lg transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-medium text-black">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <button className="flex-1 h-14 bg-black text-white text-base font-medium rounded-xl hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center">
                Add to Cart — ${(product.price * quantity).toLocaleString()}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-xl text-center">
                <Truck className="w-6 h-6 text-black mb-2" />
                <span className="text-xs font-medium text-black">Free Shipping</span>
                <span className="text-[10px] text-zinc-500 mt-1">On orders over $50</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-xl text-center">
                <RotateCcw className="w-6 h-6 text-black mb-2" />
                <span className="text-xs font-medium text-black">30-Day Returns</span>
                <span className="text-[10px] text-zinc-500 mt-1">No questions asked</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-xl text-center">
                <Shield className="w-6 h-6 text-black mb-2" />
                <span className="text-xs font-medium text-black">2-Year Warranty</span>
                <span className="text-[10px] text-zinc-500 mt-1">Guaranteed quality</span>
              </div>
            </div>

            <button className="flex items-center justify-center w-full py-4 text-sm font-medium text-black hover:bg-zinc-50 border border-zinc-200 rounded-xl transition-colors">
              <Share2 className="w-4 h-4 mr-2" /> Share Product
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-16 border-t border-zinc-200">
            <div className="flex justify-between items-end mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">You might also like</h2>
              <Link to={`/products?category=${product.category.toLowerCase()}`} className="group hidden sm:flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors">
                View more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group flex flex-col">
                  <div className="relative aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-medium text-black group-hover:text-zinc-600 transition-colors line-clamp-1">{p.name}</h3>
                      <span className="text-sm font-medium text-black ml-4">${p.price}</span>
                    </div>
                    <p className="text-xs text-zinc-500">{p.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
