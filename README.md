# DevAIStack

MERN authentication system with email verification, OTP login, JWT rotation, Redis sessions, and RBAC.

Built by [Tochiiy](https://github.com/Tochiiy) — [tochukwusun24@gmail.com](mailto:tochukwusun24@gmail.com)

---

## Architecture

```
Client (React + Vite)
  │ Axios + Interceptors
  ▼
Express API
  ├── Rate Limiter (Redis INCR/EXPIRE)
  ├── Zod Validation
  ├── Controller
  ├── MongoDB (users, roles)
  └── Redis (tokens, OTPs, rate counters)
```

Register → Verify email → Login → OTP → Access Token + Refresh Token

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, Tailwind v4, react-hook-form, Axios |
| Backend | Node.js, Express |
| Database | MongoDB + Mongoose 8 |
| Cache | Upstash Redis |
| Auth | JWT (15m access + 7d refresh, rotation + reuse detection) |
| Email | Nodemailer + Gmail SMTP |
| Validation | Zod |
| Security | Helmet, bcrypt (12 rounds), httpOnly cookies, sameSite strict |

---

## Quick Start

```bash
git clone https://github.com/Tochiiy/DevAIStack.git
cd DevAIStack

# Backend
cd backend
cp .env.example .env   
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. First user to verify email is auto-promoted to admin.

---

## API

All routes prefixed with `/api`.

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | `{ name, email, password, confirmPassword }` |
| POST | `/auth/login` | No | `{ email, password }` — sends OTP |
| POST | `/auth/verify-email/:token` | No | Verify from email link |
| POST | `/auth/verify-otp` | No | `{ email, otp }` — returns tokens |
| POST | `/auth/refresh-token` | Cookie | Rotate refresh, get new access |
| POST | `/auth/logout` | Cookie | Clear Redis + cookies |
| DELETE | `/auth/delete-account` | Bearer | Delete user + Redis + clear cookies |
| GET | `/auth/me` | Bearer | Current user |
| POST | `/auth/forgot-password` | No | `{ email }` — sends reset link |
| POST | `/auth/reset-password/:token` | No | `{ password }` |

### Admin (requires Bearer + role: admin)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users?page=1&limit=10` | Paginated user list |
| GET | `/admin/users/:id` | Single user |
| PATCH | `/admin/users/:id/role` | `{ role: "admin" }` |
| DELETE | `/admin/users/:id` | Delete user |

### Health

```
GET /health → { message: "Server is running", status: "healthy" }
```

---

## Security

- **XSS**: React auto-escapes JSX, escapeHtml() in emails, Helmet CSP, httpOnly cookies
- **CSRF**: sameSite:strict + CORS whitelist (no separate middleware)
- **NoSQL injection**: Zod safeParse strips unexpected fields before MongoDB
- **JWT**: 15m access (localStorage), 7d refresh (httpOnly cookie, SHA-256 hash in Redis)
- **Rotation**: Every refresh issues new pair, old hash deleted. Replay returns 401
- **Rate limiting**: Redis INCR/EXPIRE per IP+email, 60s window, stale key fallback
- **RBAC**: role enum (admin/user), admin middleware, AdminRoute frontend guard
- **Email**: OTP via crypto.randomInt, verify token via crypto.randomBytes(32), 5min TTL
- **Race conditions**: redis.del before User.create in verifyEmail
- **401 queue**: Interceptor queues concurrent 401s, single refresh call, replays all
- **Account deletion**: DELETE /auth/delete-account removes user + Redis tokens + clears cookies

---

## Project Structure

```
backend/
├── server.js
├── Dockerfile
├── config/       db.js, redis.js, html.js (email templates)
├── controllers/  authController.js, adminController.js
├── middleware/    auth.js (protect + admin), tryCatch.js
├── models/       User.js
├── routes/       authRoutes.js, adminRoutes.js
├── validators/   authValidate.js (Zod)
└── utils/        email.js, token.js

frontend/
├── index.html
├── vite.config.js
├── vercel.json
└── src/
    ├── App.jsx           lazy routes, GuestRoute, AdminRoute
    ├── context/          AuthContext.jsx, ThemeContext.jsx
    ├── components/       Navbar, Footer, HeroBanner, AuthFlow, etc.
    └── pages/            Home, Login, Register, Dashboard, AdminDashboard, AuthGuide, etc.
```

---

## Deployment

### Frontend → Vercel

Connect repo, framework Vite, build `npm run build`, output `dist`. Add env `VITE_API_URL=https://your-backend.onrender.com`.

### Backend → Render

Web Service → Deploy from Dockerfile → set env vars from `.env.example`.

```bash
cd backend
docker build -t mern-auth-backend .
docker run -p 5000:5000 --env-file .env mern-auth-backend
```

---

## Environment Variables

| Variable | Required | Default |
|----------|----------|---------|
| PORT | No | 5000 |
| FRONTEND_URL | Yes | — |
| MONGO_URI | Yes | — |
| JWT_ACCESS_SECRET | Yes | — |
| JWT_REFRESH_SECRET | Yes | — |
| UPSTASH_REDIS_REST_URL | Yes | — |
| UPSTASH_REDIS_REST_TOKEN | Yes | — |
| SMTP_HOST | Yes | smtp.gmail.com |
| SMTP_PORT | Yes | 587 |
| SMTP_USER | Yes | — |
| SMTP_PASS | Yes | — |
| SMTP_FROM | Yes | — |
| APP_NAME | No | Auth App |
| NODE_ENV | No | development |
