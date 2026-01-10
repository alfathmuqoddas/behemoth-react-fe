import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface IUser {
  id: string;
  email: string;
  role: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface IAuthState {
  setToken: (token: string) => void;
  setUser: (user: IUser | undefined) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  reset: () => void;
  isLoggedIn: boolean;
  token: string;
  user: IUser | undefined;
}

const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: undefined,
      token: "",
      setToken: (token: string) => set({ token }),
      setUser: (user: IUser | undefined) => set({ user }),
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      reset: () => set({ isLoggedIn: false, user: undefined, token: "" }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
