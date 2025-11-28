document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });

  // News slider
  const slides = Array.from(document.querySelectorAll('.news-slider .slide'));
  let activeIndex = slides.findIndex(s => s.classList.contains('active')) || 0;
  function showSlide(index){
    slides.forEach((s,i) => {
      s.classList.toggle('active', i === index);
    });
  }
  function nextSlide(){
    activeIndex = (activeIndex + 1) % slides.length;
    showSlide(activeIndex);
  }
  let sliderInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  const sliderEl = document.getElementById('news-slider');
  sliderEl.addEventListener('mouseenter', () => clearInterval(sliderInterval));
  sliderEl.addEventListener('mouseleave', () => sliderInterval = setInterval(nextSlide, 5000));

  // Brand modal
  const brandCards = Array.from(document.querySelectorAll('.brand.card'));
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');
  const modalCarousel = document.getElementById('modal-carousel');
  const modalVisit = document.getElementById('modal-visit');

  function openModal(name, url, images){
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    modalCarousel.innerHTML = '';
    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${name} image`;
      modalCarousel.appendChild(img);
    });
    modalVisit.href = url || '#';
    modalVisit.textContent = `Besuche ${name}`;
  }

  function closeModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  brandCards.forEach(button => {
    button.addEventListener('click', (e) => {
      const name = button.dataset.name || 'Marke';
      const url = button.dataset.url || '#';
      let images = [];
      try { images = JSON.parse(button.dataset.images); } catch(e){ images = ['/images/icon-192.svg']; }
      openModal(name, url, images);
    });
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });

  // Smooth focus for modal images
  modalCarousel.addEventListener('wheel', (e)=>{
    modalCarousel.scrollLeft += e.deltaY;
  });

  // Register service worker for PWA
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').then(() => console.log('SW registered')).catch(err=>console.warn('SW failed', err));
  }
});
