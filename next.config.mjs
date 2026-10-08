/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [{ source: "/pricing", destination: "/hire-us", permanent: true }];
  },
};

export default nextConfig;
