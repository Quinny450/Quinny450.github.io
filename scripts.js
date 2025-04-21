// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  // Custom cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  document.addEventListener('mousemove', function(e) {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1
    });
    
    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3
    });
  });
  
  // Cursor effects on hoverable elements
  const hoverables = document.querySelectorAll('a, button, .info-card, .step-content, .expandable-image, .requisites-card');
  
  hoverables.forEach(hoverable => {
    hoverable.addEventListener('mouseenter', () => {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursor.style.background = 'var(--accent-secondary)';
      cursorFollower.style.width = '50px';
      cursorFollower.style.height = '50px';
      cursorFollower.style.borderColor = 'var(--accent-secondary)';
    });
    
    hoverable.addEventListener('mouseleave', () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      cursor.style.background = 'var(--accent-primary)';
      cursorFollower.style.width = '40px';
      cursorFollower.style.height = '40px';
      cursorFollower.style.borderColor = 'var(--accent-primary)';
    });
  });
  
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  
  themeToggle.addEventListener('change', function() {
    if (this.checked) {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.checked = true;
  }
  
  // Initialize particles.js
  particlesJS('particle-container', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#3584ff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        }
      },
      opacity: {
        value: 0.15,
        random: true,
        anim: {
          enable: true,
          speed: 0.2,
          opacity_min: 0.05,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.5,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#3584ff',
        opacity: 0.1,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 3
        }
      }
    },
    retina_detect: true
  });
  
  // Navigation functionality
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const menuIndicator = document.querySelector('.menu-indicator');
  
  // Initialize menu indicator position
  function updateMenuIndicator(link) {
    const linkRect = link.getBoundingClientRect();
    const navRect = document.querySelector('.main-nav').getBoundingClientRect();
    
    menuIndicator.style.width = `${linkRect.width}px`;
    menuIndicator.style.left = `${linkRect.left - navRect.left}px`;
  }
  
  // Set initial active state
  updateMenuIndicator(document.querySelector('.nav-link.active'));
  
  // Handle navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetSectionId = this.getAttribute('href').substring(1);
      
      // Update active states
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      this.classList.add('active');
      
      // Update menu indicator
      updateMenuIndicator(this);
      
      // Hide all sections
      sections.forEach(section => {
        section.classList.remove('active');
      });
      
      // Show target section
      const targetSection = document.getElementById(targetSectionId);
      targetSection.classList.add('active');
      
      // Scroll to top of section
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Update indicator on hover
    link.addEventListener('mouseenter', function() {
      updateMenuIndicator(this);
    });
    
    link.addEventListener('mouseleave', function() {
      updateMenuIndicator(document.querySelector('.nav-link.active'));
    });
  });
  
  // Start button functionality
  const startButton = document.querySelector('.cta-button');
  
  startButton.addEventListener('click', function() {
    // Switch to prerequisites section
    const prerequisitesLink = document.querySelector('a[href="#prerequisites"]');
    prerequisitesLink.click();
  });
  
  // Image modal
  const expandButtons = document.querySelectorAll('.expand-image-btn');
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const closeModal = document.querySelector('.close-modal');
  
  expandButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const imageUrl = this.closest('.image-container').querySelector('img').src;
      modalImage.src = imageUrl;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Animation for modal opening
      gsap.fromTo(modalImage, {
        scale: 0.8,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    });
  });
  
  closeModal.addEventListener('click', function() {
    gsap.to(modalImage, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });
  
  // Progress bar
  window.addEventListener('scroll', function() {
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / (fullHeight - windowHeight)) * 100;
    
    document.querySelector('.progress-bar').style.width = `${progress}%`;
  });
  
  // Reveal animations using Intersection Observer
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
  
  // Simulate download progress animation
  const progressTrack = document.querySelector('.download-progress');
  
  if (progressTrack) {
    const progressFill = progressTrack.querySelector('.progress-fill');
    const progressPercentage = progressTrack.querySelector('.progress-percentage');
    const progressSize = progressTrack.querySelector('.progress-size');
    
    // Simulate download progress
    let progress = 0;
    const totalSize = 5120; // 5GB in MB
    
    const updateProgress = () => {
      progress += Math.random() * 5;
      if (progress > 100) progress = 100;
      
      const downloadedSize = Math.round((progress / 100) * totalSize);
      
      progressFill.style.width = `${progress}%`;
      progressPercentage.textContent = `${Math.round(progress)}%`;
      progressSize.textContent = `${downloadedSize} MB / ${totalSize} MB`;
      
      if (progress < 100) {
        setTimeout(updateProgress, 200 + Math.random() * 300);
      }
    };
    
    // Start the animation after a small delay
    setTimeout(updateProgress, 1000);
  }
  
  // Add GSAP animations for better visuals
  
  // Animate timeline steps
  gsap.utils.toArray('.timeline-step').forEach((step, i) => {
    const anim = gsap.fromTo(step, 
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0,
        duration: 0.8,
        ease: "power3.out"
      }
    );
    
    ScrollTrigger.create({
      trigger: step,
      animation: anim,
      toggleActions: "play none none none",
      start: "top 80%",
    });
  });
  
  // Animate step cards
  gsap.utils.toArray('.step-card').forEach((card, i) => {
    gsap.set(card, { opacity: 0, y: 50 });
    
    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out"
        });
      },
      once: true
    });
  });
  
  // Glitch effect timing adjustment
  const glitchTexts = document.querySelectorAll('.glitch');
  
  // Randomly trigger the glitch animation
  glitchTexts.forEach(text => {
    setInterval(() => {
      text.classList.add('active-glitch');
      setTimeout(() => {
        text.classList.remove('active-glitch');
      }, 500);
    }, 3000 + Math.random() * 5000);
  });
});
