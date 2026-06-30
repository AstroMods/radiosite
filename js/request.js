document.addEventListener("DOMContentLoaded", () => {

    const badge = document.querySelector(".vr-request-badge");

    if (!badge) return;

    setInterval(() => {
        badge.style.opacity = "0.6";

        setTimeout(() => {
            badge.style.opacity = "1";
        }, 500);

    }, 2000);

});
