import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "wonly_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12;

function getSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  );
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

function sign(payload) {
  const secret = getSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function isValidAdminPassword(candidate) {
  const expected = process.env.ADMIN_PASSWORD || "";
  return Boolean(expected) && safeEqual(candidate || "", expected);
}

export function createAdminSessionToken() {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = `v1.${issuedAt}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidAdminSession(token) {
  if (!token) return false;
  const [version, issuedAtRaw, signature] = String(token).split(".");
  if (version !== "v1" || !issuedAtRaw || !signature) return false;

  const issuedAt = Number(issuedAtRaw);
  const now = Math.floor(Date.now() / 1000);
  if (
    !Number.isFinite(issuedAt) ||
    issuedAt > now + 60 ||
    now - issuedAt > ADMIN_SESSION_MAX_AGE
  ) {
    return false;
  }

  const payload = `${version}.${issuedAtRaw}`;
  return safeEqual(signature, sign(payload));
}

export const adminCookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  path: "/wonly-panel",
  maxAge: ADMIN_SESSION_MAX_AGE,
};
