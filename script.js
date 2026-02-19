// Set progress bar widths based on data attribute
document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress-bar');

    // Intersection Observer to animate progress bars when they scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        bar.style.width = '0%'; // Start at 0
        bar.style.transition = 'width 1.5s ease-out';
        observer.observe(bar);
    });

    // Typing Effect
    const typingElement = document.querySelector('.typing-effect');
    const textToType = "IT Specialist | Information Systems Student";

    if (typingElement) {
        typingElement.textContent = ''; // Clear initial text
        let charIndex = 0;

        function type() {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 80); // Typing speed
            } else {
                typingElement.style.borderRight = 'none'; // Remove cursor after typing
            }
        }

        setTimeout(type, 1000); // Start delay
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax Effect on Scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const wrapper1 = document.querySelector('.globe-wrapper.w1');
        const wrapper2 = document.querySelector('.globe-wrapper.w2');

        // Move wrappers at different speeds
        if (wrapper1) wrapper1.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (wrapper2) wrapper2.style.transform = `translateY(${-scrolled * 0.2}px)`;
    });
});
