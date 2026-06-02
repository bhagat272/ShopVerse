import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../components/FilterBar";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import { useUrlQuery } from "../hooks/useUrlQuery";
import type { AppDispatch } from "../store/store";
import {
  fetchCategories,
  fetchProducts,
  selectCategories,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../store/productSlice";
import type { SortOption } from "../types/Product";
import { parseCategoryFromUrl, parseSortFromUrl } from "../utils/urlQuery";
import { sortProducts } from "../utils/sortProducts";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const { params, updateParams, search } = useUrlQuery();

  const categoryValue = params.get("category") ?? "";
  const sortValue = (params.get("sort") as SortOption) || "";

  const loadFromUrl = useCallback(() => {
    const category = parseCategoryFromUrl();
    dispatch(fetchProducts(category || undefined));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    loadFromUrl();
  }, [loadFromUrl, search]);

  const sortedProducts = useMemo(() => {
    const sort = parseSortFromUrl() || sortValue;
    return sortProducts(products, sort);
  }, [products, sortValue, search]);

  const handleCategoryChange = (categoryId: string) => {
    updateParams({
      category: categoryId || null,
    });
    dispatch(fetchProducts(categoryId || undefined));
  };

  const handleSortChange = (sort: SortOption | "") => {
    updateParams({
      sort: sort || null,
    });
  };

  return (
    <div className="animate-fade-in">
      <section className="mb-8 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 px-6 py-10 text-white shadow-lg sm:px-10">
        <h1 className="text-left text-3xl font-bold tracking-tight sm:text-4xl">
          Discover Amazing Deals
        </h1>
        <p className="mt-2 max-w-xl text-left text-brand-100">
          Shop curated products with fast delivery and secure checkout.
        </p>
      </section>

      <FilterBar
        categories={categories}
        categoryValue={categoryValue}
        sortValue={parseSortFromUrl() || sortValue}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      {loading && <LoadingSpinner />}

      {error && !loading && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700"
          role="alert"
          data-testid="products-error"
        >
          {error}
        </div>
      )}

      {!loading && !error && sortedProducts.length === 0 && (
        <p className="py-12 text-center text-slate-600" data-testid="no-products">
          No products found for this category.
        </p>
      )}

      {!loading && sortedProducts.length > 0 && (
        <section
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Product listing"
          data-testid="products-grid"
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Home;
