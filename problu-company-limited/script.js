// --- 1. Product Data (Simulated API Response) ---
const PRODUCTS = [
    {
        "name": "Home Cleaning Master Guide",
        "description": "Step-by-step digital guide for efficient and safe home cleaning routines, suitable for professionals and individuals.",
        "price_kes": "5,000.00",
        "icon": "🏠"
    },
    {
        "name": "Office Cleaning Checklist Bundle",
        "description": "Comprehensive templates and checklists for maintaining office cleanliness and hygiene standards.",
        "price_kes": "6,200.00",
        "icon": "🏢"
    },
    {
        "name": "Commercial Cleaning Operations Manual",
        "description": "A digital operations manual covering standard operating procedures for commercial and industrial cleaning teams.",
        "price_kes": "9,800.00",
        "icon": "📋"
    },
    {
        "name": "Cleaning Business Starter Kit",
        "description": "Everything you need to start and grow a cleaning company — includes pricing templates, contracts, and marketing materials.",
        "price_kes": "7,500.00",
        "icon": "🚀"
    },
    {
        "name": "Eco-Friendly Cleaning Blueprint",
        "description": "A modern guide to sustainable and green cleaning methods using safe, eco-conscious products.",
        "price_kes": "3,800.00",
        "icon": "🌿"
    }
];

// --- 2. Product Rendering ---
function renderProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    PRODUCTS.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';

        card.innerHTML = `
            <div style="text-align: center; padding: 2rem; font-size: 4rem; background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%); border-radius: 0.5rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; min-height: 120px;">
                ${product.icon}
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-card-footer">
                <span class="price">KES ${product.price_kes}</span>
                <a href="#contact" class="btn btn-primary">Buy Now</a>
            </div>
        `;
        productList.appendChild(card);
    });
}

// --- 3. Footer Year Update ---
function updateFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// --- 4. Smooth Scrolling Navigation ---
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only handle internal section links
            if (this.getAttribute('href').length > 1) { 
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- 5. Intersection Observer for Fade-In Effects ---
function setupFadeInSections() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Start fade when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

// --- 6. Form Validation and Submission ---
function setupFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;

        // Simple validation utility
        const validateInput = (input, validator, errorMsg) => {
            const errorElement = input.parentNode.querySelector('.error-message');
            if (!validator(input.value.trim())) {
                input.style.borderColor = '#D9534F';
                errorElement.textContent = errorMsg;
                errorElement.style.display = 'block';
                isValid = false;
            } else {
                input.style.borderColor = ''; // Reset
                errorElement.style.display = 'none';
            }
        };

        // Name validation (not empty)
        validateInput(name, val => val.length > 2, 'Please enter your name.');

        // Email validation (basic format check)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateInput(email, val => emailRegex.test(val), 'Please enter a valid email address.');

        // Message validation (not empty)
        validateInput(message, val => val.length > 10, 'Message must be at least 10 characters long.');

        if (isValid) {
            // Success: Simulate form submission
            console.log('Form data submitted:', {
                name: name.value.trim(),
                email: email.value.trim(),
                message: message.value.trim()
            });
            form.reset();
            showSuccessModal();
        }
    });
}

// --- 7. Success Modal Handling ---
function showSuccessModal() {
    const modalOverlay = document.getElementById('success-modal-overlay');
    if (!modalOverlay) return;

    modalOverlay.classList.add('open');

    // Close on button click
    document.getElementById('modal-close-btn').onclick = () => {
        modalOverlay.classList.remove('open');
    };
    
    // Close on overlay click
    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('open');
        }
    };
}


// --- 8. Initialization on Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the main page before running main page scripts
    if (document.getElementById('hero')) {
        renderProducts();
        setupFadeInSections(); // Must run after rendering products to observe them
        setupFormValidation();
        setupSmoothScrolling();
    }
    
    updateFooterYear(); // Run on all pages
});
