import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      login: async (userData, token) => {
        set({ user: userData, token: token, isLoggedIn: true });
      },
      logout: () => {
        set({ user: null, token: null, isLoggedIn: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
