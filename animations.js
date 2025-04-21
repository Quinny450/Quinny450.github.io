// Animate hero text and background
window.addEventListener('DOMContentLoaded', () => {
    gsap.from('.hero-content h1', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    });
    gsap.from('.hero-content p', {
      y: 40,
      opacity: 0,
      delay: 0.3,
      duration: 1,
      ease: 'power3.out',
    });
    gsap.from('.cta-btn', {
      scale: 0.8,
      opacity: 0,
      delay: 0.6,
      duration: 0.8,
      ease: 'back.out(1.7)',
    });
  
    // Animate requirements cards
    gsap.from('.requirement-card', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      delay: 0.8,
      duration: 1,
      ease: 'power3.out',
    });
  
    // Animate steps on scroll
    gsap.utils.toArray('.step-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        },
        x: i % 2 === 0 ? -80 : 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    });
  
    // Animate FAQ items
    gsap.utils.toArray('.faq-item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power2.out',
      });
    });
  
    // Parallax hero background
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      gsap.to('.hero-bg', {
        x: x,
        y: y,
        duration: 1.2,
        ease: 'power3.out',
      });
    });
  });
  