import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { ChevronDown, Filter, Star, SlidersHorizontal, Check, Search } from "lucide-react";
import { products, Product } from "../data";

export function Products() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [activeCategory, setActiveCategory] = useState(categoryParam || "all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minRating, setMinRating] = useState(0);

  const categories = ["all", "audio", "computing", "accessories", "smart home"];
  
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => activeCategory === "all" || p.category.toLowerCase() === activeCategory)
      .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
      .filter(p => p.rating >= minRating)
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // featured
      });
  }, [activeCategory, priceRange, minRating, sortBy]);

  return (
    <div className="flex-grow bg-[#FDFDFD]">
      {/* Page Header */}
      <div className="bg-zinc-50 border-b border-zinc-200 py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <nav className="flex items-center space-x-2 text-xs font-medium text-zinc-500 mb-4">
                <Link to="/" className="hover:text-black transition-colors">Home</Link>
                <span>/</span>
                <span className="text-black capitalize">{activeCategory === "all" ? "All Products" : activeCategory}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black capitalize">
                {activeCategory === "all" ? "All Products" : activeCategory}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white border border-zinc-200 rounded-lg shadow-sm"
              >
                <Filter className="w-4 h-4 mr-2" /> Filters
              </button>
              
              <div className="relative group">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-zinc-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-black shadow-sm focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className={`w-full md:w-64 shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="sticky top-24 space-y-10">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-black uppercase mb-4">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button 
                        onClick={() => setActiveCategory(cat)}
                        className={`text-sm w-full text-left flex items-center justify-between transition-colors ${activeCategory === cat ? 'text-black font-medium' : 'text-zinc-500 hover:text-black'}`}
                      >
                        <span className="capitalize">{cat}</span>
                        {activeCategory === cat && <Check className="w-4 h-4" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="border-zinc-200" />

              {/* Price */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-black uppercase mb-4">Price</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-black"
                  />
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button onClick={() => setPriceRange([0, 100])} className="px-3 py-2 text-xs border border-zinc-200 rounded-md hover:border-black transition-colors">Under $100</button>
                    <button onClick={() => setPriceRange([100, 500])} className="px-3 py-2 text-xs border border-zinc-200 rounded-md hover:border-black transition-colors">$100 - $500</button>
                    <button onClick={() => setPriceRange([500, 1000])} className="px-3 py-2 text-xs border border-zinc-200 rounded-md hover:border-black transition-colors">$500 - $1k</button>
                    <button onClick={() => setPriceRange([1000, 3000])} className="px-3 py-2 text-xs border border-zinc-200 rounded-md hover:border-black transition-colors">Over $1k</button>
                  </div>
                </div>
              </div>

              <hr className="border-zinc-200" />

              {/* Rating */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-black uppercase mb-4">Rating</h3>
                <ul className="space-y-3">
                  {[4, 3, 2, 1].map((rating) => (
                    <li key={rating}>
                      <button 
                        onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                        className={`text-sm flex items-center group transition-colors ${minRating === rating ? 'text-black font-medium' : 'text-zinc-500 hover:text-black'}`}
                      >
                        <div className={`w-4 h-4 border rounded-sm mr-3 flex items-center justify-center transition-colors ${minRating === rating ? 'bg-black border-black text-white' : 'border-zinc-300 group-hover:border-black'}`}>
                          {minRating === rating && <Check className="w-3 h-3" />}
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-300'}`} />
                          ))}
                          <span className="ml-2">& Up</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between text-sm text-zinc-500">
              <p>Showing {filteredProducts.length} results</p>
              <div className="hidden md:flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filter view</span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">No products found</h3>
                <p className="text-zinc-500 max-w-md">Try adjusting your filters or search criteria to find what you're looking for.</p>
                <button 
                  onClick={() => { setActiveCategory("all"); setPriceRange([0, 2000]); setMinRating(0); }}
                  className="mt-6 px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group flex flex-col">
                    <div className="relative aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-4">
                      {product.isNew && (
                        <div className="absolute top-4 left-4 z-10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-black uppercase bg-white rounded-md shadow-sm">
                          New
                        </div>
                      )}
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <button className="w-full py-3 bg-white/90 backdrop-blur-md text-black border border-zinc-200 text-sm font-medium rounded-xl hover:bg-black hover:text-white transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-medium text-black group-hover:text-zinc-600 transition-colors line-clamp-1">{product.name}</h3>
                        <span className="text-sm font-medium text-black ml-4">${product.price}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">{product.category}</p>
                      <div className="flex items-center mt-auto pt-1">
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
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
