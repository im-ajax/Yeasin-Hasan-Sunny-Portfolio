# Md. Yeasin Hasan Sunny — Personal Developer Portfolio

A responsive, futuristic neon-themed personal portfolio website built with vanilla **HTML5**, **CSS3**, and **JavaScript**, dynamically integrated with the **GitHub REST API**.

**Live Site:** [https://im-ajax.github.io/Yeasin-Hasan-Sunny-Portfolio/](https://im-ajax.github.io/Yeasin-Hasan-Sunny-Portfolio/)

---

## Features

- **Futuristic Neon HUD Aesthetic:** Custom dark-mode interface featuring ultraviolet/violet neon glow effects, cyber-grid backgrounds, glassmorphic cards, and an animated HUD holographic photo frame.
- **Live GitHub Integration (`script.js`):**
  - Automatically fetches real-time public repository counts and follower stats via `https://api.github.com/users/im-ajax`.
  - Dynamically populates the **Projects** section with the latest non-forked GitHub repositories, primary programming languages, and direct repository links.
- **Responsive Mobile-First Layout:** Optimized for all screen sizes—including tall 20:9 mobile viewports (such as the Motorola Edge 50 Neo)—with a collapsible mobile navigation menu and fluid stats layout.
- **Interactive Contact Form:** Client-side input validation (name, email format, and message checks) that formats and launches a pre-filled `mailto:` email draft.
- **Scroll-Reveal Animations & Accessibility:** Uses `IntersectionObserver` for smooth section transitions and respects `prefers-reduced-motion` system settings.

---

## Tech Stack

- **Structure:** Semantic HTML5
- **Styling:** Custom CSS3 (CSS Variables, Flexbox, CSS Grid, Keyframe Animations, Backdrop Blur)
- **Scripting:** Vanilla JavaScript (ES5/ES6+, Fetch API, DOM Manipulation, Intersection Observer API)
- **Typography:** [Orbitron](https://fonts.google.com/specimen/Orbitron), [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans), and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts
- **Icons:** [Devicon](https://devicon.dev/) & custom inline SVGs

---

## Project Structure

```text
Yeasin-Hasan-Sunny-Portfolio/
├── index.html      # Main HTML structure (Hero, About, Education, Experience, Skills, Projects, Contact)
├── styles.css      # Futuristic purple neon theme, animations, and responsive breakpoints
├── script.js       # Mobile navigation, scroll reveal, GitHub API fetch, and form validation
├── photo.jpg       # Local profile photo fallback (defaults to GitHub avatar if absent)
└── README.md       # Project documentation