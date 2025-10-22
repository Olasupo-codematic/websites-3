// --- Product Data Payload (Using Placeholder image URLs) ---
const products = [
    {
        "name": "Social Media Growth Blueprint",
        "description": "A digital marketing guide showing how to scale social presence, run ads, and increase brand awareness.",
        "price_zk": "60.00",
        "price_usd": "4.20",
        "price_ghc": "55.00",
        "price_ngn": "3,200.00",
        "price_kes": "540.00",
        "default_currency": "kes",
        "image_urls": [
            "https://placehold.co/400x300/2563eb/ffffff?text=Social+Blueprint"
        ],
        "site_id": "subcol"
    },
    {
        "name": "SEO Mastery Guide",
        "description": "Step-by-step playbook to rank your website on Google and attract organic traffic.",
        "price_zk": "75.00",
        "price_usd": "5.00",
        "price_ghc": "70.00",
        "price_ngn": "3,800.00",
        "price_kes": "645.00",
        "default_currency": "kes",
        "image_urls": [
            "https://placehold.co/400x300/1e293b/ffffff?text=SEO+Guide"
        ],
        "site_id": "subcol"
    },
    {
        "name": "Email Marketing Starter Kit",
        "description": "Everything you need to design, write, and automate high-converting email campaigns.",
        "price_zk": "50.00",
        "price_usd": "3.50",
        "price_ghc": "48.00",
        "price_ngn": "2,900.00",
        "price_kes": "450.00",
        "default_currency": "kes",
        "image_urls": [
            "https://placehold.co/400x300/facc15/1e293b?text=Email+Kit"
        ],
        "site_id": "subcol"
    },
    {
        "name": "Content Marketing Masterclass",
        "description": "Learn to create compelling content that drives engagement, builds authority, and converts prospects into customers.",
        "price_zk": "85.00",
        "price_usd": "6.00",
        "price_ghc": "80.00",
        "price_ngn": "4,500.00",
        "price_kes": "775.00",
        "default_currency": "kes",
        "image_urls": [
            "https://placehold.co/400x300/059669/ffffff?text=Content+Marketing"
        ],
        "site_id": "subcol"
    },
    {
        "name": "Affiliate Marketing Success System",
        "description": "Complete blueprint for building profitable affiliate marketing campaigns and scaling your passive income streams.",
        "price_zk": "95.00",
        "price_usd": "6.80",
        "price_ghc": "90.00",
        "price_ngn": "5,100.00",
        "price_kes": "875.00",
        "default_currency": "kes",
        "image_urls": [
            "https://placehold.co/400x300/7c3aed/ffffff?text=Affiliate+System"
        ],
        "site_id": "subcol"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Dynamic Product Rendering
    // --------------------------------------------------------------------------
    const productContainer = document.getElementById('product-showcase');
    if (productContainer) {
        products.forEach((product, index) => {
            const card = document.createElement('div');
            // Add fade-in animation class with a sequential delay
            card.className = `card product-card fade-in delay-${(index % 3) + 1}`;
            
            const currencySymbol = product.default_currency === 'kes' ? 'KSh' : (product.default_currency === 'zk' ? 'Zk' : '$');
            const price = product.default_currency === 'kes' ? product.price_kes : (product.default_currency === 'zk' ? product.price_zk : product.price_usd);

            card.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.image_urls[0]}" alt="${product.name}" class="product-image" onerror="this.onerror=null;this.src='https://placehold.co/400x300/cccccc/333333?text=Product+Image';" style="width:100%; height:auto; border-radius: 0.5rem; margin-bottom: 1rem;">
                </div>
                <h3 style="color:var(--color-primary);">${product.name}</h3>
                <p>${product.description}</p>
                <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size:1.4rem; font-weight:700; color:var(--color-secondary);">
                        ${currencySymbol} ${price}
                    </span>
                    <a href="mailto:Support@subcolltd.com?subject=Inquiry%20About%20${encodeURIComponent(product.name)}" class="btn btn-primary" style="padding: 0.5rem 1.2rem; font-size:0.9rem;">
                        Buy Now
                    </a>
                </div>
            `;
            productContainer.appendChild(card);
        });
    }

    // --------------------------------------------------------------------------
    // 2. Mobile Menu Toggle
    // --------------------------------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked (for smooth scroll or navigation)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --------------------------------------------------------------------------
    // 3. Intersection Observer for Fade-In Animations
    // --------------------------------------------------------------------------
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px" // Load 100px before reaching the bottom
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --------------------------------------------------------------------------
    // 4. Active Navigation Link Highlighting
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navA = document.querySelectorAll('.nav-links a');

    // Function to highlight the current section link
    const highlightNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Check if the current scroll position is past the section start
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navA.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    };

    // Run on scroll and initial load
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Initial check
});
