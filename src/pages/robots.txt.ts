import { site, absoluteUrl } from '../config.mjs';
export function GET() {
  const content = site.isPublicSite
    ? `User-agent: *\nAllow: ${site.basePath}\n\nSitemap: ${absoluteUrl('sitemap.xml')}\n`
    : '# Local preview: set SITE_URL to the real public URL before deployment.\nUser-agent: *\nDisallow: /\n';
  return new Response(content, {headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
