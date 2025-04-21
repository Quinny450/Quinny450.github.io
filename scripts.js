document.addEventListener("DOMContentLoaded", function () {
    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
  
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");
      themeIcon.classList.toggle("fa-moon");
      themeIcon.classList.toggle("fa-sun");
    });
  
    // Progress bar
    const progressBar = document.getElementById("progress-bar");
    const sections = document.querySelectorAll(".section");
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
  
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / totalHeight) * 100;
      progressBar.style.width = progress + "%";
    });
  
    // Expandable images
    const expandableImages = document.querySelectorAll(".expandable-img");
    const imageModal = document.getElementById("image-modal");
    const expandedImage = document.getElementById("expanded-image");
    const closeModal = document.querySelector(".close-modal");
  
    expandableImages.forEach((img) => {
      img.addEventListener("click", function () {
        imageModal.style.display = "flex";
        expandedImage.src = this.src;
      });
    });
  
    closeModal.addEventListener("click", function () {
      imageModal.style.display = "none";
    });
  
    // Close modal when clicking outside
    window.addEventListener("click", function (event) {
      if (event.target === imageModal) {
        imageModal.style.display = "none";
      }
    });
  
    // Accordion
    const accordionItems = document.querySelectorAll(".accordion-item");
  
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      
      header.addEventListener("click", function () {
        accordionItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });
        
        item.classList.toggle("active");
      });
    });
  
    // Copy to clipboard
    const copyButtons = document.querySelectorAll(".copy-btn");
  
    copyButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const textToCopy = this.getAttribute("data-text");
        navigator.clipboard.writeText(textToCopy).then(
          function () {
            // Change button icon to check for 2 seconds
            const icon = button.querySelector("i");
            icon.classList.remove("fa-copy");
            icon.classList.add("fa-check");
            
            setTimeout(function () {
              icon.classList.remove("fa-check");
              icon.classList.add("fa-copy");
            }, 2000);
          },
          function (err) {
            console.error("Could not copy text: ", err);
          }
        );
      });
    });
  
    // Print functionality
    const printGuide = document.getElementById("print-guide");
    
    printGuide.addEventListener("click", function (e) {
      e.preventDefault();
      window.print();
    });
  
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav a");
    
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth"
        });
      });
    });
  });
  