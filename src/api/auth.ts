import { publicApi } from "./intance";

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await publicApi.post("/login", { email, password });
    return data;
  },
  register: async (email: string, password: string, role: string) => {
    const { data } = await publicApi.post("/register", {
      email,
      password,
      role,
    });
    return data;
  },
};
