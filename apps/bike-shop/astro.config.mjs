import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    site: 'https://www.serialmtbtexcoco.com/',
    integrations: [sitemap({
        customPages: [
            'https://www.serialmtbtexcoco.com/', 
            'https://www.serialmtbtexcoco.com/registro',
            'https://www.serialmtbtexcoco.com/nosotros',
        ]
    })],
    adapter: vercel()
});
