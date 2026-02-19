// Set progress bar widths based on data attribute
document.addEventListener('DOMContentLoaded', () => {

    // Typing Effect
    const typingElement = document.querySelector('.typing-effect');
    const textToType = "Full-Stack Developer | QA Specialist | Data Analyst"; // Updated Text

    if (typingElement) {
        typingElement.textContent = ''; // Clear initial text
        let charIndex = 0;

        function type() {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 50); // Faster typing speed
            } else {
                typingElement.classList.add('finished'); // Optional: stop cursor blink
            }
        }

        setTimeout(type, 500); // Start delay
    }

    // Parallax Effect function
    function handleParallax(scrollTop) {
        const wrapper1 = document.querySelector('.globe-wrapper.w1');
        const wrapper2 = document.querySelector('.globe-wrapper.w2');

        // Move wrappers at different speeds
        if (wrapper1) wrapper1.style.transform = `translateY(${scrollTop * 0.3}px)`;
        if (wrapper2) wrapper2.style.transform = `translateY(${-scrollTop * 0.2}px)`;
    }

    const snapContainer = document.querySelector('.snap-container');

    // Desktop: Scroll Snap Container
    if (snapContainer) {
        snapContainer.addEventListener('scroll', () => {
            handleParallax(snapContainer.scrollTop);
        });
    }

    // Mobile: Window Scroll (when snap is disabled)
    window.addEventListener('scroll', () => {
        // Only trigger if the window is actually scrolling (mobile behavior)
        if (window.scrollY > 0) {
            handleParallax(window.scrollY);
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
