import { Link } from "react-router";
import { X, Check } from "lucide-react";
import { products } from "../data";

export function Compare() {
  const compareItems = [products[0], products[3]]; // Headphones and Speaker as example

  const specs = [
    { label: "Price", getValue: (p: any) => `$${p.price}` },
    { label: "Rating", getValue: (p: any) => `${p.rating} / 5.0 (${p.reviews} reviews)` },
    { label: "Category", getValue: (p: any) => p.category },
    { label: "Key Features", getValue: (p: any) => p.features.join(", ") },
    { label: "Availability", getValue: (p: any) => <span className="text-green-600 flex items-center justify-center gap-1"><Check className="w-3 h-3" /> In Stock</span> }
  ];

  return (
    <div className="flex-grow bg-[#FDFDFD]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-12">Compare Products</h1>

        <div className="overflow-x-auto pb-8">
          <div className="min-w-[800px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="w-1/4 p-4 align-bottom">
                    <p className="text-sm text-zinc-500 font-medium mb-4">Find the perfect tech for you</p>
                    <Link to="/products" className="text-sm text-black underline">Add another product</Link>
                  </th>
                  {compareItems.map((item) => (
                    <th key={item.id} className="w-1/4 p-4 align-top relative">
                      <button className="absolute top-4 right-4 p-1.5 bg-zinc-100 rounded-full text-zinc-500 hover:text-black transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                      <div className="bg-zinc-100 rounded-xl aspect-square mb-4 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <h3 className="text-base font-bold text-black mb-1">{item.name}</h3>
                      <button className="w-full mt-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors">
                        Add to Cart
                      </button>
                    </th>
                  ))}
                  {compareItems.length < 3 && (
                    <th className="w-1/4 p-4 align-top">
                      <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-xl aspect-square flex items-center justify-center mb-4">
                        <span className="text-sm text-zinc-400">Empty slot</span>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, idx) => (
                  <tr key={idx} className="border-t border-zinc-200">
                    <td className="p-4 py-6 text-sm font-semibold tracking-wider text-black uppercase bg-zinc-50/50">
                      {spec.label}
                    </td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="p-4 py-6 text-sm text-zinc-600 text-center border-l border-zinc-100">
                        {spec.getValue(item)}
                      </td>
                    ))}
                    {compareItems.length < 3 && (
                      <td className="p-4 py-6 border-l border-zinc-100 bg-zinc-50/20"></td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
