'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChallengeView } from '@/components/challenge/ChallengeView';

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading challenge...</div>
      </div>
    );
  }

  return <ChallengeView challengeId={slug} />;
}
