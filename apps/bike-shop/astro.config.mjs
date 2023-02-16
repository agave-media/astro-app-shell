import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import lit from '@astrojs/lit';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    site: 'https://enduro4150.com',
    integrations: [lit(), sitemap()],
    adapter: vercel()
});
