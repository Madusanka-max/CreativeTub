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

// Get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        villa: params.get('villa')
    };
}

// Pre-select villa if specified in URL
const params = getUrlParams();
if (params.villa) {
    const villaSelect = document.getElementById('villa');
    if (villaSelect) {
        villaSelect.value = params.villa;
    }
}

// Get form elements
const bookingForm = document.getElementById('bookingForm');
const confirmationModal = document.getElementById('confirmationModal');

// Set minimum date for check-in and check-out
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');

// Format date to YYYY-MM-DD
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

// Set minimum dates
checkInInput.min = formatDate(today);
checkOutInput.min = formatDate(tomorrow);

// Update check-out minimum date when check-in date changes
checkInInput.addEventListener('change', () => {
    const selectedDate = new Date(checkInInput.value);
    const minCheckOut = new Date(selectedDate);
    minCheckOut.setDate(minCheckOut.getDate() + 1);
    checkOutInput.min = formatDate(minCheckOut);
    
    // If current check-out date is before new minimum, update it
    if (new Date(checkOutInput.value) <= selectedDate) {
        checkOutInput.value = formatDate(minCheckOut);
    }
});

// Form submission handling
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show confirmation modal
    showModal();
    
    // Reset form
    bookingForm.reset();
});

// Modal functions
function showModal() {
    confirmationModal.classList.remove('hidden');
    confirmationModal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    confirmationModal.classList.remove('flex');
    confirmationModal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside
confirmationModal.addEventListener('click', (e) => {
    if (e.target === confirmationModal) {
        closeModal();
    }
});