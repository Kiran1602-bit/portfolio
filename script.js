document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Typing Effect ---
    const roleElement = document.getElementById('hero-role-text');
    const roles = [
        "Full-Stack Developer",
        "Python & Django Expert",
        "React.js Enthusiast",
        "Problem Solver"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseTime = 1500;

    function typeWriter() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 100;
        } else {
            typingSpeed = isDeleting ? 50 : 100;
        }

        setTimeout(typeWriter, typingSpeed);
    }
    typeWriter(); // Start the typing effect

    // --- Scroll Reveal & Skills Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skill-bar .bar span');
    let skillsAnimated = false; // Flag to animate skills only once

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        
        // General section reveal
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100 && !el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });

        // Skills bar animation (only trigger if the section is visible and not yet animated)
        const skillsSection = document.getElementById('skills');
        if (skillsSection && !skillsAnimated) {
            const skillsSectionTop = skillsSection.getBoundingClientRect().top;
            if (skillsSectionTop < windowHeight - 200) {
                skillBars.forEach(bar => {
                    bar.style.width = bar.dataset.level;
                });
                skillsAnimated = true; // Set flag to true after animation
            }
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load
});