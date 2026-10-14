# Dr. Farhan Aman — Medical Professional Portfolio

A high-performance, elegant, accessible, and production-ready personal portfolio website for **Dr. Farhan Aman**, an MBBS graduate and medical professional from Swabi, Khyber Pakhtunkhwa, Pakistan.

---

## 1. Project Overview

This website establishes a credible, academic online presence for Dr. Farhan Aman. It details his clinical training at Ayub Teaching Hospital, medical and surgical procedures, postgraduate qualifications, academic publications, and verified contact channels.

### Key Highlights
- **100% Pure Web Standards**: Crafted using modern **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**.
- **No Build Tools or Frameworks**: Zero `npm`, `webpack`, `vite`, `React`, or CSS preprocessors required.
- **Deploy Anywhere Instantly**: Designed for seamless zero-configuration hosting on **Vercel** and **GitHub Pages**.
- **Strict Factual Accuracy**: Grounded exclusively in Dr. Farhan Aman's documented CV with zero fabricated statistics, patient reviews, or unverified claims.
- **WCAG 2.1 AA Compliant**: Semantic HTML landmarks, clear focus states, high contrast ratios, accessible modals, and support for `prefers-reduced-motion`.

---

## 2. Directory Structure

```
farhan-aman-portfolio/
│
├── index.html                   # Primary semantic HTML5 webpage
├── favicon.svg                  # Root vector medical monogram favicon
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # XML sitemap for search engines
├── README.md                    # Comprehensive documentation and deployment guide
│
└── assets/
    ├── css/
    │   └── style.css            # Modular design system and responsive CSS
    ├── js/
    │   └── script.js            # Vanilla JavaScript interactions and clipboard utilities
    ├── images/
    │   ├── favicon.svg          # Localized SVG monogram favicon
    │   └── doctor-profile.jpg   # [Optional] Drop real portrait here to replace CSS initials
    └── documents/
        ├── PLACE_CV_HERE.txt    # Instructions for CV PDF placement
        └── dr-farhan-aman-cv.pdf # [Optional] Official CV PDF file
```

---

## 3. Design Tokens & Professional Dark Mode (Default)

The website natively opens in a **High-End Clinical Dark Mode** engineered for modern ophthalmological and medical reading comfort, with a one-click toggle to Light Mode:

| Element | Dark Mode (Default) | Light Mode | Clinical Purpose |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#091514` | `#F8FAF9` | Deep obsidian teal minimizing glare during clinical review |
| **Card Surface** | `#0F2221` | `#FFFFFF` | Elevated card surfaces with soft ambient borders |
| **Primary Headings** | `#E6F4F1` | `#123B3A` | Luminous, high-contrast academic editorial headings |
| **Clinical Accent** | `#23B0A8` | `#167D78` | Vibrant surgical teal for primary actions and highlights |
| **Mint Glow / Tint** | `rgba(35, 176, 168, 0.16)` | `#EAF5F2` | Subtle badges, tag backgrounds, and icon containers |
| **Primary Text** | `#D2E4E1` | `#172A2A` | Soft, fatigue-free typographic contrast |
| **Secondary Text** | `#8AA7A3` | `#647575` | Muted clinical meta text, dates, and subtitles |
| **Hairline Borders** | `rgba(45, 105, 100, 0.38)` | `#DFE8E5` | Clean micro-separators defining card geometry |

---

## 4. Customization & Adding Assets

### A. Adding the Official Profile Photograph
The portfolio includes an SVG/CSS initials portrait with doctor motifs. To display Dr. Farhan's authentic photograph:
1. Save your photograph as:
   ```
   assets/images/doctor-profile.jpg
   ```
2. The portfolio's script will automatically detect the image and display it smoothly without any code edits.

### B. Adding the Official CV PDF
The "Download CV" button is pre-wired to look for:
```
assets/documents/dr-farhan-aman-cv.pdf
```
- When the PDF is placed in this directory, clicking **"Download CV"** triggers an instant direct download named `Dr-Farhan-Aman-CV.pdf`.
- If the file is not yet uploaded, clicking the button presents an accessible informational dialog guiding visitors to request it directly via email.

### C. Updating Production Domain (Canonical & Sitemap)
Before launching on your custom domain (e.g., `https://drfarhanaman.com/`):
1. In `index.html`: Update the canonical URL and Open Graph URLs:
   ```html
   <link rel="canonical" href="https://your-domain.com/">
   <meta property="og:url" content="https://your-domain.com/">
   ```
2. In `sitemap.xml`: Update the `<loc>` URL:
   ```xml
   <loc>https://your-domain.com/</loc>
   ```
3. In `robots.txt`: Update the `Sitemap:` directive:
   ```txt
   Sitemap: https://your-domain.com/sitemap.xml
   ```

---

## 5. Deployment Instructions

### Option 1: Vercel (Recommended)
1. Push this repository to GitHub or upload the folder to your Vercel dashboard.
2. In the Vercel project configuration:
   - **Framework Preset**: Select `Other` (or leave default static).
   - **Root Directory**: `./` (current directory).
   - **Build Command**: Leave completely empty.
   - **Output Directory**: Leave completely empty.
3. Click **Deploy**. The site will be instantly live with global CDN caching.

### Option 2: GitHub Pages
1. Push the code to a GitHub repository (e.g. `farhan-aman-portfolio`).
2. Go to repository **Settings** &rarr; **Pages**.
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Within 1–2 minutes, your website will be live at `https://<your-username>.github.io/<repo-name>/`.
> *Note: All assets use relative paths, ensuring complete compatibility with GitHub Pages subpaths.*

---

## 6. Verification Against Requirements

- [x] **Pure Static Web Stack**: HTML5, CSS3, ES6+ Vanilla JS only.
- [x] **No Frameworks or Dependencies**: Zero npm/build-tool dependencies.
- [x] **Full Clinical Timeline**: 1-Year House Job at Ayub Teaching Hospital (ENT, Pediatrics, Surgery, Medicine).
- [x] **Dedicated ICU Rotation**: Distinct subsection for 1-month ICU rotation at Ayub Medical College.
- [x] **Postgraduate Examinations**: Verified FCPS Part I (Medicine) and Registered Medical Practitioner status.
- [x] **Peer-Reviewed Publication**: Direct DOI link (`https://doi.org/10.69656/pjp.v21i1.1718`) opening in a secure new tab.
- [x] **Procedural Statement**: CV-supported callout documenting multiple intubations and IV cannula placements without misleading percentage bars.
- [x] **Interactive Actions**: One-click copy email with visual toast notification, direct phone `tel:` links, and safe CV download fallback.
- [x] **Accessibility & SEO**: Semantic landmarks, keyboard navigation, visible focus rings, reduced-motion preferences, schema.org JSON-LD, robots.txt, and sitemap.xml.
