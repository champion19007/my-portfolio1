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
