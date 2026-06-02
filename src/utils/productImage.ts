import type { Product } from "../types/Product";

const PLACEHOLDER = "https://placehold.co/400x400/e2e8f0/64748b?text=No+Image";

/** Normalize API image field (string URL or occasional bad entries). */
export function getProductImageUrl(
  images: Product["images"] | undefined,
  index = 0
): string {
  if (!images?.length) return PLACEHOLDER;
  const entry = images[index] ?? images[0];
  if (typeof entry === "string" && entry.trim().startsWith("http")) {
    return entry.trim();
  }
  return PLACEHOLDER;
}

export { PLACEHOLDER as PRODUCT_IMAGE_PLACEHOLDER };
