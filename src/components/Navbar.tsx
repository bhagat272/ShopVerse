import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../store/cartSlice";

const Navbar = () => {
  const totalItems = useSelector(selectTotalItems);
  const location = useLocation();

  const linkClass = (path: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 ${
      location.pathname === path ? "bg-white/15" : ""
    }`;

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <nav
        className="bg-gradient-to-r from-brand-700 to-brand-600 text-white"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight transition-transform hover:scale-[1.02]"
            aria-label="ShopVerse home"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-brand-700"
              aria-hidden="true"
            >
              S
            </span>
            ShopVerse
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/" className={linkClass("/")} aria-label="Go to home page">
              Home
            </Link>
            <Link
              to="/cart"
              className={`${linkClass("/cart")} relative`}
              aria-label={`Shopping cart with ${totalItems} items`}
              data-testid="cart-link"
            >
              Cart ({totalItems})
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-brand-700">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
