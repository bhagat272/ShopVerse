import type { ReactNode } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-fade-in">
      {children}
    </div>
  );
};

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageTransition>
            <Home />
          </PageTransition>
        }
      />
      <Route
        path="/product/:id/details"
        element={
          <PageTransition>
            <ProductDetail />
          </PageTransition>
        }
      />
      <Route
        path="/cart"
        element={
          <PageTransition>
            <Cart />
          </PageTransition>
        }
      />
    </Routes>
  );
};

export default AppRouter;
