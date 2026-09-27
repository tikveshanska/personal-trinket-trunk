# Tea Tikveshanska — Product Management Portfolio (v1)

A tactile, zero-build personal portfolio designed for a Product Management candidate. Built with plain HTML, CSS, and vanilla JavaScript for immediate deployment to GitHub Pages.

---

## 🎨 Visual Identity & Metaphor

This site is an intentional fusion of two design worlds:
1. **Late-2000s / Early-2010s Desktop OS Chrome**: Top menu bar with live clock, draggable/closable windows, desktop icons, browser navigation chrome, system diagnostic widgets.
2. **Old-Tumblr Scrapbook Warmth**: Warm cream paper background (`#F2EAD8`), dot-grid patterns, postcard-style project showcase cards with vintage stamps, handwritten script accents (`Dancing Script`), and editorial serif typography (`Playfair Display`).

---

## 📁 Project Structure

```
portfolio-site/
├── index.html                # Main entry point & desktop canvas
├── README.md                 # Setup & customization documentation
├── data/
│   └── projects.json         # Array of PM project case studies & metadata
└── assets/
    ├── css/
    │   ├── reset.css         # Modern normalization reset
    │   ├── variables.css     # Color palette tokens, fonts, shadow tokens
    │   └── style.css         # Desktop OS chrome, windows, cards, responsive rules
    ├── js/
    │   ├── window-manager.js # Lightweight, zero-dependency window manager
    │   └── main.js           # Live clock, dynamic projects loader, menu events
    ├── icons/                # Vintage OS SVG icons (folder, terminal, mail, stamps)
    ├── textures/             # Dot-grid and graph paper textures
    └── images/
        ├── profile-portrait.jpg # Photo for the welcome scrapbook window
        └── projects/         # Project case study thumbnail illustrations
```

---

## 🚀 How to Run Locally

Because this project is built entirely with vanilla web standards, **no build step, npm, or bundler is required**.

### Method 1: Double-click `index.html`
Simply open `portfolio-site/index.html` directly in any modern web browser (Chrome, Firefox, Safari, Edge). The script includes an automated fallback for `projects.json` so it runs seamlessly even if your browser restricts local file fetching.

### Method 2: Local HTTP Server (Recommended)
If you have Python installed, you can spin up a quick server:

```bash
cd portfolio-site
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

---

## ✏️ How to Customize Your Content

All areas requiring your custom information are marked with obvious find-and-replace tags in the format `[PLACEHOLDER: description]`.

### 1. Update Bio & Contact Information
- Open `portfolio-site/index.html`:
  - Search for `[PLACEHOLDER: bio copy]` to customize your PM background, target industries, and philosophy.
  - Search for `[PLACEHOLDER: your-email@domain.com]` to set your real email address.
  - Search for `linkedin.com/in/yourname` to set your LinkedIn URL.
  - Attach your resume PDF to `portfolio-site/assets/` and update the download link.

### 2. Update or Add Case Studies
- Open `portfolio-site/data/projects.json`.
- Each project entry has the following structure:
  ```json
  {
    "id": "project-slug",
    "title": "Project Name",
    "summary": "One-line description",
    "role": "Your role on it",
    "problem": "What problem it addressed",
    "discovery": "User research and insights",
    "decisions": "Key trade-offs and scope triage",
    "outcome": "What happened / what you learned",
    "metrics": ["Key Metric 1", "Key Metric 2"],
    "tags": ["case-study", "b2c", "0-to-1"],
    "thumbnail": "assets/images/projects/project-slug.svg",
    "liveUrl": "https://wherever-it-is-hosted.com",
    "repoUrl": "https://github.com/you/project-slug"
  }
  ```
- Adding an entry here automatically updates both the **Projects Showcase Postcard Grid** and the **Top Menu → Projects** list without modifying the HTML!

### 3. Replace Profile Photo
- Replace `portfolio-site/assets/images/profile-portrait.jpg` with your own portrait photo.

---

## 🌐 Deploying to GitHub Pages

Target repository: `https://github.com/tikveshanska/personal-trinket-trunk.git`

1. Push the contents of `portfolio-site/` to your GitHub repository `main` branch.
2. Go to **Settings** → **Pages** in your GitHub repository.
3. Under **Branch**, select `main` and `/ (root)` (or `/docs` if you moved files there), then click **Save**.
4. GitHub Pages will deploy your site in ~1 minute at:
   `https://tikveshanska.github.io/personal-trinket-trunk/`
5. Note: All stylesheet, script, and image references use relative paths (`assets/...`), so the site works seamlessly whether hosted at root or on a GitHub Pages subpath.
