async function updateListeners() {
    try {
        const response = await fetch(
            "https://eu8.fastcast4u.com/proxy/vantixradio/stats?json=1",
            {
                cache: "no-cache"
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        document.getElementById("listenerCount").textContent =
            data.currentlisteners ?? 0;

    } catch (err) {
        console.error("Listener count error:", err);

        const counter = document.getElementById("listenerCount");
        if (counter) {
            counter.textContent = "Offline";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateListeners();
    setInterval(updateListeners, 15000);
});
