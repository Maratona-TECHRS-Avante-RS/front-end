import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalUser } from "../../context";
import { logout } from "../../api";

export function useLogout() {
  const USER_KEY = "user";
  const navigate = useNavigate();
  const [, setUser] = useGlobalUser();
  const [hasError, setError] = useState(null);

  async function logoutUser() {
    try {
      //await logout();

      setUser(null);
      localStorage.removeItem(USER_KEY);
      navigate("/");
    } catch (error) {
      setError("Não foi possovel deslogar.");
    }
  }

  return { logoutUser, hasError };
}
