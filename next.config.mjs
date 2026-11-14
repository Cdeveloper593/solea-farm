/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tunnel-friendly: localhost.run / preview hosts are not blocked.
  // Images are local files in /public/images — no remote image domains needed.
  images: { unoptimized: false },
  experimental: {},
}
export default nextConfig
