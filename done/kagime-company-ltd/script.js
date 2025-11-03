
// Global product data
const PRODUCTS_DATA = [
  {
    id: 1,
    slug: "social-media-strategy-kit",
    title: "Social Media Strategy Kit",
    short_description:
      "Plan and execute content strategies with ready-made templates and examples.",
    long_description:
      "This kit includes pre-built strategy templates, content calendars, engagement metrics sheets, and platform-specific tips to streamline your social media growth process.",
    price_kes: "KES 2,999.00",
    deliverable_via: "email",
    estimated_file_type: "ZIP",
    icon: "📱",
    external_id: "8695d6bf-36c1-4826-8933-cf77c45eb708",
  },
  {
    id: 2,
    slug: "content-marketing-playbook",
    title: "Content Marketing Playbook",
    short_description:
      "A full marketing manual with frameworks, sample campaigns, and keyword guides.",
    long_description:
      "This 100-page digital guide covers content ideation, audience targeting, storytelling frameworks, SEO content planning, and distribution strategies designed for startups and small businesses.",
    price_kes: "KES 4,499.00",
    deliverable_via: "email",
    estimated_file_type: "PDF",
    icon: "📚",
    external_id: "c5ef8325-bcb4-4fac-8d4e-f8929105a9e4",
  },
  {
    id: 3,
    slug: "email-campaign-templates-pack",
    title: "Email Campaign Templates Pack",
    short_description:
      "Professionally written email templates for lead generation and brand nurturing.",
    long_description:
      "Get 40+ plug-and-play email templates for product launches, customer reactivation, onboarding sequences, and seasonal campaigns.",
    price_kes: "KES 1,999.00",
    deliverable_via: "email",
    estimated_file_type: "ZIP",
    icon: "✉️",
    external_id: "0cf93ed5-3085-47b4-a308-6771dec7287d",
  },
  {
    id: 4,
    slug: "seo-starter-workbook",
    title: "SEO Starter Workbook",
    short_description:
      "Step-by-step workbook to plan and track your on-page SEO campaigns.",
    long_description:
      "A practical workbook for marketers and entrepreneurs — includes keyword planner, technical audit checklist, competitor tracker, and performance scorecards.",
    price_kes: "KES 3,499.00",
    deliverable_via: "email",
    estimated_file_type: "PDF",
    icon: "🔍",
    external_id: "dd711fc6-65b7-4026-a2dc-569566dcd385",
  },
  {
    id: 5,
    slug: "digital-ads-budget-tracker",
    title: "Digital Ads Budget Tracker (Spreadsheet)",
    short_description:
      "Google Sheets-based tool to plan, monitor, and optimize ad spend efficiently.",
    long_description:
      "Simplify your ad budgeting with a dynamic spreadsheet that calculates ROI, CPC, and reach across campaigns. Built for Google Ads, Meta Ads, and TikTok Ads.",
    price_kes: "KES 999.00",
    deliverable_via: "email",
    estimated_file_type: "XLSX",
    icon: "💰",
    external_id: "a0d60b58-3838-4ec2-b28f-78c151295da6",
  },
  {
    id: 6,
    slug: "brand-identity-guidelines-template",
    title: "Brand Identity Guidelines Template",
    short_description:
      "Editable document to help brands create consistent visual identity and tone.",
    long_description:
      "Comes with typography, logo usage, imagery style, and tone of voice templates to help new businesses align their branding.",
    price_kes: "KES 5,499.00",
    deliverable_via: "email",
    estimated_file_type: "DOCX",
    icon: "🎨",
    external_id: "9a98ed20-4a94-4ee1-b691-f74aad50d81c",
  },
  {
    id: 7,
    slug: "client-proposal-deck",
    title: "Client Proposal Deck (PowerPoint)",
    short_description:
      "A sleek, editable proposal template for agencies and freelancers to pitch clients.",
    long_description:
      "A fully editable PowerPoint/Keynote deck featuring professional layouts, pricing tables, and case study slides for winning clients.",
    price_kes: "KES 1,499.00",
    deliverable_via: "email",
    estimated_file_type: "PPTX",
    icon: "📊",
    external_id: "aa3340b3-cd31-4095-9b45-e3f734ff82a2",
  },
];

// Reference to the main content container for products
const productsGrid = document.getElementById("products-grid");
const contactForm = document.getElementById("contact-form");
const purchaseModal = document.getElementById("purchase-modal-overlay");
const contactModal = document.getElementById("contact-success-modal-overlay");
const modalCloseBtns = document.querySelectorAll(".modal-close-btn");
const navToggle = document.getElementById("nav-toggle");
const navList = document.getElementById("nav-list");

/**
 * Renders product cards dynamically into the DOM.
 */
function renderProducts() {
  if (!productsGrid) return;

  PRODUCTS_DATA.forEach((product) => {
    const cardHTML = `
            <div class="product-card" aria-labelledby="product-${product.id}-title">
                <div class="product-info">
                    <div class="product-icon" style="font-size: 4rem; text-align: center; margin-bottom: 1rem; padding: 2rem; background: linear-gradient(135deg, #f0f4ff 0%, #e6f1ff 100%); border-radius: 1rem; display: flex; align-items: center; justify-content: center; min-height: 120px;">
                        ${product.icon}
                    </div>
                    <h3 id="product-${product.id}-title">${product.title}</h3>
                    <p>${product.short_description}</p>
                    <p class="product-price">${product.price_kes}</p>
                </div>
                <button class="btn btn-primary buy-now-btn" data-product-id="${product.id}" data-product-external-id="${product.external_id || ''}" data-product-title="${product.title}" aria-label="Purchase ${product.title}">Buy Now</button>
            </div>
        `;
    productsGrid.insertAdjacentHTML("beforeend", cardHTML);
  });

  document.querySelectorAll(".buy-now-btn").forEach((button) => {
    button.addEventListener("click", handleBuyNow);
  });
}

function handleBuyNow(e) {
  // Prevent default action
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  
  // Get product data from the button
  const productId = e.currentTarget.dataset.productId;
  const externalId = e.currentTarget.dataset.productExternalId;
  const title = e.currentTarget.dataset.productTitle;
  
  // Call loadIframe with the checkout URL and product title
  const checkoutUrl = `https://checkout-page-frontend-development-749119130796.europe-west1.run.app/checkout?id=${externalId}`;
  loadIframe(checkoutUrl, title);
  
  return false;
}


function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Only handle internal links on the index page
      if (
        this.hostname === location.hostname &&
        this.pathname === location.pathname
      ) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Close mobile nav if open
          navList.classList.remove("active");
          navToggle.setAttribute("aria-expanded", "false");

          // Scroll with an offset for the fixed header
          const headerHeight = document.querySelector(".header").offsetHeight;
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight - 20, // 20px extra padding
            behavior: "smooth",
          });
          // Update focus for accessibility after scrolling
          targetElement.focus();
        }
      }
    });
  });
}

/**
 * Mobile navigation toggle handler.
 */
function setupNavToggle() {
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navList.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", isExpanded);
    });
  }
}

/**
 * Form Validation and Submission Handler for Contact Form.
 */
function setupContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    const formFields = [
      {
        id: "contact-name",
        regex: /^[a-zA-Z\s]{2,}$/,
        msg: "Name is required (min 2 letters).",
      },
      {
        id: "contact-email",
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        msg: "Please enter a valid email address.",
      },
      {
        id: "contact-message",
        regex: /.{10,}/,
        msg: "Message must be at least 10 characters.",
      },
    ];

    formFields.forEach((field) => {
      const input = document.getElementById(field.id);
      const errorElement = input.nextElementSibling;

      if (!field.regex.test(input.value.trim())) {
        errorElement.textContent = field.msg;
        errorElement.style.display = "block";
        input.setAttribute("aria-invalid", "true");
        isValid = false;
      } else {
        errorElement.style.display = "none";
        input.setAttribute("aria-invalid", "false");
      }
    });

    if (isValid) {
      // Simulate successful submission (client-side only)
      console.log("Contact form submitted successfully (Demo)");
      contactForm.reset();
      openModal(contactModal);
    }
  });
}

// --- MODAL LOGIC ---

/**
 * Opens a generic modal element.
 * @param {HTMLElement} modalElement The overlay element to open.
 */
function openModal(modalElement) {
  if (!modalElement) return;
  modalElement.classList.add("open");
  modalElement.setAttribute("aria-hidden", "false");

  // Focus the first interactive element or the close button
  const firstFocusable = modalElement.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (firstFocusable) {
    firstFocusable.focus();
  } else {
    // Fallback: focus the close button
    modalElement.querySelector(".modal-close-btn").focus();
  }
  document.body.style.overflow = "hidden"; // Prevent scrolling background
}

/**
 * Closes a generic modal element.
 * @param {HTMLElement} modalElement The overlay element to close.
 */
function closeModal(modalElement) {
  if (!modalElement) return;
  modalElement.classList.remove("open");
  modalElement.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // Restore scrolling
}

/**
 * Handles the logic for opening the product purchase modal.
 * @param {Event} e The click event.
 */
function openPurchaseModal(e) {
  const productId = e.currentTarget.dataset.productId;
  const product = PRODUCTS_DATA.find((p) => p.id == productId);

  if (!product) return;

  const modalTitle = document.getElementById("purchase-modal-title");
  const modalLongDesc = document.getElementById("modal-long-description");
  const modalFileType = document.getElementById("modal-file-type");
  const modalPrice = document.getElementById("modal-price");
  const purchaseForm = document.getElementById("purchase-form");
  const hiddenProductId = document.getElementById("purchase-product-id");

  // Populate modal content
  modalTitle.textContent = product.title;
  modalLongDesc.textContent = product.long_description;
  modalFileType.textContent = `File Type: ${product.estimated_file_type}`;
  modalPrice.textContent = `Price: ${product.price_kes}`;
  hiddenProductId.value = product.id; // Store ID for form processing (demo)

  openModal(purchaseModal);
}

/**
 * Handles the purchase simulation form submission inside the modal.
 */
function setupPurchaseForm() {
  const purchaseForm = document.getElementById("purchase-form");
  if (!purchaseForm) return;

  purchaseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = document.getElementById("purchase-email");
    const nameInput = document.getElementById("purchase-name");
    const errorElement = emailInput.nextElementSibling;
    const successMessage = document.getElementById("purchase-success-message");
    const initialForm = document.getElementById("purchase-initial-form");

    // Simple Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value.trim())) {
      errorElement.textContent = "Please enter a valid email address.";
      errorElement.style.display = "block";
      emailInput.setAttribute("aria-invalid", "true");
      return;
    }

    // --- DEMO PURCHASE SUCCESS ---
    const customerEmail = emailInput.value.trim();
    const productId = document.getElementById("purchase-product-id").value;
    const product = PRODUCTS_DATA.find((p) => p.id == productId);

    // Hide form, show success message
    initialForm.style.display = "none";
    successMessage.innerHTML = `
            <p style="color: var(--color-success); font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem;">Purchase Successful (Demo)</p>
            <p>Thank you! Your digital download link for <strong>${
              product ? product.title : "the product"
            }</strong> will be sent to <strong>${customerEmail}</strong>.</p>
            <p>(Demo only — no real delivery or transaction occurred.)</p>
        `;
    successMessage.style.display = "block";

    // Reset the form values for next time, but keep success visible until closed
    purchaseForm.reset();
    errorElement.style.display = "none";
    emailInput.setAttribute("aria-invalid", "false");

    // Restore form state when modal is closed
    purchaseModal.addEventListener("transitionend", function handler() {
      if (!purchaseModal.classList.contains("open")) {
        initialForm.style.display = "block";
        successMessage.style.display = "none";
        purchaseModal.removeEventListener("transitionend", handler);
      }
    });
  });
}

/**
 * General setup for closing modals.
 */
function setupModalClosing() {
  // 1. Close buttons
  modalCloseBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.currentTarget.closest(".modal-overlay");
      closeModal(modal);
    });
  });

  // 2. Overlay click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // 3. ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.open").forEach((modal) => {
        closeModal(modal);
      });
    }
  });
}

/**
 * Initializes all website functionality.
 */
document.addEventListener("DOMContentLoaded", () => {
  setupNavToggle();
  setupSmoothScroll();
  renderProducts();
  setupContactForm();
  setupPurchaseForm();
  setupModalClosing();
});
