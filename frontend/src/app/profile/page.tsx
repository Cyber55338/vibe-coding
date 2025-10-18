'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileData, progressData, skillsData] = await Promise.all([
        api.getProfile(),
        api.getProgress(),
        api.getSkills(),
      ]);

      setUser(profileData);
      setProgress(progressData);
      setSkills(skillsData);
      setFormData({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await api.updateProfile(formData);
      setUser(updated);
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
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
          <h1 className="text-2xl font-bold">Your Profile</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  {!editing && (
                    <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editing ? (
                  <div className="space-y-4">
                    <Input
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    <Input
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save'}
                      </Button>
                      <Button variant="outline" onClick={() => setEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Username</div>
                      <div className="font-bold">{user?.username}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="font-bold">{user?.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Name</div>
                      <div className="font-bold">
                        {user?.firstName || user?.lastName
                          ? `${user?.firstName || ''} ${user?.lastName || ''}`
                          : 'Not set'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Member Since</div>
                      <div className="font-bold">
                        {new Date(user?.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Your Skills</CardTitle>
              </CardHeader>
              <CardContent>
                {skills.length === 0 ? (
                  <p className="text-gray-600">
                    Complete challenges to build your skills!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.skill}>
                        <div className="flex justify-between mb-1">
                          <span className="font-bold">{skill.skill}</span>
                          <span className="text-sm text-gray-600">
                            {Math.round(skill.proficiency * 100)}%
                          </span>
                        </div>
                        <Progress value={skill.proficiency * 100} />
                        <div className="text-xs text-gray-600 mt-1">
                          Last practiced: {new Date(skill.lastPracticed).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold">{user?.currentLevel || 1}</div>
                  <div className="text-sm text-gray-600">Current Level</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{user?.totalXP || 0}</div>
                  <div className="text-sm text-gray-600">Total XP</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{progress?.completedChallenges || 0}</div>
                  <div className="text-sm text-gray-600">Challenges Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{progress?.totalAttempts || 0}</div>
                  <div className="text-sm text-gray-600">Total Attempts</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            {progress?.recentAttempts && progress.recentAttempts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {progress.recentAttempts.slice(0, 5).map((attempt: any) => (
                      <div key={attempt.id} className="text-sm">
                        <div className="font-bold">{attempt.challenge.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={attempt.completed ? 'success' : 'default'}>
                            {attempt.completed ? 'Completed' : 'Attempted'}
                          </Badge>
                          <span className="text-gray-600">
                            {Math.round(attempt.overallScore * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
