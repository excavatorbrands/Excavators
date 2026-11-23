# Iron Crest — Excavator Solutions

A responsive React + Vite website for **Iron Crest Excavator Solutions**, with a dedicated homepage and excavator brand directory. It brings eight excavator manufacturers into one multi-brand destination and follows the supplied visual reference: charcoal/black surfaces, construction-yellow accents, white typography, industrial imagery, product cards and a long scrolling homepage.

## Included pages

- **Home (`/`)** — the original homepage, preserved as a separate `src/Home.jsx` page component.
- **Brands (`/brands`)** — a dedicated manufacturer directory with search, excavator-size filters, interactive manufacturer selection, model browsing and a three-model comparison builder.

## Homepage features

- Custom Iron Crest logo mark and wordmark (SVG/React)
- Responsive header, utility bar, mobile navigation and search
- Hero section with original AI-generated quarry/excavator artwork
- Eight-brand strip: Hyundai, Doosan, Volvo, Hitachi, CAT, Fiatallis, Komatsu and SANY
- Five excavator categories
- Eight model cards with brand filters and model search
- Model detail / quote enquiry modal
- Expandable model comparison table
- Industry solutions, Iron Crest advantages, parts/service and catalog request sections
- Testimonials, latest updates, service network, newsletter and footer
- Responsive desktop, tablet and mobile styling
- Vercel configuration and GitHub-ready source structure

## Brands directory features

- Dedicated directory hero and manufacturer search
- Brand index for Hyundai, Doosan, Volvo, Hitachi, CAT, Fiatallis, Komatsu and SANY
- Interactive selected-brand profile with brand-specific model imagery
- Excavator model explorer with brand/model search and size filters
- Add/remove up to three models in the side-by-side comparison builder
- Parts/support, technical-document request, machine-guidance and dealer-assistance links
- Separate responsive styling in `src/brands.css`
- Directory-only visual assets organized in `public/images/brands/`

The video section is intentionally omitted for this first homepage version.

## Run locally

Use Node.js 18+ (Node.js 20+ recommended).

```bash
npm install
npm run dev
```

Vite will print a local development URL, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Upload to GitHub

1. Create a new empty repository on GitHub, for example `iron-crest-excavator-solutions`.
2. Open a terminal in this project folder.
3. Run:

```bash
git init
git add .
git commit -m "Create Iron Crest homepage"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/iron-crest-excavator-solutions.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username and use your repository URL.

## Deploy on Vercel

1. Sign in to Vercel and choose **Add New → Project**.
2. Import the GitHub repository you created above.
3. Vercel should detect Vite automatically. The included `vercel.json` uses:
   - Build command: `npm run build`
   - Output directory: `dist`
4. In the Vercel project settings, add the enquiry-service environment variables:
   - `RESEND_API_KEY` — the Resend API key; keep it private and configure it only in Vercel.
   - `RESEND_FROM_EMAIL` — a sender address on a domain verified with Resend.
   - `ENQUIRY_TO_EMAIL` — optional; defaults to `sales@ironcrest.com`.
5. Click **Deploy**. Future pushes to `main` will trigger a new deployment.

The contact and quote forms use the Vercel function at `/api/enquiries`. They cannot send enquiries until the required Resend settings are configured in Vercel. Do not commit credentials or add them to a client-side Vite variable.
The endpoint validates submitted fields and includes a basic honeypot. Configure Vercel Firewall rate limits or an equivalent anti-spam control before promoting the form widely.

## Before publishing commercially

- Replace the sample phone number, email address and Lahore location with Iron Crest's approved contact details.
- The model specifications and service-network figures are illustrative placeholders. Verify every model, configuration and specification with the manufacturer and replace all sample business statistics with confirmed Iron Crest data.
- Confirm the registered legal entity, postal address and governing law/jurisdiction in the legal pages before treating them as final.
- Configure and verify the Resend environment variables in Vercel before accepting online enquiries. The homepage newsletter signup is not connected to a mailing-list service.
- Replace the sample testimonial and news entries with approved, genuine content.
- Confirm permission and brand-guideline requirements before using manufacturer trademarks or logos commercially. The brand strip in this prototype uses text wordmarks.

## Main files

```text
iron-crest-site/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── public/
│   ├── favicon.svg
│   └── images/
│       └── brands/
│           ├── brand-directory-hero.webp
│           ├── brand-featured-excavator.webp
│           └── model-*.webp
└── src/
    ├── App.jsx
    ├── Home.jsx
    ├── BrandsPage.jsx
    ├── brands.css
    ├── data.js
    ├── main.jsx
    └── styles.css
```

## Iron Crest page routes

- `/` — Home
- `/brands` — Brands directory
- `/excavators` — Excavator catalog with availability controls
- `/parts-service` — Parts & Service
- `/solutions` — Industry Solutions
- `/resources` — Resources & guides
- `/about` — About Us
- `/contact` — Contact

All internal pages use the shared Iron Crest header and footer while each page has its own visual layout and content system.

## API tests

Run `npm run test:api` to test enquiry validation and email-provider delivery behavior.
