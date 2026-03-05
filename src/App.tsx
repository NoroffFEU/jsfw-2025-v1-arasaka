import { Link, NavLink, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useCartStore } from "./store/cartStore";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Contact from "./pages/Contact";

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors hover:text-foreground ${
          isActive ? "text-foreground" : "text-muted-foreground"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function App() {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="font-semibold tracking-tight">
            React Online Shop
          </Link>

          <nav className="flex items-center gap-4">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/contact">Contact</NavItem>
            <NavItem to="/cart">Cart ({totalItems})</NavItem>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<Success />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} React Online Shop
        </div>
      </footer>

      <Toaster />
    </div>
  );
}