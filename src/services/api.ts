import axios from "axios";
import type { Category, Product } from "../types/Product";

const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>("/categories");
  return data;
};

export const getProductsByCategory = async (
  categoryId: number
): Promise<Product[]> => {
  const { data } = await api.get<Product[]>("/products/", {
    params: { categoryId },
  });
  return data;
};

export default api;
