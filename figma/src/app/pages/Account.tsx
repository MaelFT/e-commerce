import { Link } from "react-router";
import { User, Package, Settings, LogOut, ChevronRight } from "lucide-react";
import { products } from "../data";

export function Account() {
  const orders = [
    {
      id: "ORD-84739",
      date: "Oct 12, 2023",
      total: 322.92,
      status: "Delivered",
      items: [products[0]]
    },
    {
      id: "ORD-73621",
      date: "Sep 04, 2023",
      total: 149.00,
      status: "Processing",
      items: [products[2]]
    }
  ];

  return (
    <div className="flex-grow bg-[#FDFDFD]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-200">
              <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-black">Alex Design</h2>
                <p className="text-xs text-zinc-500">alex@example.com</p>
              </div>
            </div>

            <nav className="flex flex-col space-y-1">
              <Link to="/account" className="flex items-center gap-3 px-4 py-3 bg-zinc-100 text-black text-sm font-medium rounded-xl">
                <Package className="w-4 h-4" /> Orders
              </Link>
              <Link to="/account/profile" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-50 hover:text-black text-sm font-medium rounded-xl transition-colors">
                <User className="w-4 h-4" /> Profile
              </Link>
              <Link to="/account/settings" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-50 hover:text-black text-sm font-medium rounded-xl transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </Link>
              <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 text-sm font-medium rounded-xl transition-colors mt-8 w-full text-left">
                <LogOut className="w-4 h-4" /> Log out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black mb-8">Order History</h1>

            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-300 transition-colors">
                  <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-8">
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Order Placed</p>
                        <p className="text-sm font-medium text-black">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Total</p>
                        <p className="text-sm font-medium text-black">${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Order #</p>
                        <p className="text-sm font-medium text-black">{order.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-black mb-1">{item.name}</h3>
                          <p className="text-sm text-zinc-500 mb-2">Qty: 1</p>
                          <div className="flex gap-3">
                            <button className="text-xs font-medium text-black hover:underline">View product</button>
                            <button className="text-xs font-medium text-black hover:underline">Buy again</button>
                          </div>
                        </div>
                        <button className="hidden sm:flex px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors">
                          Track package
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
}
