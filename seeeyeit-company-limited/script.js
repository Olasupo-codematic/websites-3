/**
 * Core Interactivity for SEEEYEIT COMPANY LIMITED Website
 * Features: Product loading, Modal functionality, Smooth scroll, Scroll animations.
 */

// --- PRODUCT PAYLOAD (Data Source) ---
const productPayload = [
  {
    "name": "Digital Success Blueprint",
    "description": "A practical eBook on mastering online business fundamentals and automation.",
    "price_zk": "50.00",
    "price_usd": "3.50",
    "price_ghc": "45.00",
    "price_ngn": "2,800.00",
    "price_kes": "450.00",
    "default_currency": "kes",
    "icon": "📈",
    "site_id": "seeeyeit"
  },
  {
    "name": "E-Commerce Launch Kit",
    "description": "A complete guide with templates and strategies to start your first online store.",
    "price_zk": "70.00",
    "price_usd": "5.00",
    "price_ghc": "65.00",
    "price_ngn": "3,800.00",
    "price_kes": "650.00",
    "default_currency": "kes",
    "icon": "🛒",
    "site_id": "seeeyeit"
  },
  {
    "name": "The E-Book Empire Guide",
    "description": "Learn how to write, design, and sell profitable eBooks with zero prior experience.",
    "price_zk": "40.00",
    "price_usd": "2.80",
    "price_ghc": "38.00",
    "price_ngn": "2,300.00",
    "price_kes": "360.00",
    "default_currency": "kes",
    "icon": "📚",
    "site_id": "seeeyeit"
  },
  {
    "name": "Social Media Mastery Course",
    "description": "Complete training on building your brand and growing your audience across all major social platforms.",
    "price_zk": "85.00",
    "price_usd": "6.20",
    "price_ghc": "78.00",
    "price_ngn": "4,500.00",
    "price_kes": "800.00",
    "default_currency": "kes",
    "icon": "📱",
    "site_id": "seeeyeit"
  },
  {
    "name": "Freelancer's Financial Freedom",
    "description": "A comprehensive guide to managing finances, finding high-paying clients, and building passive income as a freelancer.",
    "price_zk": "60.00",
    "price_usd": "4.30",
    "price_ghc": "55.00",
    "price_ngn": "3,200.00",
    "price_kes": "550.00",
    "default_currency": "kes",
    "icon": "💰",
    "site_id": "seeeyeit"
  },
  {
    "name": "Content Creation Accelerator",
    "description": "Learn to create engaging content that converts visitors into customers across blogs, videos, and social media.",
    "price_zk": "75.00",
    "price_usd": "5.50",
    "price_ghc": "70.00",
    "price_ngn": "4,000.00",
    "price_kes": "700.00",
    "default_currency": "kes",
    "icon": "🎨",
    "site_id": "seeeyeit"
  },
  {
    "name": "Passive Income Strategies Handbook",
    "description": "Discover proven methods to build multiple streams of passive income through digital products, investments, and automation.",
    "price_zk": "95.00",
    "price_usd": "7.00",
    "price_ghc": "88.00",
    "price_ngn": "5,200.00",
    "price_kes": "900.00",
    "default_currency": "kes",
    "icon": "🏦",
    "site_id": "seeeyeit"
  }
];

// --- Product Catalog Renderer ---
function renderProducts() {
    const catalog = document.getElementById('product-catalog');
    if (!catalog) return;

    productPayload.forEach((product, index) => {
        const isDefault = (currency) => product.default_currency.toUpperCase() === currency.toUpperCase() ? 'default-currency' : '';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.index = index;
        // Delay the animation slightly based on index for a cascading effect
        card.style.transitionDelay = `${index * 0.15}s`;

        const defaultPrice = product[`price_${product.default_currency.toLowerCase()}`] || product.price_zk;

        card.innerHTML = `
            <div class="product-icon">${product.icon}</div>
            <h3>${product.name}</h3>
            <p>${product.description.substring(0, 100)}...</p>
            <span class="price-tag">${product.default_currency.toUpperCase()} ${defaultPrice}</span>
            <button class="btn btn-primary buy-now-btn" data-index="${index}">Buy Now</button>
        `;
        catalog.appendChild(card);
    });

    // Attach event listeners after rendering
    document.querySelectorAll('.buy-now-btn').forEach(button => {
        button.addEventListener('click', openModal);
    });
}

// --- Modal Functionality ---
const modal = document.getElementById('product-modal');
const modalDetails = document.getElementById('modal-details');

function openModal(event) {
    const index = event.target.dataset.index;
    const product = productPayload[index];

    if (!product || !modal || !modalDetails) return;

    // Build price list HTML
    const priceListHTML = `
        <ul class="modal-price-list">
            <li><span class="currency-label ${product.default_currency === 'kes' ? 'default-currency' : ''}">KES:</span> KSh ${product.price_kes}</li>
            <li><span class="currency-label ${product.default_currency === 'zk' ? 'default-currency' : ''}">ZK:</span> ZK ${product.price_zk}</li>
            <li><span class="currency-label ${product.default_currency === 'usd' ? 'default-currency' : ''}">USD:</span> $${product.price_usd}</li>
            <li><span class="currency-label ${product.default_currency === 'ghc' ? 'default-currency' : ''}">GHC:</span> ₵${product.price_ghc}</li>
            <li><span class="currency-label ${product.default_currency === 'ngn' ? 'default-currency' : ''}">NGN:</span> ₦${product.price_ngn}</li>
        </ul>
    `;

    // Populate modal content
    modalDetails.innerHTML = `
        <div class="modal-icon">
            <div class="large-icon">${product.icon}</div>
        </div>
        <div class="modal-details">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            ${priceListHTML}
            <a href="mailto:Info@seeeyeitcomp.com?subject=Inquiry about ${product.name}&body=I would like to purchase the ${product.name}." class="btn btn-primary">Purchase via Email</a>
        </div>
    `;

    // Show modal
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = ''; // Restore scrolling
}

// Attach listeners for modal close buttons/events
document.addEventListener('DOMContentLoaded', () => {
    if (modal) {
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Initialize product loading on index page
    const catalogElement = document.getElementById('product-catalog');
    if (catalogElement) {
        renderProducts();
    }
});


// --- Contact Form Handling (Mailto) ---
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const subject = encodeURIComponent(`Message from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

            window.location.href = `mailto:Info@seeeyeitcomp.com?subject=${subject}&body=${body}`;

            // Optional: Provide visual feedback (since we can't truly send an email from here)
            alert('Your email client will now open to send your message to Info@seeeyeitcomp.com.');

            // Clear the form after submission
            contactForm.reset();
        });
    }
});


// --- Animation Observer (Smooth Fade-ins/Slide-ins) ---
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-show');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    });

    // Apply the observer to all product cards
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
});

// --- Smooth Scroll (For internal links on index.html) ---
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
