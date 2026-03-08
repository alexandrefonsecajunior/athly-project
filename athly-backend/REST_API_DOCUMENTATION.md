# IAFit Backend - REST API Documentation

## Base URL
```
http://localhost:4000
```

---

## 🔐 Authentication

### Login
Autentica um usuário e retorna tokens JWT.

**Endpoint:** `POST /auth/login`

**Headers:**
```json
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "name": "Nome do Usuário",
    "email": "user@example.com",
    "goals": ["perder_peso", "ganhar_massa"],
    "availability": 3
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validações:**
- `email`: deve ser um email válido
- `password`: mínimo de 4 caracteres

---

## 👤 Users

Todos os endpoints de usuários requerem autenticação via Bearer Token.

### Get Current User
Retorna os dados do usuário autenticado.

**Endpoint:** `GET /users/me`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "name": "Nome do Usuário",
  "email": "user@example.com",
  "goals": ["perder_peso", "ganhar_massa"],
  "availability": 3
}
```

---

### Update Profile
Atualiza o perfil do usuário autenticado.

**Endpoint:** `PUT /users/profile`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Request Body:** (todos os campos são opcionais)
```json
{
  "name": "Novo Nome",
  "email": "novoemail@example.com",
  "goals": ["perder_peso", "ganhar_resistencia"],
  "availability": 5
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "name": "Novo Nome",
  "email": "novoemail@example.com",
  "goals": ["perder_peso", "ganhar_resistencia"],
  "availability": 5
}
```

**Validações:**
- `name`: mínimo de 2 caracteres
- `email`: deve ser um email válido
- `availability`: número inteiro >= 0

---

## 🏋️ Workouts

Todos os endpoints de workouts requerem autenticação via Bearer Token.

### Get Today's Workout
Retorna o treino do dia atual.

**Endpoint:** `GET /workouts/today`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "date": "2026-02-15",
  "sportType": "running",
  "title": "Treino de Corrida Intervalado",
  "description": "Treino focado em velocidade",
  "blocks": [
    {
      "type": "warmup",
      "duration": 600,
      "distance": null,
      "targetPace": "6:00",
      "instructions": "Aquecimento leve"
    },
    {
      "type": "interval",
      "duration": 300,
      "distance": 1000,
      "targetPace": "4:30",
      "instructions": "Corrida intensa"
    }
  ],
  "status": "pending",
  "intensity": 7
}
```

**Possíveis valores de `sportType`:**
- `running`
- `cycling`
- `swimming`
- `strength`
- `other`

**Possíveis valores de `status`:**
- `pending`
- `completed`
- `skipped`
- `partial`

---

### Get Workout by ID
Retorna um treino específico.

**Endpoint:** `GET /workouts/:id`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Path Parameters:**
- `id`: UUID do treino

**Response:** `200 OK` (mesmo formato do endpoint anterior)

---

### Get Workout History
Retorna o histórico de treinos do usuário.

**Endpoint:** `GET /workouts/history`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "date": "2026-02-14",
    "sportType": "running",
    "title": "Treino Long Run",
    "description": "Corrida longa e leve",
    "blocks": [...],
    "status": "completed",
    "intensity": 5
  },
  {
    "id": "uuid",
    "date": "2026-02-13",
    "sportType": "strength",
    "title": "Treino de Força",
    "description": null,
    "blocks": [...],
    "status": "completed",
    "intensity": 8
  }
]
```

---

### Get Current Training Plan
Retorna o plano de treino atual do usuário.

**Endpoint:** `GET /workouts/training-plan`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "startDate": "2026-02-10",
  "weeks": [
    {
      "number": 1,
      "workouts": [
        {
          "id": "uuid",
          "date": "2026-02-10",
          "sportType": "running",
          "title": "Treino Fácil",
          "blocks": [...],
          "status": "completed",
          "intensity": 3
        }
      ]
    },
    {
      "number": 2,
      "workouts": [...]
    }
  ]
}
```

---

### Update Workout
Atualiza os dados de um treino.

**Endpoint:** `PUT /workouts/:workoutId`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Path Parameters:**
- `workoutId`: UUID do treino

**Request Body:** (todos os campos são opcionais)
```json
{
  "title": "Novo Título",
  "description": "Nova descrição",
  "blocks": [
    {
      "type": "warmup",
      "duration": 600,
      "distance": 1000,
      "targetPace": "6:00",
      "instructions": "Aquecimento"
    }
  ],
  "intensity": 8,
  "status": "completed",
  "sportType": "running",
  "date": "2026-02-16"
}
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "date": "2026-02-16",
  "sportType": "running",
  "title": "Novo Título",
  "description": "Nova descrição",
  "blocks": [...],
  "status": "completed",
  "intensity": 8
}
```

**Validações:**
- `intensity`: número inteiro entre 1 e 10
- `status`: deve ser um dos valores do enum WorkoutStatus
- `sportType`: deve ser um dos valores do enum SportType
- `blocks`: array de objetos com validação nested
  - `type`: string obrigatória
  - `duration`: inteiro opcional
  - `distance`: número opcional
  - `targetPace`: string opcional
  - `instructions`: string opcional

---

### Submit Workout Feedback
Envia feedback sobre um treino realizado.

**Endpoint:** `POST /workouts/:workoutId/feedback`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Path Parameters:**
- `workoutId`: UUID do treino

**Request Body:**
```json
{
  "completed": true,
  "effort": 8,
  "fatigue": 6
}
```

**Response:** `200 OK`
```json
{
  "workoutId": "uuid",
  "completed": true,
  "effort": 8,
  "fatigue": 6
}
```

**Validações:**
- `completed`: boolean obrigatório
- `effort`: inteiro entre 1 e 10
- `fatigue`: inteiro entre 1 e 10

---

### Complete Workout
Marca um treino como completo.

**Endpoint:** `PATCH /workouts/:workoutId/complete`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Path Parameters:**
- `workoutId`: UUID do treino

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "date": "2026-02-15",
  "sportType": "running",
  "title": "Treino de Corrida",
  "blocks": [...],
  "status": "completed",
  "intensity": 7
}
```

---

### Skip Workout
Marca um treino como pulado.

**Endpoint:** `PATCH /workouts/:workoutId/skip`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Path Parameters:**
- `workoutId`: UUID do treino

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "date": "2026-02-15",
  "sportType": "running",
  "title": "Treino de Corrida",
  "blocks": [...],
  "status": "skipped",
  "intensity": 7
}
```

---

## 🔗 Integrations

Todos os endpoints de integrações requerem autenticação via Bearer Token.

### Get All Integrations
Lista todas as integrações disponíveis e seu status de conexão.

**Endpoint:** `GET /integrations`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "Strava",
    "icon": "strava-icon-url",
    "connected": true,
    "type": "strava"
  },
  {
    "id": "uuid",
    "name": "Garmin",
    "icon": "garmin-icon-url",
    "connected": false,
    "type": "garmin"
  }
]
```

**Possíveis valores de `type`:**
- `strava`
- `garmin`
- `polar`
- `apple_health`
- `google_fit`

---

### Connect Integration
Conecta uma integração para o usuário.

**Endpoint:** `POST /integrations/:integrationId/connect`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Path Parameters:**
- `integrationId`: UUID da integração

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "name": "Strava",
  "icon": "strava-icon-url",
  "connected": true,
  "type": "strava"
}
```

---

### Disconnect Integration
Desconecta uma integração do usuário.

**Endpoint:** `DELETE /integrations/:integrationId/disconnect`

**Headers:**
```json
{
  "Authorization": "Bearer {accessToken}",
  "Content-Type": "application/json"
}
```

**Path Parameters:**
- `integrationId`: UUID da integração

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "name": "Strava",
  "icon": "strava-icon-url",
  "connected": false,
  "type": "strava"
}
```

---

## 🔒 Authentication Flow

### Como autenticar requisições:

1. **Fazer login:**
   ```javascript
   const response = await fetch('http://localhost:4000/auth/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, password })
   });
   const { accessToken } = await response.json();
   ```

2. **Usar o token nas requisições:**
   ```javascript
   const response = await fetch('http://localhost:4000/users/me', {
     headers: {
       'Authorization': `Bearer ${accessToken}`,
       'Content-Type': 'application/json'
     }
   });
   ```

3. **Armazenar o token:**
   - Armazene o `accessToken` no localStorage, sessionStorage, ou em um state manager
   - Armazene o `refreshToken` de forma segura (httpOnly cookie é preferível)

---

## ⚠️ Error Responses

Todos os endpoints podem retornar os seguintes erros:

### 400 Bad Request
Requisição inválida (validação falhou).

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 4 characters"
  ],
  "error": "Bad Request"
}
```

### 401 Unauthorized
Token inválido ou ausente.

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 404 Not Found
Recurso não encontrado.

```json
{
  "statusCode": 404,
  "message": "Workout not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
Erro interno do servidor.

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## 🚀 Exemplo de Implementação (Frontend)

### Service/API Client Exemplo:

```typescript
// api.ts
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
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
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

  async updateProfile(data: UpdateProfileInput) {
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

  async updateWorkout(workoutId: string, data: UpdateWorkoutInput) {
    return this.request(`/workouts/${workoutId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async submitWorkoutFeedback(workoutId: string, data: SubmitWorkoutFeedbackInput) {
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

---

## 📝 TypeScript Types

```typescript
// types.ts

export type SportType = 'running' | 'cycling' | 'swimming' | 'strength' | 'other';
export type WorkoutStatus = 'pending' | 'completed' | 'skipped' | 'partial';
export type IntegrationType = 'strava' | 'garmin' | 'polar' | 'apple_health' | 'google_fit';

export interface User {
  id: string;
  name: string;
  email: string;
  goals?: string[];
  availability?: number | null;
}

export interface AuthPayload {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface WorkoutBlock {
  type: string;
  duration?: number;
  distance?: number;
  targetPace?: string;
  instructions?: string;
}

export interface Workout {
  id: string;
  date: string;
  sportType: SportType;
  title: string;
  description?: string;
  blocks: WorkoutBlock[];
  status: WorkoutStatus;
  intensity?: number;
}

export interface Week {
  number: number;
  workouts: Workout[];
}

export interface TrainingPlan {
  id: string;
  startDate: string;
  weeks: Week[];
}

export interface WorkoutFeedback {
  workoutId: string;
  completed: boolean;
  effort: number;
  fatigue: number;
}

export interface Integration {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  type: IntegrationType;
}

export interface UpdateProfileInput {
  name?: string;
  email?: string;
  goals?: string[];
  availability?: number;
}

export interface UpdateWorkoutInput {
  title?: string;
  description?: string;
  blocks?: WorkoutBlock[];
  intensity?: number;
  status?: WorkoutStatus;
  sportType?: SportType;
  date?: string;
}

export interface SubmitWorkoutFeedbackInput {
  completed: boolean;
  effort: number;
  fatigue: number;
}
```

---

## 🎯 Migration Checklist para o Frontend

- [ ] Remover cliente GraphQL (Apollo Client, urql, etc.)
- [ ] Remover todas as queries e mutations GraphQL
- [ ] Implementar o ApiClient acima ou similar
- [ ] Substituir todas as chamadas GraphQL por chamadas REST
- [ ] Atualizar imports e tipos
- [ ] Testar autenticação (login e token management)
- [ ] Testar todos os endpoints de usuário
- [ ] Testar todos os endpoints de workouts
- [ ] Testar todos os endpoints de integrações
- [ ] Atualizar testes unitários/integração
- [ ] Remover dependências GraphQL do package.json

---

## 📌 Notas Importantes

1. **CORS**: O backend está configurado com `origin: true` e `credentials: true`, então requisições com credenciais são permitidas.

2. **Validation Pipe**: O backend usa `ValidationPipe` com:
   - `whitelist: true` - Remove propriedades não decoradas
   - `forbidNonWhitelisted: true` - Rejeita propriedades não permitidas
   - `transform: true` - Transforma payloads em instâncias de DTO

3. **Porta**: O servidor roda na porta 4000 (ou `process.env.PORT`)

4. **Enums**: Todos os enums vêm do Prisma e devem coincidir exatamente com os valores esperados

5. **Datas**: São enviadas/recebidas como strings no formato `YYYY-MM-DD`

6. **UUIDs**: Todos os IDs são UUIDs v4
