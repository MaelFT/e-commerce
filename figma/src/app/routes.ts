import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Account } from "./pages/Account";
import { Wishlist } from "./pages/Wishlist";
import { Compare } from "./pages/Compare";
import { Search } from "./pages/Search";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "account", Component: Account },
      { path: "wishlist", Component: Wishlist },
      { path: "compare", Component: Compare },
      { path: "search", Component: Search },
      { path: "login", Component: Login },
      { path: "*", Component: NotFound },
    ],
  },
]);
