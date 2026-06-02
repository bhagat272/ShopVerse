import type { Category } from "../types/Product";
import { SORT_OPTIONS } from "../utils/urlQuery";
import type { SortOption } from "../types/Product";

interface FilterBarProps {
  categories: Category[];
  categoryValue: string;
  sortValue: SortOption | "";
  onCategoryChange: (categoryId: string) => void;
  onSortChange: (sort: SortOption | "") => void;
}

const FilterBar = ({
  categories,
  categoryValue,
  sortValue,
  onCategoryChange,
  onSortChange,
}: FilterBarProps) => {
  return (
    <section
      className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-label="Product filters"
      data-testid="filter-bar"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="category-filter"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Category
          </label>
          <select
            id="category-filter"
            value={categoryValue}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            aria-label="Filter by category"
            data-testid="category-filter"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={String(cat.id)}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="sort-filter"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Sort By
          </label>
          <select
            id="sort-filter"
            value={sortValue}
            onChange={(e) =>
              onSortChange((e.target.value as SortOption) || "")
            }
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            aria-label="Sort products"
            data-testid="sort-filter"
          >
            <option value="">Default</option>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
