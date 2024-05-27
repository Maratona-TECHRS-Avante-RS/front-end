import { useState, useEffect } from "react";
import { axiosInstance } from "../../api";

export function useListTools() {
  const [ferramentas, setFerramentas] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchListTools() {
      try {
        const response = await axiosInstance.get(`/answers/tools`);
        setFerramentas(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListTools();
  }, []);

  return {
    ferramentas,
    isLoading,
    hasError,
    totalPages,
    page,
    setPage,
  };
}
