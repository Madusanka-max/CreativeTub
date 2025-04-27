// Mobile menu toggle
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to sections
document.querySelectorAll('section > div').forEach(section => {
    section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    observer.observe(section);
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    
    // Initialize carousel if present in this modal
    const carouselId = modalId.replace('Modal', 'Carousel');
    initializeCarousel(carouselId);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Stop auto-sliding
    const carouselId = modalId.replace('Modal', 'Carousel');
    stopAutoSlide(carouselId);
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('[id$="Modal"]');
    modals.forEach(modal => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Carousel functionality
const carousels = {};

function initializeCarousel(carouselId) {
    if (!carousels[carouselId]) {
        carousels[carouselId] = {
            currentSlide: 0,
            totalSlides: document.querySelector(`#${carouselId} .flex`).children.length
        };
        
        // Start auto-sliding
        startAutoSlide(carouselId);
    }
}

function startAutoSlide(carouselId) {
    carousels[carouselId].interval = setInterval(() => {
        nextSlide(carouselId);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide(carouselId) {
    if (carousels[carouselId] && carousels[carouselId].interval) {
        clearInterval(carousels[carouselId].interval);
    }
}

function updateSlidePosition(carouselId) {
    const carousel = document.querySelector(`#${carouselId} .flex`);
    const slideWidth = carousel.children[0].offsetWidth;
    carousel.style.transform = `translateX(-${carousels[carouselId].currentSlide * slideWidth}px)`;
}

function nextSlide(carouselId) {
    if (!carousels[carouselId]) initializeCarousel(carouselId);
    
    carousels[carouselId].currentSlide = 
        (carousels[carouselId].currentSlide + 1) % carousels[carouselId].totalSlides;
    updateSlidePosition(carouselId);
}

function prevSlide(carouselId) {
    if (!carousels[carouselId]) initializeCarousel(carouselId);
    
    carousels[carouselId].currentSlide = 
        (carousels[carouselId].currentSlide - 1 + carousels[carouselId].totalSlides) % carousels[carouselId].totalSlides;
    updateSlidePosition(carouselId);
}

// Initialize all carousels
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[id$="Carousel"]').forEach(carousel => {
        initializeCarousel(carousel.id);
    });
});

// Contact form handling with basic validation
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form elements
    const form = e.target;
    const formStatus = document.getElementById('formStatus');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Get form values
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    
    // Validation
    let isValid = true;
    let errors = [];

    // Name validation
    if (name.length < 2) {
        isValid = false;
        errors.push('Name must be at least 2 characters long');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        errors.push('Please enter a valid email address');
    }

    // Message validation
    if (message.length < 10) {
        isValid = false;
        errors.push('Message must be at least 10 characters long');
    }

    if (!isValid) {
        showError(errors.join('\n'));
        return;
    }

    // If validation passes
    form.reset();
    showSuccess();
});

function showSuccess() {
    const formStatus = document.getElementById('formStatus');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    formStatus.classList.remove('hidden');
    successMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        formStatus.classList.add('hidden');
        successMessage.classList.add('hidden');
    }, 5000);
}

function showError(message) {
    const formStatus = document.getElementById('formStatus');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    formStatus.classList.remove('hidden');
    errorMessage.classList.remove('hidden');
    successMessage.classList.add('hidden');
    errorMessage.textContent = message;
    
    // Hide error message after 5 seconds
    setTimeout(() => {
        formStatus.classList.add('hidden');
        errorMessage.classList.add('hidden');
    }, 5000);
}