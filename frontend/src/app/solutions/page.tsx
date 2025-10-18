'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export default function SolutionsPage() {
  const [selectedModule, setSelectedModule] = useState<string>('all');

  // Mock data - in production, fetch from API
  const solutions = [
    {
      id: '1',
      challengeTitle: 'Hello World',
      module: 'sequence-station',
      username: 'codewizard',
      code: 'function solution() {\n  return "Hello World";\n}',
      upvotes: 42,
      views: 158,
      metrics: { correctness: 1.0, efficiency: 0.98, elegance: 0.95, readability: 1.0 },
      createdAt: '2025-01-15T10:30:00Z',
    },
    {
      id: '2',
      challengeTitle: 'Fibonacci Sequence',
      module: 'loop-gardens',
      username: 'jsmaster',
      code: 'function solution(n) {\n  if (n === 0) return [];\n  if (n === 1) return [0];\n  const result = [0, 1];\n  for (let i = 2; i < n; i++) {\n    result.push(result[i-1] + result[i-2]);\n  }\n  return result;\n}',
      upvotes: 35,
      views: 120,
      metrics: { correctness: 1.0, efficiency: 0.92, elegance: 0.88, readability: 0.95 },
      createdAt: '2025-01-16T14:20:00Z',
    },
  ];

  const filteredSolutions = selectedModule === 'all'
    ? solutions
    : solutions.filter(s => s.module === selectedModule);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-2 border-black p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">← Back</Button>
          </Link>
          <h1 className="text-2xl font-bold">Community Solutions</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Explore creative solutions from the community and learn different approaches!
          </p>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedModule === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedModule('all')}
            >
              All Modules
            </Button>
            <Button
              variant={selectedModule === 'sequence-station' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedModule('sequence-station')}
            >
              Sequence Station
            </Button>
            <Button
              variant={selectedModule === 'loop-gardens' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedModule('loop-gardens')}
            >
              Loop Gardens
            </Button>
          </div>
        </div>

        {/* Solutions */}
        <div className="space-y-4">
          {filteredSolutions.map((solution) => (
            <Card key={solution.id} hover>
              <CardContent className="py-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{solution.challengeTitle}</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-600">by <strong>{solution.username}</strong></span>
                      <Badge variant="default">{solution.module}</Badge>
                      <span className="text-gray-600">
                        {new Date(solution.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-4 text-sm mb-2">
                      <span className="text-gray-600">
                        👁 {solution.views} views
                      </span>
                      <span className="font-bold">
                        ⬆ {solution.upvotes} upvotes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Code */}
                <div className="mb-4 border-2 border-black p-4 bg-gray-50 overflow-x-auto">
                  <pre className="text-sm font-mono">{solution.code}</pre>
                </div>

                {/* Metrics */}
                <div className="flex gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">Correctness:</span>{' '}
                    <strong>{Math.round(solution.metrics.correctness * 100)}%</strong>
                  </div>
                  <div>
                    <span className="text-gray-600">Efficiency:</span>{' '}
                    <strong>{Math.round(solution.metrics.efficiency * 100)}%</strong>
                  </div>
                  <div>
                    <span className="text-gray-600">Elegance:</span>{' '}
                    <strong>{Math.round(solution.metrics.elegance * 100)}%</strong>
                  </div>
                  <div>
                    <span className="text-gray-600">Readability:</span>{' '}
                    <strong>{Math.round(solution.metrics.readability * 100)}%</strong>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    ⬆ Upvote
                  </Button>
                  <Button variant="outline" size="sm">
                    Try This Solution
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSolutions.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 mb-4">
                No solutions found for this module yet.
              </p>
              <p className="text-sm text-gray-500">
                Be the first to share your solution!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
