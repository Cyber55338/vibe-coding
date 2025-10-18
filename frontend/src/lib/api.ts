const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new ApiError(response.status, error.message || 'Request failed');
  }

  return response.json();
}

export const api = {
  // Auth
  register: (data: { email: string; username: string; password: string }) =>
    fetchWithAuth('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    fetchWithAuth('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Challenges
  getAllChallenges: () => fetchWithAuth('/api/challenges'),

  getChallengesByModule: (module: string) =>
    fetchWithAuth(`/api/challenges/module/${module}`),

  getChallenge: (slug: string) => fetchWithAuth(`/api/challenges/${slug}`),

  // Attempts
  submitAttempt: (data: { challengeId: string; code: string; language: string }) =>
    fetchWithAuth('/api/attempts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAttemptsByChallenge: (challengeId: string) =>
    fetchWithAuth(`/api/attempts/challenge/${challengeId}`),

  getUserAttempts: () => fetchWithAuth('/api/attempts/me'),

  // User
  getProfile: () => fetchWithAuth('/api/users/me'),

  updateProfile: (data: { firstName?: string; lastName?: string; avatarUrl?: string }) =>
    fetchWithAuth('/api/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  getProgress: () => fetchWithAuth('/api/users/me/progress'),

  getSkills: () => fetchWithAuth('/api/users/me/skills'),

  // Solutions
  createSolution: (data: {
    challengeId: string;
    code: string;
    language: string;
    metrics: any;
    visibility?: string;
  }) =>
    fetchWithAuth('/api/solutions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getSolutionsByChallenge: (challengeId: string) =>
    fetchWithAuth(`/api/solutions/challenge/${challengeId}`),

  upvoteSolution: (solutionId: string) =>
    fetchWithAuth(`/api/solutions/${solutionId}/upvote`, {
      method: 'POST',
    }),
};

export { ApiError };
