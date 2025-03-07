document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            if (!name || !email) {
                e.preventDefault();
                alert('Please fill in all fields.');
            }
        });
    }

    // Dynamic content loading for recent posts
    const recentPostsContainer = document.getElementById('recent-posts');
    if (recentPostsContainer) {
        fetch('/api/recent-posts')
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = `<h2>${post.title}</h2><p>${post.excerpt}</p>`;
                    recentPostsContainer.appendChild(postElement);
                });
            })
            .catch(error => console.error('Error loading recent posts:', error));
    }
});