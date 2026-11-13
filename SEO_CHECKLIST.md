# SEO launch and maintenance checklist

This checklist is for the site owner. No credentials are needed by the project or this assistant. Search engines decide whether and how to show pages; neither indexing nor rankings are guaranteed.

## 1. Choose and verify the public URL

- Decide the canonical domain or use the real GitHub Pages project URL initially. Do not publish an invented domain.
- Set `SITE_URL` in `src/config.mjs` or the build environment. A full project URL is supported; `BASE_PATH` can override its path. The GitHub Actions workflow already supplies the Pages origin and base path.
- Without a configured public URL, local builds use `http://localhost:4321/`, emit `noindex, follow` and generate a robots file that disallows crawling. This is intentional preview behavior. Do not submit localhost, an example-domain test build or its sitemap to search engines.
- On a custom domain, configure the actual hostname in GitHub Pages, DNS and `public/CNAME`; enable HTTPS. Choose one preferred hostname and redirect alternatives through the hosting provider where supported.
- After deployment, inspect the served HTML: every page should have its own absolute canonical, matching Open Graph URL and absolute social image URL. Canonicals, sitemap URLs and internal paths should agree.
- Confirm all intended public pages return HTTP 200, missing pages return HTTP 404, and the 404 page carries `noindex`. A friendly 404 body must not become an HTTP 200 “soft 404”.
- Open the generated 1200×630 PNG at `images/social-share.png`. Social services can cache previews; use their supported refresh/debug tools if an old image persists.

## 2. Understand robots.txt on GitHub Pages

- On a custom domain, the generated file is at `https://your-domain/robots.txt` and advertises the correct sitemap.
- On a project deployment, the artifact is at `https://username.github.io/friction-classes/robots.txt`. Robots rules are host-root scoped: crawlers do **not** use that project-path file as the host's governing robots file. A repository cannot control `https://username.github.io/robots.txt` by writing inside its project directory.
- If you control the account-root Pages site, maintain a host-root robots file there, allow the project path and include the project's full sitemap URL. Do not overwrite rules for other projects. If you do not control it, inspect the host-root rules and submit the project sitemap directly in the webmaster tools.
- The generated file remains useful for a future custom domain; all public pages are crawlable by their HTML links and page-level directives unless host-root policies block them. Do not use robots blocking as a substitute for `noindex`.

Reference: [Google's robots.txt scope and location rules](https://developers.google.com/search/docs/crawling-indexing/robots/intro).

## 3. Google Search Console — owner action

- For an owned custom domain, create a **Domain property** and complete the DNS verification Google supplies. Keep that verification record in place.
- For a GitHub Pages project URL, use a **URL-prefix property** containing the full HTTPS project path. Choose a verification method offered for that property. If using an HTML verification file, put Google's exact supplied file in `public/`, rebuild and deploy; confirm the verification URL is reachable. A file belongs in the public directory, not inside an Astro page.
- If using an HTML verification meta tag instead, add the exact tag supplied by the service to the shared layout and preserve it. Do not install analytics just to verify ownership.
- Add the full deployed sitemap URL, including `/friction-classes/` for a project deployment. Check that Search Console can fetch it.
- Use URL Inspection on the homepage, NRI guide, a country guide, a grade guide and a Learn article. Compare declared and selected canonicals, crawl status and indexing eligibility.
- Request indexing for important new or substantially revised URLs through URL Inspection. Do not repeatedly resubmit an unchanged URL or treat a request as a promise of inclusion.
- Monitor indexing exclusions, crawl errors and search queries after launch. Local Lighthouse measurements are not real-user Core Web Vitals data; field reports need actual traffic and sufficient data.

References: [Ownership verification](https://support.google.com/webmasters/answer/9008080), [sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [requesting a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## 4. Bing Webmaster Tools — owner action

- Add the deployed URL in your own Bing Webmaster account. Use an offered ownership method, or import a verified Search Console property if that option is available in your account.
- For XML-file verification, place the exact supplied file in `public/`, rebuild and deploy. For DNS or meta verification, follow the instructions Bing gives for your property. Preserve the verification record or file.
- Submit the same absolute sitemap used for the public canonical URLs. Check its processing status.
- Use Bing's URL Inspection to review crawl, index and markup information. Request indexing through the available interface for important pages; submission does not guarantee inclusion.
- There is no automatic IndexNow key or third-party submission service in this project. Add one only if you choose to operate and maintain it.

References: [Bing verification methods](https://learn.microsoft.com/en-us/bingwebmaster/verifying-wordpress) (the method overview applies beyond WordPress), [Bing URL Inspection](https://www.bing.com/webmasters/help/url-inspection-55a30305).

## 5. Google Business Profile — only if eligible later

- Do **not** create a profile for the current online-only service. Incorporation, a domain, a phone number or a home mailing address alone does not establish eligibility.
- Revisit eligibility only if the business genuinely meets Google's in-person customer-contact requirements. If it later qualifies, the owner can create or claim the profile, use the real business details, follow verification and keep the details accurate.
- Do not invent an address, virtual office, service area, reviews, ratings or opening hours to obtain a listing. Do not add LocalBusiness structured data merely to seek local rankings.

Reference: [Google Business Profile eligibility](https://support.google.com/business/answer/7039811).

## 6. Check structured data without expecting a ranking benefit

- Run `npm test`: it validates the emitted JSON-LD against the site's strict Schema.org subset and checks entity fields against the actual config and visible FAQs.
- Once deployed, inspect sample URLs in [Schema.org Validator](https://validator.schema.org/). This can help detect vocabulary issues beyond the local contract.
- Google's [Rich Results Test](https://search.google.com/test/rich-results) tests only supported Google search features, not every valid Schema.org type. A valid EducationalOrganization, WebSite or Person entity is not a promise of a rich result.
- The requested FAQPage markup exists only on the main FAQ page and matches the displayed questions and answers. Google discontinued FAQ rich results in May 2026 and removed that feature's documentation in June 2026. Do not describe the markup as a way to obtain FAQ snippets. See [Google's documentation updates](https://developers.google.com/search/updates#june-2026).
- There are no regional language versions. Country guides are distinct English resources, so there is no hreflang cluster and no cross-country canonical consolidation.
- No LocalBusiness, address, review or rating markup is emitted. Person entries describe only the supplied mentor names, roles and study backgrounds; placeholder avatars are not presented as real photos.

## 7. Maintain useful content

- Review country sources, school-system wording and time-zone policies when facts change. `src/config.mjs` holds the explicitly reviewed date and dated comparison examples; update the review date only after a real editorial review.
- Confirm your Node runtime has current IANA time-zone data. Tests specifically cover Vancouver's 2026 change, Los Angeles winter time and London summer time. Revisit other jurisdictions when their policies change.
- Suggested class windows are illustrative overlap calculations, never availability promises. Keep their dates and qualifications visible.
- Update class guides when actual coverage changes. Do not claim all curricula teach a topic in the same class. Keep programme links and article links useful to parents.
- Add articles when you have a distinct question to answer, not merely to create more pages. Do not buy links, fabricate reviews or mass-produce near-identical regional pages.
- The sitemap intentionally omits invented `lastmod`, priority and change-frequency values. If adding `lastmod` later, use a genuine substantive content-change date.
- `security.txt` is absent because no monitored email is known. `llms.txt` and `humans.txt` are optional and have not been added. Their absence is not an SEO defect.

## 8. Measure after deployment and after substantial changes

- Run `npm run build`, `npm test`, the browser QA scripts, and `node scripts/lighthouse.mjs` against a production preview. The preview server defaults to port 4322 for Lighthouse, keeping the development server on 4321 separate.
- Record the real scores, settings, URLs, date and metrics from the saved reports. Do not suppress failing audits to reach a target.
- Re-run representative pages with PageSpeed Insights after launch. Treat Lighthouse as a repeatable lab signal, not a guarantee of user experience or a ranking result.
- Check the actual host's cache headers, HTTPS behavior and redirects; a localhost run cannot validate the deployed host or public search indexing.
