/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/awesome-engineering-leadership/system-design-mastery' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/awesome-engineering-leadership/system-design-mastery' : '',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader'],
    });
    return config;
  },
}

module.exports = nextConfig
