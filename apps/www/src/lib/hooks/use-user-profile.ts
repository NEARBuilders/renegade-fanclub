"use client";

import { getUserProfile } from "@/lib/api/user";
import { type ProfileResponse } from "@renegade-fanclub/types";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./use-current-user";

export function useUserProfile(userId?: string) {
  if (!userId) {
    const { user: magicUser, isLoading: isMagicLoading } = useCurrentUser();

    const profileQuery = useQuery<ProfileResponse>({
      queryKey: ["user-profile", magicUser?.issuer],
      queryFn: () => getUserProfile({ userId: magicUser?.issuer! }),
      enabled: !!magicUser?.issuer,
    });

    const combinedData = magicUser && {
      ...profileQuery.data,
      issuer: magicUser.issuer,
      publicAddress: magicUser.publicAddress,
      email: magicUser.email,
      phoneNumber: magicUser.phoneNumber,
      isMfaEnabled: magicUser.isMfaEnabled,
    };

    return {
      data: combinedData || null,
      isLoading: isMagicLoading || profileQuery.isLoading,
      error: profileQuery.error,
    };
  } else {
    const profileQuery = useQuery<ProfileResponse>({
      queryKey: ["user-profile", userId],
      queryFn: () => getUserProfile({ userId: userId! }),
      enabled: !!userId,
    });

    return {
      data: profileQuery.data
        ? {
            ...profileQuery.data,
            issuer: userId,
          }
        : null,
      isLoading: profileQuery.isLoading,
      error: profileQuery.error,
    };
  }
}
