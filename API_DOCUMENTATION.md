# Vibe Coding - API Documentation

Complete REST API reference for Vibe Coding backend.

**Base URL:** `http://localhost:3001` (development)
**Production:** `https://your-domain.com`

---

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

---

## Endpoints

### Authentication

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "coolcoder123",
  "password": "securepassword",
  "firstName": "John",      // Optional
  "lastName": "Doe"          // Optional
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "coolcoder123",
    "currentLevel": 1,
    "totalXP": 0
  },
  "accessToken": "jwt-token",
  "refreshToken": "jwt-refresh-token"
}
```

**Errors:**
- `400` - Invalid input (missing fields, password too short)
- `409` - Email or username already exists

---

#### POST /api/auth/login
Login to existing account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "coolcoder123",
    "currentLevel": 5,
    "totalXP": 2500
  },
  "accessToken": "jwt-token",
  "refreshToken": "jwt-refresh-token"
}
```

**Errors:**
- `400` - Missing email or password
- `401` - Invalid credentials

---

#### POST /api/auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "jwt-refresh-token"
}
```

**Response:** `200 OK`
```json
{
  "accessToken": "new-jwt-token",
  "refreshToken": "new-jwt-refresh-token"
}
```

**Errors:**
- `400` - Missing refresh token
- `401` - Invalid or expired refresh token

---

### Challenges

#### GET /api/challenges
Get all available challenges.

**Response:** `200 OK`
```json
[
  {
    "id": "cuid",
    "slug": "hello-world",
    "title": "Hello World",
    "description": "Your first programming challenge!",
    "module": "sequence-station",
    "difficulty": 1,
    "estimatedTime": 5,
    "concepts": ["Functions", "Strings"],
    "order": 1
  }
]
```

---

#### GET /api/challenges/module/:module
Get challenges for a specific module.

**Parameters:**
- `module` - Module slug (e.g., "sequence-station", "loop-gardens")

**Response:** `200 OK`
```json
[
  {
    "id": "cuid",
    "slug": "hello-world",
    "title": "Hello World",
    "difficulty": 1,
    "estimatedTime": 5,
    "concepts": ["Functions", "Strings"],
    "order": 1
  }
]
```

**Errors:**
- `404` - Module not found

---

#### GET /api/challenges/:slug
Get full challenge details (requires authentication).

**Parameters:**
- `slug` - Challenge slug (e.g., "hello-world")

**Headers:**
- `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": "cuid",
  "slug": "hello-world",
  "title": "Hello World",
  "description": "Your first programming challenge!",
  "instructions": "Create a function called solution()...",
  "starterCode": "function solution() {\n  \n}",
  "module": "sequence-station",
  "difficulty": 1,
  "estimatedTime": 5,
  "concepts": ["Functions", "Strings", "Return Values"],
  "testCases": [
    {
      "input": null,
      "expectedOutput": "Hello World",
      "description": "Returns correct string"
    }
  ],
  "hints": [
    "Start by declaring a function",
    "Functions use the 'function' keyword",
    ...
  ]
}
```

**Errors:**
- `401` - Not authenticated
- `404` - Challenge not found

---

### User Profile

#### GET /api/users/me
Get current user profile.

**Headers:**
- `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "coolcoder123",
  "firstName": "John",
  "lastName": "Doe",
  "avatarUrl": null,
  "currentLevel": 5,
  "totalXP": 2500,
  "createdAt": "2025-01-15T10:30:00Z",
  "lastActiveAt": "2025-01-18T14:20:00Z"
}
```

---

#### PATCH /api/users/me
Update user profile.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "coolcoder123",
  "firstName": "John",
  "lastName": "Smith",
  "avatarUrl": "https://example.com/avatar.jpg",
  "currentLevel": 5,
  "totalXP": 2500
}
```

---

#### GET /api/users/me/progress
Get user's learning progress.

**Headers:**
- `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "totalAttempts": 45,
  "completedChallenges": 15,
  "moduleStats": {
    "sequence-station": {
      "totalAttempts": 25,
      "completedChallenges": 10,
      "averageScore": 0.87
    },
    "loop-gardens": {
      "totalAttempts": 20,
      "completedChallenges": 5,
      "averageScore": 0.75
    }
  },
  "recentAttempts": [
    {
      "id": "uuid",
      "challengeId": "cuid",
      "challenge": {
        "slug": "fibonacci-sequence",
        "title": "Fibonacci Sequence",
        "module": "loop-gardens"
      },
      "code": "function solution(n) { ... }",
      "correctness": 1.0,
      "efficiency": 0.8,
      "overallScore": 0.92,
      "completed": true,
      "createdAt": "2025-01-18T14:15:00Z"
    }
  ]
}
```

---

#### GET /api/users/me/skills
Get user's skill proficiency levels.

**Headers:**
- `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
[
  {
    "skill": "Functions",
    "proficiency": 0.95,
    "lastPracticed": "2025-01-18T14:15:00Z"
  },
  {
    "skill": "Loops",
    "proficiency": 0.72,
    "lastPracticed": "2025-01-18T13:30:00Z"
  }
]
```

---

### Attempts

#### POST /api/attempts
Submit code attempt for a challenge.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "challengeId": "cuid",
  "code": "function solution() {\n  return 'Hello World';\n}",
  "language": "javascript"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "userId": "uuid",
  "challengeId": "cuid",
  "code": "function solution() { ... }",
  "language": "javascript",
  "testResults": [
    {
      "passed": true,
      "input": null,
      "expectedOutput": "Hello World",
      "actualOutput": "Hello World",
      "executionTime": 2
    }
  ],
  "correctness": 1.0,
  "efficiency": 0.95,
  "elegance": 0.85,
  "readability": 0.90,
  "overallScore": 0.93,
  "attemptNumber": 3,
  "timeSpentMs": "15000",
  "completed": true,
  "analysis": {
    "patterns": ["modern-variables", "arrow-function"],
    "complexity": "simple",
    "suggestions": [],
    "strengths": ["Clean code", "Good naming"],
    "weaknesses": []
  },
  "challenge": {
    "slug": "hello-world",
    "title": "Hello World"
  },
  "createdAt": "2025-01-18T14:15:00Z"
}
```

**Errors:**
- `400` - Invalid request (missing fields)
- `401` - Not authenticated
- `404` - Challenge not found

---

#### GET /api/attempts/challenge/:challengeId
Get user's attempts for a specific challenge.

**Headers:**
- `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "code": "function solution() { ... }",
    "language": "javascript",
    "correctness": 0.8,
    "efficiency": 0.7,
    "elegance": 0.6,
    "readability": 0.75,
    "overallScore": 0.73,
    "attemptNumber": 1,
    "completed": false,
    "createdAt": "2025-01-18T13:00:00Z"
  },
  {
    "id": "uuid",
    "code": "function solution() { ... }",
    "correctness": 1.0,
    "overallScore": 0.93,
    "attemptNumber": 2,
    "completed": true,
    "createdAt": "2025-01-18T14:15:00Z"
  }
]
```

---

#### GET /api/attempts/me
Get all user's attempts.

**Headers:**
- `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "challengeId": "cuid",
    "challenge": {
      "slug": "hello-world",
      "title": "Hello World",
      "module": "sequence-station"
    },
    "overallScore": 0.93,
    "completed": true,
    "createdAt": "2025-01-18T14:15:00Z"
  }
]
```

---

### Solutions

#### POST /api/solutions
Share a solution publicly.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "challengeId": "cuid",
  "code": "function solution() { ... }",
  "language": "javascript",
  "metrics": {
    "correctness": 1.0,
    "efficiency": 0.95,
    "elegance": 0.90,
    "readability": 0.92
  },
  "visibility": "public"  // or "private"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "userId": "uuid",
  "challengeId": "cuid",
  "code": "function solution() { ... }",
  "metrics": { ... },
  "visibility": "public",
  "views": 0,
  "upvotes": 0,
  "user": {
    "username": "coolcoder123",
    "avatarUrl": null
  },
  "createdAt": "2025-01-18T14:15:00Z"
}
```

---

#### GET /api/solutions/challenge/:challengeId
Get public solutions for a challenge.

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "code": "function solution() { ... }",
    "metrics": {
      "correctness": 1.0,
      "efficiency": 0.98
    },
    "upvotes": 15,
    "views": 120,
    "user": {
      "username": "codewizard",
      "avatarUrl": "https://..."
    },
    "createdAt": "2025-01-17T10:00:00Z"
  }
]
```

---

#### POST /api/solutions/:solutionId/upvote
Upvote or remove upvote from a solution.

**Headers:**
- `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "upvoted": true  // or false if removed
}
```

---

## AI Agents Endpoints

**Base URL:** `http://localhost:8001` (development)

### POST /api/agents/guide/hint
Get contextual hint from Guide Agent.

**Request Body:**
```json
{
  "challenge_id": "hello-world",
  "user_code": "function solution() {\n  \n}",
  "hint_level": 1,
  "previous_attempts": []  // Optional
}
```

**Response:** `200 OK`
```json
{
  "hint": "Think about what the problem is asking. What needs to be returned?",
  "level": 1,
  "hint_type": "conceptual"
}
```

---

### POST /api/agents/analyzer/analyze
Analyze code quality and patterns.

**Request Body:**
```json
{
  "code": "function solution() { return 'Hello World'; }",
  "challenge_id": "hello-world",
  "test_results": {
    "totalPassed": 1,
    "totalTests": 1,
    "results": [...]
  }
}
```

**Response:** `200 OK`
```json
{
  "patterns": ["modern-variables", "function-declaration"],
  "complexity": "simple",
  "suggestions": ["Consider using arrow function syntax"],
  "strengths": ["Clean and readable", "Correct solution"],
  "weaknesses": []
}
```

---

### POST /api/agents/content/generate
Generate new challenge (admin only).

**Request Body:**
```json
{
  "module": "sequence-station",
  "difficulty": 3,
  "concepts": ["Functions", "Conditionals"]
}
```

**Response:** `200 OK`
```json
{
  "title": "Check Grade",
  "description": "Write a function to check if a grade is passing",
  "instructions": "Create a function that...",
  "starter_code": "function solution() {\n  \n}",
  "test_cases": [...],
  "hints": [...]
}
```

---

## Error Responses

All endpoints may return the following error format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

**Common Status Codes:**
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (not authorized)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

---

## Rate Limiting

Default rate limits:
- General endpoints: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes
- Code execution: 20 requests per minute

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642512000
```

---

## WebSocket Events

**Connection:** `ws://localhost:3001`

### Events

#### execute-code
Execute code with real-time feedback.

**Emit:**
```json
{
  "requestId": "unique-id",
  "code": "function solution() { ... }",
  "challengeId": "cuid"
}
```

**Listen:**
- `execution-started` - Execution began
- `execution-queued` - In queue
- `execution-complete` - Results ready
- `execution-error` - Execution failed

---

#### request-hint
Get AI hint in real-time.

**Emit:**
```json
{
  "requestId": "unique-id",
  "challengeId": "cuid",
  "code": "...",
  "hintLevel": 1
}
```

**Listen:**
- `hint-processing` - Generating hint
- `hint-ready` - Hint available
- `hint-error` - Failed to generate

---

**Last Updated:** 2025-10-18
**API Version:** 1.0
