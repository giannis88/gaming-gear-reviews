// Dark mode toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setDarkMode(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('darkMode', isDark);
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            setDarkMode(!document.body.classList.contains('dark-mode'));
        });
    }

    // Check saved preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    setDarkMode(savedMode ? JSON.parse(savedMode) : prefersDark.matches);
}

// Form handling
function initForms() {
    const reviewForm = document.getElementById('reviewForm');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const rating = document.getElementById('rating').value;
            const review = document.getElementById('review').value;
            
            // Here you would typically send to a backend
            console.log('Review submitted:', { rating, review });
            alert('Thank you for your review!');
            reviewForm.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Here you would typically send to a newsletter service
            console.log('Newsletter signup:', email);
            alert('Thanks for subscribing!');
            newsletterForm.reset();
        });
    }
}

// Social share functionality
function initSocialShare() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            const shareUrls = {
                twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                reddit: `https://reddit.com/submit?url=${url}&title=${title}`
            };
            
            const platform = button.classList[1];
            window.open(shareUrls[platform], '_blank');
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initForms();
    initSocialShare();
});
