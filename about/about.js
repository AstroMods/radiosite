document.addEventListener("DOMContentLoaded", () => {

    const card = document.querySelector(".about-card");

    // safety check (prevents errors if element missing)
    if (!card) return;

    // initial state (better performance: avoid layout jank)
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    // trigger animation
    requestAnimationFrame(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    });

});
