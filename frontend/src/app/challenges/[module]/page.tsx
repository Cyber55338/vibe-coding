'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Challenge {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: number;
  estimatedTime: number;
  concepts: string[];
  order: number;
  completed?: boolean;
}

export default function ModuleChallengePage() {
  const params = useParams();
  const router = useRouter();
  const module = params.module as string;
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  const moduleNames: Record<string, string> = {
    'sequence-station': 'Sequence Station',
    'loop-gardens': 'Loop Gardens',
  };

  useEffect(() => {
    fetchChallenges();
  }, [module]);

  const fetchChallenges = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/challenges/module/${module}`);
      const data = await response.json();
      setChallenges(data);
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading challenges...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-2 border-black p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">← Back</Button>
          </Link>
          <h1 className="text-2xl font-bold">{moduleNames[module] || module}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <p className="text-gray-600">
            Complete all {challenges.length} challenges to master this module.
          </p>
        </div>

        <div className="space-y-4">
          {challenges.map((challenge, index) => (
            <Card key={challenge.id} hover>
              <CardContent className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-gray-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl font-bold">{challenge.title}</h3>
                      {challenge.completed && (
                        <Badge variant="success">✓ Complete</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{challenge.description}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <Badge variant="default">
                        Difficulty: {challenge.difficulty}/10
                      </Badge>
                      <span className="text-gray-600">
                        ⏱ {challenge.estimatedTime} min
                      </span>
                      <div className="flex gap-1">
                        {challenge.concepts.slice(0, 3).map((concept) => (
                          <Badge key={concept} variant="default">{concept}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link href={`/challenge/${challenge.slug}`}>
                      <Button variant="primary">
                        {challenge.completed ? 'Retry' : 'Start'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
