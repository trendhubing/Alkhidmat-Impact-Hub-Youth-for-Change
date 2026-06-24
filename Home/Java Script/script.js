/* =========================
   MOBILE NAVIGATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const overlay = document.getElementById("overlay");

    function openMenu() {
        if (!navLinks || !overlay || !hamburger) return;

        navLinks.classList.add("active");
        overlay.classList.add("active");
        hamburger.innerHTML = `<i class="fas fa-times"></i>`;
    }

    function closeMenu() {
        if (!navLinks || !overlay || !hamburger) return;

        navLinks.classList.remove("active");
        overlay.classList.remove("active");
        hamburger.innerHTML = `<i class="fas fa-bars"></i>`;
    }

    if (hamburger && navLinks && overlay) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.contains("active")
                ? closeMenu()
                : openMenu();
        });

        overlay.addEventListener("click", closeMenu);
    }

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

});


/* =========================
   SCROLL PROGRESS BAR
========================= */

window.addEventListener("scroll", () => {

    const progressBar = document.getElementById("progress-bar");

    if (!progressBar) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";
});


/* =========================
   COUNTER ANIMATION
========================= */
const counters = document.querySelectorAll(".stat-box h2");

function formatNumber(num) {

    if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + "M+";
    }

    if (num >= 1000) {
        return (num / 1000).toFixed(0) + "K+";
    }

    return num + "+";
}

function animateCounter(counter) {

    const target = Number(counter.dataset.target);
    let current = 0;
    const increment = target / 120;

    const updateCounter = () => {

        current += increment;

        if (current < target) {
            counter.innerText = formatNumber(Math.floor(current));
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = formatNumber(target);
        }
    };

    updateCounter();
}

const counterObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });

}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".card, .section-title, .hero-content, .stat-box"
);

revealElements.forEach(el => el.classList.add("hidden"));

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });

}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


/* =========================
   ACTIVE NAV LINK
========================= */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (
            pageYOffset >= sectionTop &&
            pageYOffset < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/* =========================
   DONATION BAR ANIMATION
========================= */

const progressFill = document.querySelector(".progress-fill");

if (progressFill) {

    const progressObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                progressFill.style.width = "0%";

                setTimeout(() => {
                    progressFill.style.transition = "width 2s ease";
                    progressFill.style.width = "75%";
                }, 200);
            }
        });

    }, { threshold: 0.4 });

    progressObserver.observe(progressFill);
}


/* =========================
   BUTTON HOVER EFFECT
========================= */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-3px) scale(1.03)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0) scale(1)";
    });
});


/* =========================
   FORM HANDLERS (SAFE)
========================= */


const donationForm = document.querySelector(".donation-form");

if (donationForm) {
    donationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Thank you for your donation!");
        this.reset();
    });
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Message sent successfully!");
        this.reset();
    });
}

    const volunteerForm = document.querySelector(".volunteer-form");

if (volunteerForm) {
    volunteerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Registration submitted successfully!");
        volunteerForm.reset();
    });
}