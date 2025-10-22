// --- CONFIGURATION ---
const CONTACT_EMAIL = "Operations@tayoserviceslimited.com";
const CONTACT_SUBJECT = "Content Inquiry from TAYO Services Website";

// Data payload provided in the prompt
const DIGITAL_PRODUCTS = [
  {
    "name": "The Brand Voice Playbook",
    "description": "A practical guide to building a consistent, authentic brand voice across all your platforms.",
    "price_zk": "70.00",
    "price_usd": "5.00",
    "price_ghc": "68.00",
    "price_ngn": "3,900.00",
    "default_currency": "zk",
    "icon": "📖",
    "site_id": "tayo-services-limited"
  },
  {
    "name": "Content Strategy Master Bundle",
    "description": "A complete toolkit including editorial calendar templates, SEO writing checklists, and content marketing frameworks.",
    "price_zk": "95.00",
    "price_usd": "6.50",
    "price_ghc": "90.00",
    "price_ngn": "5,000.00",
    "default_currency": "zk",
    "icon": "📊",
    "site_id": "tayo-services-limited"
  },
  {
    "name": "SEO Copywriting for Beginners",
    "description": "A step-by-step ebook teaching the fundamentals of SEO writing and keyword research for bloggers and freelancers.",
    "price_zk": "65.00",
    "price_usd": "4.80",
    "price_ghc": "60.00",
    "price_ngn": "3,500.00",
    "default_currency": "zk",
    "icon": "🔍",
    "site_id": "tayo-services-limited"
  },
  {
    "name": "Freelance Writing Starter Kit",
    "description": "A complete startup pack for aspiring writers — includes proposal templates, client onboarding forms, and sample contracts.",
    "price_zk": "120.00",
    "price_usd": "8.00",
    "price_ghc": "115.00",
    "price_ngn": "6,200.00",
    "default_currency": "zk",
    "icon": "✍️",
    "site_id": "tayo-services-limited"
  }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize all core functionalities
    loadDigitalProducts();
    setupSmoothScroll();
    setupContactModal();
    setupScrollFadeIn();
});

/* -------------------------------------------------------------------------- */
/* 1. DIGITAL PRODUCT INJECTION */
/* -------------------------------------------------------------------------- */

function loadDigitalProducts() {
    const container = document.getElementById('product-showcase');
    if (!container) return;

    DIGITAL_PRODUCTS.forEach(product => {
        // Since the company is based in Kenya (KES), we display the 'zk' placeholder price as KES.
        const priceDisplay = `KES ${parseFloat(product.price_zk).toFixed(2)}`;

        const card = document.createElement('div');
        card.className = 'card product-card';
        card.innerHTML = `
            <div class="product-icon-container" style="display: flex; justify-content: center; align-items: center; height: 150px; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); border-radius: 0.75rem; margin-bottom: 1.5rem; font-size: 5rem;">
                ${product.icon}
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">${priceDisplay}</div>
            <a href="#" class="btn btn-primary" style="margin-top: auto;">Buy Now</a>
        `;
        container.appendChild(card);
    });
}

/* -------------------------------------------------------------------------- */
/* 2. SMOOTH SCROLLING & ACTIVE MENU STATES */
/* -------------------------------------------------------------------------- */

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the anchor points to a section on the same page
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for highlighting active menu item
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to the link matching the current section ID
                const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/* -------------------------------------------------------------------------- */
/* 3. CONTACT FORM MODAL */
/* -------------------------------------------------------------------------- */

function setupContactModal() {
    const modal = document.getElementById('contact-modal');
    const btn = document.getElementById('open-contact-modal');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (!modal || !btn || !closeBtn || !form) return;

    // Open Modal
    btn.onclick = function() {
        modal.style.display = 'block';
        successMessage.style.display = 'none';
        form.style.display = 'block';
    }

    // Close Modal when clicking on the X
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Close Modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Handle Form Submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        // Basic email validation
        if (!email.includes('@') || !email.includes('.')) {
            alert('Please enter a valid email address.');
            return;
        }

        // Construct mailto link
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}&body=${body}`;

        // Open email client
        window.location.href = mailtoLink;

        // Display success message and hide form (as the email client opens)
        form.style.display = 'none';
        successMessage.style.display = 'block';

        // Clear the form after a short delay (gives time for email client to open)
        setTimeout(() => {
            form.reset();
        }, 500);
    });
}

/* -------------------------------------------------------------------------- */
/* 4. SCROLL-TRIGGERED FADE-INS */
/* -------------------------------------------------------------------------- */

function setupScrollFadeIn() {
    const sections = document.querySelectorAll('section');

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once faded in
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    sections.forEach(section => {
        fadeInObserver.observe(section);
    });
}
