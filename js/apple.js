function setupAppleMediaSession() {
    const audio = document.getElementById("radioPlayer");

    // Safety check (prevents crashes)
    if (!audio) return;

    // iOS / Safari Media Session support check
    if (!("mediaSession" in navigator)) return;

    const artworkURL = "https://vantixradio.online/assets/v1sg.png";

    try {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: "Vantix Radio Audio",
            artist: "Vantix Radio",
            album: "Live Stream",
            artwork: [
                { src: artworkURL, sizes: "96x96", type: "image/png" },
                { src: artworkURL, sizes: "128x128", type: "image/png" },
                { src: artworkURL, sizes: "192x192", type: "image/png" },
                { src: artworkURL, sizes: "512x512", type: "image/png" }
            ]
        });

        // Play handler (iOS safe)
        navigator.mediaSession.setActionHandler("play", async () => {
            try {
                await audio.play();
            } catch (e) {
                console.log("Play blocked by browser:", e);
            }
        });

        // Pause handler
        navigator.mediaSession.setActionHandler("pause", () => {
            audio.pause();
        });

    } catch (err) {
        console.log("MediaSession error:", err);
    }
}

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    setupAppleMediaSession();

    // extra safety: re-apply after short delay (fixes slow loading streams)
    setTimeout(setupAppleMediaSession, 1000);
});
