import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* The front door is the game: a plain static bundle sitting at the root
     of public/, so its own relative paths (css/, js/, assets/) resolve
     correctly when it is served at '/'. Next has no route for '/' any
     more, so this rewrite hands it the file. The written portfolio moved
     to /site, and the two link to each other. */
  async rewrites() {
    return [{ source: '/', destination: '/index.html' }];
  },

  /* The static portfolio in public/v2 is a redirect rather than a rewrite,
     and the difference matters. Its assets are addressed relatively -
     portfolio/css, portfolio/videos - so the browser resolves them against
     whatever the address bar says. Rewriting '/v2' would leave the bar on
     '/v2', which a browser reads as a file, and every asset would be
     looked for at the site root. Redirecting to the real file puts the bar
     on '/v2/index.html', and the relative paths land where they should. */
  async redirects() {
    return [
      { source: '/v2', destination: '/v2/index.html', permanent: false },
      { source: '/v2/', destination: '/v2/index.html', permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
