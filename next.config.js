/** @type {import('next').NextConfig} */

const time = new Date().getTime();

const nextConfig = {
    env: {
        BUILD_ID: `${time}`,
        NEXT_PUBLIC_BUILD_ID: `${time}`,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ui-avatars.com",
                port: "",
                pathname: "/api/?name=**",
            },
            {
                protocol: "https",
                hostname: "d15zhzej99z5o0.cloudfront.net",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "dvfhcusz7g091.cloudfront.net",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
