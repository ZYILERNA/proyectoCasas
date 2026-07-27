import "server-only";

const buckets = new Map();
const MAX_BUCKETS = 2_000;
let lastSweep = 0;

function sweepExpired(now) {
  if (now - lastSweep < 60_000 && buckets.size < MAX_BUCKETS) return;

  for (const [key, bucket] of buckets) {
    if (bucket.expiresAt <= now) buckets.delete(key);
  }

  while (buckets.size >= MAX_BUCKETS) {
    const oldestKey = buckets.keys().next().value;
    if (!oldestKey) break;
    buckets.delete(oldestKey);
  }

  lastSweep = now;
}

export function getClientIdentifier(headers) {
  const forwarded =
    headers.get("x-vercel-forwarded-for") ||
    headers.get("cf-connecting-ip") ||
    headers.get("x-real-ip") ||
    headers.get("x-forwarded-for") ||
    "unknown";
  const ip = forwarded.split(",")[0].trim().slice(0, 80);
  return ip || "unknown";
}

export function checkRateLimit({
  namespace,
  identifier,
  limit,
  windowMs,
}) {
  const now = Date.now();
  sweepExpired(now);

  const key = `${namespace}:${identifier}`;
  const current = buckets.get(key);
  if (!current || current.expiresAt <= now) {
    buckets.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: Math.max(limit - 1, 0) };
  }

  current.count += 1;
  return {
    allowed: current.count <= limit,
    remaining: Math.max(limit - current.count, 0),
  };
}

export function resetRateLimit(namespace, identifier) {
  buckets.delete(`${namespace}:${identifier}`);
}

export function isSameOriginRequest(request) {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";

  const allowedOrigins = new Set([new URL(request.url).origin]);
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

  if (configuredUrl) {
    try {
      allowedOrigins.add(new URL(configuredUrl).origin);
    } catch {
      // Ignore an invalid optional deployment URL.
    }
  }

  try {
    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}
