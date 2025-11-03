/* ----------------------------------------------------------------
 * JAVASCRIPT (script.js)
 *
 * Handles:
 * 1. Product data, dynamic rendering, and modal display.
 * 2. Contact form validation and custom message box.
 * 3. Navigation and smooth scroll.
 * ---------------------------------------------------------------- */

const PRODUCTS_DATA = [
    {
        "name": "Innovation Accelerator Toolkit",
        "description": "A comprehensive toolkit for startups and enterprises looking to build innovation systems — includes templates for ideation, design thinking, and MVP planning.",
        "price_zk": "39.99",
        "price_usd": "32.99",
        "price_ghc": "470.00",
        "price_ngn": "48,500.00",
        "price_kes": "4,200.00",
        "default_currency": "kes",
        "image_urls": [
            "https://cdn-icons-png.flaticon.com/512/190/190411.png",
            "https://cdn-icons-png.flaticon.com/512/686/686104.png"
        ],
        "site_id": "kizinyaltd",
        "id": "7edd5ad6-acd9-4981-85bc-99ef854422c1"
    },
    {
        "name": "AI Business Strategy Playbook",
        "description": "A practical guide for organizations seeking to adopt AI for efficiency and innovation. Covers business cases, deployment strategy, and ethical frameworks.",
        "price_zk": "29.99",
        "price_usd": "25.99",
        "price_ghc": "370.00",
        "price_ngn": "38,500.00",
        "price_kes": "3,300.00",
        "default_currency": "kes",
        "image_urls": [
            "https://cdn-icons-png.flaticon.com/512/190/190411.png",
            "https://cdn-icons-png.flaticon.com/512/686/686104.png"
        ],
        "site_id": "kizinyaltd",
        "id": "d5579900-3666-450b-9859-5a58189640f8"
    },
    {
        "name": "Tech Consultancy Framework Guide",
        "description": "An ebook outlining Kizinya's 7-step consulting framework for digital transformation, innovation strategy, and tech implementation success.",
        "price_zk": "22.50",
        "price_usd": "18.99",
        "price_ghc": "275.00",
        "price_ngn": "29,000.00",
        "price_kes": "2,400.00",
        "default_currency": "kes",
        "image_urls": [
            "https://cdn-icons-png.flaticon.com/512/190/190411.png",
            "https://cdn-icons-png.flaticon.com/512/686/686104.png"
        ],
        "site_id": "kizinyaltd",
        "id": "fc5dea01-b76c-4692-8aff-5ea8a60f3c4b"
    },
    {
        "name": "Digital Transformation Audit Template",
        "description": "An enterprise-grade checklist and self-assessment tool to help companies evaluate their current digital maturity and identify innovation gaps.",
        "price_zk": "18.99",
        "price_usd": "15.99",
        "price_ghc": "225.00",
        "price_ngn": "23,000.00",
        "price_kes": "2,000.00",
        "default_currency": "kes",
        "image_urls": [
            "https://cdn-icons-png.flaticon.com/512/190/190411.png",
            "https://cdn-icons-png.flaticon.com/512/686/686104.png"
        ],
        "site_id": "kizinyaltd",
        "id": "cce16b78-d538-4e3b-a8f0-44b970e9b424"
    }
];

const PRICE_PREFIXES = {
    'zk': 'ZK',
    'usd': '$',
    'ghc': 'GH₵',
    'ngn': '₦',
    'kes': 'KES'
};

const productShowcase = document.getElementById('product-showcase');
const productModal = document.getElementById('product-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

/**
 * 1. PRODUCT RENDERING & MODAL LOGIC
 */

/**
 * Formats a raw price string based on the currency key.
 * @param {string} key - The currency key ('zk', 'usd', etc.)
 * @param {string} price - The raw price string.
 * @returns {string} The formatted price string (e.g., "$32.99").
 */
function formatPrice(key, price) {
    const prefix = PRICE_PREFIXES[key];
    // Remove thousand separators before processing, then add back
    const cleanPrice = price.replace(/,/g, '');
    if (key === 'ngn') {
        return `${prefix}${cleanPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`; // Re-add commas for NGN
    }
    return `${prefix}${cleanPrice}`;
}

/**
 * Populates the modal with product data and shows it.
 * @param {object} product - The product object to display.
 */
function showProductModal(product) {
    const modalName = document.getElementById('modal-name');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalCurrencySwitcher = document.getElementById('modal-currency-switcher');
    const modalImageContainer = document.getElementById('modal-image');

    // Set content
    modalName.textContent = product.name;
    modalDescription.textContent = product.description;

    // Set image (using the first URL as the primary image)
    const imgUrl = product.image_urls[0] || 'https://placehold.co/80x80/007bff/ffffff?text=Icon';
    modalImageContainer.innerHTML = `<img src="${imgUrl}" alt="${product.name} icon" style="width: 80px; height: 80px;">`;


    // Setup currency switcher
    modalCurrencySwitcher.innerHTML = ''; // Clear previous buttons
    const currencies = Object.keys(PRICE_PREFIXES);
    
    // Function to update price display
    const updatePrice = (currencyKey) => {
        const priceKey = `price_${currencyKey}`;
        const formatted = formatPrice(currencyKey, product[priceKey]);
        modalPrice.textContent = formatted;
        
        // Update active class on buttons
        modalCurrencySwitcher.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.currency === currencyKey) {
                btn.classList.add('active');
            }
        });
    };

    // Create currency buttons
    currencies.forEach(key => {
        const button = document.createElement('button');
        button.textContent = key.toUpperCase();
        button.dataset.currency = key;
        button.addEventListener('click', () => updatePrice(key));
        modalCurrencySwitcher.appendChild(button);
    });

    // Initialize with default currency
    updatePrice(product.default_currency);

    // Show modal
    productModal.classList.add('active');
}

/**
 * Hides the product modal.
 */
function hideProductModal() {
    productModal.classList.remove('active');
}

/**
 * Renders all product cards into the DOM.
 */
function renderProducts() {
    if (!productShowcase) return;

    PRODUCTS_DATA.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Use the default currency price
        const priceKey = `price_${product.default_currency}`;
        const formattedPrice = formatPrice(product.default_currency, product[priceKey]);

        // Use the first image URL as the card image
        const imgUrl = product.image_urls[0] || 'https://placehold.co/80x80/007bff/ffffff?text=Icon';

        card.innerHTML = `
            <div class="product-image">
                <img src="${imgUrl}" alt="${product.name} icon" onerror="this.onerror=null;this.src='https://placehold.co/80x80/007bff/ffffff?text=Icon';">
            </div>
            <div class="product-content">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="product-price">${formattedPrice}</div>
                <button class="btn btn-secondary buy-now-btn" data-index="${index}">Buy Now</button>
            </div>
        `;

        productShowcase.appendChild(card);
    });

    // Attach event listeners to all 'Buy Now' buttons
    document.querySelectorAll('.buy-now-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const product = PRODUCTS_DATA[index];
            
            // Call loadIframe with the checkout URL and product name
            const checkoutUrl = `https://checkout-page-frontend-development-749119130796.europe-west1.run.app/checkout?id=${product.id}`;
            loadIframe(checkoutUrl, product.name);
        });
    });
}

/**
 * 2. CUSTOM MESSAGE BOX LOGIC
 */

const messageModal = document.getElementById('message-modal');
const messageModalTitle = document.getElementById('message-modal-title');
const messageModalBody = document.getElementById('message-modal-body');
const messageModalCloseBtn = document.getElementById('message-modal-close-btn');
const messageModalOkBtn = document.getElementById('message-modal-ok');

/**
 * Displays a custom message box (modal).
 * @param {string} title - The title of the message.
 * @param {string} body - The body of the message.
 */
function showMessageBox(title, body) {
    messageModalTitle.textContent = title;
    messageModalBody.textContent = body;
    messageModal.classList.add('active');
}

/**
 * Hides the custom message box.
 */
function hideMessageBox() {
    messageModal.classList.remove('active');
}


/**
 * 3. FORM VALIDATION & SUBMISSION
 */

function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    /**
     * Validates a single input field.
     * @param {HTMLElement} input - The input or textarea element.
     * @returns {boolean} True if valid, false otherwise.
     */
    function validateInput(input) {
        const value = input.value.trim();
        const parentGroup = input.closest('.form-group');
        const errorMessage = document.getElementById(`error-${input.id}`);

        // Basic required check
        if (value === '') {
            parentGroup.classList.add('error');
            errorMessage.textContent = `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required.`;
            return false;
        }

        // Email format check
        if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            parentGroup.classList.add('error');
            errorMessage.textContent = 'Please enter a valid email address.';
            return false;
        }

        // Message length check (optional, but good practice)
        if (input.id === 'message' && value.length < 10) {
            parentGroup.classList.add('error');
            errorMessage.textContent = 'Message must be at least 10 characters long.';
            return false;
        }

        // Valid
        parentGroup.classList.remove('error');
        return true;
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let formIsValid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');

        // Validate all fields
        inputs.forEach(input => {
            if (!validateInput(input)) {
                formIsValid = false;
            }
        });

        if (formIsValid) {
            // Simulate successful form submission
            showMessageBox(
                'Message Sent!',
                'Thank you for contacting KIZINYA COMPANY LIMITED. We have received your message and will respond shortly.'
            );
            contactForm.reset();
        } else {
            showMessageBox(
                'Validation Error',
                'Please correct the fields marked in red before submitting your message.'
            );
        }
    });

    // Add real-time validation on blur for a better UX
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
    });
}


/**
 * 4. INITIALIZATION & UTILITIES
 */

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Initialize product rendering and modal listeners (only on index.html)
    if (productShowcase) {
        renderProducts();
    }

    // Modal close listeners
    if (productModal) {
        modalCloseBtn.addEventListener('click', hideProductModal);
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                hideProductModal();
            }
        });
    }

    // Message Box close listeners
    if (messageModal) {
        messageModalCloseBtn.addEventListener('click', hideMessageBox);
        messageModalOkBtn.addEventListener('click', hideMessageBox);
        messageModal.addEventListener('click', (e) => {
            if (e.target === messageModal) {
                hideMessageBox();
            }
        });
    }
    
    // Initialize form validation
    setupFormValidation();

    // Toggle Mobile Navigation
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
        });

        // Close mobile nav on link click (smooth scroll handling)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Check if we are on index.html (i.e., the link is a hash link)
                if (link.href.includes('#')) {
                    mainNav.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
                // Smooth scroll logic: browser handles this automatically due to CSS property
            });
        });
    }
});
