# Athly - AI-Powered Workout Planning

Full-stack application for AI-generated workout planning: React frontend and NestJS REST API backend.

## Repository structure

| Package           | Description                    |
|-------------------|--------------------------------|
| [athly-frontend](./athly-frontend) | React + Vite app (mocked, ready for API) |
| [athly-backend](./athly-backend)   | NestJS REST API + Prisma + PostgreSQL    |

## Prerequisites

- **Node.js** 18+
- **PostgreSQL** 14+ (for backend)
- **npm** or **yarn**

## Quick start

### Backend

```bash
cd athly-backend
cp .env.example .env
# Edit .env (DATABASE_URL, JWT_SECRET, etc.)
npm install
npm run db:migrate
npm run dev
```

API: `http://localhost:4000`

### Frontend

```bash
cd athly-frontend
npm install
npm run dev
```

App: `http://localhost:5173` (or the port Vite prints)

### Full stack

1. Start the backend (see above), then start the frontend.
2. To use the real API from the frontend, set in `athly-frontend/.env`:
   - `VITE_API_URL=http://localhost:4000`
   - `VITE_USE_REAL_API=true` (when ready to switch from mocks)

## Tech overview

| Layer     | Stack |
|----------|--------|
| **Frontend** | Vite, React 19, TypeScript, React Router, TailwindCSS 4, Zustand, React Hot Toast |
| **Backend**  | NestJS, Prisma, PostgreSQL, JWT, class-validator |

## Documentation

- **Backend**: [athly-backend/README.md](./athly-backend/README.md) — setup, endpoints, auth, scripts.
- **API reference**: [athly-backend/REST_API_DOCUMENTATION.md](./athly-backend/REST_API_DOCUMENTATION.md) — REST endpoints and types.
- **Frontend**: [athly-frontend/README.md](./athly-frontend/README.md) — structure, routes, mocked login, integration notes.

## License

- **Backend**: UNLICENSED (private use)
- **Frontend**: MIT
