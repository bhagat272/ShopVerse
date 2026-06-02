import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import type { Product } from "../types/Product";
import { getProductImageUrl } from "../utils/productImage";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const image = getProductImageUrl(product.images);
  const categoryName = product.category?.name ?? "General";

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <ProductImage
          src={image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-700 shadow">
          {categoryName}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 min-h-[2.75rem] text-left text-base font-semibold text-slate-900">
          {product.title}
        </h3>
        <p className="mt-1 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
          {categoryName}
        </p>
        <p className="mt-2 text-left text-xl font-bold text-brand-600">
          ${product.price.toFixed(2)}
        </p>
        <Link
          to={`/product/${product.id}/details`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 hover:shadow-md active:scale-[0.98]"
          aria-label={`View details for ${product.title}`}
          data-testid={`view-details-${product.id}`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
