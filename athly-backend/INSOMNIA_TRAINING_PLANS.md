# Configurando os endpoints de Training Plans no Insomnia

Este guia explica como usar os novos endpoints de **Training Plans** (planos de treino) na collection do Insomnia do IAFit Backend.

## Pré-requisitos

- Backend rodando (ex.: `npm run dev` com `base_url` apontando para ele, ex.: `http://localhost:4000`).
- Usuário autenticado: faça **Login** (em 🔐 Authentication) e use o `access_token` retornado no ambiente.

## Variáveis de ambiente

No **Base Environment** (ou no ambiente que você usa), certifique-se de ter:

| Variável          | Descrição                                      | Exemplo                          |
|-------------------|------------------------------------------------|----------------------------------|
| `base_url`        | URL base da API                                | `http://localhost:4000`          |
| `access_token`    | Token JWT obtido no Login                      | (preenchido após o login)        |
| `training_plan_id`| ID do plano de treino (para Get by ID, Update, Delete) | (preenchido após Create ou Get Me) |

**Como preencher o `access_token`:**  
Após executar **Login**, copie o campo `accessToken` da resposta e cole em `access_token` no ambiente, ou use um script de resposta no Insomnia para definir isso automaticamente.

**Como preencher o `training_plan_id`:**  
Após **Create Training Plan** ou **Get My Training Plan**, copie o `id` do plano retornado e cole em `training_plan_id` no ambiente.

---

## Pasta no Insomnia: 📋 Training Plans

A collection já inclui a pasta **📋 Training Plans** com os 5 requests abaixo.

### 1. Get My Training Plan

- **Método:** `GET`
- **URL:** `{{ _.base_url }}/training-plans/me`
- **Autenticação:** Bearer Token → `{{ _.access_token }}`
- **Corpo:** nenhum

Retorna o plano de treino do usuário autenticado. Se não existir plano, a resposta é `null` (ou 200 com body vazio/null, conforme implementação).

---

### 2. Get Training Plan by ID

- **Método:** `GET`
- **URL:** `{{ _.base_url }}/training-plans/{{ _.training_plan_id }}`
- **Autenticação:** Bearer Token → `{{ _.access_token }}`
- **Corpo:** nenhum

Retorna o plano cujo `id` é o `training_plan_id` do ambiente, desde que pertença ao usuário autenticado.

**Configuração:** defina `training_plan_id` no ambiente com o ID retornado em **Get My Training Plan** ou **Create Training Plan**.

---

### 3. Create Training Plan

- **Método:** `POST`
- **URL:** `{{ _.base_url }}/training-plans`
- **Autenticação:** Bearer Token → `{{ _.access_token }}`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**

```json
{
  "startDate": "2026-02-28",
  "weeks": {
    "1": {
      "number": 1,
      "workouts": []
    }
  }
}
```

- **Campos:**
  - `startDate` (obrigatório): data de início do plano (string, ex.: `"YYYY-MM-DD"`).
  - `weeks` (obrigatório): objeto JSON com a estrutura das semanas (ex.: chaves por número de semana e conteúdo livre).

**Regra:** cada usuário pode ter apenas **um** plano. Se já existir plano, a API retorna **409 Conflict**.

Após criar, use o `id` da resposta para preencher `training_plan_id` no ambiente.

---

### 4. Update Training Plan

- **Método:** `PUT`
- **URL:** `{{ _.base_url }}/training-plans/{{ _.training_plan_id }}`
- **Autenticação:** Bearer Token → `{{ _.access_token }}`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):** todos os campos são opcionais.

Exemplo:

```json
{
  "startDate": "2026-03-01",
  "weeks": {
    "1": { "number": 1, "workouts": [] },
    "2": { "number": 2, "workouts": [] }
  }
}
```

Só o plano do usuário autenticado pode ser atualizado. Se o `id` não existir ou não for do usuário, a API retorna **404 Not Found**.

---

### 5. Delete Training Plan

- **Método:** `DELETE`
- **URL:** `{{ _.base_url }}/training-plans/{{ _.training_plan_id }}`
- **Autenticação:** Bearer Token → `{{ _.access_token }}`
- **Corpo:** nenhum

Remove o plano cujo ID é `training_plan_id`. O plano deve pertencer ao usuário autenticado. Em sucesso, a resposta é 200 sem body (ou 204, conforme implementação).

---

## Ordem sugerida para testar

1. **Login** (Auth) → copiar `accessToken` para `access_token`.
2. **Get My Training Plan** → ver se já existe plano (ou null).
3. Se não existir: **Create Training Plan** → copiar `id` para `training_plan_id`.
4. **Get Training Plan by ID** → conferir o mesmo plano.
5. **Update Training Plan** → alterar `startDate` ou `weeks` e conferir a resposta.
6. **Delete Training Plan** (opcional) → em seguida **Get My Training Plan** deve voltar null.

---

## Importando a collection

Se você estiver configurando do zero:

1. Abra o Insomnia.
2. **Application** → **Preferences** → **Data** ou use **Import/Export**.
3. Importe o arquivo `insomnia-collection.json` do projeto.
4. A pasta **📋 Training Plans** e os 5 requests aparecerão na workspace **IAFit Backend - REST API**.
5. Selecione o ambiente (ex.: **Development**) e preencha `base_url` e, após o login, `access_token`.

Os endpoints de Training Plans usam a mesma base URL e o mesmo token que o resto da API; não é necessária nenhuma configuração extra além do token e do `training_plan_id` quando for usar Get by ID, Update ou Delete.
