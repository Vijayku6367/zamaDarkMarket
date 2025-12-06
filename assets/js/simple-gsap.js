// Simple GSAP alternative for animations
class SimpleAnimator {
    static fadeIn(element, duration = 500) {
        element.style.opacity = '0';
        element.style.display = 'block';
        let start = null;
        
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }
    
    static slideUp(element, duration = 500) {
        element.style.transform = 'translateY(50px)';
        element.style.opacity = '0';
        let start = null;
        
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            
            element.style.transform = `translateY(${50 * (1 - percentage)}px)`;
            element.style.opacity = percentage;
            
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }
}

window.SimpleAnimator = SimpleAnimator;
