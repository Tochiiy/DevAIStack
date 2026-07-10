import { FiShield, FiCheckCircle } from "react-icons/fi";
import { Section, Card, ExternalLink, PrerequisitesBanner } from "./shared";

const securityTopics = [
  {
    title: "Authentication & Authorization",
    icon: FiShield, color: "text-red-500",
    items: [
      "JWT: access (15m) + refresh (7d), rotation, reuse detection, SHA-256 hash in Redis",
      "OAuth 2.0: authorization code, PKCE, implicit, client credentials — flows explained",
      "OAuth: scopes, consent, token exchange, refresh tokens, introspection",
      "Session vs token-based auth: trade-offs, httpOnly cookies, localStorage, XSS risks",
      "2FA/MFA: TOTP, SMS, authenticator apps, backup codes, recovery flow",
      "Passwordless: magic links, OTP email/SMS, WebAuthn, passkeys",
      "RBAC vs ABAC: role-based vs attribute-based access control, policy engine",
      "API keys: generation, rotation, scoping, rate limiting per key, audit logging",
    ],
  },
  {
    title: "Security Best Practices",
    icon: FiShield, color: "text-yellow-500",
    items: [
      "XSS: React auto-escape, CSP headers, httpOnly cookies, escapeHtml helper",
      "CSRF: sameSite strict, CORS whitelist, anti-CSRF tokens for non-SPA forms",
      "NoSQL Injection: Zod safeParse strips operators, validate before querying",
      "SQL Injection: parameterized queries, ORM safety, raw query caution",
      "Helmet: security headers — CSP, HSTS, X-Frame-Options, X-Content-Type-Options",
      "Rate limiting: Redis INCR/EXPIRE, per-IP, per-email, per-API-key, 60s window",
      "HTTPS: TLS 1.3, HSTS, cert management, mTLS for service-to-service",
      "Secrets management: env vars, Vault, AWS Secrets Manager, never hardcode",
    ],
  },
];

const Security = () => (
  <Section title="Security" desc="JWT, OAuth, RBAC, encryption, rate limiting, and every OWASP top-10 mitigation with 2026 practices.">
    <PrerequisitesBanner />
    {securityTopics.map(({ title, icon: Icon, color, items }) => (
      <Card key={title} className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={20} className={color} />
          <h4 className={`font-bold text-lg ${color}`}>{title}</h4>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-base text-gray-800 dark:text-gray-200 font-medium">
              <FiCheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </Card>
    ))}
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ExternalLink href="https://owasp.org/www-project-top-ten/" label="OWASP Top 10" desc="2021 vulnerability categories" />
      <ExternalLink href="https://auth0.com/docs/secure/tokens/refresh-tokens" label="Auth0: Refresh Tokens" desc="Rotation and reuse detection" />
      <ExternalLink href="https://oauth.net/2/" label="OAuth 2.0" desc="Authorization framework spec" />
      <ExternalLink href="https://www.rfc-editor.org/rfc/rfc9700" label="RFC 9700: OAuth BCP" desc="Token replay, refresh protection" />
    </div>
  </Section>
);

export default Security;
