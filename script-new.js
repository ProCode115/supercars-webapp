// ========== AUTOVERSE - PREMIUM AUTO NEWS WEB APP ========== //

// Configuration
const CONFIG = {
  sliderAutoPlayInterval: 5000,
  animationDuration: 300,
};

// App State
const APP = {
  currentSlide: 0,
  isMenuOpen: false,
  currentFilter: 'all',
  isDarkMode: true,
};

// Mock News Data
const NEWS_DATA = [
  {
    id: 1,
    title: 'Ferrari 296 GTB — Neue Hybrid-Ära',
    desc: 'Der neue V6-Hybrid mit 830 PS und revolutionärer Technologie.',
    image: 'https://images.unsplash.com/photo-1574802394900-bb163fac50c1?w=800&h=400&fit=crop',
    badge: 'HYBRID',
    category: 'launches',
  },
  {
    id: 2,
    title: 'Porsche 911 GT3 RS — Track Beast',
    desc: 'Extreme Aerodynamik mit 525 PS. Perfekt für die Rennstrecke.',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=400&fit=crop',
    badge: 'REVIEW',
    category: 'reviews',
  },
  {
    id: 3,
    title: 'Lamborghini Revuelto — Die Zukunft',
    desc: 'Erstes Hybrid-Flaggschiff mit atemberaubender Linienführung.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop',
    badge: 'HYBRID',
    category: 'launches',
  },
  {
    id: 4,
    title: 'McLaren 750S — British Excellence',
    desc: 'Neue Performance-Ikone mit revolutionärem Design.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=400&fit=crop',
    badge: 'SPECS',
    category: 'specs',
  },
  {
    id: 5,
    title: 'Bugatti Bolide — Hypercar Vision',
    desc: 'Das Meisterwerk der Hypercar-Technologie.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=400&fit=crop',
    badge: 'HYPERCAR',
    category: 'launches',
  },
  {
    id: 6,
    title: 'BMW M440i — Performance Design',
    desc: 'Neue Ära des M-Designs mit Hybrid-Antrieb.',
    image: 'https://images.unsplash.com/photo-1553882900-f2b6fc913f5b?w=800&h=400&fit=crop',
    badge: 'REVIEW',
    category: 'reviews',
  },
  {
    id: 7,
    title: 'Brabus G900 — Ultimate Power',
    desc: 'Mercedes G-Klasse mit 900 PS Tuning.',
    image: 'https://images.unsplash.com/photo-1561584142-0c7da83e0aed?w=800&h=400&fit=crop',
    badge: 'TUNING',
    category: 'specs',
  },
  {
    id: 8,
    title: 'Koenigsegg Jesko — Swedish Masterpiece',
    desc: 'Das ultimative Hypercar-Erlebnis.',
    image: 'https://images.unsplash.com/photo-1522869635100-ce306c8b3c92?w=800&h=400&fit=crop',
    badge: 'HYPERCAR',
    category: 'launches',
  },
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHeroSlider();
  initTrendingNews();
  initNewsFeeds();
  initBrands();
  initTabNavigation();
  initSearch();
  initTheme();
  initModal();
});

// ========== HEADER & NAVIGATION ========== //
function initHeader() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  const menuClose = document.getElementById('menu-close');
  const menuLinks = document.querySelectorAll('.menu-link');

  hamburger.addEventListener('click', () => {
    APP.isMenuOpen = !APP.isMenuOpen;
    menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', APP.isMenuOpen);
  });

  menuClose.addEventListener('click', () => {
    APP.isMenuOpen = false;
    menu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      APP.isMenuOpen = false;
      menu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

// ========== HERO SLIDER ========== //
function initHeroSlider() {
  const prevBtn = document.getElementById('featured-prev');
  const nextBtn = document.getElementById('featured-next');
  const sliderTrack = document.getElementById('slider-track');
  const dotsContainer = document.getElementById('featured-dots');

  function updateSlider() {
    const items = sliderTrack.querySelectorAll('.slider-item');
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    items.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    items[APP.currentSlide].classList.add('active');
    dots[APP.currentSlide].classList.add('active');
    sliderTrack.style.transform = `translateX(-${APP.currentSlide * 100}%)`;
  }

  function nextSlide() {
    APP.currentSlide = (APP.currentSlide + 1) % NEWS_DATA.slice(0, 6).length;
    updateSlider();
  }

  function prevSlide() {
    APP.currentSlide = (APP.currentSlide - 1 + NEWS_DATA.slice(0, 6).length) % NEWS_DATA.slice(0, 6).length;
    updateSlider();
  }

  function goToSlide(i) {
    APP.currentSlide = i;
    updateSlider();
  }

  // Create slider items
  NEWS_DATA.slice(0, 6).forEach((news, i) => {
    const item = document.createElement('div');
    item.className = `slider-item ${i === 0 ? 'active' : ''}`;
    item.style.backgroundImage = `url('${news.image}')`;
    item.innerHTML = `
      <div class="slider-item-content">
        <h2>${news.title}</h2>
        <p>${news.desc}</p>
      </div>
    `;
    sliderTrack.appendChild(item);
  });

  // Create dots
  NEWS_DATA.slice(0, 6).forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Auto-rotate
  setInterval(nextSlide, CONFIG.sliderAutoPlayInterval);
}

// ========== TRENDING NEWS ========== //
function initTrendingNews() {
  const container = document.getElementById('trending-news');
  const refreshBtn = document.getElementById('refresh-trending');

  function renderTrendingCards() {
    container.innerHTML = NEWS_DATA.slice(0, 6).map(news => `
      <div class="news-card" data-news-id="${news.id}">
        <div class="news-image" style="background-image: url('${news.image}')"></div>
        <div class="news-content">
          <span class="news-badge">${news.badge}</span>
          <h3 class="news-title">${news.title}</h3>
          <span class="news-meta">Auto • ${new Date().toLocaleDateString('de-DE')}</span>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.news-card').forEach(card => {
      card.addEventListener('click', () => showNewsModal(parseInt(card.dataset.newsId)));
    });
  }

  renderTrendingCards();

  refreshBtn.addEventListener('click', () => {
    refreshBtn.style.animation = 'none';
    setTimeout(() => {
      refreshBtn.style.animation = '';
      showToast('✅ News aktualisiert!');
    }, 10);
  });
}

// ========== NEWS FEED ========== //
function initNewsFeeds() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const newsFeed = document.getElementById('news-feed');
  const loadMoreBtn = document.getElementById('load-more');

  function renderNewsFeed() {
    const filtered = APP.currentFilter === 'all' 
      ? NEWS_DATA 
      : NEWS_DATA.filter(n => n.category === APP.currentFilter);

    newsFeed.innerHTML = filtered.map(news => `
      <div class="feed-item" data-news-id="${news.id}">
        <div class="feed-image" style="background-image: url('${news.image}')"></div>
        <div class="feed-content">
          <h3 class="feed-title">${news.title}</h3>
          <p class="feed-desc">${news.desc}</p>
          <div class="feed-meta">
            <span class="feed-badge">${news.badge}</span>
            <span>${new Date().toLocaleDateString('de-DE')}</span>
          </div>
        </div>
      </div>
    `).join('');

    newsFeed.querySelectorAll('.feed-item').forEach(item => {
      item.addEventListener('click', () => showNewsModal(parseInt(item.dataset.newsId)));
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      APP.currentFilter = tab.dataset.filter;
      renderNewsFeed();
    });
  });

  loadMoreBtn.addEventListener('click', () => {
    showToast('📚 Weitere News laden...');
    setTimeout(() => {
      renderNewsFeed();
      showToast('✅ News geladen!');
    }, 1000);
  });

  renderNewsFeed();
}

// ========== BRANDS ========== //
function initBrands() {
  const brandGrid = document.getElementById('brand-grid');
  const BRANDS = [
    { name: 'Ferrari', emoji: '🔴' },
    { name: 'Porsche', emoji: '🏁' },
    { name: 'Lamborghini', emoji: '⚡' },
    { name: 'Bugatti', emoji: '💎' },
    { name: 'McLaren', emoji: '🇬🇧' },
    { name: 'Brabus', emoji: '🔧' },
    { name: 'Koenigsegg', emoji: '🇸🇪' },
    { name: 'BMW', emoji: '⚪' },
    { name: 'Mercedes', emoji: '⭐' },
    { name: 'Audi', emoji: '🔲' },
    { name: 'Bentley', emoji: '👑' },
    { name: 'Rolls-Royce', emoji: '✨' },
  ];

  brandGrid.innerHTML = BRANDS.map(brand => `
    <div class="brand-card" data-brand="${brand.name}">
      <div class="brand-logo">${brand.emoji}</div>
      <div class="brand-name">${brand.name}</div>
    </div>
  `).join('');

  brandGrid.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('click', () => {
      const brand = card.dataset.brand;
      showToast(`🏁 ${brand} ausgewählt`);
    });
  });
}

// ========== TAB NAVIGATION ========== //
function initTabNavigation() {
  const tabBtns = document.querySelectorAll('.tab-btn');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      const element = document.getElementById(section);
      
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========== SEARCH ========== //
function initSearch() {
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  searchBtn.addEventListener('click', () => {
    searchModal.classList.add('active');
    searchInput.focus();
  });

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove('active');
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    const results = NEWS_DATA.filter(n => 
      n.title.toLowerCase().includes(query) ||
      n.desc.toLowerCase().includes(query)
    );

    searchResults.innerHTML = results.length === 0 
      ? '<p style="color: var(--text-muted); padding: 12px;">Keine Ergebnisse gefunden</p>'
      : results.map(n => `
        <div class="feed-item" style="margin-bottom: 8px; cursor: pointer;" data-news-id="${n.id}">
          <div class="feed-image" style="background-image: url('${n.image}'); min-width: 80px; height: 80px; border-radius: 8px;"></div>
          <div class="feed-content">
            <h3 class="feed-title">${n.title}</h3>
            <p class="feed-desc">${n.desc}</p>
          </div>
        </div>
      `).join('');

    searchResults.querySelectorAll('.feed-item').forEach(item => {
      item.addEventListener('click', () => {
        showNewsModal(parseInt(item.dataset.newsId));
        searchModal.classList.remove('active');
      });
    });
  });
}

// ========== THEME ========== //
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  APP.isDarkMode = isDark;
  updateThemeIcon();

  themeToggle.addEventListener('click', () => {
    APP.isDarkMode = !APP.isDarkMode;
    document.documentElement.style.colorScheme = APP.isDarkMode ? 'dark' : 'light';
    updateThemeIcon();
  });

  function updateThemeIcon() {
    themeToggle.textContent = APP.isDarkMode ? '☀️' : '🌙';
  }
}

// ========== MODAL ========== //
function initModal() {
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');

  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
}

function showNewsModal(newsId) {
  const news = NEWS_DATA.find(n => n.id === newsId);
  if (!news) return;

  const modal = document.getElementById('modal');
  const modalInner = document.getElementById('modal-inner');

  modalInner.innerHTML = `
    <img src="${news.image}" style="width: 100%; border-radius: 12px; margin-bottom: 16px;" alt="${news.title}">
    <h2 style="font-size: 22px; margin-bottom: 8px; font-weight: 700;">${news.title}</h2>
    <p style="color: var(--text-muted); margin-bottom: 16px; line-height: 1.6;">${news.desc}</p>
    <div style="display: flex; gap: 8px; margin-bottom: 16px;">
      <span style="background: rgba(255, 0, 51, 0.1); color: var(--accent); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;">${news.badge}</span>
      <span style="color: var(--text-muted); font-size: 12px;">${new Date().toLocaleDateString('de-DE')}</span>
    </div>
    <p style="color: var(--text); font-size: 13px; line-height: 1.6; margin-bottom: 16px;">
      Entdecke alle technischen Details, Leistungsdaten und exklusive Informationen zu diesem Premium-Fahrzeug.
    </p>
  `;

  modal.classList.add('show');
}

// ========== TOAST NOTIFICATIONS ========== //
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastSlideOut 0.4s var(--easing) forwards';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ========== UTILS ========== //
function showLoading(show = true) {
  const spinner = document.getElementById('loading-spinner');
  spinner.classList.toggle('show', show);
}
// PWA Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('✅ Service Worker aktiv'))
    .catch(err => console.warn('⚠️ Service Worker Fehler:', err));
}

console.log('🚗 AutoVerse App geladen!');
