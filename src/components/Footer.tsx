import { useSelector } from "react-redux";
import { selectTotalItems, selectTotalPrice } from "../store/cartSlice";

const Footer = () => {
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <footer
      className="mt-auto border-t border-slate-200 bg-slate-900 text-white"
      data-testid="global-footer"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-slate-300">
          &copy; {new Date().getFullYear()} ShopVerse. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
          <span data-testid="footer-item-count">
            Items: <span className="text-brand-500">{totalItems}</span>
          </span>
          <span className="hidden text-slate-600 sm:inline" aria-hidden="true">
            |
          </span>
          <span data-testid="footer-total-value">
            Total Cart Value:{" "}
            <span className="text-brand-500">${totalPrice.toFixed(2)}</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
