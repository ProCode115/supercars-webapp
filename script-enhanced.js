document.addEventListener('DOMContentLoaded', () => {
  // ========== HAMBURGER MENU ==========
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });

  // Close menu when clicking on a link
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

  // Create dots for slider
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
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    activeIndex = index;
    clearInterval(sliderInterval);
    startAutoSlide();
  }

  function nextSlide() {
    activeIndex = (activeIndex + 1) % slides.length;
    showSlide(activeIndex);
  }

  function prevSlide() {
    activeIndex = (activeIndex - 1 + slides.length) % slides.length;
    showSlide(activeIndex);
  }

  function startAutoSlide() {
    sliderInterval = setInterval(nextSlide, 7000);
  }

  // Navigation button events
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Pause on hover/touch
  sliderEl.addEventListener('mouseenter', () => clearInterval(sliderInterval));
  sliderEl.addEventListener('mouseleave', startAutoSlide);
  sliderEl.addEventListener('touchstart', () => clearInterval(sliderInterval));
  sliderEl.addEventListener('touchend', startAutoSlide);

  // Click on slider to visit Motor1
  sliderEl.addEventListener('click', (e) => {
    if (e.target === sliderEl || e.target.closest('.slide')) {
      const activeSlide = slides[activeIndex];
      const url = activeSlide.dataset.url || 'https://www.motor1.com';
      window.open(url, '_blank');
    }
  });

  initDots();
  startAutoSlide();

  // ========== TOUCH SWIPE FOR SLIDER ==========
  let touchStartX = 0;
  let touchEndX = 0;

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  }

  sliderEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  sliderEl.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  // ========== iOS TAB NAVIGATION ==========
  const tabBtns = Array.from(document.querySelectorAll('.tab-btn'));
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs
      tabBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked tab
      btn.classList.add('active');
      
      // Scroll to section
      const section = btn.dataset.section;
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Update active tab on scroll
  window.addEventListener('scroll', () => {
    const newsSection = document.getElementById('news');
    const carsSection = document.getElementById('cars');
    const bikesSection = document.getElementById('bikes');

    const scrollY = window.scrollY + 200;

    if (newsSection && scrollY > newsSection.offsetTop && scrollY < carsSection.offsetTop) {
      updateActiveTab('news');
    } else if (carsSection && scrollY > carsSection.offsetTop && scrollY < bikesSection.offsetTop) {
      updateActiveTab('cars');
    } else if (bikesSection && scrollY > bikesSection.offsetTop) {
      updateActiveTab('bikes');
    }
  });

  function updateActiveTab(section) {
    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === section);
    });
  }

  // ========== BRAND MODAL WITH ENHANCED INFO ==========
  const brandCards = Array.from(document.querySelectorAll('.brand.card'));
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');
  const modalCarousel = document.getElementById('modal-carousel');
  const modalVisit = document.getElementById('modal-visit');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');

  // Prevent body scroll when modal is open
  function preventScroll(e) {
    e.preventDefault();
  }

  function openModal(name, url, images, info = '') {
    try {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      
      // Set title and description
      modalTitle.textContent = name || 'Marke';
      modalDesc.textContent = info || `Entdecke ${name} – eine legendäre Marke mit außergewöhnlicher Performance und Stil.`;
      
      // Clear and populate carousel
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
        // Fallback image if no images provided
        const fallbackImg = document.createElement('img');
        fallbackImg.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop';
        fallbackImg.alt = `${name} image`;
        modalCarousel.appendChild(fallbackImg);
      }
      
      // Set visit button
      modalVisit.href = url || '#';
      modalVisit.textContent = `🔗 ${name || 'Marke'} besuchen`;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', preventScroll, { passive: false });
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  }

  function closeModal() {
    try {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      
      // Allow body scroll
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', preventScroll);
    } catch (error) {
      console.error('Error closing modal:', error);
    }
  }

  brandCards.forEach(button => {
    button.addEventListener('click', (e) => {
      const name = button.dataset.name || 'Marke';
      const url = button.dataset.url || '#';
      let images = [];
      let info = button.dataset.info || '';
      
      try {
        images = JSON.parse(button.dataset.images);
      } catch (e) {
        images = ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop'];
      }
      
      openModal(name, url, images, info);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ========== SMOOTH WHEEL SCROLL IN MODAL ==========
  modalCarousel.addEventListener('wheel', (e) => {
    e.preventDefault();
    modalCarousel.scrollLeft += e.deltaY;
  }, { passive: false });

  // ========== SWIPE IN MODAL CAROUSEL ==========
  let carouselTouchStart = 0;
  let carouselTouchEnd = 0;

  modalCarousel.addEventListener('touchstart', (e) => {
    carouselTouchStart = e.changedTouches[0].screenX;
  }, false);

  modalCarousel.addEventListener('touchend', (e) => {
    carouselTouchEnd = e.changedTouches[0].screenX;
    if (carouselTouchEnd < carouselTouchStart - 50) {
      modalCarousel.scrollLeft += 200;
    }
    if (carouselTouchEnd > carouselTouchStart + 50) {
      modalCarousel.scrollLeft -= 200;
    }
  }, false);

  // ========== LAZY LOADING FOR IMAGES ==========
  function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  lazyLoadImages();

  // ========== PARALLAX SCROLL EFFECT ==========
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(el => {
      const scrollY = window.scrollY;
      const offsetTop = el.offsetTop;
      const distance = scrollY - offsetTop;
      el.style.backgroundPosition = `center ${distance * 0.5}px`;
    });

    // Fade footer in/out on scroll
    const footer = document.getElementById('footer');
    const scrollPos = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    
    if (scrollPos >= pageHeight - 200) {
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
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== GRID ANIMATION ON LOAD ==========
  const brandGrids = document.querySelectorAll('.brand-grid');
  brandGrids.forEach(grid => {
    grid.classList.add('active');
  });

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

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      setupTheme();
    });
  }

  setupTheme();

  // ========== ADD ANIMATION TO BRAND CARDS ON SCROLL ==========
  function setupCardAnimationOnScroll() {
    const cards = document.querySelectorAll('.brand.card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'scale-in 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) forwards';
        }
      });
    }, { threshold: 0.3 });

    cards.forEach(card => {
      observer.observe(card);
    });
  }

  setupCardAnimationOnScroll();

  // ========== INTERSECTION OBSERVER FOR FOOTER FADE ==========
  const footerObserver = new IntersectionObserver((entries) => {
    const footer = document.getElementById('footer');
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.remove('hidden');
      }
    });
  }, { threshold: 0.1 });

  const bottomSpacer = document.body;
  if (bottomSpacer) {
    footerObserver.observe(bottomSpacer);
  }
});
