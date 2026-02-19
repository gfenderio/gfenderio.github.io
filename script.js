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

// Parallax Effect
const snapContainer = document.querySelector('.snap-container');

function handleParallax(scrollTop) {
    const wrapper1 = document.querySelector('.globe-wrapper.w1');
    const wrapper2 = document.querySelector('.globe-wrapper.w2');

    // Move wrappers at different speeds
    if (wrapper1) wrapper1.style.transform = `translateY(${scrollTop * 0.3}px)`;
    if (wrapper2) wrapper2.style.transform = `translateY(${-scrollTop * 0.2}px)`;
}

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

// Typing Effect
const textToType = "Full-Stack Developer | QA Specialist | Data Analyst";
const typingElement = document.querySelector('.typing-effect');
let charIndex = 0;

function type() {
    if (!typingElement) return;
    if (charIndex < textToType.length) {
        typingElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, 80); // Normal typing speed
    } else {
        typingElement.classList.add('finished');
    }
}

// Start typing when page loads
document.addEventListener('DOMContentLoaded', type);


// --- Language Support ---

function setLanguage(lang) {
    console.log("Setting language to:", lang);

    // Save preference
    localStorage.setItem('preferredLang', lang);

    // Hide modal
    const modal = document.getElementById('lang-modal');
    if (modal) {
        modal.style.display = 'none';
    }

    // Apply translations
    updateContent(lang);
}

function updateContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Keep HTML tags if present in translation (innerHTML) or just text
            if (translations[lang][key].includes('<')) {
                el.innerHTML = translations[lang][key];
            } else {
                el.innerText = translations[lang][key];
            }
        }
    });

    // Update placeholder attributes for form inputs
    const inputs = document.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(input => {
        const key = input.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            input.placeholder = translations[lang][key];
        }
    });
}

// Check on Load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang');
    const modal = document.getElementById('lang-modal');

    // If no language saved, show modal
    if (!savedLang) {
        if (modal) {
            // Use Flex to center it, as defined in CSS
            modal.style.display = 'flex';
        }
        // If language saved, apply it immediately
        updateContent(savedLang);
    }
});

// Expose to global scope for the Navbar toggler
window.showLangModal = function () {
    const modal = document.getElementById('lang-modal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.animation = 'none'; // Reset logic
        setTimeout(() => modal.style.animation = 'slideUp 0.5s ease-out', 10);
    }
};
