document.addEventListener("DOMContentLoaded", () => {

    // BUTTON CLICK EFFECTS
    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {

            btn.style.transform = "scale(0.96)";

            setTimeout(() => {
                btn.style.transform = "";
            }, 120);

        });
    });

    // OPTIONAL: Download button behavior
    const downloadBtn = document.querySelector(".download-btn");

    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            // replace with your real file later
            window.open("https://github.com/Vantix-Development/VRRadio/releases/latest", "_blank");
        });
    }

});
