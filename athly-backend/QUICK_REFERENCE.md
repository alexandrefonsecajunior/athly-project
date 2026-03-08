# ⚡ Quick Reference - IAFit REST API

## 🚀 Start Server
```bash
npm run dev    # Development
npm run build  # Build
npm start      # Production
```

Server: `http://localhost:4000`

---

## 🔐 Authentication

### Login
```bash
POST /auth/login
```
```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "user": {...},
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

### Use Token
```bash
Authorization: Bearer {accessToken}
```

---

## 📌 Quick Endpoints

```bash
# AUTH
POST   /auth/login                              # Login

# USERS
GET    /users/me                                # Current user
PUT    /users/profile                           # Update profile

# WORKOUTS
GET    /workouts/today                          # Today's workout
GET    /workouts/:id                            # Get by ID
GET    /workouts/history                        # History
GET    /workouts/training-plan                  # Training plan
PUT    /workouts/:workoutId                     # Update
POST   /workouts/:workoutId/feedback            # Feedback
PATCH  /workouts/:workoutId/complete            # Complete
PATCH  /workouts/:workoutId/skip                # Skip

# INTEGRATIONS
GET    /integrations                            # List all
POST   /integrations/:integrationId/connect     # Connect
DELETE /integrations/:integrationId/disconnect  # Disconnect
```

---

## 💻 Frontend API Client (Copy-Paste Ready)

### 1. Create `src/lib/api.ts`:
```typescript
const BASE_URL = 'http://localhost:4000';

class ApiClient {
  private accessToken: string | null = null;

  setToken(token: string) {
    this.accessToken = token;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.accessToken);
    return data;
  }

  // Users
  async getMe() {
    return this.request('/users/me');
  }

  async updateProfile(data: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Workouts
  async getTodayWorkout() {
    return this.request('/workouts/today');
  }

  async getWorkoutHistory() {
    return this.request('/workouts/history');
  }

  async getTrainingPlan() {
    return this.request('/workouts/training-plan');
  }

  async updateWorkout(workoutId: string, data: any) {
    return this.request(`/workouts/${workoutId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async submitWorkoutFeedback(workoutId: string, data: any) {
    return this.request(`/workouts/${workoutId}/feedback`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async completeWorkout(workoutId: string) {
    return this.request(`/workouts/${workoutId}/complete`, {
      method: 'PATCH',
    });
  }

  async skipWorkout(workoutId: string) {
    return this.request(`/workouts/${workoutId}/skip`, {
      method: 'PATCH',
    });
  }

  // Integrations
  async getIntegrations() {
    return this.request('/integrations');
  }

  async connectIntegration(integrationId: string) {
    return this.request(`/integrations/${integrationId}/connect`, {
      method: 'POST',
    });
  }

  async disconnectIntegration(integrationId: string) {
    return this.request(`/integrations/${integrationId}/disconnect`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();
```

### 2. Usage:
```typescript
// Login
const { user, accessToken } = await api.login('user@example.com', 'senha123');

// Get data
const workout = await api.getTodayWorkout();
const history = await api.getWorkoutHistory();
const me = await api.getMe();

// Update
await api.updateProfile({ name: 'New Name' });
await api.updateWorkout('workout-id', { intensity: 8 });

// Actions
await api.completeWorkout('workout-id');
await api.submitWorkoutFeedback('workout-id', {
  completed: true,
  effort: 8,
  fatigue: 6
});
```

---

## 🎯 Common Request Examples

### Update Profile
```bash
curl -X PUT http://localhost:4000/users/profile \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Name","availability":5}'
```

### Update Workout
```bash
curl -X PUT http://localhost:4000/workouts/WORKOUT_ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Workout",
    "intensity": 8,
    "blocks": [
      {
        "type": "warmup",
        "duration": 600,
        "instructions": "Easy warmup"
      }
    ]
  }'
```

### Submit Feedback
```bash
curl -X POST http://localhost:4000/workouts/WORKOUT_ID/feedback \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"completed":true,"effort":8,"fatigue":6}'
```

---

## 🔧 Environment Variables

Create `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/iafit"
JWT_SECRET="your_secret_here"
JWT_EXPIRES_IN="1h"
PORT=4000
```

---

## 📚 Full Documentation

- **[REST_API_DOCUMENTATION.md](./REST_API_DOCUMENTATION.md)** - Complete API docs
- **[FRONTEND_MIGRATION_PROMPT.md](./FRONTEND_MIGRATION_PROMPT.md)** - Frontend migration guide
- **[GRAPHQL_TO_REST_MAPPING.md](./GRAPHQL_TO_REST_MAPPING.md)** - Migration mapping

---

## ⚠️ Common Errors

| Status | Meaning | Solution |
|--------|---------|----------|
| 400 | Bad Request | Check request body/validation |
| 401 | Unauthorized | Check/refresh token |
| 404 | Not Found | Check ID/endpoint |
| 500 | Server Error | Check logs |

---

## ✨ TypeScript Types

```typescript
type SportType = 'running' | 'cycling' | 'swimming' | 'strength' | 'other';
type WorkoutStatus = 'pending' | 'completed' | 'skipped' | 'partial';

interface Workout {
  id: string;
  date: string;
  sportType: SportType;
  title: string;
  description?: string;
  blocks: WorkoutBlock[];
  status: WorkoutStatus;
  intensity?: number;
}

interface WorkoutBlock {
  type: string;
  duration?: number;
  distance?: number;
  targetPace?: string;
  instructions?: string;
}
```

---

## 🎊 Migration Complete!

✅ Backend: 100% REST API  
✅ 15 endpoints working  
✅ Full documentation  
✅ Ready for frontend migration  

**Next:** Migrate your frontend using `FRONTEND_MIGRATION_PROMPT.md`! 🚀
