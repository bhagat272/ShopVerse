import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from "../services/api";
import type { Category, Product } from "../types/Product";

interface ProductState {
  items: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  activeCategoryId: string;
}

const initialState: ProductState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
  activeCategoryId: "",
};

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await getCategories();
    } catch {
      return rejectWithValue("Failed to load categories. Please try again.");
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (categoryId: string | undefined, { rejectWithValue }) => {
    try {
      if (categoryId) {
        return {
          products: await getProductsByCategory(Number(categoryId)),
          categoryId,
        };
      }
      return { products: await getProducts(), categoryId: "" };
    } catch {
      return rejectWithValue("Failed to load products. Please try again.");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, () => {})
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error =
          (action.payload as string) ?? "Failed to load categories.";
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.activeCategoryId = action.payload.categoryId;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Failed to load products.";
        state.items = [];
      });
  },
});

type ProductSelectorState = { products: ProductState };

export const selectProducts = (state: ProductSelectorState) =>
  state.products.items;
export const selectCategories = (state: ProductSelectorState) =>
  state.products.categories;
export const selectProductsLoading = (state: ProductSelectorState) =>
  state.products.loading;
export const selectProductsError = (state: ProductSelectorState) =>
  state.products.error;

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
