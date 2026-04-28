import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const supabase = createClient(
    'https://nmcnyrjwbbhhzbajztfs.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tY255cmp3YmJoaHpiYWp6dGZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjEyNDU0MCwiZXhwIjoyMDc3NzAwNTQwfQ.t8RzAXqUBCo8K9WpI_W76GxCDYVzY1Ft9LGywHW123M'
  );
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('pw');

  if (password !== 'wonly2024') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { data: visits, error } = await supabase
    .from('page_visits')
    .select('*')
    .order('visited_at', { ascending: false })
    .limit(1000);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Estadísticas resumidas
  const total = visits.length;

  const byPage = visits.reduce((acc, v) => {
    acc[v.page] = (acc[v.page] || 0) + 1;
    return acc;
  }, {});

  const byDevice = visits.reduce((acc, v) => {
    acc[v.device] = (acc[v.device] || 0) + 1;
    return acc;
  }, {});

  // Visitas por día (últimos 30 días)
  const byDay = visits.reduce((acc, v) => {
    const day = v.visited_at?.slice(0, 10);
    if (day) acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({ total, byPage, byDevice, byDay, recent: visits.slice(0, 50) });
}
