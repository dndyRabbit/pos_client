// hooks/use-options.js
import { useState, useEffect } from "react";

export function useFetchOptions(fetchMaster, params) {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await fetchMaster(params);
        setOptions(response?.result || []);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOptions();
  }, []);

  return { options, isLoading, error };
}
