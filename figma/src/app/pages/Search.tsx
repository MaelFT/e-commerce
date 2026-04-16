import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { products } from "../data";

export function Search() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const suggestions = ["headphones", "laptop", "mechanical keyboard", "monitor"];

  return (
    <div className="flex-grow bg-[#FDFDFD]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        
        {/* Search Input */}
        <div className={`relative flex items-center bg-white border-b-2 transition-colors ${isFocused ? 'border-black' : 'border-zinc-200'}`}>
          <SearchIcon className={`w-8 h-8 mr-4 ${isFocused ? 'text-black' : 'text-zinc-400'}`} />
          <input 
            type="text" 
            placeholder="Search products, categories..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoFocus
            className="w-full py-6 text-3xl md:text-5xl font-bold tracking-tight text-black placeholder:text-zinc-300 focus:outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-2 text-zinc-400 hover:text-black">
              <X className="w-8 h-8" />
            </button>
          )}
        </div>

        {/* Suggestions */}
        {!query && (
          <div className="mt-12">
            <h3 className="text-sm font-semibold tracking-wider text-black uppercase mb-6">Popular Searches</h3>
            <div className="flex flex-wrap gap-3">
              {suggestions.map((s) => (
                <button 
                  key={s} 
                  onClick={() => setQuery(s)}
                  className="px-6 py-3 bg-zinc-50 hover:bg-zinc-100 text-sm font-medium text-black rounded-full transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="mt-16">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-xl font-bold text-black">Results for "{query}"</h2>
              <span className="text-sm text-zinc-500">{results.length} products</span>
            </div>

            {results.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-zinc-500 mb-4">No results found. Try checking your spelling or use more general terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {results.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group flex flex-col">
                    <div className="relative aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-medium text-black group-hover:text-zinc-600 transition-colors line-clamp-1">{product.name}</h3>
                      <span className="text-sm font-medium text-black ml-4">${product.price}</span>
                    </div>
                    <p className="text-xs text-zinc-500">{product.category}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
