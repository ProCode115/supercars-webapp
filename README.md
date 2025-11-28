# supercars-webapp

**Modern, hochwertige Auto-News & Supersportwagen Web-App mit iOS-Design** — Premium Feel, flüssige Animationen, vollständig interaktiv. Desktop & Mobile mit PWA-Unterstützung.

## ✨ Features

### 🎨 Hero-Banner mit News-Slider
- **Automatischer News-Rotations-Slider** alle 7 Sekunden mit Motor1-News
- **Manuelle Navigation** mit Pfeilen (< / >)
- **Animierte Slider-Dots** für schnelle Navigation
- **Click-to-Visit**: Klick auf Banner öffnet die Originalseite bei Motor1
- **Swipe-Gesten** auf mobilen Geräten
- **Pause on Hover**: Slider pausiert beim Hovern
- Animations: Slide-in, Fade, elegante Text-Überlagerung mit iOS-Style Fonts und Schatten
- Background-Gradient mit Parallax-Effekt

### 🚗 iOS-Style Tab Navigation (Bottom)
Fixierte Navigation unten wie native iOS-Apps:
- **🏁 Autos** — Grid mit Supersportwagen-Marken
- **🏍️ Motorräder** — Grid mit Motorrad-Marken
- **📰 News** — Hero-Banner Section
- Active-Tab Indikator mit Animations

### 🏢 Interaktive Marken-Grids
Erweitertes Brands-System mit:
- **7 Auto-Marken**: Ferrari, Porsche, Lamborghini, Bugatti, McLaren, Brabus, Koenigsegg
- **5 Motorrad-Marken**: Yamaha, Harley-Davidson, Ducati, Kawasaki, Suzuki
- Jedes Logo mit **Hover-Effekten**: Zoom, Schatten, Puls-Animation
- **Animierte Badges** (z.B. "NEU" bei Featured-Marken)
- **Staggered Grid-Animationen** beim Laden (Cascade-Effekt)

### 📱 Enhanced Modal & Bildergalerie
- **Info-Cards** mit Markenname, Beschreibung
- **Scrollbare Bildergalerie** mit Swipe-Gesten auf Touchgeräten
- **Smooth Carousel** mit Maus-Scroll/Touch-Swipe
- **"Besuchen"-Button** mit Emoji-Icon
- **Escape-Taste** zum Schließen

### ✨ Animations & UI-Enhancements
- **Parallax-Scrolling** für Banner & Hero-Elemente
- **Smooth Transitions** bei allen Buttons & Interaktionen
- **Card-Stile** mit abgerundeten Ecken, Schatten, transparenter Überlagerung
- **iOS-typische Glassmorphism** mit `backdrop-filter: blur()`
- **Pulsing-Glow-Effekte** bei New-Badges
- **Fade-in/Slide-in Animationen** für alle Sections
- Hover-Effekte mit 3D-Transforms

### 🎭 Hamburger-Menü
- **Slide-in Animation** (smooth cubic-bezier)
- **Smooth Transition** mit Menü-Links zu allen Sections
- **Touchscreen-freundlich** mit großem Hit-Area
- Automatisches Schließen beim Klick auf Links

### 🏛️ Sticky Header
- **Fixed Position** mit Glass-Effect (`backdrop-filter: blur`)
- **Gradient Background** mit eleganter Transparenz
- **Social Links** (Google, YouTube, Mobile)
- Responsive Design für alle Screen-Größen

### 🔗 Enhanced Footer
- **Fixiert unten** mit Glass-Effect
- **Links**: AGB, Datenschutz, Impressum
- **Social Media**: Instagram, YouTube, TikTok
- **Smart Fade**: Wird sichtbar am Ende der Seite
- **Responsive Layout** mit Umbruch auf Mobile

### 🌓 Dark/Light Mode
- **Automatische Erkennung** anhand `prefers-color-scheme`
- **Farbpalettenanpassung**: Grau/Schwarz/Weiß als Basis, Rot/Blau für Akzente
- **Smooth Transitions** bei Theme-Wechsel
- CSS-Variablen für einfache Anpassung

### 🚀 Performance & PWA
- **Lazy Loading** für Bilder mit IntersectionObserver
- **Service Worker** für Offline-Unterstützung & Caching
- **PWA-fähig**: Installierbar auf Homescreen (mobile)
- **Responsive Design**: Mobile-First, responsive Grid
- **Smooth Scroll** auf alle interaktiven Elemente

### 📱 Mobile Optimierungen
- **Touch-Gesten**: Swipe für Slider & Modal-Carousel
- **Responsive Grid**: 2-3 Spalten auf Mobile, mehr auf Desktop
- **Optimierte Tab-Navigation** für kleine Screens
- **Safe-Area-Insets** für Notch & Edge-to-Edge
- **Separate Mobile Breakpoints** für kleinere Geräte (<480px)

## 📁 Struktur

```
supercars-webapp/
├── index.html          — Hauptseite mit HTML-Struktur
├── style.css           — Umfangreiches CSS mit Animationen & Responsiveness
├── script-new.js       — Erweiterte JavaScript-Logik (Slider, Modal, Gesten, etc.)
├── manifest.json       — PWA-Manifest
├── sw.js               — Service Worker für Caching
├── README.md           — Diese Datei
└── images/             — Placeholder-Logos (SVG)
```

## 🚀 Verwendung

### Lokal starten
```bash
# Mit Python
python3 -m http.server 8000

# Mit Node.js / Live Server
npx live-server

# Mit PHP
php -S localhost:8000
```

Dann öffnen: `http://localhost:8000`

### PWA installieren (Mobile)
1. Besuche die App auf einem mobilen Gerät
2. Klick auf "Zum Homescreen hinzufügen" (iOS Safari) oder "App installieren" (Chrome/Android)
3. Die App startet dann wie eine native App

## 🎨 Customization

### Farben anpassen
In `style.css` Root-Variablen ändern:
```css
:root {
  --accent: #ff0033;      /* Rote Highlights */
  --bg: #000;             /* Dark Mode Background */
  --card: #0b0b0b;        /* Card Background */
}
```

### Marken hinzufügen
In `index.html` im `brand-grid`:
```html
<button class="brand card" data-name="Markenname" 
  data-url="https://..." 
  data-info="Beschreibung"
  data-images='["img1.jpg","img2.jpg"]'>
  <img src="logo.svg" alt="Markenname" />
</button>
```

### News-Artikel hinzufügen
Im `news-slider`:
```html
<article class="slide" data-url="https://motor1.com" 
  data-image="https://...">
  <h2>Neue News Titel</h2>
  <p>Beschreibung</p>
</article>
```

## 📋 Technologien

- **HTML5** — Semantische Struktur, Accessibility Attributes
- **CSS3** — Animationen, Grid, Flexbox, CSS Variables, Media Queries
- **JavaScript (ES6+)** — Event Listeners, IntersectionObserver, Service Workers
- **PWA** — Manifest, Service Worker, Installable App

## ⚡ Performance-Tips

- Bilder sind Platzhalter-SVGs (sehr klein)
- Für Produktion: echte Bilder mit Optimierung (WebP, Lazy-Loading)
- Service Worker Cache sollte versioniert werden
- Minifizierung von CSS/JS empfohlen

## 🔐 Responsiveness

| Device | Breakpoint | Columns |
|--------|-----------|---------|
| Desktop | > 1200px | 5-6 |
| Tablet | 720-1200px | 3-4 |
| Mobile | < 720px | 2 |
| Small Mobile | < 480px | 2 |

## 📝 Browser-Unterstützung

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (iOS 12+)
- ✅ Mobile Browser (Modern)

## 🎯 Hinweise

- Alle Marken-Bilder sind SVG-Platzhalter
- News-Bilder sind Unsplash URLs (öffentlich verfügbar)
- Service Worker ist minimal — für Produktion erweitern
- Keine externen Dependencies (Pure Vanilla JS/CSS)

---

**Genießt eure Premium Auto-News App! 🚗⚡**
