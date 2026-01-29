 // Separate JS for about page specific animations if needed,
        // but existing reveal.js will work for .reveal elements.

        // Initialize reveal animations for elements on this page
        document.addEventListener('DOMContentLoaded', () => {
            const revealElements = document.querySelectorAll('.reveal');
            
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    } else {
                        // Optionally remove 'active' when out of view, for re-animation on scroll up
                        // entry.target.classList.remove('active'); 
                    }
                });
            }, observerOptions);

            revealElements.forEach(el => {
                observer.observe(el);
            });
        });

        // For navigation active state on About page
        document.querySelector('.nav-links .active').classList.remove('active');
        document.querySelector('a[href="about.html"]').classList.add('active');

        // Mobile menu toggle logic from script.js, if not already loaded globally
        const hamburger = document.getElementById("hamburger");
        const navMenu = document.getElementById("nav-links");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));