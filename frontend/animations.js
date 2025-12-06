// Advanced Animation System for DarkMarket FHE - YELLOW THEME
class AnimationManager {
    constructor() {
        this.scrollController = null;
        this.parallaxItems = [];
        this.yellowColors = {
            primary: '#F5B301',
            secondary: '#FFD700',
            light: '#FFE566',
            dark: '#D89C00'
        };
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupNavigationAnimations();
        this.setupEncryptionAnimations();
        this.setupHoverEffects();
        this.setupPageTransitions();
        this.applyYellowTheme();
    }

    applyYellowTheme() {
        // Apply yellow theme to all animations
        document.documentElement.style.setProperty('--animation-yellow-primary', this.yellowColors.primary);
        document.documentElement.style.setProperty('--animation-yellow-secondary', this.yellowColors.secondary);
        
        // Add yellow animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes yellow-glow {
                0%, 100% { 
                    box-shadow: 0 0 10px ${this.yellowColors.primary}33; 
                }
                50% { 
                    box-shadow: 0 0 25px ${this.yellowColors.primary}66; 
                }
            }
            
            @keyframes yellow-pulse {
                0%, 100% { 
                    opacity: 1;
                    transform: scale(1);
                }
                50% { 
                    opacity: 0.8;
                    transform: scale(1.02);
                }
            }
            
            @keyframes yellow-sparkle {
                0%, 100% { 
                    background-position: 0% 50%; 
                }
                50% { 
                    background-position: 100% 50%; 
                }
            }
            
            .yellow-glow {
                animation: yellow-glow 2s ease-in-out infinite;
            }
            
            .yellow-pulse {
                animation: yellow-pulse 1.5s ease-in-out infinite;
            }
            
            .yellow-sparkle {
                background: linear-gradient(
                    90deg,
                    ${this.yellowColors.primary},
                    ${this.yellowColors.secondary},
                    ${this.yellowColors.primary}
                );
                background-size: 200% auto;
                animation: yellow-sparkle 3s linear infinite;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        `;
        document.head.appendChild(style);
        
        // Add yellow glow to encrypted elements
        document.querySelectorAll('.encrypted-value, .price-value, .encrypted-text').forEach(el => {
            el.classList.add('yellow-pulse');
        });
        
        // Add yellow sparkle to gradient texts
        document.querySelectorAll('.gradient-text').forEach(el => {
            el.classList.add('yellow-sparkle');
        });
    }

    setupScrollAnimations() {
        // GSAP ScrollTrigger setup
        if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero section entrance with yellow accent
            gsap.from('.hero-content', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out',
                onComplete: () => {
                    // Add yellow glow to hero title
                    gsap.to('.gradient-text', {
                        duration: 2,
                        textShadow: `0 0 20px ${this.yellowColors.primary}`,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut'
                    });
                }
            });

            // Product card staggered animation with yellow highlight
            gsap.from('.product-card', {
                scrollTrigger: {
                    trigger: '.marketplace-section',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                onEnter: () => {
                    // Yellow highlight on product badges
                    gsap.to('.product-badge', {
                        duration: 0.5,
                        boxShadow: `0 0 15px ${this.yellowColors.primary}`,
                        repeat: 1,
                        yoyo: true
                    });
                }
            });

            // Encryption section fade in with yellow accent
            gsap.from('.encryption-panel', {
                scrollTrigger: {
                    trigger: '.encryption-section',
                    start: 'top 70%'
                },
                duration: 1,
                x: -50,
                opacity: 0,
                ease: 'power3.out',
                onEnter: () => {
                    // Yellow pulse on lock icons
                    gsap.to('.encryption-panel .fa-lock', {
                        duration: 1,
                        color: this.yellowColors.primary,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut'
                    });
                }
            });

            gsap.from('.bid-panel', {
                scrollTrigger: {
                    trigger: '.encryption-section',
                    start: 'top 70%'
                },
                duration: 1,
                x: 50,
                opacity: 0,
                ease: 'power3.out'
            });
        }
    }

    setupParallax() {
        // Parallax effect for background elements with yellow accents
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });

            // Navbar effect with yellow border
            const navbar = document.querySelector('.glass-nav');
            if (scrolled > 100) {
                navbar.classList.add('scrolled');
                navbar.style.borderColor = this.yellowColors.primary + '40';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.borderColor = '';
            }
        });
    }

    setupNavigationAnimations() {
        const navLinks = document.querySelectorAll('.nav-link');
        const navIndicator = document.querySelector('.nav-indicator');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                if (navIndicator) {
                    gsap.to(navIndicator, {
                        left: rect.left + window.scrollX,
                        width: rect.width,
                        duration: 0.3,
                        ease: 'power3.out',
                        backgroundColor: this.yellowColors.primary
                    });
                }
                
                // Yellow glow effect
                gsap.to(e.currentTarget, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'power2.out',
                    color: this.yellowColors.primary,
                    textShadow: `0 0 10px ${this.yellowColors.primary}`
                });
            });
            
            link.addEventListener('mouseleave', (e) => {
                gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.in',
                    color: '',
                    textShadow: ''
                });
            });
        });
    }

    setupEncryptionAnimations() {
        const encryptBtn = document.getElementById('encryptBtn');
        const encryptedValue = document.getElementById('encryptedValue');
        
        if (encryptBtn) {
            encryptBtn.addEventListener('click', () => {
                this.animateEncryptionProcess();
            });
        }
    }

    animateEncryptionProcess() {
        const encryptedValue = document.getElementById('encryptedValue');
        const plainBar = document.querySelector('.plain-bar');
        const encryptedBar = document.querySelector('.encrypted-bar');
        
        // Reset with yellow theme
        encryptedValue.innerHTML = '<span class="placeholder yellow-sparkle">Encrypting...</span>';
        gsap.set([plainBar, encryptedBar], { 
            scaleX: 0,
            backgroundColor: this.yellowColors.light
        });
        
        // Animation sequence with yellow colors
        const tl = gsap.timeline();
        
        // Plain text fade out with yellow tint
        tl.to('.input-with-action', {
            opacity: 0.5,
            duration: 0.5,
            ease: 'power2.in',
            color: this.yellowColors.primary
        })
        
        // Encryption bar animation - yellow glow
        tl.to(plainBar, {
            scaleX: 1,
            duration: 1,
            ease: 'power2.inOut',
            backgroundColor: this.yellowColors.primary,
            boxShadow: `0 0 15px ${this.yellowColors.primary}`
        }, '-=0.3')
        
        // Ciphertext generation - yellow to gold gradient
        tl.to(encryptedBar, {
            scaleX: 1,
            duration: 1.5,
            ease: 'power3.inOut',
            backgroundColor: this.yellowColors.secondary,
            boxShadow: `0 0 25px ${this.yellowColors.secondary}`,
            onComplete: () => {
                this.generateCiphertextAnimation();
            }
        })
        
        // Restore input with yellow accent
        tl.to('.input-with-action', {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            color: ''
        });
    }

    generateCiphertextAnimation() {
        const encryptedValue = document.getElementById('encryptedValue');
        const ciphertext = this.generateRandomCiphertext();
        
        // Typewriter effect with yellow colors
        let i = 0;
        const speed = 10;
        encryptedValue.innerHTML = '';
        
        const typeWriter = () => {
            if (i < ciphertext.length) {
                const char = ciphertext.charAt(i);
                const span = document.createElement('span');
                span.textContent = char;
                
                // Yellow gradient colors
                if (i % 3 === 0) {
                    span.style.color = this.yellowColors.primary;
                    span.style.textShadow = `0 0 3px ${this.yellowColors.primary}`;
                } else if (i % 3 === 1) {
                    span.style.color = this.yellowColors.secondary;
                    span.style.textShadow = `0 0 3px ${this.yellowColors.secondary}`;
                } else {
                    span.style.color = this.yellowColors.light;
                    span.style.textShadow = `0 0 3px ${this.yellowColors.light}`;
                }
                
                span.style.opacity = '0';
                span.style.fontWeight = '600';
                
                encryptedValue.appendChild(span);
                
                gsap.to(span, {
                    opacity: 1,
                    duration: 0.05,
                    ease: 'power1.out',
                    y: -5,
                    onComplete: () => {
                        gsap.to(span, {
                            y: 0,
                            duration: 0.1
                        });
                    }
                });
                
                i++;
                setTimeout(typeWriter, speed);
            }
        };
        
        typeWriter();
        
        // Add yellow completion effect
        setTimeout(() => {
            encryptedValue.classList.add('yellow-glow');
            gsap.fromTo(encryptedValue,
                { scale: 1 },
                { 
                    scale: 1.02, 
                    duration: 0.3, 
                    repeat: 1, 
                    yoyo: true,
                    ease: 'power2.inOut'
                }
            );
        }, ciphertext.length * speed + 100);
    }

    generateRandomCiphertext() {
        const chars = '0123456789ABCDEF';
        let result = '0x';
        for (let i = 0; i < 64; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    setupHoverEffects() {
        // 3D tilt effect for cards with yellow glow
        const cards = document.querySelectorAll('.product-card, .stat-card, .feature-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformPerspective: 1000,
                    duration: 0.3,
                    ease: 'power2.out',
                    boxShadow: `0 20px 40px ${this.yellowColors.primary}33,
                               0 0 20px ${this.yellowColors.secondary}22`,
                    borderColor: this.yellowColors.primary + '66'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)',
                    boxShadow: '',
                    borderColor: ''
                });
            });
        });
        
        // Yellow glow on buttons hover
        document.querySelectorAll('.btn-primary, .btn-connect-wallet').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    duration: 0.3,
                    boxShadow: `0 0 25px ${this.yellowColors.primary}66`,
                    scale: 1.05,
                    ease: 'power2.out'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    duration: 0.3,
                    boxShadow: '',
                    scale: 1,
                    ease: 'power2.in'
                });
            });
        });
    }

    setupPageTransitions() {
        // Smooth page transitions for anchor links with yellow accent
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Add yellow transition overlay
                    const overlay = document.createElement('div');
                    overlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, 
                            ${this.yellowColors.primary}11, 
                            ${this.yellowColors.secondary}22
                        );
                        z-index: 9999;
                        opacity: 0;
                        pointer-events: none;
                    `;
                    document.body.appendChild(overlay);
                    
                    // Animate overlay
                    gsap.to(overlay, {
                        opacity: 0.3,
                        duration: 0.3,
                        onComplete: () => {
                            // Scroll to target
                            window.scrollTo({
                                top: targetElement.offsetTop - 100,
                                behavior: 'smooth'
                            });
                            
                            // Remove overlay
                            gsap.to(overlay, {
                                opacity: 0,
                                duration: 0.3,
                                delay: 0.5,
                                onComplete: () => overlay.remove()
                            });
                        }
                    });
                }
            });
        });
    }

    // Particle system for background - YELLOW THEME
    initParticleSystem() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 80; // Increased for better effect
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1.5 - 0.75;
                this.speedY = Math.random() * 1.5 - 0.75;
                
                // Yellow theme colors
                const colors = [
                    '#F5B301', // Primary yellow
                    '#FFD700', // Gold
                    '#FFE566', // Light yellow
                    '#D89C00'  // Dark yellow
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.3 + 0.1;
                this.wave = Math.random() * Math.PI * 2;
                this.waveSpeed = Math.random() * 0.05 + 0.01;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.wave += this.waveSpeed;
                
                // Wave motion
                this.y += Math.sin(this.wave) * 0.5;
                
                // Boundary check with wrap-around
                if (this.x > canvas.width + 50) this.x = -50;
                if (this.x < -50) this.x = canvas.width + 50;
                if (this.y > canvas.height + 50) this.y = -50;
                if (this.y < -50) this.y = canvas.height + 50;
            }
            
            draw() {
                ctx.beginPath();
                
                // Create star-like particles
                const spikes = 5;
                const outerRadius = this.size;
                const innerRadius = this.size * 0.5;
                
                for (let i = 0; i < spikes * 2; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const angle = (Math.PI * i) / spikes;
                    const x = this.x + Math.cos(angle) * radius;
                    const y = this.y + Math.sin(angle) * radius;
                    
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                
                ctx.closePath();
                
                // Gradient fill for yellow glow
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 2
                );
                gradient.addColorStop(0, this.color + 'FF');
                gradient.addColorStop(1, this.color + '00');
                
                ctx.fillStyle = gradient;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                
                // Yellow glow effect
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
        
        // Create yellow particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop
        function animate() {
            // Clear with dark background
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
                
                // Connect particles with yellow lines
                particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        
                        // Yellow gradient for connection lines
                        const lineGradient = ctx.createLinearGradient(
                            particle.x, particle.y,
                            otherParticle.x, otherParticle.y
                        );
                        lineGradient.addColorStop(0, particle.color + '33');
                        lineGradient.addColorStop(1, otherParticle.color + '33');
                        
                        ctx.strokeStyle = lineGradient;
                        ctx.globalAlpha = 0.1 * (1 - distance / 150);
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Add mousemove interaction
        let mouseX = 0;
        let mouseY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Attract particles to mouse
            particles.forEach(particle => {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    particle.speedX += dx * 0.0001;
                    particle.speedY += dy * 0.0001;
                    
                    // Temporary glow effect
                    particle.opacity = Math.min(particle.opacity + 0.1, 0.6);
                }
            });
        });
    }

    // Animate encrypted numbers with yellow theme
    animateEncryptedNumbers() {
        const numbers = document.querySelectorAll('.encrypted-number');
        
        numbers.forEach(element => {
            const target = parseInt(element.dataset.value);
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            let step = 0;
            
            // Yellow sparkle effect during animation
            element.classList.add('yellow-sparkle');
            
            const timer = setInterval(() => {
                step++;
                current = Math.min(increment * step, target);
                
                // Add yellow encryption effect
                if (step < steps) {
                    element.textContent = this.getRandomEncryptedNumber();
                    element.style.textShadow = `0 0 10px ${this.yellowColors.primary}`;
                    
                    // Pulse effect
                    if (step % 5 === 0) {
                        gsap.to(element, {
                            scale: 1.1,
                            duration: 0.1,
                            yoyo: true,
                            repeat: 1,
                            ease: 'power1.inOut'
                        });
                    }
                } else {
                    element.textContent = target;
                    element.classList.remove('yellow-sparkle');
                    element.style.textShadow = '';
                    
                    // Final yellow celebration
                    gsap.fromTo(element,
                        { 
                            color: this.yellowColors.primary,
                            scale: 1.5 
                        },
                        { 
                            color: '',
                            scale: 1,
                            duration: 0.5,
                            ease: 'elastic.out(1, 0.3)'
                        }
                    );
                    
                    clearInterval(timer);
                }
            }, duration / steps);
        });
    }

    getRandomEncryptedNumber() {
        const length = 3;
        let result = '';
        // Yellow/star emojis for yellow theme
        const chars = '🟡✨🌟⭐💫🔥🔅🔆'; // Yellow/star themed emojis
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    // Add notification system with yellow theme
    showYellowNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'yellow-notification';
        
        // Yellow themed icons
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-triangle'
        };
        
        notification.innerHTML = `
            <i class="${icons[type] || icons.info}" style="color: ${this.yellowColors.primary}"></i>
            <span>${message}</span>
        `;
        
        // Yellow themed styling
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, 
                ${this.yellowColors.primary}11, 
                ${this.yellowColors.dark}22
            );
            backdrop-filter: blur(10px);
            border: 1px solid ${this.yellowColors.primary}44;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            box-shadow: 0 10px 30px ${this.yellowColors.primary}22;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in with yellow accent
        gsap.to(notification, {
            x: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
            onComplete: () => {
                // Yellow pulse effect
                gsap.to(notification, {
                    boxShadow: `0 0 20px ${this.yellowColors.primary}`,
                    duration: 0.5,
                    repeat: 1,
                    yoyo: true
                });
            }
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            gsap.to(notification, {
                x: 150,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => notification.remove()
            });
        }, 5000);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            gsap.to(notification, {
                x: 150,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => notification.remove()
            });
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
    animationManager.initParticleSystem();
    animationManager.animateEncryptedNumbers();
    
    // Add demo yellow notifications
    setTimeout(() => {
        animationManager.showYellowNotification('Welcome to DarkMarket FHE!', 'info');
    }, 1000);
    
    // Add wallet connection animation
    const connectBtn = document.getElementById('connectWallet');
    if (connectBtn) {
        connectBtn.addEventListener('click', function() {
            animationManager.showYellowNotification('Wallet connected successfully!', 'success');
            
            // Yellow connection animation
            gsap.to(this, {
                backgroundColor: animationManager.yellowColors.primary,
                color: '#000000',
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    this.innerHTML = '<i class="fas fa-check"></i> Connected';
                    gsap.to(this, {
                        backgroundColor: '',
                        duration: 0.5,
                        delay: 0.5
                    });
                }
            });
        });
    }
});

// Add yellow theme utility functions
window.yellowThemeUtils = {
    addGlow: (element) => {
        if (element) {
            element.style.boxShadow = `0 0 15px #F5B301`;
            element.classList.add('yellow-pulse');
        }
    },
    
    removeGlow: (element) => {
        if (element) {
            element.style.boxShadow = '';
            element.classList.remove('yellow-pulse');
        }
    },
    
    sparkleText: (element) => {
        if (element) {
            element.classList.add('yellow-sparkle');
        }
    },
    
    animateSuccess: (element) => {
        if (element && window.gsap) {
            gsap.fromTo(element,
                {
                    scale: 0.8,
                    color: '#F5B301',
                    textShadow: '0 0 10px #F5B301'
                },
                {
                    scale: 1,
                    color: '',
                    textShadow: '',
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)'
                }
            );
        }
    }
};
