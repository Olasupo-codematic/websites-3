// --- 1. Product Data ---
const audioBooks = [
  {
    "name": "The Power of Focus (Audio Edition)",
    "description": "An inspiring audiobook that helps you master concentration, discipline, and goal achievement in your daily life.",
    "price_kes": "5,000.00",
    "image_urls": ["https://cdn.kobo.com/book-images/60a8b415-ff80-4c61-9d24-62d7ad98b21f/1200/1200/False/the-power-of-focus-6.jpg"],
  },
  {
    "name": "Winning Habits: Audio Journey to Success",
    "description": "An immersive audio experience teaching habits that drive long-term personal and professional growth.",
    "price_kes": "5,800.00",
    "image_urls": ["https://i.scdn.co/image/ab676663000022a8fe62b16b0cb37272fa0e54de"],
  },
  {
    "name": "The Entrepreneur's Mindset (Audiobook Bundle)",
    "description": "A 3-part audio series exploring innovation, discipline, and leadership in business and life.",
    "price_kes": "7,500.00",
    "image_urls": ["https://tse2.mm.bing.net/th/id/OIP.BnPI0nQX7vs2SB3sUt2t2wHaLI?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"],
  },
  {
    "name": "Think Bold: The Audio Collection",
    "description": "A motivational audiobook package designed to help you think creatively, overcome fear, and take bold steps toward success.",
    "price_kes": "6,200.00",
    "image_urls": ["https://tse2.mm.bing.net/th/id/OIP.HhvHDmWGv2dXGmRY2RNkuAHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"],
  },
  {
    "name": "Financial Wisdom for Everyday Living (Audio Edition)",
    "description": "A calm and insightful audiobook series on personal finance, smart money habits, and long-term wealth creation.",
    "price_kes": "9,800.00",
    "image_urls": ["https://tse4.mm.bing.net/th/id/OIP.V57EO_vtEeypptsHOOV3KwHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"],
  }
];

// --- 2. Product Card Rendering ---
const renderBooks = () => {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    audioBooks.forEach(book => {
        // Use the first image URL and add an alt text
        const imageUrl = book.image_urls[0];
        const altText = `Cover image for ${book.name}`;
        
        const cardHTML = `
            <div class="book-card fade-in">
                <img src="${imageUrl}" alt="${altText}" class="book-cover" 
                     onerror="this.onerror=null;this.src='https://placehold.co/400x300/1E40AF/FACC15?text=RANRON+Audiobook'"
                >
                <div class="p-5 flex flex-col flex-grow">
                    <h3 class="font-poppins font-semibold text-xl mb-2">${book.name}</h3>
                    <p class="text-sm text-text/70 mb-4 flex-grow">${book.description}</p>
                    <div class="mt-auto pt-4 border-t border-gray-100">
                        <span class="text-2xl font-poppins font-bold text-primary">
                            KES ${book.price_kes}
                        </span>
                        <a href="#contact" class="btn btn-primary mt-3 text-sm block w-full">Buy Now</a>
                    </div>
                </div>
            </div>
        `;
        productGrid.innerHTML += cardHTML;
    });
};

// --- 3. Smooth Scroll and Navigation Setup ---
const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Close mobile menu if open
            if (document.getElementById('mobile-menu').classList.contains('is-open')) {
                toggleMobileMenu();
            }
        });
    });
};

// --- 4. Mobile Menu Toggle ---
const toggleMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    const button = document.getElementById('menu-button');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
    }
}

// --- 5. Form Validation and Success Modal ---
const setupFormValidation = () => {
    const form = document.getElementById('contact-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const modal = document.getElementById('success-modal');
    const modalContent = modal.querySelector('div');
    const closeModalButton = document.getElementById('close-modal');

    const isValidEmail = (email) => {
        // Simple regex for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const showModal = () => {
        modal.classList.add('is-visible');
        // Focus the close button for accessibility
        closeModalButton.focus();
        // Trap focus inside modal (basic implementation)
        modalContent.setAttribute('tabindex', '0');
        modalContent.focus();
    };

    const hideModal = () => {
        modal.classList.remove('is-visible');
        modalContent.setAttribute('tabindex', '-1');
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // 1. Check required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                valid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        // 2. Email format validation
        if (!isValidEmail(emailInput.value)) {
            emailError.classList.remove('hidden');
            emailInput.style.borderColor = 'red';
            valid = false;
        } else {
            emailError.classList.add('hidden');
            emailInput.style.borderColor = '';
        }

        if (valid) {
            // Simulate form submission (e.g., sending data to an API)
            console.log('Form submission simulated:', {
                name: document.getElementById('name').value,
                email: emailInput.value,
                message: document.getElementById('message').value
            });

            form.reset();
            showModal();
        }
    });

    closeModalButton.addEventListener('click', hideModal);

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            hideModal();
        }
    });
};

// --- 6. Fade-in on Scroll Animation ---
const setupFadeInAnimation = () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the item is visible
    });

    fadeElements.forEach(el => observer.observe(el));
};

// --- 7. Footer Copyright Auto-Update ---
const updateCopyright = () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
};

// --- 8. Initialization on Document Load ---
document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
    setupSmoothScroll();
    setupFormValidation();
    setupFadeInAnimation();
    updateCopyright();

    // Mobile menu event listener
    document.getElementById('menu-button').addEventListener('click', toggleMobileMenu);

    // Attach listeners to mobile menu links to close the menu
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (document.getElementById('mobile-menu').classList.contains('is-open')) {
                toggleMobileMenu();
            }
        });
    });
});
