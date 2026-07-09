# MernAuthSystem

Production-grade MERN authentication system with email verification, OTP-based login, JWT token rotation, Redis-backed sessions, and RBAC.

Built by [Tochiiy](https://github.com/Tochiiy) — [tochukwusun24@gmail.com](mailto:tochukwusun24@gmail.com)

---

## Architecture

```
Client (React + Vite)
  │
  │ Axios + Interceptors (auto-refresh queue)
  │
  ▼
Express API
  │
  ├── Rate Limiter (Redis INCR/EXPIRE, 60s window)
  ├── Zod Validation (strip unexpected fields)
  ├── Controller (TryCatch wrapper)
  │
  ├── MongoDB (Mongoose ODM) — Users, roles, profiles
  └── Redis (Upstash) — Verify tokens, OTPs, refresh hashes, rate counters
```

### Token Flow

```
Register → Verify email (crypto token, 5min TTL)
Login    → OTP (5-digit code, 5min TTL)
           → Access Token (15m) + Refresh Token (7d)
             ├── Access: localStorage, Bearer header
             └── Refresh: httpOnly cookie, SHA-256 hash in Redis
                         Rotation: new token issued each refresh
                         Reuse detection: replay revokes all tokens
```

---

## Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 19 + Vite | UI with lazy loading, Suspense |
| Styling | Tailwind CSS v4 | Utility-first, dark mode via `@custom-variant` |
| Forms | react-hook-form | Performant form validation |
| HTTP | Axios + Interceptors | Request/response pipeline, 401 auto-refresh queue |
| Backend | Node.js + Express | REST API with middleware architecture |
| Database | MongoDB + Mongoose 8 | Document store, schema validation |
| Cache | Upstash Redis | Rate limiting, OTP, verify tokens, refresh hashes |
| Auth | JWT (jsonwebtoken) | Access (15m) + Refresh (7d) with rotation |
| Email | Nodemailer + Gmail SMTP | Verification, OTP, welcome, password reset |
| Validation | Zod | Schema validation, NoSQL injection prevention |
| Security | Helmet | HTTP headers (CSP, HSTS, XSS) |

---

## File Structure

```
.
├── backend/
│   ├── server.js                  Entry point, middleware stack, routes
│   ├── Dockerfile                 Container for Render deployment
│   ├── .env.example               Environment variable template
│   ├── config/
│   │   ├── db.js                  MongoDB connection (sanitizeFilter on)
│   │   ├── redis.js               Upstash Redis client
│   │   └── html.js                Email templates + escapeHtml
│   ├── controllers/
│   │   ├── authController.js      Register, login, verify, OTP, refresh, logout
│   │   └── adminController.js     User CRUD, role management
│   ├── middleware/
│   │   ├── auth.js                protect (JWT verify) + admin (role check)
│   │   └── tryCatch.js            Async error wrapper
│   ├── models/
│   │   └── User.js                name, email, password, role, isVerified
│   ├── routes/
│   │   ├── authRoutes.js          /api/auth/*
│   │   └── adminRoutes.js         /api/admin/* (protect + admin)
│   ├── validators/
│   │   └── authValidate.js        Zod schemas for register + login
│   └── utils/
│       ├── email.js               Nodemailer transport
│       └── token.js               JWT generation + SHA-256 hash
│
├── frontend/
│   ├── index.html                 Entry HTML, Inter font
│   ├── vite.config.js             Vite + React + Tailwind plugins
│   ├── vercel.json                SPA rewrites for deployment
│   ├── .env                       VITE_API_URL=http://localhost:5000
│   └── src/
│       ├── main.jsx               React root
│       ├── index.css              Tailwind imports, animations, dark variant
│       ├── App.jsx                Lazy routes, GuestRoute, AdminRoute
│       ├── context/
│       │   ├── AuthContext.jsx     User state, fetchUser, logout
│       │   └── ThemeContext.jsx    Dark/light toggle, localStorage, system pref
│       ├── components/
│       │   ├── Navbar.jsx         Sticky, auth-aware, admin link, theme toggle
│       │   ├── Footer.jsx         Copyright, contact links
│       │   ├── HeroBanner.jsx     Landing CTA (guest)
│       │   ├── AuthFlow.jsx       5-step flow diagram
│       │   ├── TechStackCarousel.jsx  Auto-play brand carousel
│       │   ├── FeaturesGrid.jsx   Feature cards layout
│       │   └── FeatureCard.jsx    Individual card with hover animation
│       └── pages/
│           ├── apiInterceptor.js  Axios instance, 401 refresh queue
│           ├── Home.jsx           Guest hero vs authenticated welcome
│           ├── Login.jsx          Email/password → OTP
│           ├── Register.jsx       Name, email, password with confirm
│           ├── VerifyEmail.jsx    Token verification handler
│           ├── VerifyOtp.jsx      5-digit OTP input
│           ├── Verify.jsx         Post-registration instruction
│           ├── Dashboard.jsx      User profile, admin panel link, auth guide
│           ├── AdminDashboard.jsx User table, pagination, promote/delete
│           ├── AuthGuide.jsx      Full system documentation (6 tabs)
│           ├── ForgotPassword.jsx Email input for reset
│           ├── ResetPassword.jsx  Token + new password
│           └── Logout.jsx         Logout confirmation
│
├── README.md                     This file
└── .gitignore
```

---

## Setup

### Prerequisites

- Node.js 20+
- MongoDB Atlas (or local instance)
- Upstash Redis account (free tier)
- Gmail account with App Password enabled

### 1. Clone & Install

```bash
git clone https://github.com/Tochiiy/MernStackFlow.git
cd MernStackFlow

# Backend
cd backend
cp .env.example .env
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Environment Variables

Edit `backend/.env`:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net
JWT_ACCESS_SECRET=<random-64-char-string>
JWT_REFRESH_SECRET=<random-64-char-string>
UPSTASH_REDIS_REST_URL=https://<region>.upstash.io
UPSTASH_REDIS_REST_TOKEN=<your-token>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=<gmail-app-password>
SMTP_FROM=your@gmail.com
APP_NAME=Mern Auth
NODE_ENV=development
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000
```

### 3. Run Development

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## API Reference

All endpoints prefixed with `/api`. Auth endpoints require no token unless noted.

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register with name, email, password, confirmPassword |
| POST | `/auth/login` | No | Login with email, password — sends OTP |
| POST | `/auth/verify-email/:token` | No | Verify email with token from email |
| POST | `/auth/verify-otp` | No | Complete login: `{ email, otp }` — returns tokens |
| POST | `/auth/refresh-token` | Cookie | Refresh access token, rotate refresh token |
| POST | `/auth/logout` | Cookie | Clear refresh token from Redis + cookies |
| GET | `/auth/me` | Bearer | Get current user profile |
| POST | `/auth/forgot-password` | No | Request password reset email |
| POST | `/auth/reset-password/:token` | No | Reset password with token from email |

#### Register

```json
// POST /api/auth/register
{ "name": "John", "email": "john@test.com", "password": "password123", "confirmPassword": "password123" }

// 200
{ "message": "If your email is valid, a verification link has been sent." }
```

#### Login

```json
// POST /api/auth/login
{ "email": "john@test.com", "password": "password123" }

// 200
{ "message": "If email is valid, an OTP has been sent for verification" }
```

#### Verify OTP

```json
// POST /api/auth/verify-otp
{ "email": "john@test.com", "otp": "46914" }

// 200
{ "message": "Welcome John", "accessToken": "eyJ...", "user": { "_id": "...", "name": "John", "email": "john@test.com", "role": "user" } }
```

### Admin

All admin routes require `Authorization: Bearer <token>` header and `role: "admin"`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users?page=1&limit=10` | List users (paginated) |
| GET | `/admin/users/:id` | Get single user |
| PATCH | `/admin/users/:id/role` | Update role: `{ "role": "admin" }` |
| DELETE | `/admin/users/:id` | Delete user |

### Health

```bash
GET /health
# 200
{ "message": "Server is running", "status": "healthy" }
```

---

## Security

| Attack | Defense |
|--------|---------|
| XSS | React JSX auto-escapes, `escapeHtml()` in emails, Helmet CSP headers, httpOnly cookies |
| CSRF | `sameSite: strict` on cookies + CORS whitelist (no separate CSRF token needed for SPA) |
| NoSQL Injection | Zod `safeParse()` strips unexpected fields (Mongoose alone does not prevent this) |
| JWT Theft | Access 15m, Refresh 7d rotated on every use, SHA-256 hash stored in Redis |
| Reuse Detection | If a used refresh token is replayed, old hash deleted — returns 401 |
| Rate Limiting | Redis INCR/EXPIRE per IP+email, 60s window, stale key fallback |
| RBAC | `role` enum on User model, `admin` middleware, `AdminRoute` frontend guard |
| Email Security | OTP 5-digit `crypto.randomInt`, verify token `crypto.randomBytes(32)`, 5min TTL |
| Password Hashing | bcryptjs with 12 salt rounds |

---

## RBAC (Roles)

- `user` — default role, authenticated routes only
- `admin` — access to `/api/admin/*` and frontend `/admin`

**First user** to verify their email is auto-promoted to `admin`. Afterwards, admins can promote/demote users via the Admin Dashboard.

---

## Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build

# Or connect repo to Vercel with:
#   Framework: Vite
#   Build: npm run build
#   Output: dist
#   Add env: VITE_API_URL=https://your-backend.onrender.com
```

The `vercel.json` rewrites all non-API routes to `index.html` for SPA support.

### Backend → Render (Docker)

```bash
cd backend

# Build image
docker build -t mern-auth-backend .

# Run locally
docker run -p 5000:5000 --env-file .env mern-auth-backend
```

On Render:
1. Create a "Web Service"
2. Select "Deploy from Dockerfile"
3. Set environment variables from `.env.example`
4. Set `NODE_ENV=production`
5. Set `FRONTEND_URL` to your Vercel URL

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default 3000) |
| `FRONTEND_URL` | Yes | CORS origin (e.g. https://your-app.vercel.app) |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Yes | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Yes | Secret for signing refresh tokens |
| `UPSTASH_REDIS_REST_URL` | Yes | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Upstash Redis auth token |
| `SMTP_HOST` | Yes | SMTP host (smtp.gmail.com) |
| `SMTP_PORT` | Yes | SMTP port (587) |
| `SMTP_USER` | Yes | Gmail address |
| `SMTP_PASS` | Yes | Gmail App Password |
| `SMTP_FROM` | Yes | From address (usually same as SMTP_USER) |
| `APP_NAME` | No | App name in emails (default "Auth App") |
| `NODE_ENV` | No | "development" or "production" |

---

## Architectural Decisions

- **No separate CSRF middleware**: `sameSite: strict` + CORS whitelist is sufficient for SPA architectures. The browser blocks cross-site cookie sends, and non-whitelisted origins are rejected server-side.
- **SHA-256 hashed refresh tokens in Redis**: The raw refresh token is never stored. Only `refresh:<sha256(token)>` → `userId`. If Redis is compromised, tokens cannot be reconstructed.
- **Race condition prevention**: `redis.del(verifyKey)` runs before `User.create()` and `User.findOne()`. This ensures two concurrent requests with the same token cannot both create a user.
- **Stale key handling**: Rate limit keys from legacy `SET` code (string values) cause `INCR` to throw. A `try/catch` deletes and retries. Orphan keys with `TTL=-1` are also detected and cleaned.
- **401 refresh queue**: Multiple concurrent 401s from the interceptor are queued. A single refresh request is made, and all queued requests replay with the new token.
- **Zod on backend only**: The frontend uses native react-hook-form validation to minimize dependencies. Zod on the backend acts as the security boundary.
- **bcrypt 12 rounds**: Balances security (~250ms per hash) with UX. Higher rounds provide diminishing returns against GPU attacks.
- **Mongoose `sanitizeFilter: true`**: Wraps query filter values in `$eq` to prevent NoSQL operator injection at the database driver level (additional defense beyond Zod).

---

## Future Improvements

See [PRODUCTION.md](./PRODUCTION.md) for the full backlog of production upgrades including OAuth, TOTP, audit logging, comprehensive testing, and graceful shutdown.
