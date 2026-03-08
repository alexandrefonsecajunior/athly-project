# 🎯 PROMPT PARA MIGRAÇÃO DO FRONTEND (GraphQL → REST API)

## Use este prompt com seu AI assistant no projeto do frontend:

---

Preciso migrar meu frontend de GraphQL para REST API. O backend já foi migrado e está pronto.

**Contexto:**
- Backend: NestJS REST API rodando em `http://localhost:4000`
- Frontend: [ESPECIFIQUE: React/Next.js/Vue/etc]
- Cliente GraphQL atual: [ESPECIFIQUE: Apollo Client/urql/etc]

**Arquivos de documentação do backend:**

### 1. ENDPOINTS E TIPOS

```typescript
// ========================================
// TIPOS TYPESCRIPT
// ========================================

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

// ========================================
// API CLIENT
// ========================================

const BASE_URL = 'http://localhost:4000';

class ApiClient {
  private accessToken: string | null = null;

  setToken(token: string) {
    this.accessToken = token;
  }

  clearToken() {
    this.accessToken = null;
  }

  getToken() {
    return this.accessToken;
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

  // ===== AUTH =====
  async login(email: string, password: string): Promise<AuthPayload> {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.accessToken);
    return data;
  }

  // ===== USERS =====
  async getMe(): Promise<User> {
    return this.request('/users/me');
  }

  async updateProfile(data: UpdateProfileInput): Promise<User> {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ===== WORKOUTS =====
  async getTodayWorkout(): Promise<Workout | null> {
    return this.request('/workouts/today');
  }

  async getWorkout(id: string): Promise<Workout | null> {
    return this.request(`/workouts/${id}`);
  }

  async getWorkoutHistory(): Promise<Workout[]> {
    return this.request('/workouts/history');
  }

  async getTrainingPlan(): Promise<TrainingPlan> {
    return this.request('/workouts/training-plan');
  }

  async updateWorkout(workoutId: string, data: UpdateWorkoutInput): Promise<Workout> {
    return this.request(`/workouts/${workoutId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async submitWorkoutFeedback(
    workoutId: string, 
    data: SubmitWorkoutFeedbackInput
  ): Promise<WorkoutFeedback> {
    return this.request(`/workouts/${workoutId}/feedback`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async completeWorkout(workoutId: string): Promise<Workout> {
    return this.request(`/workouts/${workoutId}/complete`, {
      method: 'PATCH',
    });
  }

  async skipWorkout(workoutId: string): Promise<Workout> {
    return this.request(`/workouts/${workoutId}/skip`, {
      method: 'PATCH',
    });
  }

  // ===== INTEGRATIONS =====
  async getIntegrations(): Promise<Integration[]> {
    return this.request('/integrations');
  }

  async connectIntegration(integrationId: string): Promise<Integration> {
    return this.request(`/integrations/${integrationId}/connect`, {
      method: 'POST',
    });
  }

  async disconnectIntegration(integrationId: string): Promise<Integration> {
    return this.request(`/integrations/${integrationId}/disconnect`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();
```

### 2. ENDPOINTS DO BACKEND

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/auth/login` | Login do usuário | Não |
| GET | `/users/me` | Dados do usuário atual | Sim |
| PUT | `/users/profile` | Atualizar perfil | Sim |
| GET | `/workouts/today` | Treino de hoje | Sim |
| GET | `/workouts/:id` | Buscar treino por ID | Sim |
| GET | `/workouts/history` | Histórico de treinos | Sim |
| GET | `/workouts/training-plan` | Plano de treino atual | Sim |
| PUT | `/workouts/:workoutId` | Atualizar treino | Sim |
| POST | `/workouts/:workoutId/feedback` | Enviar feedback | Sim |
| PATCH | `/workouts/:workoutId/complete` | Marcar como completo | Sim |
| PATCH | `/workouts/:workoutId/skip` | Pular treino | Sim |
| GET | `/integrations` | Listar integrações | Sim |
| POST | `/integrations/:id/connect` | Conectar integração | Sim |
| DELETE | `/integrations/:id/disconnect` | Desconectar integração | Sim |

### 3. AUTENTICAÇÃO

Todos os endpoints (exceto `/auth/login`) requerem o header:
```
Authorization: Bearer {accessToken}
```

Fluxo:
1. Login → recebe `accessToken` e `refreshToken`
2. Armazenar `accessToken` (localStorage/state)
3. Incluir em todas as requisições

---

## 📋 TAREFAS PARA VOCÊ EXECUTAR:

1. **Remover dependências GraphQL:**
   - Desinstalar cliente GraphQL (Apollo/urql/etc)
   - Remover configurações do cliente GraphQL

2. **Criar estrutura de API:**
   - Criar arquivo `src/lib/api.ts` com o ApiClient acima
   - Criar arquivo `src/types/api.ts` com todos os tipos acima

3. **Substituir queries/mutations GraphQL:**
   - Identificar TODOS os arquivos que usam GraphQL
   - Substituir por chamadas REST usando o `api` client
   - Atualizar imports

4. **Atualizar autenticação:**
   - Modificar sistema de auth para usar REST
   - Garantir que token é armazenado e usado corretamente
   - Implementar logout (limpar token)

5. **Testar todas as funcionalidades:**
   - Login/logout
   - Todas as telas que consomem dados
   - Loading states
   - Error handling

6. **Limpar código:**
   - Remover queries/mutations GraphQL antigas
   - Remover imports GraphQL não usados
   - Atualizar package.json

---

## ⚠️ PONTOS DE ATENÇÃO:

1. **Datas**: Backend retorna strings no formato `YYYY-MM-DD`
2. **IDs**: Todos são UUIDs v4
3. **Enums**: Usar exatamente os valores dos tipos definidos
4. **Validação**: Backend valida todos os campos - erros 400 com detalhes
5. **Erro 401**: Token inválido/expirado - redirecionar para login
6. **CORS**: Já configurado no backend

---

## 🎯 RESULTADO ESPERADO:

Ao final, quero:
- ✅ Frontend funcionando 100% com REST API
- ✅ Sem dependências GraphQL
- ✅ Autenticação funcionando
- ✅ Todos os endpoints testados
- ✅ Error handling adequado
- ✅ Loading states funcionando

---

**COMECE AGORA:**

Analise o código do meu frontend, identifique todos os lugares que usam GraphQL e me proponha um plano de migração passo a passo. Depois, execute a migração completa.
