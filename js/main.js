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

// Price history chart
function initPriceHistory() {
    const priceChart = document.getElementById('priceChart');
    if (!priceChart) return;

    const ctx = priceChart.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Price History',
                data: [149.99, 149.99, 139.99, 149.99, 129.99, 149.99],
                borderColor: '#f90',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '6-Month Price History'
                }
            }
        }
    });
}

// Product comparison
function initComparison() {
    const compareButtons = document.querySelectorAll('.compare-button');
    const comparisonList = new Set();

    compareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.product;
            if (comparisonList.has(productId)) {
                comparisonList.delete(productId);
                button.classList.remove('active');
            } else if (comparisonList.size < 3) {
                comparisonList.add(productId);
                button.classList.add('active');
            } else {
                alert('You can compare up to 3 products at a time');
            }
            updateComparisonUI();
        });
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    if (!searchInput || !searchButton) return;

    // Build the index
    const index = lunr(function () {
        this.ref('id');
        this.field('title');
        this.field('content');

        // Add data to the index (example data)
        const documents = [
            { id: 'logitech-g-pro', title: 'Logitech G Pro X Superlight Review', content: 'Ultra-lightweight gaming mouse that doesnt compromise on performance' },
            { id: 'razer-deathadder-v3', title: 'Razer DeathAdder V3 Review', content: 'Ergonomic gaming mouse with a high-precision sensor' },
            { id: 'ducky-one-3', title: 'Ducky One 3 Review', content: 'Mechanical keyboard with hot-swappable switches and RGB lighting' },
            // Add more documents here
        ];

        documents.forEach(function (doc) {
            this.add(doc);
        }, this);
    });

    // Perform the search
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        const results = index.search(searchTerm);

        // Display the results
        displaySearchResults(results, documents);
    });
}

// Display search results
function displaySearchResults(results, documents) {
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    document.body.appendChild(resultsContainer); // Append to body for now, you might want to make this more specific

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    const ul = document.createElement('ul');
    results.forEach(result => {
        const doc = documents.find(d => d.id === result.ref);
        const li = document.createElement('li');
        li.innerHTML = `<a href="/${doc.id}.html">${doc.title}</a>`;
        ul.appendChild(li);
    });

    resultsContainer.appendChild(ul);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initForms();
    initSocialShare();
    initPriceHistory();
    initComparison();
    initSearch();
});
