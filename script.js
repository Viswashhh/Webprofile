// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: false,
    mirror: true
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
    heroContent.style.opacity = 1 - (scrolled * 0.003);
});

// YouTube Statistics
async function fetchYouTubeStats() {
    try {
        const response = await fetch('/api/youtube-stats');
        const data = await response.json();
        console.log('Frontend received:', data); // Debug log

        if (data.items && data.items[0] && data.items[0].statistics) {
            const stats = data.items[0].statistics;

            // Format numbers with commas
            const formatNumber = num => new Intl.NumberFormat().format(num);

            // Update DOM elements
            document.getElementById('view-count').textContent = formatNumber(stats.viewCount);
            document.getElementById('subscriber-count').textContent = formatNumber(stats.subscriberCount);
            document.getElementById('video-count').textContent = formatNumber(stats.videoCount);
        } else {
            console.error('Unexpected data structure:', data);
            throw new Error('Invalid data structure');
        }
    } catch (error) {
        console.error('Error in frontend:', error);
        document.getElementById('view-count').textContent = 'N/A';
        document.getElementById('subscriber-count').textContent = 'N/A';
        document.getElementById('video-count').textContent = 'N/A';
    }
}

// Fetch YouTube stats when page loads
fetchYouTubeStats();

// Update stats every 5 minutes
setInterval(fetchYouTubeStats, 300000);