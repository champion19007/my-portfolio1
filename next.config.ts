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

  async redirects() {
    return [
      /* The written site is the static build in public/site. It is a
         redirect rather than a rewrite because its assets are addressed
         relatively: rewriting '/site' would leave the address bar on
         '/site', which a browser reads as a file, and every asset would
         then be looked for at the site root. Redirecting to the real file
         puts the bar on '/site/index.html' and the relative paths land. */
      { source: '/site', destination: '/site/index.html', permanent: false },
      { source: '/site/', destination: '/site/index.html', permanent: false },

      /* Where it lived for one commit, kept so the link still works. */
      { source: '/v2', destination: '/site/index.html', permanent: false },
      { source: '/v2/', destination: '/site/index.html', permanent: false },
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
