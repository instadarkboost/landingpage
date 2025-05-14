// landing.js
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const fixedCtaButton = document.getElementById('fixed-cta-button');

    const risingNebula = document.getElementById('rising-galactic-cloud');
    const saturnContainer = document.getElementById('saturn-planet-container');
    const atmosphericClouds = document.querySelectorAll('.atmospheric-cloud');
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    let pageHeight = 0;
    let nebulaStartAppearScroll, nebulaFullOpacityScroll;
    let saturnAppearScroll, saturnFullVisibleScroll;
    let cloudsAppearScroll, cloudsFullOpacityScroll;
    let ticking = false;

    function calculateScrollTriggers() {
        pageHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        nebulaStartAppearScroll = pageHeight * 0.05;
        nebulaFullOpacityScroll = pageHeight * 0.45; 
        saturnAppearScroll = pageHeight * 0.25; 
        saturnFullVisibleScroll = pageHeight * 0.50; 
        cloudsAppearScroll = pageHeight * 0.35; 
        cloudsFullOpacityScroll = pageHeight * 0.65; 
    }

    function handleNavbarScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }
    
    function handleFixedCtaVisibility() {
        if (fixedCtaButton) {
            if (window.scrollY > window.innerHeight * 0.5) {
                fixedCtaButton.classList.add('visible');
            } else {
                fixedCtaButton.classList.remove('visible');
            }
        }
    }

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // O CSS `scroll-behavior: smooth;` no `html` cuida disso.
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (entry.target.classList.contains('stagger-children')) {
                    const staggerItems = entry.target.querySelectorAll('.stagger-item');
                    staggerItems.forEach((item) => {
                        item.classList.add('animate-in');
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    scrollElements.forEach(el => sectionObserver.observe(el));

    const notificationSources = ["Salário Estelar", "Dividendos Cósmicos", "Bônus Intergaláctico"];
    let notificationTimeout;
    function createFloatingNotification() {
        const existing = document.querySelector('.floating-notification'); if(existing) existing.remove();
        const notification = document.createElement('div'); notification.classList.add('floating-notification');
        const randomAmount = (Math.random() * 300 + 50).toFixed(2);
        const randomSource = notificationSources[Math.floor(Math.random() * notificationSources.length)];
        notification.innerHTML = `<i class="fas fa-coins mr-2 text-yellow-400"></i> <span class="amount">R$ +${randomAmount}</span> de <span class="source">${randomSource}</span>`;
        document.body.appendChild(notification);
        const W = window.innerWidth, H = window.innerHeight; const nw = notification.offsetWidth, nh = notification.offsetHeight;
        let top, left, angle; const side = Math.floor(Math.random() * 4);
        if (side === 0) { top = Math.random()*(H*0.1); left = Math.random()*(W-nw); angle = Math.random()*20-10; }
        else if (side === 1) { top = Math.random()*(H-nh); left = W-nw-(Math.random()*(W*0.1)); angle = 80+Math.random()*20; }
        else if (side === 2) { top = H-nh-(Math.random()*(H*0.1)); left = Math.random()*(W-nw); angle = 170+Math.random()*20; }
        else { top = Math.random()*(H-nh); left = Math.random()*(W*0.1); angle = -100+Math.random()*20; }
        top = Math.max(10, Math.min(top, H-nh-10)); left = Math.max(10, Math.min(left, W-nw-10));
        notification.style.top = `${top + nh/2}px`; notification.style.left = `${left + nw/2}px`;
        notification.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(0.8)`;
        void notification.offsetWidth;
        notification.style.opacity = '1'; notification.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(1)`;
        setTimeout(() => { notification.style.opacity='0'; notification.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(0.8) translateY(-30px)`; setTimeout(() => { if (notification.parentNode) notification.remove(); }, 500); }, 3500);
        clearTimeout(notificationTimeout); notificationTimeout = setTimeout(createFloatingNotification, Math.random()*7000+6000);
    }
    
    function animateBackgroundElements() {
        const scrollY = window.scrollY;
        const scrollPercentOverall = pageHeight > 0 ? Math.min(1, scrollY / pageHeight) : 0;

        if (risingNebula) {
            let currentOpacity = 0;
            if (scrollY >= nebulaStartAppearScroll && (nebulaFullOpacityScroll - nebulaStartAppearScroll) > 0) {
                const progress = Math.min(1, (scrollY - nebulaStartAppearScroll) / (nebulaFullOpacityScroll - nebulaStartAppearScroll));
                currentOpacity = progress * 0.65;
            } else if (scrollY < nebulaStartAppearScroll) {
                currentOpacity = 0;
            }
            const translateY = 100 - (scrollPercentOverall * 180);
            risingNebula.style.opacity = currentOpacity.toFixed(2);
            risingNebula.style.transform = `translateY(${translateY.toFixed(2)}%)`;
        }

        if (saturnContainer) {
            let currentProgress = 0;
            if (scrollY >= saturnAppearScroll && (saturnFullVisibleScroll - saturnAppearScroll) > 0) {
                currentProgress = Math.min(1, (scrollY - saturnAppearScroll) / (saturnFullVisibleScroll - saturnAppearScroll));
            } else if (scrollY < saturnAppearScroll) {
                currentProgress = 0;
            }
            saturnContainer.style.opacity = (currentProgress * 0.9).toFixed(2);
            saturnContainer.style.right = `${-450 + (currentProgress * 500)}px`;
            saturnContainer.style.transform = `rotate(${-20 + (currentProgress * 15)}deg) translateY(${scrollPercentOverall * -25}px) scale(${0.8 + currentProgress * 0.2})`;
        }

        if (atmosphericClouds.length > 0) {
             let currentProgress = 0;
             if (scrollY >= cloudsAppearScroll && (cloudsFullOpacityScroll - cloudsAppearScroll) > 0) {
                currentProgress = Math.min(1, (scrollY - cloudsAppearScroll) / (cloudsFullOpacityScroll - cloudsAppearScroll));
             } else if (scrollY < cloudsAppearScroll) {
                 currentProgress = 0;
             }
            atmosphericClouds.forEach((cloud, index) => {
                cloud.style.opacity = (currentProgress * (0.25 + (index * 0.05))).toFixed(2);
                const parallaxX = (index % 2 === 0 ? 1 : -1) * currentProgress * (15 + index * 3);
                const parallaxY = (index % 3 === 0 ? -1 : 0.5) * currentProgress * (8 + index * 2);
                if (currentProgress > 0.01) {
                    cloud.style.transform = `translateX(${parallaxX}px) translateY(${parallaxY}px)`;
                } else {
                    cloud.style.transform = 'none'; 
                }
            });
        }
        ticking = false;
    }

    // INICIALIZAÇÃO
    calculateScrollTriggers();
    animateBackgroundElements(); 
    handleFixedCtaVisibility(); // Checa no load
    notificationTimeout = setTimeout(createFloatingNotification, 4000);

    window.addEventListener('resize', () => {
        calculateScrollTriggers();
        if (!ticking) {
            window.requestAnimationFrame(function(){
                animateBackgroundElements();
                handleFixedCtaVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    window.addEventListener('scroll', function() {
        handleNavbarScroll();
        handleFixedCtaVisibility();
        if (!ticking) {
            window.requestAnimationFrame(animateBackgroundElements);
            ticking = true;
        }
    });
    console.log("FinançApp JS Initialized - Full version with Strategic CTAs and ALL enhancements.");
});