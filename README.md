# supercars-webapp

Modern, minimalistische Auto-News Web-App (Premium Look) — Desktop & Mobile mit PWA-Unterstützung.

## Was ist enthalten
- `index.html` — Hauptseite mit Header, News-Banner, Marken-Grid und Footer
- `style.css` — Styling: Dark/Light Mode, responsive Grid, Animationen
- `script.js` — Funktionen: News-Slider, Hamburger-Menü, Modal, Service Worker Registrierung
- `manifest.json` & `sw.js` — Einfache PWA-Unterstützung
- `images/` — Platzhalter-Logos und Bilder (SVG)

## Installation & Test
1. Öffnen Sie das Verzeichnis in einem lokalen Webserver (z. B. mit Live Server oder `python -m http.server`).
2. Besuchen Sie `http://localhost:8000` oder die verwendete Portnummer.
3. Die App unterstützt Light/Dark-Mode anhand Ihrer Systemeinstellung; probieren Sie `prefers-color-scheme` aus.
4. Auf Mobilgeräten können Sie die App als PWA installieren (Add to Home Screen) — manifest und Service Worker wurden hinzugefügt.

## Hinweise
- Alle Marken-Bilder sind Platzhalter-SVGs und können später gegen echte Logos/Bilder ersetzt werden.
- Die Service Worker-Implementierung ist minimalistisch und sollte in Produktion erweitert werden (Cache-Versionierung, Offline-Fallbacks, etc.).
