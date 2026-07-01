document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".cc_request_form");

    if (!form) return;

    form.addEventListener("submit", () => {

        // Wait so Centova / backend captures submission first
        setTimeout(() => {

            const data = new FormData(form);

            const payload = {
                artist: data.get("request[artist]"),
                title: data.get("request[title]"),
                sender: data.get("request[sender]")
            };

            // Optional debug only (safe for GitHub Pages)
            console.log("Song Request Submitted:", payload);

        }, 500);

        // DO NOT prevent default → Centova still receives form
    });
});
