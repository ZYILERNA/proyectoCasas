import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIdentifier,
  isSameOriginRequest,
} from "../../../lib/server-rate-limit";

export const dynamic = "force-dynamic";

let lastRetentionCleanup = 0;

export async function POST(request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const identifier = getClientIdentifier(request.headers);
  const rateLimit = checkRateLimit({
    namespace: "page-visit",
    identifier,
    limit: 30,
    windowMs: 60_000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return NextResponse.json({ ok: false }, { status: 503 });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 4096) {
      return NextResponse.json({ ok: false }, { status: 413 });
    }
    const body = JSON.parse(rawBody);
    const page =
      typeof body.page === "string" && body.page.startsWith("/")
        ? body.page.replace(/[\r\n]/g, "").slice(0, 240)
        : "/";
    let referrer = "";
    if (typeof body.referrer === "string" && body.referrer) {
      try {
        const parsedReferrer = new URL(body.referrer);
        referrer = `${parsedReferrer.origin}${parsedReferrer.pathname}`.slice(
          0,
          500,
        );
      } catch {
        referrer = "";
      }
    }
    const userAgent = (request.headers.get("user-agent") || "").slice(0, 500);
    const device = /mobile|android|iphone|ipad/i.test(userAgent)
      ? "móvil"
      : "escritorio";

    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from("page_visits").insert({
      page,
      user_agent: userAgent,
      referrer,
      device,
    });

    if (error) {
      return NextResponse.json({ ok: false }, { status: 503 });
    }

    const now = Date.now();
    if (now - lastRetentionCleanup >= 24 * 60 * 60 * 1000) {
      lastRetentionCleanup = now;
      const retentionCutoff = new Date();
      retentionCutoff.setUTCMonth(retentionCutoff.getUTCMonth() - 13);
      await supabase
        .from("page_visits")
        .delete()
        .lt("visited_at", retentionCutoff.toISOString());
    }

    return NextResponse.json(
      { ok: true },
      {
        headers: {
          "Cache-Control": "no-store",
          Vary: "Origin",
        },
      },
    );
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
