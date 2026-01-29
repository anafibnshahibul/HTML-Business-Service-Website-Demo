// 1. Scroll Animation Logic (Reveal on scroll)
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Trigger once on load

// 2. Form Submission Handling
var submitted = false;

function showSuccess() {
    if (submitted) {
        // Fetch values from Google Form entry fields
        const name = document.querySelector('input[name="entry.1691238961"]').value;
        const email = document.querySelector('input[name="entry.1221768656"]').value;
        const subject = document.querySelector('input[name="entry.582697816"]').value;

        // Redirect to Thank You page with parameters
        window.location.href = `thankyou.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}`;
    }
}

// 3. Hero Section Typewriter Effect
const textToType = "Scale Your Business With Intelligence.";
const typeWriterElement = document.getElementById('typewriter');
let charIndex = 0;

function typeWriter() {
    if (typeWriterElement && charIndex < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50); // Typing speed
    }
}

window.addEventListener('load', typeWriter);

// 4. Sticky Navbar on Scroll
window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (nav) {
        nav.classList.toggle("sticky", window.scrollY > 0);
    }
});

// 5. Statistics Number Counter
const counters = document.querySelectorAll('.counter');
let hasCounted = false;

function startCounter() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    // Start count when stats section enters the viewport
    if (sectionPos < screenPos && !hasCounted) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200;

            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        hasCounted = true;
    }
}

window.addEventListener('scroll', startCounter);

// 6. Mobile Menu Logic
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-links");

if (hamburger && navMenu) {
    // Toggle Menu
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

function openHelp() {
    alert("Welcome to Lumina's Help Center!\n\n1. Critical Errors: Needs immediate fix.\n2. Warnings: Good for optimization.\n3. Need more help? Email: lumina2020@icloud.com");
}




