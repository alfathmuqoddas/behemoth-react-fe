import { publicApi } from "./intance";

export type TUser = {
  email: string;
  password: string;
};

export type TUserRegister = TUser & {
  firstName: string;
  lastName: string;
  userName: string;
};

export const authService = {
  login: async (payload: TUser) => {
    const { data } = await publicApi.post("/api/auth/login", payload);
    return data;
  },
  register: async (payload: TUserRegister) => {
    const { data } = await publicApi.post("/api/auth/register", payload);
    return data;
  },
};
