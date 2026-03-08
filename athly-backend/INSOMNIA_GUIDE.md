# 🚀 Como Usar a Collection do Insomnia

## 📥 Importar a Collection

1. Abra o **Insomnia**
2. Clique em **Application** → **Preferences** → **Data** → **Import Data**
3. Selecione o arquivo `insomnia-collection.json`
4. Pronto! A collection "IAFit Backend - REST API" estará disponível

---

## 🎯 Collection Importada

A collection contém:

### 📁 **Estrutura:**
- 🔐 **Authentication** (1 endpoint)
  - Login
  
- 👤 **Users** (2 endpoints)
  - Get Current User
  - Update Profile
  
- 🏋️ **Workouts** (8 endpoints)
  - Get Today's Workout
  - Get Workout by ID
  - Get Workout History
  - Get Training Plan
  - Update Workout
  - Submit Workout Feedback
  - Complete Workout
  - Skip Workout
  
- 🔗 **Integrations** (3 endpoints)
  - List Integrations
  - Connect Integration
  - Disconnect Integration

**Total: 14 requests prontos para usar!**

---

## 🌍 Ambientes Configurados

A collection vem com 2 ambientes pré-configurados:

### 1. **Development** (padrão)
```json
{
  "base_url": "http://localhost:4000"
}
```

### 2. **Production**
```json
{
  "base_url": "https://api.iafit.com"
}
```

Para trocar entre ambientes:
1. Clique no dropdown de ambiente no canto superior esquerdo
2. Selecione "Development" ou "Production"

---

## 🔧 Variáveis de Ambiente

A collection usa as seguintes variáveis:

| Variável | Descrição | Como preencher |
|----------|-----------|----------------|
| `base_url` | URL base da API | Já configurado |
| `access_token` | Token JWT de autenticação | Após fazer login |
| `workout_id` | ID de um treino | Copiar de uma resposta |
| `integration_id` | ID de uma integração | Copiar de uma resposta |

---

## 🚀 Como Testar (Passo a Passo)

### 1️⃣ **Fazer Login**

1. Abra o endpoint **🔐 Authentication → Login**
2. Clique em **Send**
3. Você receberá uma resposta com:
   ```json
   {
     "user": {...},
     "accessToken": "eyJhbGciOiJIUzI1...",
     "refreshToken": "eyJhbGciOiJIUzI1..."
   }
   ```
4. **Copie o `accessToken`** da resposta

### 2️⃣ **Configurar o Token**

1. Clique no ícone de **engrenagem** (⚙️) ao lado do nome do ambiente
2. No campo `access_token`, **cole** o token copiado
3. Clique em **Done**

Pronto! Agora todos os endpoints autenticados usarão automaticamente o token.

### 3️⃣ **Testar Endpoints Autenticados**

Agora você pode testar qualquer endpoint:

- **Get Current User**: `GET /users/me`
- **Get Today's Workout**: `GET /workouts/today`
- **Get Workout History**: `GET /workouts/history`
- etc.

Todos já estão configurados para usar o token automaticamente via `{{ _.access_token }}`.

### 4️⃣ **Testar Update de Workout**

1. Primeiro, pegue um ID de treino:
   - Rode **Get Today's Workout** ou **Get Workout History**
   - Copie o campo `id` de um treino

2. Configure a variável:
   - Clique no ícone de **engrenagem** (⚙️)
   - No campo `workout_id`, **cole** o ID do treino
   - Clique em **Done**

3. Agora você pode testar:
   - **Update Workout**: `PUT /workouts/{{ _.workout_id }}`
   - **Complete Workout**: `PATCH /workouts/{{ _.workout_id }}/complete`
   - **Skip Workout**: `PATCH /workouts/{{ _.workout_id }}/skip`
   - **Submit Feedback**: `POST /workouts/{{ _.workout_id }}/feedback`

---

## 💡 Dicas Úteis

### ✅ Todos os requests já vêm com:
- ✓ Headers corretos (`Content-Type: application/json`)
- ✓ Autenticação configurada (Bearer Token)
- ✓ Body com exemplos válidos
- ✓ Variáveis de ambiente prontas

### 🔄 Como usar variáveis:
- Use `{{ _.base_url }}` para a URL base
- Use `{{ _.access_token }}` para o token
- Use `{{ _.workout_id }}` para IDs de treino
- Use `{{ _.integration_id }}` para IDs de integração

### 📝 Editando Requests:
Você pode editar qualquer body de exemplo:
1. Clique em um request
2. Vá na aba **Body**
3. Edite o JSON conforme necessário
4. Clique em **Send**

---

## 🧪 Exemplo de Fluxo de Teste Completo

```bash
1. Login
   POST /auth/login
   → Copiar accessToken

2. Configurar token no ambiente
   → Colar no campo access_token

3. Testar endpoints
   GET /users/me
   GET /workouts/today
   GET /workouts/history
   GET /workouts/training-plan

4. Pegar ID de um treino
   → Copiar id de algum treino
   → Configurar workout_id no ambiente

5. Testar operações no treino
   PUT /workouts/:workoutId
   POST /workouts/:workoutId/feedback
   PATCH /workouts/:workoutId/complete

6. Testar integrações
   GET /integrations
   → Copiar id de uma integração
   → Configurar integration_id
   POST /integrations/:integrationId/connect
```

---

## ⚠️ Troubleshooting

### Erro 401 (Unauthorized)
- Verifique se você fez login
- Verifique se copiou o `accessToken` corretamente
- Verifique se configurou a variável `access_token` no ambiente
- Tente fazer login novamente (token pode ter expirado)

### Erro 400 (Bad Request)
- Verifique o body do request
- Veja a mensagem de erro na resposta
- Compare com os exemplos da documentação

### Erro 404 (Not Found)
- Verifique se o ID está correto
- Verifique se configurou a variável correta no ambiente
- Verifique se o recurso existe no banco

### Connection Refused
- Verifique se o servidor está rodando (`npm run dev`)
- Verifique se a porta está correta (4000)
- Verifique o ambiente selecionado

---

## 📚 Documentação Completa

Para mais detalhes sobre cada endpoint:
- **[REST_API_DOCUMENTATION.md](./REST_API_DOCUMENTATION.md)** - Documentação completa
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Referência rápida

---

## 🎉 Pronto!

Agora você pode testar toda a API do IAFit Backend diretamente no Insomnia!

**Dica:** Salve suas variáveis (tokens, IDs) no ambiente para não precisar copiar/colar toda vez.
