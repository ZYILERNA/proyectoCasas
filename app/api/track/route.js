import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { page, userAgent, referrer } = body;

    const device = /mobile|android|iphone|ipad/i.test(userAgent || '')
      ? 'móvil'
      : 'escritorio';

    await supabase.from('page_visits').insert({
      page: page || '/',
      user_agent: userAgent || '',
      referrer: referrer || '',
      device,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
