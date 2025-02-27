import { getCurrentUserInfo } from "@/lib/auth";
import type { MagicUserMetadata } from "magic-sdk";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  const query = useQuery<MagicUserMetadata | null>({
    queryKey: ["magic-user"],
    queryFn: getCurrentUserInfo,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error
  };
}
