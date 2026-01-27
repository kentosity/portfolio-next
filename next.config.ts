import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nocache'
          },
          {
            key: 'X-UA-Compatible',
            value: 'IE=edge'
          }
        ]
      }
    ]
  }
}

export default nextConfig
