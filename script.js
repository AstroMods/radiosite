<script>
const player = document.getElementById("radioPlayer");
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");
const status = document.getElementById("status");

const STREAM_URL = "http://51.255.235.165:2128/stream.mp3";

/* Initial Volume */
player.volume = 1;
volumeValue.textContent = "100%";

/* Volume Control */
function updateVolume() {
    const volume = parseFloat(volumeSlider.value);

    player.volume = volume;
    volumeValue.textContent =
        Math.round(volume * 100) + "%";
}

volumeSlider.addEventListener(
    "input",
    updateVolume
);

updateVolume();

/* Status Updates */
player.addEventListener("loadstart", () => {
    status.textContent = "Connecting...";
});

player.addEventListener("playing", () => {
    status.textContent = "🔴 Live Now Playing";
});

player.addEventListener("pause", () => {
    status.textContent = "Paused";
});

player.addEventListener("waiting", () => {
    status.textContent = "Buffering...";
});

player.addEventListener("stalled", () => {
    status.textContent = "Reconnecting...";
});

player.addEventListener("suspend", () => {
    status.textContent = "Loading Stream...";
});

/* Reconnect Logic */
function reconnectStream() {
    status.textContent = "Reconnecting...";

    const wasPlaying = !player.paused;

    player.src =
        STREAM_URL +
        "?t=" +
        Date.now();

    player.load();

    if (wasPlaying) {
        player.play().catch(() => {});
    }
}

player.addEventListener("error", () => {
    reconnectStream();
});

/* Periodic Health Check */
setInterval(() => {
    if (
        player.readyState === 0 ||
        player.networkState ===
        HTMLMediaElement.NETWORK_NO_SOURCE
    ) {
        reconnectStream();
    }
}, 10000);
</script>
