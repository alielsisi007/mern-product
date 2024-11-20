import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [], // Ensure this is initialized as an array
  // Other state and actions

  createProduct: async (newProduct) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        set((state) => ({
          products: Array.isArray(state.products)
            ? [...state.products, data.data]
            : [data.data],
        }));
        return { success: true, message: data.message };
      } else {
        return {
          success: false,
          message: data.message || "Failed to create product",
        };
      }
    } catch (error) {
      console.error("Error in createProduct:", error);
      return { success: false, message: "Server Error" };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.statusText}`);
      }
      const result = await res.json();

      const products = result || []; // Use `data` if it exists, else default to an empty array

      set({ products });
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      // Log the response to debug
      console.log("Delete Response:", {
        success: data.success,
        message: data.message,
      });

      if (!data.success) {
        console.error("Failed to delete product:", data.message);
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: Array.isArray(state.products)
          ? state.products.filter((product) => product._id !== pid)
          : [],
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error in deleteProduct:", error.message);
      return { success: false, message: "Server error" };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    console.log("Response data:", data);

    if (data.success === true) {
      return {
        success: false,
        message: data.message,
      };
    }

    // Update the UI state immediately
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? { ...product, ...updatedProduct } : product
      ),
    }));

    // Return success response
    return {
      success: data.success,
      message: data.message,
    };
  },
}));
