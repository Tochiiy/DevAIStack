# DevAIStack

Production-grade MERN authentication system with direct login/registration (no email dependency), backup codes, JWT rotation with reuse detection, Redis rate limiting, and RBAC.

Built by [Tochiiy](https://github.com/Tochiiy) — [tochukwusun24@gmail.com](mailto:tochukwusun24@gmail.com)

**Live:** [Backend API](https://devaistack.onrender.com) | [Frontend App](https://devaistack.vercel.app)

---

## Auth Flow

```
Register → Account created immediately → Backup codes shown once
Login    → Email + Password → Access Token + Refresh Token → Dashboard
Backup   → Enter a saved 6-digit code → Full token pair (one-time use)
```

- **No OTP, no email verification** — users can start immediately
- **5 backup codes** generated on registration (bcrypt-hashed, shown once, one-time use)
- **Direct login** returns tokens immediately (no email roundtrip)
- **Forgot-password** still sends email (only email-dependent flow remaining)

---

## Architecture

```
Client (React + Vite)
  │ Axios Interceptor (401 queue + refresh rotation)
  ▼
Express API
  ├── Rate Limiter (Redis INCR/EXPIRE, stale-key fallback)
  ├── Zod Validation (safeParse, multi-error reporting)
  ├── Controller
  ├── MongoDB (users + backup codes)
  └── Redis (tokens, counters, password-reset tokens)
```

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, Tailwind v4, react-hook-form, Axios |
| Backend | Node.js, Express |
| Database | MongoDB + Mongoose 8 |
| Cache | Upstash Redis (REST API, no persistent TCP) |
| Auth | JWT (15m access + 7d refresh, rotation + reuse detection) |
| Email | Nodemailer + Gmail SMTP (only for forgot-password) |
| Validation | Zod |
| Security | Helmet, bcrypt (12 rounds), httpOnly cookies, sameSite |

---

## Quick Start

```bash
git clone https://github.com/Tochiiy/DevAIStack.git
cd DevAIStack

# Backend
cd backend
cp .env.example .env    # fill in your env vars
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. First registered user is auto-promoted to admin.

---

## API

All routes prefixed with `/api`.

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | `{ name, email, password, confirmPassword }` — returns backup codes |
| POST | `/auth/login` | No | `{ email, password }` — returns tokens directly |
| POST | `/auth/use-backup-code` | No | `{ email, code }` — one-time backup code login |
| POST | `/auth/refresh-token` | Cookie | Rotate refresh token, get new access token |
| POST | `/auth/logout` | Cookie | Delete Redis token + clear cookie |
| DELETE | `/auth/delete-account` | Bearer | Remove user + Redis + cookies |
| GET | `/auth/me` | Bearer | Current user info |
| POST | `/auth/forgot-password` | No | `{ email }` — sends reset link |
| POST | `/auth/reset-password/:token` | No | `{ password }` — resets + revokes all sessions |

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

- **XSS**: React auto-escapes JSX, `escapeHtml()` in email templates, Helmet CSP, httpOnly cookies
- **CSRF**: `sameSite` + CORS whitelist (no separate middleware needed)
- **NoSQL injection**: Mongoose `sanitizeFilter` + Zod safeParse strips unexpected fields
- **JWT**: 15m access (localStorage), 7d refresh (httpOnly cookie, SHA-256 hash in Redis)
- **Rotation**: Every refresh issues a new pair; old hash deleted. Reuse attempt → 401
- **tokenVersion**: Incremented on password reset → invalidates all existing JWTs instantly
- **Rate limiting**: Redis INCR/EXPIRE per IP+email, 60s sliding window, stale-key fallback
- **RBAC**: `role` enum (admin/user), admin middleware, AdminRoute frontend guard
- **Backup codes**: 6-digit, bcrypt-hashed, one-time use, rate-limited (5 per 5min)
- **401 queue**: Axios interceptor queues concurrent 401s, single refresh call, replays all
- **Account deletion**: Removes user + Redis tokens + clears cookies

---

## Project Structure

```
backend/
├── server.js                  Entry point + env validation
├── Dockerfile
├── config/                    db.js, redis.js, html.js (email templates)
├── controllers/               authController.js, adminController.js
├── middleware/                 auth.js (protect + admin), tryCatch.js
├── models/                    User.js
├── routes/                    authRoutes.js, adminRoutes.js
├── validators/                authValidate.js (Zod schemas)
└── utils/                     email.js, token.js

frontend/
├── index.html
├── vite.config.js
├── vercel.json
└── src/
    ├── App.jsx                Lazy routes, GuestRoute, ProtectedRoute, AdminRoute
    ├── context/               AuthContext.jsx, ThemeContext.jsx
    ├── components/            Navbar, Footer, HeroBanner, AuthFlow, etc.
    └── pages/                 Home, Login, Register, Dashboard, VerifyOtp, etc.
```

---

## Deployment

### Frontend → Vercel

Connect repo, framework Vite, build `npm run build`, output `dist`. Add env `VITE_API_URL=https://devaistack.onrender.com`.

### Backend → Render

Web Service → Deploy from Dockerfile → set env vars from `.env.example`.

```bash
cd backend
docker build -t mern-auth-backend .
docker run -p 5000:5000 --env-file .env mern-auth-backend
```

---

## Environment Variables

| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| PORT | No | 5000 | |
| FRONTEND_URL | Yes | — | CORS origin (no trailing slash) |
| MONGO_URI | Yes | — | MongoDB connection string |
| JWT_ACCESS_SECRET | Yes | — | Min 32 chars |
| JWT_REFRESH_SECRET | Yes | — | Min 32 chars |
| UPSTASH_REDIS_REST_URL | Yes | — | Upstash REST endpoint |
| UPSTASH_REDIS_REST_TOKEN | Yes | — | Upstash REST token |
| SMTP_HOST | No* | smtp.gmail.com | *Only needed for forgot-password |
| SMTP_PORT | No | 587 | |
| SMTP_USER | No* | — | |
| SMTP_PASS | No* | — | |
| SMTP_FROM | No* | — | |
| APP_NAME | No | Auth App | |
| NODE_ENV | No | development | `production` enables secure cookies |

---

## Preserved Code (for future re-enable)

The following code is commented out but fully preserved for re-enablement:

- **OTP login**: `verifyOtp` controller + route (commented in authRoutes.js)
- **Email verification**: `verifyEmail` controller + route + email template
- **Frontend pages**: `VerifyEmail.jsx`, `Verify.jsx` (files intact, imports commented)
- **OTP email template**: `getOtpHtml` in html.js

To re-enable any flow: uncomment the relevant exports, routes, imports, and frontend components.
