document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".about-card");

    if (!card) return;

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    requestAnimationFrame(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    });
});
