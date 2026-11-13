# SEO implementation and measured results

Measured locally on 13 November 2026. No deployment, search-console submission, indexing or ranking outcome is claimed.

## Content and technical checks

The site now has 29 HTML pages: the original 12, six distinct country guides, three class-band guides, a Learn index and seven parent articles. The existing NRI page is the pillar. The sitemap contains 28 pages and excludes the noindex 404.

All 29 pages pass unique title/description checks (titles 33–57 characters; descriptions 118–144), canonical/OG/Twitter checks, one-H1 and heading-order checks, local link/asset/fragment validation, image attributes, and structured-data validation. There are 1,283 checked local references, 92 JSON-LD entities and no orphan sitemap pages. The original 1200×630 social image is generated automatically before builds.

JSON-LD validation uses AJV with a strict local Schema.org subset plus consistency checks against config and visible content. This is not a claimed run of Google's Rich Results Test or Schema.org's hosted validator. Only EducationalOrganization, WebSite, BreadcrumbList, factual mentor Person entries and the requested FAQPage are emitted. See the owner checklist for post-deployment validation and current FAQ-rich-result limitations.

Three URL profiles passed: default non-indexable localhost, public root (`https://friction.example/`, a reserved test hostname), and GitHub-style project path (`https://example.github.io/friction-classes/`). Reports: [local](seo-validation.json), [public root](seo-public.json), [project path](seo-project.json). Project-path robots.txt cannot govern the GitHub host root; that hosting limitation is documented in [SEO_CHECKLIST.md](../SEO_CHECKLIST.md).

## Lighthouse mobile

Lighthouse 13.6.0, Chromium, default simulated mobile settings: 412×823 viewport, device scale 1.75, 150 ms RTT, approximately 1.6 Mbps throughput and 4× CPU slowdown. All four requested categories were enabled; no audits were suppressed. These are localhost lab measurements of production builds, not deployed HTTPS/cache behavior or real-user field data. Public-mode measurements use the reserved canonical fixture `friction.example`; it is not the business's domain.

| Page | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home, after deferred reveal initialization | 95 | 100 | 100 | 100 | 1.52 s | 255 ms | 0 |
| NRI pillar | 98 | 100 | 100 | 100 | 0.76 s | 161 ms | 0 |
| USA guide | 99 | 100 | 100 | 100 | 0.76 s | 149 ms | 0 |
| Classes 1–3 | 97 | 100 | 100 | 100 | 0.76 s | 207 ms | 0 |
| Choosing a tutor | 100 | 100 | 100 | 100 | 0.76 s | 28 ms | 0 |
| Contact | 94 | 100 | 100 | 100 | 0.76 s | 279 ms | 0 |
| FAQ | 100 | 100 | 100 | 100 | 0.77 s | 69 ms | 0 |

The six inner-page results are from the [seven-page run](lighthouse/summary.json). That run measured home at **83**, with 675 ms blocking time. The home-specific follow-up after changing reveal initialization measured **95**; its unmodified [HTML report](lighthouse-reveals/home.html), [JSON report](lighthouse-reveals/home.json) and [summary](lighthouse-reveals/summary.json) are retained separately. The inner-page measurements predate that small shared motion change; their content, fonts and styling were unchanged. This table is not a claim that every page or repeated run scores 90+.

Earlier measurements are retained rather than discarded: initial home Performance 82/86, font consolidation 85, and deferred layout 93. Variability prompted the further reveal-observer fix. Reports are in `lighthouse-local/`, `lighthouse-fonts/` and `lighthouse-layout/`. Local-mode SEO was **69**, because preview builds deliberately emit noindex and disallow crawling. That is expected; local SEO 69 must not be presented as 100. Public-mode runs enable real crawlability directives through configuration rather than disabling the crawlability audit.

Optimizations: a single self-hosted variable body font, Latin-only heading fonts, critical font/art preloads, explicit image dimensions, static HTML with small progressive-enhancement scripts, deferred distant home-section layout, and reveal observers initialized as sections approach the viewport. No content was removed to improve a score.

## Browser and build checks

- Astro/TypeScript: zero errors, warnings or hints; 29 pages built.
- 174 page/viewport/theme checks across 320, 390 and 1440 px; no horizontal overflow, broken images or browser errors.
- 116 axe WCAG A/AA audits: zero reported violations. Two additional mentor-page audits at 430 px also pass.
- 70 additional breakpoint checks at 430, 600, 768, 1024 and 1920 px.
- Theme persistence, mobile menu/Escape, FAQs, form validation and encoded WhatsApp destinations pass. WhatsApp opening was intercepted; no message was sent.
- No-JavaScript content and direct WhatsApp CTA pass.
- Dependency audit: zero reported vulnerabilities.

The final motion check is recorded in `motion-results.json`. Home full-page screenshots explicitly render off-screen sections for capture after checking real scrolling; Lighthouse never uses that screenshot override. Automated accessibility checks are not a certification. Chromium QA does not replace Safari/Firefox or physical-device checks.

## Owner's remaining launch work

Choose/configure the real public URL, deploy, verify HTTPS and actual 404 status, then follow [SEO_CHECKLIST.md](../SEO_CHECKLIST.md) for Google Search Console, Bing Webmaster Tools and sitemap submission. Recheck Lighthouse on the actual public host. An online-only service is not currently eligible for a Google Business Profile; revisit only if the real business later meets the in-person eligibility rules. No credentials were requested or stored.
