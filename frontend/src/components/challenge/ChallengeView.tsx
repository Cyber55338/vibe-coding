'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { HybridEditor } from '../editors/HybridEditor';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { updateCode, executeStart, executeSuccess, executeFailure } from '@/store/slices/challengeSlice';
import { api } from '@/lib/api';

interface ChallengeViewProps {
  challengeId: string;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({ challengeId }) => {
  const dispatch = useDispatch();
  const { current, code, executing, results } = useSelector((state: RootState) => state.challenge);
  const [bmadPhase, setBmadPhase] = useState<'build' | 'measure' | 'adapt' | 'deploy'>('build');
  const [showHints, setShowHints] = useState(false);
  const [currentHintLevel, setCurrentHintLevel] = useState(0);

  // Mock challenge data (will be fetched from API)
  const [challenge, setChallenge] = useState<any>(null);
  const [loadingChallenge, setLoadingChallenge] = useState(true);

  useEffect(() => {
    fetchChallenge();
  }, [challengeId]);

  const fetchChallenge = async () => {
    try {
      const data = await api.getChallenge(challengeId);
      setChallenge(data);
      dispatch(updateCode(data.starterCode || '// Write your solution here\n'));
    } catch (error) {
      console.error('Failed to fetch challenge:', error);
    } finally {
      setLoadingChallenge(false);
    }
  };

  if (loadingChallenge) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading challenge...</div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Challenge not found</div>
      </div>
    );
  }

  const handleCodeChange = (newCode: string) => {
    dispatch(updateCode(newCode));
  };

  const handleRunCode = async () => {
    setBmadPhase('measure');
    dispatch(executeStart());

    try {
      const result = await api.submitAttempt({
        challengeId: challenge.id,
        code,
        language: 'javascript',
      });

      dispatch(executeSuccess(result));

      // Move to adapt phase if not perfect
      if (result.correctness < 1.0) {
        setBmadPhase('adapt');
      } else {
        setBmadPhase('deploy');
      }
    } catch (error: any) {
      dispatch(executeFailure(error.message || 'Execution failed'));
      setBmadPhase('build');
    }
  };

  const handleRequestHint = () => {
    if (currentHintLevel < challenge.hints.length) {
      setCurrentHintLevel(currentHintLevel + 1);
      setShowHints(true);
      setBmadPhase('adapt');
    }
  };

  const handleNextChallenge = () => {
    // Navigate to next challenge
    console.log('Next challenge');
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">{challenge.title}</h1>
            <div className="flex gap-2">
              <Badge variant="default">Difficulty: {challenge.difficulty}/10</Badge>
              <Badge variant="default">{challenge.estimatedTime} min</Badge>
            </div>
          </div>
          <p className="text-gray-600">{challenge.description}</p>
        </div>

        {/* BMAD Phase Indicator */}
        <div className="mb-6">
          <div className="flex gap-2 mb-2">
            {['build', 'measure', 'adapt', 'deploy'].map((phase) => (
              <div
                key={phase}
                className={`flex-1 px-4 py-2 text-center font-bold border-2 border-black ${
                  bmadPhase === phase ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                {phase.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Instructions */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{challenge.instructions}</p>
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Concepts:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {challenge.concepts.map((concept) => (
                      <Badge key={concept} variant="default">{concept}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hints */}
            {bmadPhase === 'adapt' && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Hints</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentHintLevel === 0 ? (
                    <Button onClick={handleRequestHint} variant="outline">
                      Request Hint (Level 1)
                    </Button>
                  ) : (
                    <div>
                      <div className="space-y-2 mb-4">
                        {challenge.hints.slice(0, currentHintLevel).map((hint, idx) => (
                          <div key={idx} className="p-3 border-2 border-black bg-gray-50">
                            <span className="font-bold">Hint {idx + 1}:</span> {hint}
                          </div>
                        ))}
                      </div>
                      {currentHintLevel < challenge.hints.length && (
                        <Button onClick={handleRequestHint} variant="outline" size="sm">
                          Request Next Hint (Level {currentHintLevel + 1})
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {results && bmadPhase !== 'build' && (
              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-bold">Correctness</span>
                        <span>{Math.round(results.correctness * 100)}%</span>
                      </div>
                      <Progress value={results.correctness * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-bold">Efficiency</span>
                        <span>{Math.round(results.efficiency * 100)}%</span>
                      </div>
                      <Progress value={results.efficiency * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-bold">Elegance</span>
                        <span>{Math.round(results.elegance * 100)}%</span>
                      </div>
                      <Progress value={results.elegance * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="font-bold">Readability</span>
                        <span>{Math.round(results.readability * 100)}%</span>
                      </div>
                      <Progress value={results.readability * 100} />
                    </div>

                    {results.correctness === 1.0 && bmadPhase === 'deploy' && (
                      <div className="mt-6 p-4 border-2 border-success bg-green-50">
                        <h3 className="text-xl font-bold text-success mb-2">
                          Challenge Complete!
                        </h3>
                        <p className="mb-4">
                          Overall Score: {Math.round(results.overallScore * 100)}%
                        </p>
                        <Button onClick={handleNextChallenge} variant="primary">
                          Next Challenge
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Editor */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <HybridEditor
                  value={code}
                  onChange={handleCodeChange}
                  language="javascript"
                  defaultMode="text"
                />
                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={handleRunCode}
                    disabled={executing || !code}
                    variant="primary"
                  >
                    {executing ? 'Running...' : 'Run Code'}
                  </Button>
                  <Button
                    onClick={() => dispatch(updateCode(''))}
                    variant="outline"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
