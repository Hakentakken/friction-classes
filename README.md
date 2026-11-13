# Friction Classes

A complete static Astro marketing site for personalized one-on-one online tuition, Classes 1–9. Warm day and forest night themes, original SVG artwork, self-hosted DM Sans and Fraunces fonts, and minimal vanilla JavaScript. No backend, database, analytics, trackers or external form service.

## Run locally

Use Node.js 24 and npm. From this folder:

```powershell
npm ci
npm run dev
```

Open the local address printed by Astro. To check the production output:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
npm run build
npm test
npm run preview
```

`dist/` is the deployable static output. It is intentionally ignored by Git. Standard Astro `index.astro` and generated `index.html` filenames are required route entry points, not part of the brand name.

## Exactly where to edit

| Content                                                                                 | Location                                                                         |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Site name, tagline, phone, WhatsApp, **EMAIL**, final site URL, base path, social links | **`src/config.mjs`**, `site` object                                              |
| Subjects and their copy, grade bands, curricula, time zones                             | **`src/config.mjs`**, corresponding arrays                                       |
| Mentor names, institutions, disciplines and short bios                                  | **`src/config.mjs`**, `team` array                                               |
| FAQs and four learning steps                                                            | **`src/config.mjs`**, `faqs` and `steps`                                         |
| Home page text and section order                                                        | **`src/pages/index.astro`**                                                      |
| Other page headings and text, contact form, privacy and terms                           | **`src/pages/[page].astro`**                                                     |
| Closing invitation text                                                                 | **`src/components/Closing.astro`**                                               |
| Header, footer, theme and mobile navigation                                             | **`src/layouts/Layout.astro`**                                                   |
| Colours, typography, spacing, breakpoints and motion                                    | **`src/styles/global.css`**                                                      |
| Original main illustration                                                              | **`src/assets/images/learning-scene.svg`**                                       |
| Logo mark, standalone wordmark, favicon                                                 | **`src/components/Logo.astro`**, **`public/logo.svg`**, **`public/favicon.svg`** |

Unknown business values are marked `PLACEHOLDER` in **one central file: `src/config.mjs`**. `EMAIL`, `siteUrl` and `socialLinks` are empty deliberately. Do not invent an email or a final domain. All email elements are conditional and appear automatically once `EMAIL` is filled in. A canonical URL is emitted only when `siteUrl` is configured. Production deployment supplies the actual GitHub Pages origin and path automatically.

### Replace mentor placeholders with photos

Add these exact filenames, then rebuild:

```text
src/assets/team/vivek.jpg
src/assets/team/tamanna.jpg
src/assets/team/utsav.jpg
src/assets/team/manoranjan.jpg
src/assets/team/utkarsh.jpg
```

`src/components/Team.astro` discovers the JPG files at build time with `import.meta.glob`. No code change is needed. Missing files retain designed initial avatars. Use consented photos with the face comfortably centred; a square or portrait crop works well. For a new team member, add a `team` record with a unique lowercase `slug` and a matching `<slug>.jpg` file.

To replace the hero artwork later, place a local asset in `src/assets/images/`, update the `scene` import in `src/pages/index.astro`, and update its width, height and alternative text. Never hotlink images.

## Pages

Home, About, Programs, Subjects, Our Mentors, How It Works, For NRI Families, FAQ, Contact, Privacy, Terms, and a custom `404.html`. Every route is linked through the footer or contextual navigation. All local links and assets are base-aware.

The structural reference was [A.P.S. Online Academy](https://apsonlineacademy.in/): introductory offer, courses, approach, about, FAQs and contact. Only its page/section purposes were reviewed. This site's text, visual design, illustrations and code are original, and its section order follows the supplied brief. No testimonials, outcomes, statistics, institutional endorsements or prices were introduced.

## Contact behavior and privacy

- The primary CTA opens `https://wa.me/918076870866` with an encoded demo enquiry.
- The floating WhatsApp link uses the general enquiry from config.
- The form validates required fields and whitespace, constructs an encoded message, and opens WhatsApp. It does not send a message automatically.
- A visible fallback link appears if a new tab does not open. With JavaScript disabled, the direct WhatsApp and phone links remain available.
- Form contents are never saved to browser storage or a server by this website. Opening the prepared URL does pass the contents to WhatsApp and can put them in browser history; the privacy copy explains this.
- Only the chosen theme is saved locally, under `friction-theme`. System theme is used until a choice is saved, and the initial theme runs in the document head to avoid a theme flash.
- Time-zone clocks show current local times in representative cities, **not appointment availability**. They use IANA zones so daylight-saving changes follow the browser's time-zone data.

## GitHub Pages

The included `.github/workflows/pages.yml` installs from the lockfile, checks Astro/TypeScript, builds, verifies local links, uploads `dist/` and deploys with GitHub's Pages actions. It runs on pushes to `main` and manual dispatch. `.nojekyll` is included. No secrets or tokens belong in this repository.

GitHub CLI was not available on this machine, so remote repository creation, pushing and live Pages deployment could not be verified. The local repository is committed. To publish, install/authenticate the CLI yourself, then run the commands below from this folder. Authentication uses the browser flow; do not paste a token into chat.

```powershell
winget install --id GitHub.cli --exact
# Open a new terminal so gh is on PATH, then return to this folder.
gh auth login --web --git-protocol https
gh repo create friction-classes --public --source=. --remote=origin --push
$repo = gh repo view --json nameWithOwner --jq .nameWithOwner
gh api --method POST "repos/$repo/pages" -f build_type=workflow
gh workflow run pages.yml
gh run list --workflow pages.yml
```

If Pages is already enabled, the POST can report that it exists; use the repository's **Settings → Pages → Build and deployment → GitHub Actions**, then dispatch the workflow. The workflow's deployment output is the authoritative live URL. The repository name is `friction-classes`.

### Repository path and future custom domain

`src/config.mjs` accepts `SITE_URL` and `BASE_PATH` environment overrides. The workflow takes the origin and base path from `actions/configure-pages`, so it supports both `https://username.github.io/friction-classes/` and a future custom domain without editing links.

To test a project path locally:

```powershell
$env:BASE_PATH = '/friction-classes/'
$env:SITE_URL = 'https://example.github.io'
npm run build
npm test
npm run preview
# Visit http://localhost:4321/friction-classes/
# When finished, clear overrides before a normal local build:
Remove-Item Env:BASE_PATH
Remove-Item Env:SITE_URL
```

<!-- CNAME placeholder instructions: CNAME.placeholder is deliberately empty and outside public/. Do not deploy a blank or invented domain. Once the domain is chosen, write only the actual hostname into public/CNAME, configure that custom domain in GitHub Pages and set its DNS records. Do not put comments or a URL scheme inside public/CNAME. -->

`CNAME.placeholder` is deliberately empty and not published. When the actual domain is decided, create `public/CNAME` containing **only that hostname**, configure it in GitHub Pages and set the DNS records. Set `siteUrl` in the central config for local production builds if desired. The workflow uses the live Pages configuration. Keep `basePath` `/` for a custom-domain root. No domain has been assumed.

## Validation and screenshots

```powershell
npm run build
npm test
# With npm run preview running in another terminal:
npx playwright install chromium
node scripts/browser-qa.mjs
node scripts/breakpoint-qa.mjs
```

`scripts/verify.mjs` checks every generated local link, asset and fragment, all twelve pages, single H1 headings, skip links, hidden email and prohibited claim patterns. Run it with the same `BASE_PATH` used for the build.

`scripts/browser-qa.mjs` visits every page at 320px, 390px and 1440px in both themes; checks horizontal overflow, broken images and console errors; exercises persisted theme switching, mobile menu/Escape, FAQs, required/whitespace form validation and encoded WhatsApp destinations. It intercepts WhatsApp opening, so no message is sent. Full-page home, mentor and contact screenshots at mobile and desktop widths in both themes are saved to `qa/screenshots/`. The report is `qa/browser-results.txt`.

The same browser run audits all pages at 390px and 1440px in both themes with axe-core's WCAG 2.1 A/AA rules. Its findings are saved to `qa/accessibility-results.json`. Automated checks supplement visual and keyboard checks; they are not a claim of formal accessibility certification.

Additional breakpoint checks cover the home, mentor and contact pages at 430px, 600px, 768px, 1024px and 1920px in both themes, including heading clipping. See `qa/breakpoint-results.json`. Final local results: 12 built pages, 283 verified local references per deployment base, 72 main page/viewport/theme checks, 30 additional breakpoint checks, and no violations in 48 full-site plus two focused automated accessibility audits. Eighteen screenshots are saved, including both themes at mobile and desktop widths.

Live GitHub deployment, DNS/custom-domain ownership, a real WhatsApp handoff on a phone, and future real-photo crops cannot be verified locally. Browser QA is Chromium-based, not a complete Safari/Firefox or physical-device matrix. The supplied privacy and terms text describes this site's behavior and leaves future class arrangements to direct agreement.

## Project structure

```text
src/config.mjs          Business details and editable datasets
src/layouts/            Shared document, navigation and footer
src/components/         Reusable display components
src/pages/              Astro static pages
src/styles/             Plain responsive CSS
src/assets/images/      Original artwork and future local photos
src/assets/team/        Drop-in mentor JPGs
public/                 Logo, favicon and .nojekyll
scripts/                Build-link and browser verification
qa/                     Saved reports and screenshots
.github/workflows/      GitHub Pages CI and deployment
```
