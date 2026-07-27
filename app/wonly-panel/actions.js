'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  createAdminSessionToken,
  isValidAdminPassword,
} from '../../lib/admin-auth';
import {
  checkRateLimit,
  getClientIdentifier,
  resetRateLimit,
} from '../../lib/server-rate-limit';

export async function login(formData) {
  const requestHeaders = await headers();
  const identifier = getClientIdentifier(requestHeaders);
  const rateLimit = checkRateLimit({
    namespace: 'admin-login',
    identifier,
    limit: 5,
    windowMs: 10 * 60_000,
  });
  if (!rateLimit.allowed) {
    redirect('/wonly-panel?error=locked');
  }

  const password = String(formData.get('password') || '');
  if (!isValidAdminPassword(password)) {
    redirect('/wonly-panel?error=invalid');
  }

  resetRateLimit('admin-login', identifier);
  (await cookies()).set(
    ADMIN_COOKIE_NAME,
    createAdminSessionToken(),
    adminCookieOptions,
  );
  redirect('/wonly-panel');
}

export async function logout() {
  (await cookies()).set(ADMIN_COOKIE_NAME, '', {
    ...adminCookieOptions,
    maxAge: 0,
  });
  redirect('/wonly-panel');
}
