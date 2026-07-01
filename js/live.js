document.addEventListener("DOMContentLoaded", () => {

    const counter = document.getElementById("listenerCount");

    const STATS_URL =
        "https://eu8.fastcast4u.com/proxy/vantixradio/stats?json=1";

    async function updateListeners() {

        try {
            const res = await fetch(STATS_URL, {
                cache: "no-store"
            });

            // ❗ handle bad responses like 404 properly
            if (!res.ok) {
                throw new Error("HTTP Error: " + res.status);
            }

            const data = await res.json().catch(() => ({}));

            const listeners =
                Number(
                    data?.currentlisteners ??
                    data?.listeners ??
                    data?.active_listeners ??
                    0
                );

            if (counter) {
                counter.textContent = isNaN(listeners) ? 0 : listeners;
            }

        } catch (err) {
            // silent safe fallback (no console spam)
            if (counter) {
                counter.textContent = "0";
            }
        }
    }

    // initial run
    updateListeners();

    // interval loop
    setInterval(updateListeners, 10000);
});
