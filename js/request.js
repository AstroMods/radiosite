document.addEventListener("DOMContentLoaded", () => {

    const badge = document.querySelector(".vr-request-badge");
    if (!badge) return;

    // smooth animation instead of stacking timers
    badge.style.transition = "opacity 0.5s ease";

    let visible = true;

    setInterval(() => {
        visible = !visible;
        badge.style.opacity = visible ? "1" : "0.6";
    }, 2000);

});
