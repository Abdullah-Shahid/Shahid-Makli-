// Mobile Menu Toggle with Accessibility
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Update aria-expanded for screen readers
    hamburger.setAttribute('aria-expanded', isExpanded);

    // Update aria-label
    hamburger.setAttribute('aria-label', isExpanded ? 'مینو بند کریں' : 'مینو کھولیں');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'مینو کھولیں');

    // Set active link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    n.classList.add('active');
}));

// Dark Mode Toggle with Accessibility
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Add aria-label to theme toggle
themeToggle.setAttribute('aria-label', 'موڈ تبدیل کریں');

// Check for saved theme preference or respect OS preference
if (localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeToggle.setAttribute('aria-label', 'روشنی موڈ میں تبدیل کریں');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
        themeToggle.setAttribute('aria-label', 'روشنی موڈ میں تبدیل کریں');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
        themeToggle.setAttribute('aria-label', 'اندھیرا موڈ میں تبدیل کریں');
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'مینو کھولیں');
    }
});

// Performance Optimizations
function preloadCriticalImages() {
    const images = [
        '/images/Shahid Makli.webp',
        '/images/maoj.webp',
        '/images/tanazur.webp',
        '/images/tajazub.webp',
        '/images/ajoke.webp'
    ];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Load after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalImages);
} else {
    preloadCriticalImages();
}

// Optimize animations for performance
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches) {
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}

// Handle reduced motion preferences
mediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    } else {
        document.documentElement.style.setProperty('--transition-duration', '0.3s');
    }
});

// Hero Slider Functionality
const heroSlider = document.getElementById('heroSlider');
const heroSlides = heroSlider.querySelectorAll('.slide');
const heroControls = document.getElementById('heroControls');
let currentHeroSlide = 0;

// Create dots for hero slider
heroSlides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        goToHeroSlide(index);
    });
    heroControls.appendChild(dot);
});

function goToHeroSlide(n) {
    heroSlides[currentHeroSlide].classList.remove('active');
    heroControls.children[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (n + heroSlides.length) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
    heroControls.children[currentHeroSlide].classList.add('active');
}

// Auto slide for hero
function nextHeroSlide() {
    goToHeroSlide(currentHeroSlide + 1);
}

// Gallery Slider Functionality
const gallerySlider = document.getElementById('gallerySlider');
const gallerySlides = gallerySlider.querySelectorAll('.gallery-slide');
const prevBtn = document.getElementById('galleryPrev');
const nextBtn = document.getElementById('galleryNext');
let currentGallerySlide = 0;

function goToGallerySlide(n) {
    gallerySlides[currentGallerySlide].classList.remove('active');
    currentGallerySlide = (n + gallerySlides.length) % gallerySlides.length;
    gallerySlides[currentGallerySlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    goToGallerySlide(currentGallerySlide - 1);
});

nextBtn.addEventListener('click', () => {
    goToGallerySlide(currentGallerySlide + 1);
});

// Auto slide functionality
let heroInterval = setInterval(nextHeroSlide, 5000);
let galleryInterval = setInterval(() => {
    goToGallerySlide(currentGallerySlide + 1);
}, 6000);

// Pause auto-slide on hover
heroSlider.addEventListener('mouseenter', () => {
    clearInterval(heroInterval);
});

heroSlider.addEventListener('mouseleave', () => {
    heroInterval = setInterval(nextHeroSlide, 5000);
});

document.querySelector('.gallery-slider').addEventListener('mouseenter', () => {
    clearInterval(galleryInterval);
});

document.querySelector('.gallery-slider').addEventListener('mouseleave', () => {
    galleryInterval = setInterval(() => {
        goToGallerySlide(currentGallerySlide + 1);
    }, 6000);
});