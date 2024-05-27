import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api";

export function useRegister() {
  const navigate = useNavigate();
  const [hasError, setError] = useState(null);

  async function registerUser(name, address, cpf, email, password) {
    try {
      await register(name, address, cpf, email, password);

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return { registerUser, hasError };
}
