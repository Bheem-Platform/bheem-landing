// BHEEM V4 - HIGH IMPACT JS

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Enhanced Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        observerOptions
    );

    // Apply fade-in to cards and sections
    document.querySelectorAll('.card, .workflow-card, .value-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        fadeInObserver.observe(el);
    });

    // Enhanced counter animation with easing
    const animateCounter = (el, target) => {
        let current = 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);

            current = Math.floor(target * easedProgress);

            if (current >= target) {
                el.textContent = target.toLocaleString() + '+';
            } else {
                el.textContent = current.toLocaleString();
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    };

    // Counter observer for trust bar
    const statsObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.querySelectorAll('.stat-num').forEach(stat => {
                        const text = stat.textContent;
                        const num = parseInt(text.replace(/\D/g, ''));
                        animateCounter(stat, num);
                    });
                    entry.target.classList.add('counted');
                }
            });
        },
        { threshold: 0.3 }
    );

    const trustBar = document.querySelector('.trust-bar');
    if (trustBar) {
        statsObserver.observe(trustBar);
    }

    // Platform showcase stagger animation
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Enhanced card hover effects with mouse movement
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;

            card.style.transform = `translateY(-6px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });

    // Workflow card hover enhancement
    document.querySelectorAll('.workflow-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // CTA section parallax effect
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const ctaOffset = ctaSection.offsetTop;
            const windowHeight = window.innerHeight;

            if (scrolled > ctaOffset - windowHeight && scrolled < ctaOffset + ctaSection.offsetHeight) {
                const parallax = (scrolled - (ctaOffset - windowHeight)) * 0.3;
                const glow = ctaSection.querySelector('.cta-glow');
                if (glow) {
                    glow.style.transform = `translate(-50%, -50%) translateY(${parallax}px) scale(${1 + parallax * 0.001})`;
                }
            }
        });
    }

    // Enhanced button ripple effect
    document.querySelectorAll('button, .btn-large-cta').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        button, .btn-large-cta {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Scroll progress indicator
    const createScrollIndicator = () => {
        const indicator = document.createElement('div');
        indicator.style.position = 'fixed';
        indicator.style.top = '0';
        indicator.style.left = '0';
        indicator.style.height = '3px';
        indicator.style.background = 'linear-gradient(90deg, #452FF4 0%, #41E295 100%)';
        indicator.style.zIndex = '200';
        indicator.style.transition = 'width 0.1s ease';
        document.body.appendChild(indicator);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            indicator.style.width = scrollPercent + '%';
        });
    };

    createScrollIndicator();

    // Enhanced section reveal
    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll('.ecosystem, .workflows, .value-props, .cta-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    // Badge pulse on hover
    document.querySelectorAll('.card-badge, .workflow-badge').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'badgePulse 1s ease-in-out';
            }, 10);
        });
    });

    // Dynamic gradient text animation
    const gradientTexts = document.querySelectorAll('.gradient');
    gradientTexts.forEach(text => {
        text.style.backgroundSize = '200% auto';
    });

    // Performance: Reduce animations on low-end devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }

    // Log initialization
    console.log('%c🚀 BHEEM V4 - HIGH IMPACT', 'color: #452FF4; font-size: 20px; font-weight: bold;');
    console.log('%cThe Most Powerful AI Platform Ever Built', 'color: #41E295; font-size: 14px;');
});
