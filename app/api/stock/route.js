import { NextResponse } from "next/server";

const SSE_QUOTE_URL =
  "http://yunhq.sse.com.cn:32041/v1/sh1/snap/605268" +
  "?select=code%2Cname%2Clast%2Cprev_close%2Cchg_rate%2Cchange%2Ctradephase";

const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
};

export async function GET() {
  try {
    const response = await fetch(SSE_QUOTE_URL, {
      headers: {
        Accept: "application/json",
        Referer: "http://www.sse.com.cn/",
      },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(4500),
    });

    if (!response.ok) {
      throw new Error(`SSE respondió con ${response.status}`);
    }

    const payload = await response.json();
    const [code, name, last, previousClose, changePercent, change] =
      payload.snap || [];
    const numericValues = [last, previousClose, changePercent, change].map(
      Number,
    );

    if (
      code !== "605268" ||
      numericValues.some((value) => !Number.isFinite(value))
    ) {
      throw new Error("Respuesta de cotización no válida");
    }

    return NextResponse.json(
      {
        available: true,
        symbol: code,
        name,
        market: "SSE",
        currency: "CNY",
        price: numericValues[0],
        previousClose: numericValues[1],
        changePercent: numericValues[2],
        change: numericValues[3],
        trend:
          numericValues[3] > 0
            ? "up"
            : numericValues[3] < 0
              ? "down"
              : "flat",
        marketDate: payload.date || null,
        marketTime: payload.time || null,
        source: "Shanghai Stock Exchange",
      },
      { headers: CACHE_HEADERS },
    );
  } catch {
    return NextResponse.json(
      {
        available: false,
        symbol: "605268",
        market: "SSE",
        source: "Shanghai Stock Exchange",
      },
      { headers: CACHE_HEADERS },
    );
  }
}
