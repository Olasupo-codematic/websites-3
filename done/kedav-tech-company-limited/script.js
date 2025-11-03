// --- KEDAV TECH Website Script (script.js) ---

// 1. Product Data (Master Payload)
const products = [
    {
        "name": "Techpreneur Blueprint: Launching a Profitable Online Business",
        "description": "Step-by-step guide on how to start, brand, and scale a tech-driven online business, perfect for aspiring entrepreneurs in Africa.",
        "price_zk": "19.99",
        "price_usd": "15.99",
        "price_ghc": "225.00",
        "price_ngn": "22,500.00",
        "price_kes": "2,050.00",
        "default_currency": "kes",
        "image_urls": ["https://cdn-icons-png.flaticon.com/512/190/190411.png"],
        "site_id": "kedavtechltd",
        "id": "7b39f0ad-32cf-42a9-9910-f96255c21957"
    },
    {
        "name": "Remote Work Mastery Guide",
        "description": "A comprehensive manual for thriving as a freelancer or remote worker — covering tools, discipline, and client management.",
        "price_zk": "14.99",
        "price_usd": "11.99",
        "price_ghc": "168.00",
        "price_ngn": "17,500.00",
        "price_kes": "1,550.00",
        "default_currency": "kes",
        "image_urls": ["https://cdn-icons-png.flaticon.com/512/686/686104.png"],
        "site_id": "kedavtechltd",
        "id": "51fb28d1-1512-4473-9327-3ab494ab1d73"
    },
    {
        "name": "The Digital Marketing Survival Kit",
        "description": "A practical eBook bundle covering SEO, social media growth, and email automation for small business owners.",
        "price_zk": "24.99",
        "price_usd": "19.99",
        "price_ghc": "285.00",
        "price_ngn": "28,500.00",
        "price_kes": "2,580.00",
        "default_currency": "kes",
        "image_urls": ["https://cdn-icons-png.flaticon.com/512/1149/1149488.png"],
        "site_id": "kedavtechltd",
        "id": "0fb8fbbe-8fc1-4c3e-8696-36c65a801cc6"
    },
    {
        "name": "AI for Beginners: From Basics to Real-World Use",
        "description": "Simple explanations and use cases of AI, ChatGPT, and automation tools for entrepreneurs and creators.",
        "price_zk": "17.50",
        "price_usd": "13.99",
        "price_ghc": "196.00",
        "price_ngn": "19,500.00",
        "price_kes": "1,800.00",
        "default_currency": "kes",
        "image_urls": ["https://cdn-icons-png.flaticon.com/512/3651/3651239.png"],
        "site_id": "kedavtechltd",
        "id": "d8a99047-33de-4f9e-8bcb-b57a928da037"
    }
];

// 2. DOM Elements
const productsGrid = document.getElementById('products-grid');
const modalOverlay = document.getElementById('product-modal-overlay');
const modalName = document.getElementById('modal-product-name');
const modalDescription = document.getElementById('modal-product-description');
const modalPriceList = document.getElementById('modal-price-list');
const contactForm = document.getElementById('contact-form');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const messageBox = document.getElementById('form-message-box');

// 3. Dynamic Product Rendering
function renderProducts() {
    if (!productsGrid) return; // Only run on index.html

    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image_urls[0] || 'https://placehold.co/80x80/0A1931/FFC300?text=EBOOK'}" 
                 alt="${product.name}" 
                 onerror="this.onerror=null;this.src='https://placehold.co/80x80/0A1931/FFC300?text=EBOOK';">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">
                ${product.default_currency.toUpperCase()} ${product['price_' + product.default_currency]}
            </div>
            <button class="btn btn-primary buy-now-btn" data-product-index="${index}">Buy Now</button>
        `;
        productsGrid.appendChild(card);
    });

    // Attach event listeners to the new buttons
    document.querySelectorAll('.buy-now-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-product-index');
            const product = products[index];
            
            // Call loadIframe with the checkout URL and product name
            const checkoutUrl = `https://checkout-page-frontend-development-749119130796.europe-west1.run.app/checkout?id=${product.id}`;
            loadIframe(checkoutUrl, product.name);
        });
    });
}

// 4. Modal Logic
function openModal(product) {
    modalName.textContent = product.name;
    modalDescription.textContent = product.description;

    // Populate price list
    modalPriceList.innerHTML = '';
    const currencies = {
        'zk': 'ZK', 'usd': 'USD', 'ghc': 'GHS', 'ngn': 'NGN', 'kes': 'KES'
    };

    for (const key in currencies) {
        if (product['price_' + key]) {
            const listItem = document.createElement('div');
            listItem.className = 'modal-price-item';
            listItem.innerHTML = `
                <span>Price in ${currencies[key]}:</span>
                <span class="currency">${currencies[key]} ${product['price_' + key]}</span>
            `;
            modalPriceList.appendChild(listItem);
        }
    }

    modalOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('visible');
        document.body.style.overflow = 'auto';
    }
}

// Attach listeners for closing the modal
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        // Close modal if clicking on the overlay (not the content)
        if (e.target.id === 'product-modal-overlay') {
            closeModal();
        }
    });

    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
}

// 5. Form Handler Logic (Client-side only)
function handleContactForm(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showMessageBox('Please fill out all fields.', true);
        return;
    }

    // Basic email format check (non-robust, for client-side demo)
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        showMessageBox('Please enter a valid email address.', true);
        return;
    }

    // Simulate successful submission
    console.log('Form Submission Data:', { name, email, message });
    showMessageBox('Thank you! Your message has been sent successfully.', false);

    // Clear form
    contactForm.reset();
}

if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
}

// Custom Message Box function (replaces alert())
function showMessageBox(message, isError) {
    if (!messageBox) return;

    messageBox.textContent = message;
    messageBox.className = 'visible'; // Reset classes
    if (isError) {
        messageBox.classList.add('error');
    }

    // Hide the box after 5 seconds
    setTimeout(() => {
        messageBox.classList.remove('visible');
    }, 5000);
}


// 6. Basic UI Interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Render products on the homepage
    renderProducts();

    // Mobile Navigation Toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
        });
    }

    // Active Nav Link Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = link.href.split('/').pop() || 'index.html';
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
});
