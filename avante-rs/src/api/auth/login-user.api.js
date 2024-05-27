import { axiosInstance } from "../_base/axios-instance";

export async function login(authenticator, password) {
  const response = await axiosInstance.post("/auth/login", {
    authenticator: authenticator,
    password: password,
  });
  return response.data;
}
