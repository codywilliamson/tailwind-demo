// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    site: 'https://your-site-name.netlify.app', // Update this with your actual Netlify URL
    integrations: [tailwind()]
});
