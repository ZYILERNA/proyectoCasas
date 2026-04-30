'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData) {
  const pw = formData.get('password');
  if (pw === 'wonly2025') {
    (await cookies()).set('wonly_auth', 'ok', { httpOnly: true, path: '/wonly-panel', maxAge: 60 * 60 * 24 * 7 });
  }
  redirect('/wonly-panel');
}

export async function logout() {
  (await cookies()).delete('wonly_auth');
  redirect('/wonly-panel');
}
