// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    site: 'https://your-site-name.netlify.app', // Update this with your actual Netlify URL
    vite: {
        // @ts-ignore
        plugins: [tailwindcss()]
    }
});
