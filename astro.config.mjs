import { defineConfig } from 'astro/config';
import { site } from './src/config.mjs';

export default defineConfig({
  output: 'static',
  site: site.siteUrl || undefined,
  base: site.basePath,
  trailingSlash: 'always',
  build: { format: 'directory' },
});
