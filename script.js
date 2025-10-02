// Load navbar and footer with better path handling
function loadComponents() {
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    
    // Set base path for all links
    const basePath = isInPagesFolder ? '../' : './';
    
    const navbarPath = isInPagesFolder ? '../navbar.html' : './navbar.html';
    const footerPath = isInPagesFolder ? '../footer.html' : './footer.html';

    console.log('Loading navbar from:', navbarPath);
    console.log('Loading footer from:', footerPath);

    // Load navbar
    fetch(navbarPath)
        .then(response => {
            if (!response.ok) throw new Error(`Navbar not found: ${response.status}`);
            return response.text();
        })
        .then(data => {
            // Process the navbar HTML to fix links
            let processedData = data;
            if (isInPagesFolder) {
                processedData = data.replace(/href="pages\//g, 'href="../pages/');
            }
            document.getElementById('navbar').innerHTML = processedData;
            setActiveNavLink();
            initMobileMenu();
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            createFallbackNavbar(isInPagesFolder);
        });

    // Load footer
    fetch(footerPath)
        .then(response => {
            if (!response.ok) throw new Error(`Footer not found: ${response.status}`);
            return response.text();
        })
        .then(data => {
            // Process the footer HTML to fix links
            let processedData = data;
            if (isInPagesFolder) {
                processedData = data.replace(/href="pages\//g, 'href="../pages/');
            }
            document.getElementById('footer').innerHTML = processedData;
            console.log('Footer loaded successfully');
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            createFallbackFooter(isInPagesFolder);
        });
}

// Updated fallback navbar function with path handling
function createFallbackNavbar(isInPagesFolder = false) {
    console.log('Creating fallback navbar');
    const basePath = isInPagesFolder ? '../' : './';
    const pagesPath = isInPagesFolder ? '../pages/' : 'pages/';
    
    const navbarHTML = `
        <nav class="navbar">
            <div class="nav-container">
                <a href="${basePath}index.html" class="logo">Mahsua <span>School</span></a>
                
                <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul class="nav-links" id="navLinks">
                    <li><a href="${basePath}index.html">Home</a></li>
                    <li><a href="${pagesPath}academics.html">Academics</a></li>
                    <li><a href="${pagesPath}students-achivment.html">Student Achievements</a></li>
                    <li><a href="${pagesPath}schools-achivment.html">School Achievements</a></li>
                    <li><a href="${pagesPath}notice.html">Notices</a></li>
                    <li><a href="${pagesPath}about.html">About Us</a></li>
                    <li><a href="${pagesPath}contact.html">Contact</a></li>
                    <li><a href="${pagesPath}admission.html" class="btn-primary">Admissions</a></li>
                </ul>
            </div>
        </nav>
    `;
    document.getElementById('navbar').innerHTML = navbarHTML;
    initMobileMenu();
}

// Updated fallback footer function with path handling
function createFallbackFooter(isInPagesFolder = false) {
    console.log('Creating fallback footer');
    const pagesPath = isInPagesFolder ? '../pages/' : 'pages/';
    
    const footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Contact Information</h3>
                        <p><i class="fas fa-phone"></i> +91 9752107808 (9AM-4PM)</p>
                        <p><i class="fas fa-envelope"></i> mahsuaindia@gmail.com</p>
                        <p><i class="fas fa-map-marker-alt"></i> Mahsua School Campus</p>
                    </div>
                    <div class="footer-section">
                        <h3>Quick Links</h3>
                        <a href="${pagesPath}admission.html">Admissions</a>
                        <a href="${pagesPath}academics.html">Academics</a>
                        <a href="${pagesPath}notice.html">Notices</a>
                        <a href="${pagesPath}about.html">About Us</a>
                    </div>
                    <div class="footer-section">
                        <h3>Follow Us</h3>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                            <a href="#"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                        </div>
                        <p style="margin-top: 1rem;">
                            <a href="https://wa.me/919752107808" class="btn btn-secondary">
                                <i class="fab fa-whatsapp"></i> WhatsApp Us
                            </a>
                        </p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Mahsua School. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
    document.getElementById('footer').innerHTML = footerHTML;
}

// Set active navigation link with path handling
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkPage = linkHref.split('/').pop();
        
        if (linkPage === currentPage || 
            (currentPage === 'index.html' && linkHref.includes('index.html')) ||
            (currentPage === '' && linkHref.includes('index.html'))) {
            link.classList.add('active');
        }
    });
}

// Mobile menu functionality (keep this the same as before)
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on links
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(event.target) && 
                !mobileMenuBtn.contains(event.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing components');
    loadComponents();

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});