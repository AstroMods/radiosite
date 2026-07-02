document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       COPYRIGHT YEAR
    ========================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* =========================
       FADE IN PAGE
    ========================= */

    document.body.classList.add("loaded");

    /* =========================
       CONTACT CARD HOVER GLOW
    ========================= */

    const cards = document.querySelectorAll(".contact-box");

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

        });

    });

    /* =========================
       BUTTON RIPPLE EFFECT
    ========================= */

    const buttons = document.querySelectorAll(".contact-btn, .hero-btn");

    buttons.forEach(button => {

        button.addEventListener("click", function(e) {

            const ripple = document.createElement("span");

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = `${size}px`;

            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;

            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            ripple.className = "ripple";

            this.appendChild(ripple);

            ripple.addEventListener("animationend", () => {
                ripple.remove();
            });

        });

    });

    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".contact-box, .hero-btn, .info-item"
    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(el => observer.observe(el));

    /* =========================
       FLOATING BACKGROUND GLOW
    ========================= */

    const glowOne = document.querySelector(".glow-one");
    const glowTwo = document.querySelector(".glow-two");

    document.addEventListener("mousemove", e => {

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        if (glowOne) {

            glowOne.style.transform =
                `translate(${x * 30}px, ${y * 30}px)`;

        }

        if (glowTwo) {

            glowTwo.style.transform =
                `translate(${-x * 30}px, ${-y * 30}px)`;

        }

    });

    /* =========================
       LOGO TILT
    ========================= */

    const logo = document.querySelector(".station-logo");

    if (logo) {

        document.addEventListener("mousemove", e => {

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const rotateY = (e.clientX - centerX) / 40;
            const rotateX = -(e.clientY - centerY) / 40;

            logo.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

        });

        document.addEventListener("mouseleave", () => {

            logo.style.transform =
                "perspective(800px) rotateX(0) rotateY(0)";

        });

    }

});
