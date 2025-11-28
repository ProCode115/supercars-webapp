# 🛠️ Entwickler-Dokumentation

Diese Datei enthält technische Hinweise und Best Practices für die Weiterentwicklung der SuperCars-App.

## 📂 Dateienübersicht

### HTML (`index.html`)
- **Header**: Sticky Navigation mit Hamburger-Menü
- **News-Banner**: Hero-Slider mit Pfeilen und Dots
- **Main Content**: Zwei Brand-Grids (Autos & Motorräder)
- **Tab Navigation**: iOS-Style Bottom Tabs
- **Modal**: Enhanced mit Info-Section und Carousel
- **Footer**: Fixed mit Links und Social Media

**Wichtig**: Neue Elemente immer mit semantischen Tags (`<section>`, `<article>`) und Accessibility-Attributes (`aria-label`, `role`, etc.) hinzufügen.

### CSS (`style.css`)
- **CSS Variables** (`:root`) für einfache Theme-Anpassung
- **Animationen**: Keyframes für alle Transitions (`@keyframes fade-in-up`, etc.)
- **Responsive**: Mobile-First mit Breakpoints bei 720px und 480px
- **Glass-Effect**: `backdrop-filter: blur()` für modern Look

**Tipps**:
- Neue Animationen als `@keyframes` definieren
- Farben über CSS-Variablen anpassen (`var(--accent)`)
- Media Queries für Responsive-Design nutzen

### JavaScript (`script-new.js`)
- **Event Listeners**: Alle Interaktionen sind Event-basiert
- **IntersectionObserver**: Für Scroll-Animationen & Lazy-Loading
- **Service Worker**: PWA-Support mit `navigator.serviceWorker.register()`
- **Touch-Gesten**: Swipe-Events für Mobile

**Architektur**:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM-Elemente selektieren
  // 2. State-Variablen definieren
  // 3. Funktionen definieren
  // 4. Event Listeners registrieren
  // 5. Initialisierung
});
```

## 🎯 Häufig vorgenommene Erweiterungen

### 1. Neue Marke hinzufügen

**HTML**:
```html
<button class="brand card" 
  data-name="BMW M Performance" 
  data-url="https://www.bmw.com/m"
  data-info="Deutsches High-Performance Engineered."
  data-images='["img1.jpg","img2.jpg"]'>
  <img src="logo-bmw.svg" alt="BMW" />
</button>
```

**Automatisch**: JavaScript funktioniert mit allen Brand-Buttons über das `click`-Event.

### 2. Neuen News-Artikel hinzufügen

**HTML**:
```html
<article class="slide" 
  data-url="https://www.motor1.com/article"
  data-image="https://...">
  <h2>Titel der News</h2>
  <p>Kurzbeschreibung</p>
</article>
```

**Beachte**: Der Slider erstellt automatisch neue Dots für jeden Slide.

### 3. Neue Tab hinzufügen

**HTML**:
```html
<button class="tab-btn" data-section="events">
  <span class="tab-icon">🎪</span>
  <span>Events</span>
</button>
```

**JavaScript**: Automatisch erkannt durch das `click`-Event. Erstelle eine neue Section mit `id="events"`.

### 4. Animation anpassen

**CSS**:
```css
@keyframes meine-animation {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.element {
  animation: meine-animation 0.6s cubic-bezier(0.2, 0.9, 0.3, 1);
}
```

## 🔧 Debugging-Tipps

### Console-Logs
```javascript
console.log('✅ Feature aktiviert');
console.warn('⚠️ Warnung');
console.error('❌ Fehler');
```

### Service Worker überprüfen
```javascript
navigator.serviceWorker.getRegistrations().then(regs => {
  console.log('Registered SWs:', regs);
});
```

### Scroll-Position debuggen
```javascript
window.addEventListener('scroll', () => {
  console.log('ScrollY:', window.scrollY);
});
```

### IntersectionObserver testen
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    console.log(`${entry.target.id} visible:`, entry.isIntersecting);
  });
});
```

## 🌐 API-Integration (Future)

Falls du Real-Time News vom Motor1 API integrationmöchtest:

```javascript
// Beispiel: Fetch News vom API
async function fetchMotor1News() {
  try {
    const response = await fetch('https://api.motor1.com/news');
    const data = await response.json();
    
    // Slider Update
    const slider = document.getElementById('news-slider');
    data.articles.forEach(article => {
      const slide = document.createElement('article');
      slide.className = 'slide';
      slide.dataset.url = article.url;
      slide.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.description}</p>
      `;
      slider.appendChild(slide);
    });
    
    // Dots neu initialisieren
    initDots();
  } catch (error) {
    console.error('Failed to fetch news:', error);
  }
}
```

## 🎨 Theme-Customization

### Dark Mode anpassen
```css
:root {
  --bg: #000;
  --card: #0b0b0b;
  --muted: #9aa3b2;
  --accent: #ff0033;
}
```

### Light Mode anpassen
```css
@media (prefers-color-scheme: light) {
  :root {
    --bg: #fff;
    --card: #f9f9fb;
    --muted: #546170;
    --accent: #c30b1b;
  }
}
```

## 📱 Mobile-Testing

### Viewport Meta-Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### Touch-Events für Mobile
```javascript
element.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  console.log('Touch at:', touch.clientX, touch.clientY);
});
```

### Responsive Bilder
```html
<!-- Für große Bilder -->
<img srcset="
  small.jpg 480w,
  medium.jpg 800w,
  large.jpg 1200w"
  sizes="(max-width: 480px) 100vw, 50vw"
  src="large.jpg" alt="..." />
```

## 🚀 Deployment

### Für GitHub Pages
```bash
# Push zu GitHub
git add .
git commit -m "Update: Neue Features"
git push origin main
```

App automatisch unter `https://username.github.io/supercars-webapp` verfügbar.

### Für eigenen Server
```bash
# SFTP Upload oder Git Clone
scp -r ./* user@server:/var/www/supercars-webapp/
```

## ⚡ Performance-Optimierungen

### 1. Bilder komprimieren
```bash
# Mit ImageMagick
convert image.jpg -quality 85 image-compressed.jpg

# Mit WebP
cwebp image.jpg -o image.webp
```

### 2. CSS/JS minifizieren
```bash
# CSS minification
cat style.css | sed 's/\/\*[^*]*\*\///' | tr -d '\n' > style.min.css

# JS minification (mit Terser oder ähnlich)
npx terser script-new.js -o script-new.min.js
```

### 3. Caching optimieren
In `sw.js`:
```javascript
const CACHE_VERSION = 'autonews-v2'; // Version erhöhen
const ASSETS = [
  './',
  'index.html',
  'style.css',
  'script-new.js',
  'manifest.json'
  // Weitere Assets hinzufügen
];
```

## 🧪 Testing

### Browser DevTools
- **Performance Tab**: Profiling & Flame Charts
- **Network Tab**: Ladezeiten & Cache
- **Lighthouse**: Performance Audit

### Responsive Design Tester
```
Chrome DevTools: F12 → Ctrl+Shift+M
```

## 📚 Externe Ressourcen

- **MDN Web Docs**: https://developer.mozilla.org
- **CSS-Tricks**: https://css-tricks.com
- **Web.dev**: https://web.dev
- **Can I Use**: https://caniuse.com

## 💡 Best Practices

1. **Accessibility**: Immer `aria-label`, `role`, etc. verwenden
2. **Performance**: Lazy Loading für Bilder, Minifizierung
3. **SEO**: Meta-Tags, Semantic HTML (`<article>`, `<section>`)
4. **Security**: HTTPS, CSP Header, XSS Prevention
5. **Testing**: Cross-Browser Testing (Chrome, Firefox, Safari, Edge)

---

**Happy Coding! 🚀**
