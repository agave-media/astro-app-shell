import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import lit from '@astrojs/lit';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    site: 'https://www.enduro4150.com/',
    integrations: [lit(), sitemap({
        customPages: [
            'https://www.enduro4150.com/', 
            'https://www.enduro4150.com/registro',
            'https://www.enduro4150.com/eventos',
            'https://www.enduro4150.com/nosotros',
        ]
    })],
    adapter: vercel()
});
