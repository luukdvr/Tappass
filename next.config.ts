import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' https://apis.google.com 'unsafe-inline';
              connect-src 'self' https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com;
              img-src 'self' data:;
              frame-src 'self';
              object-src 'none';
              style-src 'self' 'unsafe-inline';
            `.replace(/\s{2,}/g, " "),
          },
        ],
      },
    ];
  }
};

export default nextConfig;