const player = document.getElementById("radioPlayer");
const playBtn = document.getElementById("playBtn");
const volumeSlider = document.getElementById("volumeSlider");

player.volume = 1;

playBtn.addEventListener("click", async () => {
    if (player.paused) {
        try {
            await player.play();
            playBtn.textContent = "⏸ Pause Radio";
        } catch (err) {
            alert(
                "Unable to play stream. Check that the stream is online and supports HTTPS."
            );
            console.error(err);
        }
    } else {
        player.pause();
        playBtn.textContent = "▶ Play Radio";
    }
});

volumeSlider.addEventListener("input", () => {
    player.volume = volumeSlider.value;
});

player.addEventListener("error", () => {
    alert("Radio stream is unavailable.");
    playBtn.textContent = "▶ Play Radio";
});

player.addEventListener("pause", () => {
    playBtn.textContent = "▶ Play Radio";
});

player.addEventListener("play", () => {
    playBtn.textContent = "⏸ Pause Radio";
});
