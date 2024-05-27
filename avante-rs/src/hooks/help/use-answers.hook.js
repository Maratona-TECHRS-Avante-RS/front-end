import { useState } from "react";
import { axiosInstance } from "../../api";

export function useAnswers() {
  const [resposta, setResposta] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setError] = useState(null);

  async function fetchListAnswers(idAnsnwer) {
    try {
      const response = await axiosInstance.get(`/helps/${idAnsnwer}`);
      setResposta(response?.data);
    } catch (error) {
      setError(error.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    resposta,
    fetchListAnswers,
    isLoading,
    hasError,
  };
}
