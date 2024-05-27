import { useState, useEffect } from "react";
import { axiosInstance } from "../../api";

export function useListAnswers() {
  const [respostas, setRespostas] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setError] = useState(null);

  useEffect(() => {
    async function fetchListAnswers() {
      try {
        const response = await axiosInstance.get(`/answers`);
        setRespostas(response.data);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListAnswers();
  }, []);

  return {
    respostas,
    isLoading,
    hasError,
  };
}
