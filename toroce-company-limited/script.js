/**
 * script.js
 * TOROCE COMPANY LIMITED Client-side Interactivity
 * Includes: Product rendering, Smooth Scrolling, Contact Form Validation, and Modal.
 */

// --- 1. JSON PAYLOAD (Simulated Data Fetch) ---
const digitalProducts = [
    {
        "name": "Social Media Strategy Blueprint",
        "description": "A step-by-step guide to creating impactful, data-driven social media strategies for brands and creators.",
        "price_usd": "5.50",
        "price_ksh": "710.00",
        "default_currency": "KSH",
        "site_id": "toroce-company-limited"
    },
    {
        "name": "Ad Campaign Optimization Handbook",
        "description": "An expert manual with strategies for maximizing ad performance, audience segmentation, and conversion tracking.",
        "price_usd": "6.80",
        "price_ksh": "875.00",
        "default_currency": "KSH",
        "site_id": "toroce-company-limited"
    },
    {
        "name": "Content Calendar Toolkit",
        "description": "Editable templates and planning sheets to help social media managers organize monthly content across platforms.",
        "price_usd": "4.80",
        "price_ksh": "620.00",
        "default_currency": "KSH",
        "site_id": "toroce-company-limited"
    },
    {
        "name": "Influencer Campaign Playbook",
        "description": "A digital guide to planning, negotiating, and managing influencer partnerships effectively and professionally.",
        "price_usd": "7.80",
        "price_ksh": "1,005.00",
        "default_currency": "KSH",
        "site_id": "toroce-company-limited"
    }
];

// --- 2. Product Rendering Function ---
function renderProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;

    // Clear previous content
    container.innerHTML = '';

    digitalProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // NOTE: Using a simple placeholder as external image URLs are not supported in this environment.
        const imagePlaceholder = `
            <div class="product-image-placeholder">
                DIGITAL ASSET
            </div>
        `;

        const html = `
            ${imagePlaceholder}
            <div class="product-content">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="product-price">KSh ${product.price_ksh}</div>
                <button class="btn btn-primary" onclick="alert('Proceeding to checkout for ${product.name}...')">
                    Buy Now
                </button>
            </div>
        `;

        productCard.innerHTML = html;
        container.appendChild(productCard);
    });
}

// --- 3. Navigation & Smooth Scrolling ---
function setupNavigation() {
    const navLinks = document.querySelector('.nav-links');
    const burgerMenu = document.querySelector('.burger-menu');
    const links = document.querySelectorAll('.nav-links a');

    // Toggle Mobile Menu
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.textContent = navLinks.classList.contains('active') ? '✖' : '☰';
    });

    // Smooth Scrolling & Close Menu on Click
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);

            // Only perform smooth scroll if it's an anchor link on the same page
            if (targetId && e.currentTarget.closest('nav')) {
                e.preventDefault();
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // Close mobile menu after clicking a link
            if (navLinks.classList.contains('active')) {
                 navLinks.classList.remove('active');
                 burgerMenu.textContent = '☰';
            }
        });
    });
}

// --- 4. Contact Form Logic & Modal ---
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const modalOverlay = document.getElementById('success-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const openModal = () => {
        modalOverlay.classList.add('active');
        modalOverlay.focus(); // Focus the overlay for screen readers/keyboard users
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.elements['name'].value.trim();
            const email = form.elements['email'].value.trim();
            const message = form.elements['message'].value.trim();
            let isValid = true;

            // Simple Client-side validation
            if (name.length < 2) {
                alert('Please enter a valid name.');
                isValid = false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                isValid = false;
            }
            if (message.length < 10) {
                alert('Please write a more detailed message (min 10 characters).');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission (e.g., mailto link action)
                // In a real scenario, this would be an AJAX request to a backend endpoint.
                console.log("Form data submitted:", { name, email, message });
                
                // Show success modal
                openModal();
                form.reset();
            }
        });
    }
    
    // Close modal handlers
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        // Close if click is on the overlay itself, not the content
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Keyboard accessibility for modal (ESC key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}


// --- 5. Initializer ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("TOROCE COMPANY LIMITED website loaded.");
    renderProducts();
    setupNavigation();
    setupContactForm();
});
