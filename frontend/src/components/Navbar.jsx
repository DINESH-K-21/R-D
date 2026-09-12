import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <header className="border-b border-line bg-paper sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-tight">
          MAISON
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          {user ? (
            <>
              <span className="text-ink/60">Hi, {user.name}</span>
              <button onClick={logout} className="hover:text-clay transition-colors">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-clay transition-colors">
                Log in
              </Link>
              <Link to="/register" className="hover:text-clay transition-colors">
                Register
              </Link>
            </>
          )}
          <Link to="/cart" className="hover:text-clay transition-colors">
            Cart{count > 0 ? ` (${count})` : ""}
          </Link>
          <Link to="/products/new" className="hover:text-clay transition-colors">
            Add product
          </Link>
        </nav>
      </div>
    </header>
  );
}
