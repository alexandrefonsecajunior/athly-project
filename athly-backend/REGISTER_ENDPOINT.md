# Endpoint de Registro de Usuário

## POST `/auth/register`

Cria um novo usuário no sistema com todos os dados necessários.

### Body (JSON)

```json
{
  "email": "usuario@example.com",
  "userName": "usuario123",
  "name": "Nome do Usuário",
  "password": "Senha@123",
  "confirmPassword": "Senha@123",
  "dateOfBirth": "1990-01-15",
  "weight": 75.5,
  "height": 175
}
```

### Validações

- **email**: Deve ser um email válido e único no sistema
- **userName**: Mínimo 3 caracteres, apenas letras, números, `_` e `-`, único no sistema
- **name**: Mínimo 2 caracteres
- **password**: Mínimo 8 caracteres, deve conter letras maiúsculas, minúsculas e números
- **confirmPassword**: Deve ser igual ao campo `password`
- **dateOfBirth**: Data no formato ISO (YYYY-MM-DD)
- **weight**: Número positivo (em kg)
- **height**: Número positivo (em cm)

### Resposta de Sucesso (201)

```json
{
  "user": {
    "id": "uuid-do-usuario",
    "name": "Nome do Usuário",
    "email": "usuario@example.com",
    "role": "STANDARD",
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "weight": 75.5,
    "height": 175,
    "goals": [],
    "availability": null
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "uuid-token-de-refresh"
}
```

### Erros Possíveis

#### 400 - Bad Request

Quando as senhas não coincidem:

```json
{
  "message": "As senhas não coincidem",
  "error": "Bad Request",
  "statusCode": 400
}
```

Quando há erros de validação (ex: senha muito curta, email inválido, etc):

```json
{
  "message": [
    "Senha deve ter no mínimo 8 caracteres",
    "Email inválido"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

#### 409 - Conflict

Quando o email já está cadastrado:

```json
{
  "message": "Email já cadastrado",
  "error": "Conflict",
  "statusCode": 409
}
```

Quando o username já está em uso:

```json
{
  "message": "Username já está em uso",
  "error": "Conflict",
  "statusCode": 409
}
```

## Exemplo de Uso (cURL)

```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "novo.usuario@example.com",
    "userName": "novousuario",
    "name": "Novo Usuário",
    "password": "Senha@123",
    "confirmPassword": "Senha@123",
    "dateOfBirth": "1995-06-20",
    "weight": 70,
    "height": 180
  }'
```

## Notas

- Após o registro bem-sucedido, o usuário já recebe `accessToken` e `refreshToken`, podendo fazer login imediatamente
- A senha é hash ada com bcrypt antes de ser salva no banco de dados
- O role padrão é `STANDARD`
- A data de nascimento é convertida para `DateTime` do Prisma
