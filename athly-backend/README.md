# Athly Backend - REST API

Backend for the Athly application using NestJS with REST API, Prisma and PostgreSQL.

## 🚀 Technologies

- **NestJS** - Node.js framework for server-side applications
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **JWT** - Authentication via JSON Web Tokens
- **TypeScript** - Static typing
- **class-validator** - Data validation

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## ⚙️ Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd athly-backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your settings:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/athly"
JWT_SECRET="your_super_secure_secret"
JWT_EXPIRES_IN="1h"
PORT=4000
```

4. Run Prisma migrations:

```bash
npm run db:migrate
```

5. (Optional) Seed the database with test data:

```bash
npm run db:seed
```

## 🏃 Running the application

### Development

```bash
npm run dev
# or
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

The API will be available at: `http://localhost:4000`

## 📚 API Documentation

See the full endpoint documentation in: [REST_API_DOCUMENTATION.md](./REST_API_DOCUMENTATION.md)

### Main Endpoints

#### Authentication

- `POST /auth/login` - User login

#### Users

- `GET /users/me` - Authenticated user data
- `PUT /users/profile` - Update profile

#### Workouts

- `GET /workouts/today` - Today's workout
- `GET /workouts/history` - Workout history
- `GET /workouts/training-plan` - Current training plan
- `PUT /workouts/:workoutId` - Update workout
- `POST /workouts/:workoutId/feedback` - Submit feedback
- `PATCH /workouts/:workoutId/complete` - Mark as complete
- `PATCH /workouts/:workoutId/skip` - Skip workout

#### Integrations

- `GET /integrations` - List integrations
- `POST /integrations/:id/connect` - Connect integration
- `DELETE /integrations/:id/disconnect` - Disconnect integration

## 🗄️ Database

### Migrations

```bash
# Create a new migration
npm run db:migrate

# View the database in Prisma Studio
npm run db:studio
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Available Scripts

```bash
npm run build        # Build the project
npm run dev          # Start in development mode
npm run start:prod   # Start in production mode
npm run lint         # Run the linter
npm run format       # Format the code
npm run db:migrate   # Run Prisma migrations
npm run db:seed      # Seed the database
npm run db:studio    # Open Prisma Studio
```

## 🔒 Authentication

The API uses JWT authentication via Bearer Token.

### Flow

1. Log in at `POST /auth/login`
2. Receive the `accessToken` and `refreshToken`
3. Use the `accessToken` in the header: `Authorization: Bearer {token}`

Example:

```javascript
const response = await fetch('http://localhost:4000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', password: 'password123' }),
});

const { accessToken } = await response.json();

// Use in subsequent requests
fetch('http://localhost:4000/users/me', {
  headers: { Authorization: `Bearer ${accessToken}` },
});
```

## 🛠️ Project Structure

```
src/
├── app.module.ts              # Main module
├── main.ts                    # Entry point
├── database/
│   ├── prisma.module.ts
│   └── prisma.service.ts
└── modules/
    ├── auth/
    │   ├── auth.controller.ts
    │   ├── auth.service.ts
    │   ├── auth.module.ts
    │   ├── decorators/
    │   ├── dto/
    │   ├── guards/
    │   └── strategies/
    ├── users/
    │   ├── users.controller.ts
    │   ├── users.service.ts
    │   ├── users.module.ts
    │   ├── dto/
    │   └── models/
    ├── workouts/
    │   ├── workouts.controller.ts
    │   ├── workouts.service.ts
    │   ├── workouts.module.ts
    │   ├── dto/
    │   └── models/
    └── integrations/
        ├── integrations.controller.ts
        ├── integrations.service.ts
        ├── integrations.module.ts
        └── models/
```

## 🔄 GraphQL to REST Migration

This project was migrated from GraphQL to REST API. If you are migrating the frontend as well, see [REST_API_DOCUMENTATION.md](./REST_API_DOCUMENTATION.md) for:

- API client implementation examples
- Complete TypeScript types
- Migration checklist
- Request/response examples

## 📝 Data Validation

The project uses `class-validator` with the following settings:

- `whitelist: true` - Removes non-decorated properties
- `forbidNonWhitelisted: true` - Rejects extra properties
- `transform: true` - Automatically transforms payloads

All DTOs have full validations. Example:

```typescript
export class LoginInput {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
```

## 🌍 CORS

CORS is enabled with:

```typescript
app.enableCors({
  origin: true,
  credentials: true,
});
```

## 🤝 Contributing

1. Create a branch: `git checkout -b feature/my-feature`
2. Commit your changes: `git commit -m 'Add my feature'`
3. Push to the branch: `git push origin feature/my-feature`
4. Open a Pull Request

## 📄 License

UNLICENSED - Private use
