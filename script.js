// Set footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!expanded));
  if (!expanded) {
    mainNav.style.display = "flex";
  } else {
    mainNav.style.display = "none";
  }
});

// Close nav when resizing back to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    mainNav.style.display = "flex";
  } else {
    mainNav.style.display = "none";
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu after clicking a link
      if (window.innerWidth <= 768) {
        mainNav.style.display = "none";
        menuBtn.setAttribute("aria-expanded", "false");
      }
    }
  });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply animation to sections when they come into view
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
  
  // Apply staggered animation to cards
  const cards = document.querySelectorAll('.service-card, .benefit-card, .faq-item, .review-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});

// Hero section decorative animations
document.addEventListener('DOMContentLoaded', () => {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.style.animationDelay = `${index * 0.2}s`;
    dot.style.animation = 'pulse 2s infinite';
  });
  
  const circleAccent = document.querySelector('.circle-accent');
  if (circleAccent) {
    circleAccent.style.animation = 'rotate 20s linear infinite';
  }
  
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    heroImage.style.animation = 'float 6s ease-in-out infinite';
  }
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: rotate(-5deg) translateY(0px); }
    50% { transform: rotate(-5deg) translateY(-10px); }
  }
  
  .hero-text h1 {
    animation: slideInLeft 1s ease-out;
  }
  
  .hero-brand, .hero-date {
    animation: fadeIn 1s ease-out 0.5s both;
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .service-card:hover, .benefit-card:hover {
    transform: translateY(-10px);
    transition: all 0.3s ease;
  }
  
  .social-link:hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
  }
`;

document.head.appendChild(style);

// Contact form interaction (placeholder for future functionality)
document.addEventListener('DOMContentLoaded', () => {
  const contactInputs = document.querySelectorAll('.form-group input');
  contactInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = '#a8e65a';
      input.style.boxShadow = '0 0 0 3px rgba(168, 230, 90, 0.1)';
    });
    
    input.addEventListener('blur', () => {
      input.style.borderColor = '#d1d5db';
      input.style.boxShadow = 'none';
    });
  });
});

// Preload images for better performance
const imageUrls = [
  'assetslide1.jpg',
  'assetslide2.jpg',
  'assetslide3.jpg',
  'assetslide4.jpg',
  'assetslide5.jpg',
  'assetslide6.jpg',
  'assetslide7.jpg'
];

imageUrls.forEach(url => {
  const img = new Image();
  img.src = url;
});

// Performance optimization: Lazy load background images
const lazyLoadImages = () => {
  const imageElements = document.querySelectorAll('[style*="background-image"]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.backgroundImage = img.dataset.bg || img.style.backgroundImage;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  imageElements.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);