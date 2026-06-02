export interface Category {
  id: number;
  name: string;
  image?: string;
  creationAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt?: string;
  updatedAt?: string;
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";
