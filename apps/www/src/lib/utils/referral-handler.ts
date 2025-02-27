const REFERRAL_ID_KEY = "referral_id";

export function storeReferralId(referralId: string): void {
  if (referralId) {
    localStorage.setItem(REFERRAL_ID_KEY, referralId);
  }
}

export function getStoredReferralId(): string | null {
  return localStorage.getItem(REFERRAL_ID_KEY);
}

export function clearReferralId(): void {
  localStorage.removeItem(REFERRAL_ID_KEY);
}

export function getReferralIdFromUrl(url: URL): string | null {
  return url.searchParams.get("ref");
}
