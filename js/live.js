// Vantix Radio - Live Listener Counter

document.addEventListener("DOMContentLoaded", () => {

    const counter =
        document.getElementById("listenerCount");

    const STATS_URL =
        "https://eu8.fastcast4u.com/stats?json=1";

    async function updateListeners() {

        try {

            const res =
                await fetch(STATS_URL, {
                    cache: "no-store"
                });

            const data =
                await res.json();

            const listeners =
                data?.currentlisteners ??
                data?.listeners ??
                data?.active_listeners ??
                0;

            if (counter) {
                counter.textContent = listeners;
            }

        } catch (err) {

            // safe fallback
            if (counter) {
                counter.textContent = "0";
            }
        }
    }

    updateListeners();
    setInterval(updateListeners, 10000);

});
