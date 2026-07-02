document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".about-card");
    if (!card) return;

    // Accessibility: respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        card.style.opacity = "1";
        card.style.transform = "none";
        return;
    }

    // Initial state
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    // Safer than immediate RAF-only trigger
    setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    }, 50);
});
