/* ========================================
   SCRIPT JAVASCRIPT PROFESSIONNEL
   ======================================== */

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    hideLoaderScreen();
    playLogoAnimation();
    initMenuMobile();
    initProjectFilters();
    initContactForm();
    initScrollAnimations();
    initNavigationActive();
    initSmoothScroll();
    initParallax();
    initLoaderNavigation();
    console.log('Portfolio chargé avec succès! 🚀');
});

/* ========================================
   ÉCRAN DE CHARGEMENT
   ======================================== */

function hideLoaderScreen() {
    const loaderScreen = document.getElementById('loaderScreen');
    if (loaderScreen) {
        setTimeout(() => {
            loaderScreen.classList.add('hidden');
        }, 300);
    }
}

function playLogoAnimation() {
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.classList.add('loading');
        
        // Retirer la classe après l'animation (0.8s)
        setTimeout(() => {
            logoImg.classList.remove('loading');
        }, 800);
    }
}

function initLoaderNavigation() {
    const loaderScreen = document.getElementById('loaderScreen');
    if (!loaderScreen) return;

    // Afficher le loader quand on clique sur un lien interne
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && !link.href.startsWith('#')) {
            const href = link.getAttribute('href');
            
            // Vérifier si c'est un lien interne
            if (href.endsWith('.html') || href.includes('.html')) {
                e.preventDefault();
                
                // Afficher le loader
                loaderScreen.classList.remove('hidden');
                
                // Naviguer après un court délai
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        }
    });
}

/* ========================================
   MENU MOBILE
   ======================================== */

function initMenuMobile() {
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    
    if (!menuToggle || !navMobile) return;

    // Ouvrir/fermer le menu
    menuToggle.addEventListener('click', function() {
        const isOpen = navMobile.style.display === 'flex';
        navMobile.style.display = isOpen ? 'none' : 'flex';
        menuToggle.classList.toggle('active', !isOpen);
    });

    // Fermer le menu quand on clique sur un lien
    const navMobileLinks = navMobile.querySelectorAll('.nav-mobile-link');
    navMobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.style.display = 'none';
            menuToggle.classList.remove('active');
        });
    });

    // Fermer en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header')) {
            navMobile.style.display = 'none';
            menuToggle.classList.remove('active');
        }
    });
}

/* ========================================
   FILTRAGE DES PROJETS
   ======================================== */

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Mettre à jour les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            
            // Animer et filtrer les projets
            projectItems.forEach((item, index) => {
                const categories = item.getAttribute('data-category').split(' ');
                const matches = filterValue === 'all' || categories.includes(filterValue);
                
                // Ajouter l'animation fade
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    item.style.display = matches ? 'block' : 'none';
                    item.style.animation = 'bounceIn 0.6s ease forwards';
                }, 150 * index);
            });
        });
    });
}

/* ========================================
   FORMULAIRE DE CONTACT
   ======================================== */

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Récupérer les valeurs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            afficherNotification('Veuillez remplir tous les champs !', 'error');
            return;
        }

        if (!validerEmail(email)) {
            afficherNotification('Email invalide !', 'error');
            return;
        }

        // Créer le lien mailto avec sujet et message pré-remplis
        const mailtoLink = `mailto:Goulizan59@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
        
        // Ouvrir le client email
        window.location.href = mailtoLink;

        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Message de confirmation
        afficherNotification('Merci ! Votre message est prêt à être envoyé.', 'success');
    });
}

function validerEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function afficherNotification(message, type = 'info') {
    const notif = document.createElement('div');
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#00d4ff' : type === 'error' ? '#ff6b6b' : '#4ecdc4'};
        color: #fff;
        border-radius: 8px;
        z-index: 9999;
        animation: slideInRight 0.5s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideInLeft 0.5s ease reverse';
        setTimeout(() => notif.remove(), 500);
    }, 3000);
}

/* ========================================
   ANIMATIONS AU SCROLL
   ======================================== */

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Appliquer l'observer à tous les éléments animables
    const elementsToObserve = document.querySelectorAll(
        '.project-item, .skill-card, .quality-item, .faq-item, .about-text, .stat-item'
    );

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });

    // Animer les compteurs statistiques
    animateStatsCounters();
}

function animateStatsCounters() {
    const statsItems = document.querySelectorAll('.stat-item h3');
    
    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (!isNaN(number)) {
                    animateCounter(entry.target, number, 2000);
                }
            }
        });
    }, { threshold: 0.5 });

    statsItems.forEach(item => observerStats.observe(item));
}

function animateCounter(element, target, duration = 2000) {
    const originalText = element.textContent;
    const suffix = originalText.replace(/[0-9]/g, '');
    let current = 0;
    const increment = target / (duration / 16);
    const startTime = Date.now();

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        current = Math.floor(target * progress);
        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }

    updateCounter();
}

/* ========================================
   NAVIGATION ACTIVE
   ======================================== */

function initNavigationActive() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navMobileLinks = document.querySelectorAll('.nav-mobile-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    updateActiveLink(navLinks, currentPage);
    updateActiveLink(navMobileLinks, currentPage);
}

function updateActiveLink(links, currentPage) {
    links.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/* ========================================
   EFFET PARALLAX
   ======================================== */

function initParallax() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Appliquer le parallax seulement si pas sur mobile
        if (window.innerWidth > 768) {
            heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}

/* ========================================
   VALIDATION FORMULAIRE EN TEMPS RÉEL
   ======================================== */

const inputs = document.querySelectorAll('input[type="email"], input[type="text"], textarea');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.type === 'email') {
            const isValid = validerEmail(this.value);
            this.style.borderColor = isValid ? '#00d4ff' : '#ff6b6b';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = '#00d4ff';
    });
});

/* ========================================
   EFFETS DE HOVER AVANCÉS
   ======================================== */

// Ajouter un effet de glow au hover sur les boutons
document.querySelectorAll('.btn, .nav-link').forEach(element => {
    element.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Créer un effet de lumière
        this.style.setProperty('--mouse-x', x + 'px');
        this.style.setProperty('--mouse-y', y + 'px');
    });
});

/* ========================================
   LAZY LOADING DES IMAGES
   ======================================== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ========================================
   PERFORMANCE & OPTIMISATIONS
   ======================================== */

// Debounce pour les événements scroll/resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimiser les performances du scroll
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Animations critiques au scroll
            ticking = false;
        });
        ticking = true;
    }
});

/* ========================================
   MESSAGES CONSOLE
   ======================================== */

console.log('%c🚀 Portfolio Goulizan BI David Brian', 
    'font-size: 20px; font-weight: bold; color: #00d4ff; text-shadow: 0 0 10px rgba(0,212,255,0.5);');
console.log('%cBienvenue sur mon portfolio professionnel ! 💼', 
    'font-size: 14px; color: #b0c4ff;');
console.log('%cÉtudiant en Informatique & Technologie Numérique @ BEM TECH', 
    'font-size: 12px; color: #8899cc;');

