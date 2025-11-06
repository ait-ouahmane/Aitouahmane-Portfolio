# Ait Ouahmane Portfolio

This repository contains the personal portfolio for Ait Ouahmane Abderrahmane, a hardware design engineer specializing in mixed-signal PCB development, FPGA integration, and embedded systems.

The site is a single-page experience built with vanilla HTML, CSS, and JavaScript and tailored to highlight professional experience, featured projects, and certifications.

## Highlights
- Responsive layout with sidebar navigation and section-based content (`index.html`)
- Interactive project gallery with modal specs, block diagrams, and multi-layer imagery (`assets/js/script.js`)
- Formspree-powered contact form with inline validation (`assets/js/script.js`)
- Optimized media assets for portfolio storytelling (`assets/images`)

## Project Structure
- `index.html` – Primary markup for the entire site
- `assets/css/style.css` – Custom styling for layout, typography, and animations
- `assets/js/script.js` – UI interactions (sidebar toggle, portfolio modal, filters, form handling)
- `assets/images/` – Headshots, project renders, and supporting media
- `website-demo-image/` – Demo screenshots used for documentation

## Run Locally
1. Clone or download this repository.
2. Open `index.html` in your browser to view the site.

No build tools or dependencies are required.

## Editing Content
- **Sidebar / About / Resume**: Update the relevant sections directly in `index.html`.
- **Projects**: Each portfolio item stores its details using `data-` attributes. Update descriptions, specifications, and media paths on the `<li class="project-item">` elements under the portfolio section.
- **Contact Form**: Form submissions are routed through Formspree. Adjust the `action` attribute if you move to a different endpoint.
- **Blog**: The blog article remains in the markup but can be toggled on/off from the navigation for future use.

## Deployment
Because the site is static, you can host it on any static-friendly platform (GitHub Pages, Netlify, Vercel, etc.). Upload the full directory and point your domain to the deployed build.

## License
This project is released under the MIT License – see `LICENSE` for details.
