/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(frag|vert|glsl)$/,
      type: 'asset/source'
    })
    return config
  }
}

export default nextConfig
