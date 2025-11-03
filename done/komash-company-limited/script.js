/*
 * KOMASH COMPANY LIMITED - Custom JavaScript
 * Handles product rendering, form validation, and modal logic.
 */

// Global product data structure
const PRODUCTS = [
    {
        "name": "Strategic Leadership Playbook",
        "description": "A practical guide for managers and executives looking to build high-performing teams and align leadership with organizational strategy.",
        "price_kes": "KES 3,499.00",
        "price_usd": "25.99",
        "price_ghc": "375.00",
        "price_ngn": "40,000.00",
        "default_currency": "KES",
        "image_urls": ["https://cdn-icons-png.flaticon.com/512/190/190411.png"],
        "site_id": "komashltd-slp",
        "id": "f0517472-aa37-4a9b-9ee7-7b4186e0ce7d"
    },
    {
        "name": "Business Transformation Toolkit",
        "description": "An all-in-one package of templates and frameworks that help consulting teams plan, assess, and execute transformation programs effectively.",
        "price_kes": "KES 5,499.00",
        "price_usd": "39.99",
        "price_ghc": "570.00",
        "price_ngn": "60,000.00",
        "default_currency": "KES",
        "image_urls": ["https://cdn-icons-png.flaticon.com/512/686/686104.png"],
        "site_id": "komashltd-btt",
        "id": "f4791a44-f36c-4fbb-86f8-3bb2072be26d"
    },
    {
        "name": "Organizational Strategy Framework",
        "description": "A complete guide outlining Komash's 5-phase approach to building strategic plans that drive growth, innovation, and alignment.",
        "price_kes": "KES 2,999.00",
        "price_usd": "21.99",
        "price_ghc": "315.00",
        "price_ngn": "34,000.00",
        "default_currency": "KES",
        "image_urls": ["https://cdn-icons-png.flaticon.com/512/2920/2920155.png"],
        "site_id": "komashltd-osf",
        "id": "87538b82-8e63-40df-90e3-1596bf919165"
    },
    {
        "name": "Operational Efficiency Audit Template",
        "description": "A management checklist that helps businesses identify inefficiencies, measure productivity, and optimize workflows.",
        "price_kes": "KES 1,999.00",
        "price_usd": "14.99",
        "price_ghc": "210.00",
        "price_ngn": "23,000.00",
        "default_currency": "KES",
        "image_urls": ["https://cdn-icons-png.flaticon.com/512/3750/3750532.png"],
        "site_id": "komashltd-oeat",
        "id": "04f7ec35-9f52-4b97-aa3f-b50dc524ff48"
    },
    {
        "name": "Client Communication Guide for Consultants",
        "description": "An actionable guide for consultants on mastering communication, managing expectations, and improving client satisfaction.",
        "price_kes": "KES 1,499.00",
        "price_usd": "10.99",
        "price_ghc": "155.00",
        "price_ngn": "18,000.00",
        "default_currency": "KES",
        "image_urls": ["https://cdn-icons-png.flaticon.com/512/3233/3233519.png"],
        "site_id": "komashltd-ccgc",
        "id": "44858243-7513-4603-9e3b-4f05efb3c085"
        
    }
];

// --- 1. Product Rendering ---

function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return; // Exit if the container is not present (e.g., on terms/privacy pages)

    let htmlContent = '';
    PRODUCTS.forEach(product => {
        // Fallback for image loading
        const imageUrl = product.image_urls[0] || 'https://placehold.co/50x50/0A1931/FFD700?text=P';
        
        // Determine which price to show (defaulting to KES if not specified)
        let priceDisplay;
        if (product.default_currency === 'USD') {
            priceDisplay = `$${product.price_usd}`;
        } else if (product.default_currency === 'GHC') {
            priceDisplay = `GHC ${product.price_ghc}`;
        } else if (product.default_currency === 'NGN') {
            priceDisplay = `NGN ${product.price_ngn}`;
        } else {
            priceDisplay = product.price_kes;
        }

        htmlContent += `
            <div class="card product-card" id="product-${product.site_id}">
                <img src="${imageUrl}" alt="Icon for ${product.name} Digital Product" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/50x50/0A1931/FFD700?text=P';" />
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="price">${priceDisplay}</span>
                <button class="btn btn-secondary" onclick="handlePurchase('${product.site_id}')">
                    Buy Now
                </button>
            </div>
        `;
    });

    container.innerHTML = htmlContent;
}

function handlePurchase(productId) {
    // Find the product by site_id
    const product = PRODUCTS.find(p => p.site_id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    // Call loadIframe with the checkout URL and product name
    const checkoutUrl = `https://checkout-page-frontend-development-749119130796.europe-west1.run.app/checkout?id=${product.id}`;
    loadIframe(checkoutUrl, product.name);
}

// --- 2. Form Validation and Submission ---

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function handleFormSubmit(event) {
    event.preventDefault(); // Stop default form submission

    const form = document.getElementById('contact-form');
    const nameInput = form.elements['name'];
    const emailInput = form.elements['email'];
    const messageInput = form.elements['message'];
    
    let isValid = true;

    // Reset errors
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    
    // Validation for Name
    if (nameInput.value.trim() === '') {
        document.getElementById('name-error').textContent = 'Name is required.';
        isValid = false;
    }

    // Validation for Email
    if (emailInput.value.trim() === '') {
        document.getElementById('email-error').textContent = 'Email is required.';
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validation for Message
    if (messageInput.value.trim() === '') {
        document.getElementById('message-error').textContent = 'Message is required.';
        isValid = false;
    }

    if (isValid) {
        // Log form data for demonstration
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };
        console.log('Form Submitted Successfully:', formData);

        // TODO: Backend integration needed here to send the email/store the lead
        // fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

        // Show success modal
        alertBox.show('Thank you!', 'Your message has been received. Our consultants will reach out to you shortly.');
        
        // Clear the form
        form.reset();
    }
}

// --- 3. Modal/Alert Box Logic ---

const alertBox = {
    modalOverlay: document.getElementById('success-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalMessage: document.getElementById('modal-message'),
    closeButton: document.getElementById('modal-close'),

    show: function(title, message) {
        this.modalTitle.textContent = title;
        this.modalMessage.textContent = message;
        this.modalOverlay.classList.add('open');
        this.modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        this.closeButton.focus(); // Focus on close button for keyboard accessibility
    },

    hide: function() {
        this.modalOverlay.classList.remove('open');
        this.modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore background scrolling
    },

    init: function() {
        // Event listener for close button
        this.closeButton.addEventListener('click', this.hide.bind(this));

        // Event listener for clicking outside the modal
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.hide();
            }
        });

        // Event listener for ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOverlay.classList.contains('open')) {
                this.hide();
            }
        });
    }
};

// --- 4. Navigation and Smooth Scrolling ---

function handleSmoothScrolling(event) {
    // Only handle clicks for internal anchor links starting with #
    if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// --- 5. Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Product Renderer (only runs on index.html)
    renderProducts();

    // Initialize Modal
    alertBox.init();

    // Attach form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Attach smooth scrolling listener to the document
    document.addEventListener('click', handleSmoothScrolling);

    // Attach mobile menu toggler
    const hamburger = document.getElementById('hamburger-menu');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

});
