// === Lightbox Gallery ===
const galleryImages = [...document.querySelectorAll('.gallery-item')];
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeBtn = document.getElementById('closeBtn');

let currentGalleryIndex = 0;

function openGalleryLightbox(index) {
  currentGalleryIndex = index;
  lightboxImg.src = galleryImages[currentGalleryIndex].src;
  lightbox.classList.add('visible');
}

function closeGalleryLightbox() {
  lightbox.classList.remove('visible');
}

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => openGalleryLightbox(index));
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentGalleryIndex].src;
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentGalleryIndex].src;
});

closeBtn.addEventListener('click', closeGalleryLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeGalleryLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('visible')) return;
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'Escape') closeGalleryLightbox();
});

// === Hero Background Slideshow ===
const heroImages = [
  "https://www.alfaazphotography.com/wp-content/uploads/2019/11/Sabyasachi-Wedding-0221.jpg",
  "https://www.alfaazphotography.com/wp-content/uploads/2020/02/Indian-Wedding-Makeup-Artists-0055-2.jpg",
  "https://www.candidshutters.com/maintenance/wp-content/uploads/2024/06/Best-wedding-photographers-India-Top-5-destination-wedding-photographers-Indian-weddings-2.jpg",
  "https://ca-times.brightspotcdn.com/dims4/default/cf0b7bb/2147483647/strip/true/crop/1366x867+0+0/resize/1200x762!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb1%2Fdc%2Fa840ebaf434da94c2cc58db74b99%2Findian-wedding-events-by-sahiba-sandbox-studios.jpg"
];

let currentHeroIndex = 0;
const heroSection = document.getElementById("home");

function updateHeroBackground() {
  heroSection.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
  currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
}

updateHeroBackground();
setInterval(updateHeroBackground, 5000);

// === Tab Navigation ===
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

function activateTab(selected) {
  const sidebarLinks = document.querySelectorAll('.sidebar-tab');

  sidebarLinks.forEach(l => {
    l.classList.remove('text-red-600');
    l.classList.add('hover:text-red-600');
  });

  sidebarLinks.forEach(l => {
    if (l.getAttribute('data-tab') === selected) {
      l.classList.add('text-red-600');
      l.classList.remove('hover:text-red-600');
    }
  });

  tabContents.forEach(content => content.classList.add('hidden'));

  const activeContent = document.getElementById(`tab-${selected}`);
  if (activeContent) activeContent.classList.remove('hidden');
}

function updateHash(selected) {
  history.pushState(null, '', `#${selected}`);
}

function scrollToContent(selected) {
  const target = document.getElementById(`tab-${selected}`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

tabLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const selected = link.getAttribute('data-tab');
    activateTab(selected);
    updateHash(selected);
    if (selected === 'about') scrollToContent(selected);
  });
});

function checkHash() {
  const hash = window.location.hash.replace('#', '');
  const validTab = Array.from(tabLinks).some(link => link.getAttribute('data-tab') === hash);
  activateTab(validTab ? hash : 'about');
}

window.addEventListener('load', checkHash);
window.addEventListener('hashchange', checkHash);
