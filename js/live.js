document.addEventListener("DOMContentLoaded", () => {

    const counter = document.getElementById("listenerCount");

    if (!counter) return;

    // Change this to your Cloudflare Worker or API endpoint
    const STATS_URL = "https://eu8.fastcast4u.com/proxy/vantixradio/stats?json=1";

    const REFRESH_TIME = 10000;
    const REQUEST_TIMEOUT = 5000;

    let isFetching = false;

    async function updateListeners() {

        if (isFetching) return;

        isFetching = true;

        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, REQUEST_TIMEOUT);

        try {

            const response = await fetch(STATS_URL, {
                method: "GET",
                cache: "no-store",
                signal: controller.signal,
                headers: {
                    "Accept": "application/json"
                }
            });

            clearTimeout(timeout);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            const listeners =
                Number(
                    data.currentlisteners ??
                    data.listeners ??
                    data.active_listeners ??
                    data.current_listeners ??
                    data.listener_count ??
                    0
                );

            counter.textContent = Number.isFinite(listeners)
                ? listeners.toLocaleString()
                : "0";

            counter.classList.remove("offline");
            counter.classList.add("online");

        } catch (error) {

            console.warn("Listener update failed:", error.message);

            counter.textContent = "Offline";

            counter.classList.remove("online");
            counter.classList.add("offline");

        } finally {

            clearTimeout(timeout);

            isFetching = false;

        }

    }

    // Prevent duplicate intervals
    if (!window.__vantixListenerInterval) {

        updateListeners();

        window.__vantixListenerInterval = setInterval(
            updateListeners,
            REFRESH_TIME
        );

    }

});
