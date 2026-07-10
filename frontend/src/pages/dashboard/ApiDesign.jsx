import { FiGlobe, FiZap, FiCheckCircle } from "react-icons/fi";
import { SiGraphql, SiFastapi } from "react-icons/si";
import { Section, Card, ExternalLink, PrerequisitesBanner } from "./shared";

const apiTopics = [
  {
    title: "RESTful APIs", icon: FiGlobe, color: "text-blue-500",
    items: [
      "HTTP methods: GET, POST, PUT, PATCH, DELETE — semantics and idempotency",
      "Status codes: 200, 201, 204, 301, 400, 401, 403, 404, 409, 422, 429, 500, 502, 503",
      "Request/Response: headers, body, query params, path params, content negotiation",
      "Pagination: cursor-based vs offset, page/limit, sort, filter, total count",
      "API versioning: URL path, header, query param — strategies and trade-offs",
      "Error handling: consistent error shape, error codes, validation details",
      "Rate limiting (throttling): per user/IP/plan, sliding window, token bucket, headers",
      "OpenAPI/Swagger: spec-first design, auto-generated docs, client SDK generation",
    ],
  },
  {
    title: "GraphQL", icon: SiGraphql, color: "text-pink-500",
    items: [
      "Schema-first design: types, queries, mutations, subscriptions, resolvers",
      "Apollo Client: cache, fragments, pagination, optimistic updates, error handling",
      "Apollo Server: code-first vs schema-first, data sources, context, directives",
      "Node.js: graphql-js, type-graphql, NestJS GraphQL, code generation",
      "N+1 problem: DataLoader, batching, caching, query complexity analysis",
      "Federation: subgraphs, Apollo Gateway, entity resolution, managed federation",
      "Security: depth limiting, cost analysis, persisted operations, auth directives",
      "Compare: GraphQL vs REST vs tRPC — flexibility, tooling, ecosystem, performance",
    ],
  },
  {
    title: "gRPC & tRPC", icon: SiFastapi, color: "text-green-500",
    items: [
      "gRPC: Protocol Buffers, service definition, unary/server/client streaming",
      "gRPC: bidirectional streaming, deadlines, cancellations, interceptors",
      "tRPC: end-to-end type safety, procedures, routers, middleware",
      "tRPC: subscriptions, server-side caching, error formatting, code generation",
      "Compare: REST vs gRPC vs tRPC — when to use each",
    ],
  },
  {
    title: "Real-Time Communication", icon: FiZap, color: "text-purple-500",
    items: [
      "WebSocket: full-duplex, handshake, frames, ping/pong, rooms, adapter scaling",
      "SSE (Server-Sent Events): one-way, auto-reconnect, event IDs, text/event-stream",
      "WebRTC: peer-to-peer, STUN/TURN, SDP, ICE candidates, data channels",
      "Webhooks: event callbacks, retry policies, idempotency keys, signature verification",
      "HLS (HTTP Live Streaming): segmenting, M3U8 playlists, adaptive bitrate, low-latency",
      "Compare: WebSocket vs SSE vs polling vs Webhook — latency, direction, use cases",
    ],
  },
];

const ApiDesign = () => (
  <Section title="API Design & Communication" desc="REST, GraphQL, gRPC, tRPC, WebSockets, SSE, Webhooks, WebRTC, HLS — all protocols with 2026 best practices.">
    <PrerequisitesBanner />
    {apiTopics.map(({ title, icon: Icon, color, items }) => (
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
      <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" label="HTTP Status Codes" desc="Complete reference with semantics" />
      <ExternalLink href="https://grpc.io/docs/" label="gRPC Docs" desc="Protocol buffers, streaming, auth" />
      <ExternalLink href="https://trpc.io/docs" label="tRPC Docs" desc="End-to-end typesafe APIs" />
      <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" label="WebSocket API" desc="MDN WebSocket reference" />
      <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events" label="SSE Docs" desc="Server-Sent Events guide" />
      <ExternalLink href="https://webrtc.org/" label="WebRTC" desc="Peer-to-peer communication" />
      <ExternalLink href="https://graphql.org/learn/" label="GraphQL Docs" desc="Query language, schema, resolvers, best practices" />
      <ExternalLink href="https://www.apollographql.com/docs/" label="Apollo Docs" desc="Client, Server, Federation, caching" />
      <ExternalLink href="https://swagger.io/specification/" label="OpenAPI Spec" desc="API specification standard" />
      <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods" label="HTTP Methods" desc="Semantics and idempotency" />
    </div>
  </Section>
);

export default ApiDesign;
