/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental:{
        turbo: {
            enabled: true,
        },
    },
};

export default nextConfig;
