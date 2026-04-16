import { Link } from "react-router";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import { products } from "../data";
import { motion } from "motion/react";

export function Home() {
  const featuredProduct = products.find(p => p.id === "p1");
  const bestSellers = products.slice(1, 5);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center bg-zinc-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={featuredProduct?.image} 
            alt="Hero Product" 
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 via-zinc-100/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-black uppercase bg-white/80 backdrop-blur-sm rounded-full">
              New Release
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6 leading-[1.1]">
              {featuredProduct?.name.split(" ")[0]} <br />
              <span className="text-zinc-500 font-light">{featuredProduct?.name.split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 mb-8 max-w-md font-light">
              Experience silence like never before. Pure, undisturbed sound wrapped in an ultra-lightweight design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={`/product/${featuredProduct?.id}`} 
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-black rounded-xl hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Buy Now — ${featuredProduct?.price}
              </Link>
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-white rounded-xl hover:bg-zinc-100 transition-all shadow-sm border border-zinc-200"
              >
                Explore Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-[#FDFDFD]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Categories</h2>
            <Link to="/products" className="group flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Audio", image: products[3].image, span: "md:col-span-1" },
              { name: "Computing", image: products[1].image, span: "md:col-span-2 md:row-span-2" },
              { name: "Accessories", image: products[2].image, span: "md:col-span-1" },
            ].map((category, idx) => (
              <Link 
                key={idx} 
                to={`/products?category=${category.name.toLowerCase()}`}
                className={`relative group block rounded-2xl overflow-hidden bg-zinc-100 ${category.span} min-h-[300px]`}
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 flex items-center justify-between right-6">
                  <h3 className="text-2xl font-semibold text-white tracking-tight">{category.name}</h3>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-2">Best Sellers</h2>
              <p className="text-zinc-500 font-light">The tech everyone is talking about.</p>
            </div>
            <Link to="/products" className="group hidden sm:flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors">
              Shop All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {bestSellers.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group flex flex-col group">
                <div className="relative aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-4">
                  {product.isNew && (
                    <div className="absolute top-4 left-4 z-10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-black uppercase bg-white rounded-md">
                      New
                    </div>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="w-full py-3 bg-black/90 backdrop-blur-sm text-white text-sm font-medium rounded-xl hover:bg-black transition-colors">
                      Quick Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base font-medium text-black group-hover:text-zinc-600 transition-colors line-clamp-1">{product.name}</h3>
                    <span className="text-base font-medium text-black ml-4">${product.price}</span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-2">{product.category}</p>
                  <div className="flex items-center mt-auto">
                    <div className="flex items-center text-zinc-900">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-medium ml-1.5">{product.rating}</span>
                    </div>
                    <span className="text-xs text-zinc-400 ml-1.5">({product.reviews})</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-32 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={products[5].image} alt="Background" className="w-full h-full object-cover grayscale mix-blend-overlay" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Design that speaks.</h2>
          <p className="text-lg md:text-xl text-zinc-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            We believe technology should empower you, not distract you. 
            Our collection is meticulously curated for those who value extreme minimalism, premium build quality, and uncompromising performance.
          </p>
          <Link 
            to="/about" 
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-white rounded-xl hover:bg-zinc-200 transition-colors"
          >
            Our Philosophy
          </Link>
        </div>
      </section>
    </div>
  );
}
