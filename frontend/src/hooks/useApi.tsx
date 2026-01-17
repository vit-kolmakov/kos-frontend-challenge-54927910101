import { useQuery } from "@tanstack/react-query";
const BASE_URL = "localhost:8080/api";
const fetchApiData = async <T,>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
  }

  return response.json();
};

const useApi = <T,>(endpoint: string) => {
  return useQuery<T, Error>({
    queryKey: [endpoint],
    queryFn: () => fetchApiData<T>(endpoint),
    staleTime: 60 * 1000,
  });
};

export default useApi;
