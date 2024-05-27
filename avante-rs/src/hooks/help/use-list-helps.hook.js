import { useState, useEffect } from "react";
import { axiosInstance } from "../../api";

export function useListHelps() {
  const [helps, setHelps] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchListHelps() {
      try {
        const response = await axiosInstance.get(`/helps`);
        setHelps(response?.data?.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListHelps();
  }, []);

  return {
    helps,
    isLoading,
    hasError,
    totalPages,
    page,
    setPage,
  };
}
