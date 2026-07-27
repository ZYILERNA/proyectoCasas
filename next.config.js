const remotePatterns = [];
try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    remotePatterns.push({
      protocol: "https",
      hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
      pathname: "/storage/v1/object/public/**",
    });
  }
} catch {
  // Local builds without a valid Supabase URL still support all local assets.
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
