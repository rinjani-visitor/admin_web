import { create } from "zustand";

// Buat store Zustand untuk mengelola state isLoading
const useStore = create((set) => ({
  isLoading: false, // Default: true

  // Fungsi untuk mengubah nilai isLoading
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useStore;
