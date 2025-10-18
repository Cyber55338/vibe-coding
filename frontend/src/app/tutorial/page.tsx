'use client';

import { TutorialFlow } from '@/components/tutorial/TutorialFlow';
import { useRouter } from 'next/navigation';

export default function TutorialPage() {
  const router = useRouter();

  const handleComplete = () => {
    // Mark tutorial as completed
    localStorage.setItem('tutorialCompleted', 'true');
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return <TutorialFlow onComplete={handleComplete} />;
}
