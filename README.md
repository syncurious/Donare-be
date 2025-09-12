# Donare Express Backend (TypeScript)

Express.js rewrite of the NestJS backend with MongoDB (Mongoose), JWT-like HMAC tokens, and layered architecture.

## Setup

1. Copy env and edit values:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Start MongoDB locally and run dev server:

```bash
npm run dev
```

Server: http://localhost:3001

## Scripts
- `npm run dev`: Start with nodemon + ts-node
- `npm run build`: Type-check and emit to `dist/`
- `npm start`: Run compiled build

## Environment
- `PORT` (default 3001)
- `DB_URI` (e.g. mongodb://localhost:27017/donare)
- `TOKEN_SECRET` (HMAC token secret)

## Architecture
```
src/
  config/        # config and DB
  routes/        # Express routes
  controllers/   # HTTP handlers
  services/      # business logic
  models/        # mongoose models
  middlewares/   # auth, error, validation
  validators/    # DTO-like validation
  utils/         # helpers
```

## Users API
- POST `/api/users` create
- GET `/api/users` list
- GET `/api/users/:id` get by id
- GET `/api/users/profile/:id` profile view
- PATCH `/api/users/:id` update
- PATCH `/api/users/:id/preferences` update prefs
- DELETE `/api/users/:id` delete

Payload fields mirror the NestJS DTOs.

## Auth
HMAC-signed compact tokens similar to JWT (HS256). See `src/middlewares/auth.ts` for `signToken` and `authMiddleware`.

## Notes
- Supabase has been replaced with MongoDB via Mongoose.
- Validation approximates NestJS `ValidationPipe` with lightweight validators.
- Extend logging by replacing `morgan('dev')` and `utils/logger` as needed.

