/**
 * NAUDO COMPANY LIMITED - Client-Side Functionality
 * Handles: Product Rendering, Smooth Scroll, Scroll Fade-Ins, Form Validation, Dynamic Year
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Dynamic Year in Footer
    // -------------------------------------------------------------------------
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // -------------------------------------------------------------------------
    // 2. Product Data & Rendering (for index.html only)
    // -------------------------------------------------------------------------
    const productContainer = document.getElementById('products-container');

    if (productContainer) {
        const digitalProducts = [
            {
                "name": "SmartBiz ERP Suite",
                "description": "An all-in-one enterprise resource planning software tailored for African SMEs.",
                "price_kes": "65,000.00",
                "default_currency": "KES",
                "icon": "🏢"
            },
            {
                "name": "Naudo HR Cloud",
                "description": "A cloud-based HR management system with payroll, performance tracking, and employee analytics.",
                "price_kes": "38,000.00",
                "default_currency": "KES",
                "icon": "👥"
            },
            {
                "name": "CodePilot AI Assistant",
                "description": "An AI-powered code assistant that helps developers write and debug code faster in multiple languages.",
                "price_kes": "19,000.00",
                "default_currency": "KES",
                "icon": "🤖"
            },
            {
                "name": "Naudo CloudSuite",
                "description": "A secure, scalable cloud storage and deployment platform designed for African developers and startups.",
                "price_kes": "52,000.00",
                "default_currency": "KES",
                "icon": "☁️"
            }
        ];

        function renderProducts() {
            digitalProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card fade-in';
                card.innerHTML = `
                    <div style="text-align: center; padding: 2rem; font-size: 4rem; background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%); border-radius: 0.5rem 0.5rem 0 0;">
                        ${product.icon}
                    </div>
                    <div class="product-card-content">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="flex items-baseline justify-between">
                            <span class="price">${product.price_kes}</span>
                            <span class="currency">${product.default_currency}</span>
                        </div>
                        <a href="#contact" class="cta-button w-full mt-4 text-center block">Buy Now</a>
                    </div>
                `;
                productContainer.appendChild(card);
            });
        }

        renderProducts();
    }

    // -------------------------------------------------------------------------
    // 3. Smooth Scroll for Navigation Links
    // -------------------------------------------------------------------------
    document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // -------------------------------------------------------------------------
    // 4. Scroll-Based Fade-In Animations (Intersection Observer)
    // -------------------------------------------------------------------------
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px" // Start 100px before reaching the bottom of the viewport
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // -------------------------------------------------------------------------
    // 5. Simple Contact Form Validation (Placeholder for API/Backend)
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            formMessage.style.display = 'none';
            formMessage.className = '';

            if (!name || !email || !message) {
                formMessage.classList.add('error');
                formMessage.textContent = 'Please fill out all fields before submitting.';
                formMessage.style.display = 'block';
                return;
            }

            // Simple email format check
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                formMessage.classList.add('error');
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.style.display = 'block';
                return;
            }

            // Simulate form submission success (In a real app, this would be an AJAX call)
            console.log('Form Submitted:', { name, email, message });
            
            formMessage.classList.add('success');
            formMessage.textContent = 'Thank you for your message! We will get back to you shortly.';
            formMessage.style.display = 'block';
            contactForm.reset();
        });
    }
});
