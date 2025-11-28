document.addEventListener('DOMContentLoaded', () => {
  // ========== HAMBURGER MENU ==========
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    });
  });

  // ========== NEWS SLIDER WITH ENHANCEMENTS ==========
  const slides = Array.from(document.querySelectorAll('.news-slider .slide'));
  const sliderEl = document.getElementById('news-slider');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');
  
  let activeIndex = 0;
  let sliderInterval;

  function initDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${index + 1}`);
      dot.addEventListener('click', () => showSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  function showSlide(index) {
    slides.forEach((s, i) => { s.classList.toggle('active', i === index); });
    document.querySelectorAll('.dot').forEach((dot, i) => { dot.classList.toggle('active', i === index); });
    activeIndex = index;
    clearInterval(sliderInterval);
    startAutoSlide();
  }

  function nextSlide() { activeIndex = (activeIndex + 1) % slides.length; showSlide(activeIndex); }
  function prevSlide() { activeIndex = (activeIndex - 1 + slides.length) % slides.length; showSlide(activeIndex); }
  function startAutoSlide() { sliderInterval = setInterval(nextSlide, 7000); }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  sliderEl.addEventListener('mouseenter', () => clearInterval(sliderInterval));
  sliderEl.addEventListener('mouseleave', startAutoSlide);
  sliderEl.addEventListener('touchstart', () => clearInterval(sliderInterval));
  sliderEl.addEventListener('touchend', startAutoSlide);

  sliderEl.addEventListener('click', (e) => {
    if (e.target === sliderEl || e.target.closest('.slide')) {
      const activeSlide = slides[activeIndex];
      window.open(activeSlide.dataset.url || 'https://www.motor1.com', '_blank');
    }
  });

  initDots();
  startAutoSlide();

  // ========== TOUCH SWIPE FOR SLIDER ==========
  let touchStartX = 0;
  sliderEl.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, false);
  sliderEl.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  }, false);

  // ========== iOS TAB NAVIGATION ==========
  const tabBtns = Array.from(document.querySelectorAll('.tab-btn'));
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const el = document.getElementById(btn.dataset.section);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    const newsSection = document.getElementById('news');
    const carsSection = document.getElementById('cars');
    const bikesSection = document.getElementById('bikes');

    if (newsSection && scrollY > newsSection.offsetTop && scrollY < carsSection.offsetTop) {
      tabBtns.forEach(b => b.classList.toggle('active', b.dataset.section === 'news'));
    } else if (carsSection && scrollY > carsSection.offsetTop && scrollY < bikesSection.offsetTop) {
      tabBtns.forEach(b => b.classList.toggle('active', b.dataset.section === 'cars'));
    } else if (bikesSection && scrollY > bikesSection.offsetTop) {
      tabBtns.forEach(b => b.classList.toggle('active', b.dataset.section === 'bikes'));
    }
  });

  // ========== BRAND MODAL WITH ENHANCED INFO ==========
  const brandCards = Array.from(document.querySelectorAll('.brand.card'));
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');
  const modalCarousel = document.getElementById('modal-carousel');
  const modalVisit = document.getElementById('modal-visit');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');

  function preventScroll(e) { e.preventDefault(); }

  function openModal(name, url, images, info = '') {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    
    modalTitle.textContent = name || 'Marke';
    modalDesc.textContent = info || `Entdecke ${name} – eine legendäre Marke mit außergewöhnlicher Performance und Stil.`;
    
    modalCarousel.innerHTML = '';
    if (images && images.length > 0) {
      images.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${name} image ${idx + 1}`;
        img.loading = 'lazy';
        modalCarousel.appendChild(img);
      });
    } else {
      const fallbackImg = document.createElement('img');
      fallbackImg.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop';
      fallbackImg.alt = `${name} image`;
      modalCarousel.appendChild(fallbackImg);
    }
    
    modalVisit.href = url || '#';
    modalVisit.textContent = `🔗 ${name || 'Marke'} besuchen`;
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventScroll, { passive: false });
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('touchmove', preventScroll);
  }

  brandCards.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name || 'Marke';
      const url = button.dataset.url || '#';
      let images = [];
      const info = button.dataset.info || '';
      
      try { images = JSON.parse(button.dataset.images); }
      catch (e) { images = ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop']; }
      
      openModal(name, url, images, info);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });

  modalCarousel.addEventListener('wheel', (e) => { e.preventDefault(); modalCarousel.scrollLeft += e.deltaY; }, { passive: false });

  let carouselTouchStart = 0;
  modalCarousel.addEventListener('touchstart', (e) => { carouselTouchStart = e.changedTouches[0].screenX; }, false);
  modalCarousel.addEventListener('touchend', (e) => {
    const carouselTouchEnd = e.changedTouches[0].screenX;
    if (carouselTouchEnd < carouselTouchStart - 50) modalCarousel.scrollLeft += 200;
    if (carouselTouchEnd > carouselTouchStart + 50) modalCarousel.scrollLeft -= 200;
  }, false);

  // ========== LAZY LOADING FOR IMAGES ==========
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.dataset.src) {
          entry.target.src = entry.target.dataset.src;
          imageObserver.unobserve(entry.target);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
  }

  // ========== PARALLAX SCROLL EFFECT ==========
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
      const distance = window.scrollY - el.offsetTop;
      el.style.backgroundPosition = `center ${distance * 0.5}px`;
    });

    const footer = document.getElementById('footer');
    const scrollPos = window.scrollY + window.innerHeight;
    if (scrollPos >= document.documentElement.scrollHeight - 200) {
      footer.classList.remove('hidden');
    } else {
      footer.classList.add('hidden');
    }
  });

  // ========== SMOOTH SCROLL TO SECTION ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ========== GRID ANIMATION ON LOAD ==========
  document.querySelectorAll('.brand-grid').forEach(grid => { grid.classList.add('active'); });

  // ========== PWA SERVICE WORKER ==========
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('✅ Service Worker registered'))
      .catch(err => console.warn('⚠️ Service Worker failed:', err));
  }

  // ========== DETECT DARK/LIGHT MODE ==========
  function setupTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.style.setProperty('--accent', '#ff0033');
    } else {
      document.documentElement.style.setProperty('--accent', '#c30b1b');
    }
  }
  setupTheme();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setupTheme);

  // ========== ADD ANIMATION TO BRAND CARDS ON SCROLL ==========
  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'scale-in 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) forwards';
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.brand.card').forEach(card => cardObserver.observe(card));
  }
});
