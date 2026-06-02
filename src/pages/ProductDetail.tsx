import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductImage from "../components/ProductImage";
import { addToCart } from "../store/cartSlice";
import { selectProducts } from "../store/productSlice";
import type { AppDispatch } from "../store/store";
import { getProductImageUrl } from "../utils/productImage";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const product = products.find((p) => p.id === Number(id));
  const image = product ? getProductImageUrl(product.images) : undefined;

  if (!product) {
    return (
      <div className="animate-fade-in rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">Product not found</h2>
        <p className="mt-2 text-slate-600">
          This product is not in the store. Browse from the home page first.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          aria-label="Back to home page"
        >
          Back To Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedAnimation(true);
    window.setTimeout(() => setAddedAnimation(false), 500);
  };

  return (
    <div className="animate-slide-up" data-testid="product-detail">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition hover:text-brand-700"
        aria-label="Back to home page"
        data-testid="back-to-home"
      >
        &larr; Back To Home
      </Link>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-slate-100 p-6 lg:p-8">
            <ProductImage
              src={image}
              alt={product.title}
              className="mx-auto max-h-[420px] w-full rounded-xl object-contain"
            />
          </div>

          <div className="flex flex-col p-6 lg:p-8">
            <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase text-brand-700">
              {product.category?.name ?? "General"}
            </span>
            <h1 className="mt-4 text-left text-2xl font-bold text-slate-900 sm:text-3xl">
              {product.title}
            </h1>
            <p className="mt-4 flex-1 text-left leading-relaxed text-slate-600">
              {product.description}
            </p>
            <p className="mt-6 text-left text-3xl font-bold text-brand-600">
              ${product.price.toFixed(2)}
            </p>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`mt-6 w-full rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-brand-700 hover:shadow-lg active:scale-[0.98] sm:w-auto ${
                addedAnimation ? "animate-cart-pop" : ""
              }`}
              aria-label={`Add ${product.title} to cart`}
              data-testid="add-to-cart-btn"
            >
              {addedAnimation ? "Added!" : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
