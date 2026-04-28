import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const supabase = createClient(
      'https://nmcnyrjwbbhhzbajztfs.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tY255cmp3YmJoaHpiYWp6dGZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjEyNDU0MCwiZXhwIjoyMDc3NzAwNTQwfQ.t8RzAXqUBCo8K9WpI_W76GxCDYVzY1Ft9LGywHW123M'
    );
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
