import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  images: {
    // PHASE 2: image config - allow SVG and query param placeholders
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [320, 420, 768, 1024, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // localPatterns allows Next/Image to optimize local files under /public including placeholders with width/height query
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
      {
        pathname: '/**/*.svg',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wxnjmlrnmqxnwtybppiz.supabase.co',
        port: '',
        pathname: '/storage/v1/object/sign/**',
      },
      {
        protocol: 'https',
        hostname: 'wxnjmlrnmqxnwtybppiz.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  outputFileTracingExcludes: {
    '**': ['supabase/**'],
  },
};

export default withNextIntl(nextConfig);
