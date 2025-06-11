import { fetchDetails } from "@/server/actions/createUser";
import { useQuery } from "@tanstack/react-query";

export function useFetchInfo() {
  return useQuery({
    queryFn: async () => fetchDetails(),
    queryKey: ["deets"],
  });
}

/**
 * Safe version of useFetchInfo that provides loading and error states
 * Returns null for data when loading or error occurs
 */
export function useFetchInfoSafe() {
  const query = useQuery({
    queryFn: async () => fetchDetails(),
    queryKey: ["deets"],
  });

  return {
    data: query.data?.data || null,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
}

/**
 * Type-safe wrapper for dashboard components that need user data
 * Provides proper null checking and loading states
 */
export function useFetchUserData() {
  const { data: result, isLoading, error, refetch } = useQuery({
    queryFn: async () => fetchDetails(),
    queryKey: ["deets"],
  });

  return {
    userData: result?.data || null,
    isLoading,
    error,
    hasData: !!result?.data,
    refetch,
  };
}
