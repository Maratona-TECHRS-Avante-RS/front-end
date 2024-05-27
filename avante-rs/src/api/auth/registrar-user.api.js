import { axiosInstance } from "../_base/axios-instance";

export async function register(name, address, cpf, email, password) {
  const response = await axiosInstance.post("/auth/register", {
    name: name,
    address: address,
    cpf: cpf,
    email: email,
    password: password,
  });
  return response.data;
}
