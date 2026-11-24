# Original project audit

This report records the source archive's earlier audit. The refreshed website was built and tested separately after applying the redesign and replacing the imagery.

# Iron Crest ZIP Audit & Repair Report

**Project:** Iron Crest – Excavator Solutions  
**Audit date:** 2026-11-23  
**Stack identified:** React 18, Vite 6, JavaScript, CSS, Vercel serverless API, Resend email provider

## Scope completed

- Extracted and inspected the project archive and its application source/assets.
- Reviewed React page composition, navigation paths, enquiry form integration, API validation, Vercel configuration, package metadata, theme overrides, and local asset references.
- Checked relative imports and local image/CSS asset paths.
- Ran the API test suite and Node syntax checks for non-JSX JavaScript files.
- Applied targeted corrections while preserving the existing Iron Crest layout and visual identity.

## Corrections applied

1. **Theme contrast**
   - Darkened muted text in the light-theme overrides from `#77828a` to `#626e77`.
   - Darkened search placeholder text from `#89939a` to `#626e77`.
   - Darkened yellow-brown navigation/active text from `#9b7300` to `#8b6500`.
   - Darkened muted text in interior page styles from `#687680` to `#59656e`.
   - Darkened comparison drawer gold text and button surfaces from `#a87900`, `#b98200`, and `#d79f00` to `#8b6500` where used.
   - Updated the browser theme-color metadata to match the light page background (`#f6f7f8`).

2. **Parts enquiry routing**
   - Corrected the Parts & Service notification link from `?type=parts-launch-notification` to `?type=parts`.
   - The API accepts `parts` as a valid enquiry type; the previous value was not accepted by the contact form's allowed query types and would have fallen back to `equipment`.

3. **Page metadata**
   - Updated the `/resources`, `/about`, and `/about-us` page titles/descriptions so they no longer incorrectly identify those routes as “Contact Us”.

## Theme contrast spot checks

The following foreground/background combinations were checked using the WCAG contrast-ratio formula:

| Foreground | Background | Contrast | Result |
|---|---|---:|---|
| `#626e77` | `#f6f7f8` | 4.87:1 | Pass for normal text |
| `#59656e` | `#f4f6f7` | 5.52:1 | Pass for normal text |
| `#8b6500` | `#ffffff` | 5.30:1 | Pass for normal text |
| `#ffffff` | `#8b6500` | 5.30:1 | Pass for normal text |

These are targeted palette checks, not a full rendered-page WCAG certification. Image overlays, dynamically rendered states, and every individual component still require browser-based visual verification.

## Structural checks

- Relative source imports checked: no missing relative imports found.
- Local `/images/...` references checked: no missing image files found.
- Local CSS `url(...)` references checked: no missing local assets found.
- Project source/assets inspected: 91 files outside Git internals.

## Test results

### Passed
- `npm run test:api`: **4 tests passed, 0 failed**.
- `node --check` on plain JavaScript files (`api/*.js`, `src/*.js`, and `vite.config.js`): passed.

### Blocked / not verified
- `npm run build`: could not run because the Vite executable was not present in the extracted dependency installation.
- `npm ci` was attempted, but dependency installation did not complete in this environment. Consequently, the production build, JSX/TSX bundler validation, browser runtime, responsive screenshots, and end-to-end form submission could not be verified here.
- The Resend email delivery path requires valid deployment environment variables (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and optionally `ENQUIRY_TO_EMAIL`). API tests use a mocked provider and do not prove live email delivery.
- The README identifies sample contact details, specifications, and service-network figures that must be confirmed by the project owner before commercial publication.

## Final status

Targeted source, routing, theme-contrast, and static asset corrections have been applied. The API test suite and plain-JavaScript syntax checks pass. **A clean production build and full browser QA are not certified** because dependency installation was unavailable during this audit. Run `npm ci`, `npm run test:api`, and `npm run build` in an environment with npm registry access before deployment.
