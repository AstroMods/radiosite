// Vantix Radio Player

document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("radioPlayer");
    const volumeSlider = document.getElementById("volumeSlider");
    const volumeValue = document.getElementById("volumeValue");
    const status = document.getElementById("status");

    const STREAM_URL =
        "https://eu8.fastcast4u.com/proxy/vantixradio/stream";

    let reconnecting = false;
    let started = false;

    /* Load Stream */
    player.src = STREAM_URL;
    player.preload = "auto";
    player.load();

    /* Default Volume */
    player.volume = 1;

    if (volumeValue) {
        volumeValue.textContent = "100%";
    }

    /* Volume Control */
    function updateVolume() {
        const volume = parseFloat(volumeSlider.value);

        player.volume = volume;

        if (volumeValue) {
            volumeValue.textContent =
                `${Math.round(volume * 100)}%`;
        }

        localStorage.setItem(
            "vantix_volume",
            volume
        );
    }

    /* Restore Saved Volume */
    const savedVolume =
        localStorage.getItem("vantix_volume");

    if (savedVolume !== null) {
        volumeSlider.value = savedVolume;
        player.volume = parseFloat(savedVolume);
    }

    updateVolume();

    volumeSlider.addEventListener(
        "input",
        updateVolume
    );

    /* Status Updates */
    player.addEventListener("loadstart", () => {
        status.textContent = "Connecting...";
    });

    player.addEventListener("loadedmetadata", () => {
        status.textContent = "Connected";
    });

    player.addEventListener("playing", () => {
        reconnecting = false;
        status.textContent =
            "🔴 Live Now Playing";
    });

    player.addEventListener("pause", () => {
        status.textContent = "Paused";
    });

    player.addEventListener("waiting", () => {
        status.textContent = "Buffering...";
    });

    player.addEventListener("stalled", () => {
        status.textContent = "Reconnecting...";
        reconnectStream();
    });

    player.addEventListener("suspend", () => {
        status.textContent = "Loading Stream...";
    });

    /* Auto Start After User Interaction */
    async function startRadio() {
        if (started) return;

        started = true;

        try {
            await player.play();
        } catch (err) {
            console.error(err);
            status.textContent =
                "Click Play To Start";
            started = false;
        }
    }

    document.addEventListener(
        "click",
        startRadio,
        { once: true }
    );

    document.addEventListener(
        "touchstart",
        startRadio,
        { once: true }
    );

    /* Reconnect Logic */
    function reconnectStream() {
        if (reconnecting) return;

        reconnecting = true;

        status.textContent =
            "Reconnecting...";

        const wasPlaying =
            !player.paused &&
            !player.ended;

        player.src =
            STREAM_URL +
            "?nocache=" +
            Date.now();

        player.load();

        if (wasPlaying) {
            player.play().catch(() => {});
        }

        setTimeout(() => {
            reconnecting = false;
        }, 5000);
    }

    player.addEventListener("error", () => {
        console.warn(
            "Stream error detected. Reconnecting..."
        );

        reconnectStream();
    });

    /* Health Check */
    setInterval(() => {
        if (
            player.networkState ===
                HTMLMediaElement.NETWORK_NO_SOURCE ||
            player.readyState === 0
        ) {
            reconnectStream();
        }
    }, 15000);
});
