import type { SortOption } from "../types/Product";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "price-asc", label: "Price Low to High" },
  { value: "price-desc", label: "Price High to Low" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
];

export const VALID_SORTS = new Set<SortOption>(
  SORT_OPTIONS.map((o) => o.value)
);

export function readSearchParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function pushQueryUpdates(
  updates: Record<string, string | null | undefined>
): void {
  const params = readSearchParams();

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  });

  const query = params.toString();
  const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
  window.history.pushState({}, "", nextUrl);
}

export function parseCategoryFromUrl(): string {
  return readSearchParams().get("category") ?? "";
}

export function parseSortFromUrl(): SortOption | "" {
  const sort = readSearchParams().get("sort") ?? "";
  return VALID_SORTS.has(sort as SortOption) ? (sort as SortOption) : "";
}
