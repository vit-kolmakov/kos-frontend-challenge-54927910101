import { useQuery, type QueryKey } from "@tanstack/react-query";
type UseApiOptions<T> = Omit<
  Partial<Parameters<typeof useQuery<T, Error>>[0]>,
  "queryKey" | "queryFn"
>;

const BASE_URL = "http://localhost:8080/api";
const fetchApiData = async <T,>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
  }
  return response.json();
};

const useApi = <T,>(endpoint: string, options?: UseApiOptions<T>) => {
  console.log("use-api", endpoint);
  return useQuery<T, Error>({
    queryKey: [endpoint] as QueryKey,
    queryFn: () => fetchApiData<T>(endpoint),
    staleTime: 60 * 1000,
    ...options,
  });
};

export default useApi;
