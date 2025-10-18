'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Module {
  id: string;
  name: string;
  description: string;
  totalChallenges: number;
  completedChallenges: number;
  slug: string;
}

const modules: Module[] = [
  {
    id: '1',
    name: 'Sequence Station',
    description: 'Learn the basics: variables, functions, and operations',
    totalChallenges: 10,
    completedChallenges: 0,
    slug: 'sequence-station',
  },
  {
    id: '2',
    name: 'Loop Gardens',
    description: 'Master iteration with for loops and while loops',
    totalChallenges: 10,
    completedChallenges: 0,
    slug: 'loop-gardens',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/login');
      return;
    }

    setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-2 border-black p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Vibe Coding</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {user?.username}!</span>
            <Button variant="outline" size="sm" onClick={() => {
              localStorage.clear();
              router.push('/');
            }}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="py-4">
              <div className="text-3xl font-bold mb-1">{user?.currentLevel || 1}</div>
              <div className="text-sm text-gray-600">Current Level</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="text-3xl font-bold mb-1">{user?.totalXP || 0}</div>
              <div className="text-sm text-gray-600">Total XP</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="text-3xl font-bold mb-1">0/20</div>
              <div className="text-sm text-gray-600">Challenges Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Modules */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Learning Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module) => (
              <Card key={module.id} hover>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{module.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                    </div>
                    <Badge variant="default">
                      {module.completedChallenges}/{module.totalChallenges}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Progress
                      value={(module.completedChallenges / module.totalChallenges) * 100}
                      showLabel
                    />
                  </div>
                  <Link href={`/challenges/${module.slug}`}>
                    <Button variant="primary" className="w-full">
                      {module.completedChallenges === 0 ? 'Start Module' : 'Continue'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/sandbox">
              <Card hover className="cursor-pointer">
                <CardContent className="py-6">
                  <div className="text-4xl mb-2">⚡</div>
                  <div className="font-bold mb-1">Sandbox Mode</div>
                  <div className="text-sm text-gray-600">Practice coding freely</div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/solutions">
              <Card hover className="cursor-pointer">
                <CardContent className="py-6">
                  <div className="text-4xl mb-2">🏆</div>
                  <div className="font-bold mb-1">Solutions Gallery</div>
                  <div className="text-sm text-gray-600">See community solutions</div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/profile">
              <Card hover className="cursor-pointer">
                <CardContent className="py-6">
                  <div className="text-4xl mb-2">👤</div>
                  <div className="font-bold mb-1">Your Profile</div>
                  <div className="text-sm text-gray-600">View stats and progress</div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
