'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { storeReferralId } from '@/lib/utils/referral-handler';

export function ReferralHandler() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const referralId = searchParams.get('referralId');
    if (referralId) {
      storeReferralId(referralId);
    }
  }, [searchParams]);
  
  return null;
}
