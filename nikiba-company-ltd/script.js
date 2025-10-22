/**
 * NIKIBA COMPANY LIMITED - Core JavaScript Functionality
 *
 * Includes:
 * 1. Product data and dynamic rendering
 * 2. Responsive mobile navigation toggle
 * 3. Smooth scroll for internal links
 * 4. Scroll-triggered fade-in animations
 * 5. Client-side contact form validation
 * 6. Footer year update
 */

document.addEventListener('DOMContentLoaded', () => {

    const PRODUCT_DATA = [
        {
          "name": "Digital Entrepreneurship Guide",
          "description": "A practical step-by-step ebook on launching and scaling an online business in Africa.",
          "price_kes": "6,500.00",
          "image_urls": ["https://i.imgur.com/Jp4w3zO.png"],
        },
        {
          "name": "Smart Marketing Blueprint",
          "description": "An ebook package covering digital marketing, SEO, and sales strategies for small businesses.",
          "price_kes": "7,800.00",
          "image_urls": ["https://i.imgur.com/VF4oV2y.png"],
        },
        {
          "name": "Personal Development Masterpack",
          "description": "A collection of ebooks on discipline, mindset, productivity, and goal setting.",
          "price_kes": "5,000.00",
          "image_urls": ["https://i.imgur.com/Jp4w3zO.png"],
        },
        {
          "name": "Financial Freedom Essentials",
          "description": "Learn how to build wealth, manage personal finance, and invest wisely with this comprehensive guide.",
          "price_kes": "9,500.00",
          "image_urls": ["https://i.imgur.com/VF4oV2y.png"],
        }
    ];

    const companyEmail = 'cs@nikibacompltd.com';
    const primaryCurrencySymbol = 'KES';

    // --- 1. Dynamic Product Rendering ---
    const ebookPackagesContainer = document.getElementById('ebook-packages-grid');

    if (ebookPackagesContainer) {
        PRODUCT_DATA.forEach(product => {
            const card = document.createElement('div');
            card.className = 'ebook-card';

            // Use the first image URL and add an error fallback for resilience
            const imageUrl = product.image_urls[0];

            card.innerHTML = `
                <img src="${imageUrl}" alt="${product.name} Ebook Cover" class="ebook-card-image"
                     onerror="this.onerror=null;this.src='https://placehold.co/150x200/0D47A1/FFFFFF?text=NIKIBA';">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="ebook-card-price">${primaryCurrencySymbol} ${product.price_kes}</div>
                <a href="#contact" class="btn btn-secondary">Buy Now</a>
            `;
            ebookPackagesContainer.appendChild(card);
        });
    }

    // --- 2. Responsive Mobile Navigation Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            // Change icon
            const icon = menuToggle.querySelector('i');
            icon.className = navList.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });

        // Close mobile menu when a link is clicked
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                }
            });
        });
    }


    // --- 3. Smooth Scroll for Internal Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // --- 4. Scroll-triggered Fade-In Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });


    // --- 5. Client-Side Contact Form Validation and Submission Simulation ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;

            // Simple validation logic
            if (name.length < 2) {
                isValid = false;
                displayMessage('Please enter a valid name.', 'error');
            } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                isValid = false;
                displayMessage('Please enter a valid email address.', 'error');
            } else if (message.length < 10) {
                isValid = false;
                displayMessage('Your message must be at least 10 characters long.', 'error');
            }

            if (isValid) {
                // Simulate form submission (since we can't send real email from static JS)
                // In a real application, you would make a POST request here.
                const submissionDetails = { name, email, message, target: companyEmail };
                console.log('Form Submission Simulated:', submissionDetails);

                displayMessage('Thank you for your message! We will reply to you shortly.', 'success');
                contactForm.reset();
            }
        });
    }

    function displayMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = ''; // Reset classes
        formMessage.classList.add('fade-in'); // Ensure the message container is visible
        formMessage.classList.add(type);
        formMessage.style.display = 'block';

        // Automatically hide after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.classList.remove('appear');
        }, 5000);
    }


    // --- 6. Footer Year Update ---
    const footerYear = document.getElementById('current-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});
