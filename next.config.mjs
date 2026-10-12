/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const basePath =
  isGitHubPages && repositoryName !== 'sebas010699.github.io' ? `/${repositoryName}` : ''

const nextConfig = {
  ...(isGitHubPages
    ? {
        output: 'export',
        basePath,
        trailingSlash: true,
        env: {
          NEXT_PUBLIC_BASE_PATH: basePath,
        },
      }
    : {}),
  images: {
    unoptimized: true,
  },
  ...(!isGitHubPages && {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          ],
        },
      ]
    },
  }),
}

export default nextConfig
