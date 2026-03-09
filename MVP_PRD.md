# Athly MVP PRD — Strava + IA

## Vision & Objetivos

Athly é um personal trainer inteligente que aprende com o histórico real de treinos do atleta (via Strava) e gera planos semanais personalizados usando IA (Claude da Anthropic). O MVP valida o loop completo: **conectar → sincronizar → gerar → exibir → repetir**.

**Objetivos do MVP:**
- Autenticar o usuário com Strava via OAuth 2.0
- Sincronizar atividades recentes do Strava como `Workout` com `status: done`
- Gerar plano de treino semanal personalizado usando Claude com contexto real
- Exibir o plano gerado no frontend (PlanPage e CalendarPage)
- Regenerar automaticamente o plano a cada semana via cron job

---

## Escopo do MVP — 6 Etapas do Roadmap

| # | Etapa | Descrição |
|---|-------|-----------|
| 1 | **Strava OAuth** | Fluxo OAuth 2.0: frontend redireciona, backend processa callback e salva tokens |
| 2 | **Salvar atividades** | Buscar atividades recentes via Strava API e mapear para model `Workout` |
| 3 | **Preferências do usuário** | Garantir que `goals`, `availability`, `weight`, `sports` estão preenchidos |
| 4 | **Gerar treino com IA** | Enviar histórico + preferências para Claude → retornar plano estruturado |
| 5 | **Retornar plano em JSON** | Endpoint retorna `WeeklyGoal` com array de `Workout` em JSON validado |
| 6 | **Loop semanal automático** | Cron job NestJS executa toda segunda-feira e regenera o plano |

---

## Fluxo Completo

```
[Frontend]                          [Backend]                        [Externo]
    |                                   |                                |
    |-- Click "Conectar Strava" -------> redirect para Strava OAuth -------->|
    |                                   |                          Strava Auth
    |<-- redirect /integrations/strava/callback?code=xxx <------------------|
    |                                   |
    |                    POST /integrations/strava/callback
    |                    troca code por access_token + refresh_token
    |                    salva Integration com tokens e stravaAthleteId
    |                    dispara sync de atividades recentes
    |                                   |
    |                    GET /strava/activities (últimas 30 dias)
    |                    mapeia Activity -> Workout (status: done)
    |                                   |
    |-- POST /training-plans/generate ->|
    |                    lê User.goals, User.availability, User.sports
    |                    lê últimos 30 Workouts do usuário
    |                    monta prompt para Claude
    |                    Claude retorna JSON com plano semanal
    |                    salva WeeklyGoal + Workouts (status: scheduled)
    |<-- retorna TrainingPlan com WeeklyGoals |
    |                                   |
    |  [Cron - toda segunda-feira]      |
    |                    repete geração para todos os usuários com autoGenerate: true
```

---

## Requisitos por Módulo

### Backend

#### Módulo `integrations` (existente — expandir)
- `GET /integrations/strava/auth` — retorna URL de autorização OAuth do Strava
- `POST /integrations/strava/callback` — recebe `code`, troca por tokens, salva na `Integration`, dispara sync
- `GET /integrations` — lista integrações do usuário (já existente)
- Lógica de refresh do token quando expirado

#### Módulo `strava` (novo)
- `StravaService.syncActivities(userId)` — busca atividades dos últimos 30 dias via `https://www.strava.com/api/v3/athlete/activities`
- Mapear `Activity` do Strava para `Workout` com `status: done`, `sportType`, `title`, `dateScheduled`, `blocks` (detalhes da atividade em JSON)
- Evitar duplicatas usando `stravaActivityId`

#### Módulo `ai` (novo)
- `AiService.generateWeeklyPlan(userId)` — monta prompt com histórico + preferências e chama Claude
- Usar `@anthropic-ai/sdk` com model `claude-sonnet-4-6`
- Retornar JSON validado com estrutura `WeeklyGoal + Workout[]`
- Prompt deve incluir: esportes, objetivos, disponibilidade semanal (dias), histórico recente de treinos, equipamentos

#### Módulo `training-plans` (existente — expandir)
- `POST /training-plans/generate` — endpoint que dispara geração via `AiService`
- Endpoint admin/manual `POST /training-plans/cron-trigger` para testar loop semanal

#### Cron Job
- Registrado no `AppModule` com `@nestjs/schedule`
- Roda toda segunda-feira às 06:00 (`0 6 * * 1`)
- Busca todos os `TrainingPlan` com `autoGenerate: true`
- Chama `AiService.generateWeeklyPlan(userId)` para cada um

---

### Frontend

#### SettingsPage (existente — expandir)
- Botão "Conectar Strava" que chama `integrationService.initiateStravaOAuth()`
- Exibe status de conexão (conectado/desconectado) com ícone Strava
- Feedback visual após OAuth bem-sucedido (toast ou badge)

#### PlanPage / TrainingPlanCalendarPage (existente — expandir)
- Exibir workouts gerados pela IA com distinção visual de workouts manuais vs. gerados por IA vs. sincronizados do Strava
- Badge ou tag indicando origem do workout

#### integrationService.ts (existente — expandir)
- `initiateStravaOAuth()` — redireciona para `GET /integrations/strava/auth`
- `handleStravaCallback(code)` — chama `POST /integrations/strava/callback`
- `getIntegrationStatus()` — verifica se Strava está conectado

---

## Mudanças no Schema Prisma

### `Integration` — adicionar campos OAuth

```prisma
model Integration {
  id               String          @id
  name             String
  icon             String
  connected        Boolean
  type             IntegrationType
  accessToken      String?         @map("access_token")
  refreshToken     String?         @map("refresh_token")
  tokenExpiresAt   DateTime?       @map("token_expires_at")
  stravaAthleteId  String?         @map("strava_athlete_id")

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String @map("user_id")

  @@map("integrations")
}
```

### `Workout` — adicionar stravaActivityId

```prisma
model Workout {
  // ... campos existentes ...
  stravaActivityId String? @unique @map("strava_activity_id")
  // ...
}
```

---

## Stack de IA

| Item | Detalhe |
|------|---------|
| Provedor | Anthropic Claude |
| SDK | `@anthropic-ai/sdk` |
| Model | `claude-sonnet-4-6` |
| Modo | `messages.create` com `system` prompt + `user` message |
| Output | JSON estruturado com `WeeklyGoal` e array de `Workout` |
| Fallback | Se Claude falhar, retornar erro 503 com mensagem clara |

### Estrutura do Prompt

**System prompt:** Define Claude como personal trainer especialista, instrui para retornar JSON válido no schema do Athly.

**User message:** Inclui:
- Perfil do atleta (esportes, objetivos, disponibilidade em dias/semana, peso, altura, equipamentos)
- Histórico dos últimos 30 dias (data, tipo, duração, distância, intensidade)
- Semana alvo (data de início)

**Resposta esperada:**
```json
{
  "weekStartDate": "2026-03-09",
  "weekEndDate": "2026-03-15",
  "metrics": { "targetVolume": 5, "targetDistance": 30 },
  "workouts": [
    {
      "dateScheduled": "2026-03-10",
      "sportType": "running",
      "title": "Corrida leve de recuperação",
      "description": "Ritmo conversacional, 5km",
      "intensity": 3,
      "blocks": [{ "type": "warmup", "duration": 10 }, { "type": "main", "duration": 30 }]
    }
  ]
}
```

---

## Variáveis de Ambiente

### Backend (`athly-backend/.env`)
```
STRAVA_CLIENT_ID=
STRAVA_CLIENT_SECRET=
STRAVA_REDIRECT_URI=http://localhost:3000/integrations/strava/callback
ANTHROPIC_API_KEY=
```

### Frontend (`athly-frontend/.env`)
```
VITE_STRAVA_CLIENT_ID=
VITE_STRAVA_REDIRECT_URI=http://localhost:5173/oauth/strava/callback
```

---

## Critérios de Aceite por Feature

### 1. Strava OAuth
- [ ] Clicar "Conectar Strava" redireciona para `accounts.strava.com/oauth/authorize`
- [ ] Após autorizar, `Integration.connected` vira `true` no banco
- [ ] `accessToken`, `refreshToken`, `tokenExpiresAt`, `stravaAthleteId` são salvos
- [ ] Token expirado é renovado automaticamente antes de chamadas à API

### 2. Sincronização de Atividades
- [ ] Após OAuth, as atividades dos últimos 30 dias são buscadas e salvas como `Workout`
- [ ] `stravaActivityId` previne duplicatas em syncs subsequentes
- [ ] `sportType` é mapeado corretamente do tipo Strava para o enum local
- [ ] `status` das atividades sincronizadas é `done`

### 3. Preferências do Usuário
- [ ] `User.goals` (array), `User.availability` (dias/semana) e `TrainingPlan.sports` estão acessíveis
- [ ] Frontend exibe formulário de preferências se campos estiverem vazios
- [ ] Dados de preferências chegam corretamente no prompt do Claude

### 4. Geração de Plano com IA
- [ ] `POST /training-plans/generate` retorna `WeeklyGoal` com `Workout[]` em menos de 30s
- [ ] Plano respeita `availability` (não gera mais treinos que os dias disponíveis)
- [ ] Plano considera esportes preferidos do usuário
- [ ] Em caso de falha da IA, endpoint retorna erro claro (não 500 genérico)

### 5. Retorno em JSON
- [ ] Resposta do Claude é parseada e validada antes de persistir
- [ ] `Workout.blocks` contém estrutura JSON válida
- [ ] `WeeklyGoal.metrics` contém pelo menos `targetVolume`

### 6. Loop Semanal
- [ ] Cron roda toda segunda-feira e gera plano para usuários com `autoGenerate: true`
- [ ] Endpoint `POST /training-plans/cron-trigger` permite testar manualmente
- [ ] Erros no cron são logados sem interromper os outros usuários

### 7. Frontend
- [ ] PlanPage exibe workouts gerados com distinção visual
- [ ] CalendarPage mostra workouts Strava (done) e IA (scheduled) no mesmo calendário
- [ ] Status de conexão Strava é visível nas configurações
