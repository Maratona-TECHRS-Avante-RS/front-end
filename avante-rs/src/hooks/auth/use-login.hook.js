import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalUser } from "../../context";
import { login } from "../../api";

export function useLogin() {
  const navigate = useNavigate();
  const [, setUser] = useGlobalUser();
  const [hasError, setError] = useState(null);

  async function loginUser(username, password) {
    try {
      const user = await login(username, password);

      setUser(user);
      navigate("/home");
    } catch (error) {
      setError("Usuário ou senha incorretos");
    }
  }

  return { loginUser, hasError };
}
