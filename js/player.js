// Vantix Radio Player

document.addEventListener("DOMContentLoaded", () => {

    const player =
        document.getElementById("radioPlayer");

    const playBtn =
        document.getElementById("playBtn");

    const volumeSlider =
        document.getElementById("volumeSlider");

    const volumeValue =
        document.getElementById("volumeValue");

    const statusText =
        document.getElementById("statusText");


    if (!player || !playBtn || !volumeSlider || !volumeValue || !statusText) {
        console.error("Vantix Radio Player: Missing required HTML elements");
        return;
    }


    const STREAM_URL =
        "https://eu8.fastcast4u.com/proxy/vantixradio/stream";


    let reconnecting = false;


    player.src = STREAM_URL;
    player.preload = "auto";


    /* =========================
       CROSS PAGE MEMORY
    ========================= */

    const WAS_PLAYING =
        sessionStorage.getItem("vantix_playing") === "true";


    if (WAS_PLAYING) {

        setTimeout(() => {

            player.play()
                .catch(() => {});

        }, 300);

    }


    function savePlayState(isPlaying) {

        sessionStorage.setItem(
            "vantix_playing",
            isPlaying ? "true" : "false"
        );

    }


    function setStatus(text) {

        statusText.textContent = text;

    }



    /* =========================
       VOLUME
    ========================= */

    const savedVolume =
        localStorage.getItem("vantix_volume");


    if (savedVolume !== null) {

        player.volume =
            parseFloat(savedVolume);

        volumeSlider.value =
            savedVolume;

    } else {

        player.volume = 1;
        volumeSlider.value = 1;

    }


    function updateVolume() {

        const volume =
            parseFloat(volumeSlider.value);


        player.volume = volume;


        volumeValue.textContent =
            Math.round(volume * 100) + "%";


        localStorage.setItem(
            "vantix_volume",
            volume
        );


        const percent =
            volume * 100;


        volumeSlider.style.background =
            `linear-gradient(
                to right,
                #38bdf8 0%,
                #2563eb ${percent}%,
                rgba(255,255,255,.15) ${percent}%,
                rgba(255,255,255,.15) 100%
            )`;

    }


    updateVolume();


    volumeSlider.addEventListener(
        "input",
        updateVolume
    );



    /* =========================
       PLAY BUTTON
    ========================= */

    async function playRadio() {

        try {

            await player.play();

            savePlayState(true);

        } catch (err) {

            console.error(err);

            setStatus(
                "Unable to Start Stream"
            );

        }

    }


    function stopRadio() {

        player.pause();

        savePlayState(false);

    }



    playBtn.addEventListener(
        "click",
        async () => {

            if (player.paused) {

                await playRadio();

            } else {

                stopRadio();

            }

        }
    );



    /* =========================
       PLAYER EVENTS
    ========================= */

    player.addEventListener(
        "loadstart",
        () => {

            setStatus(
                "Connecting..."
            );

        }
    );


player.addEventListener(
    "playing",
    () => {

        playBtn.textContent =
            "⏹ Stop Radio";


        playBtn.classList.add(
            "playing"
        );


        // Immediately show current song
        updateNowPlaying();

    }
);

    player.addEventListener(
        "pause",
        () => {

            setStatus(
                "Stopped"
            );


            playBtn.textContent =
                "▶ Play Radio";


            playBtn.classList.remove(
                "playing"
            );

        }
    );


    player.addEventListener(
        "waiting",
        () => {

            setStatus(
                "Buffering..."
            );

        }
    );


    player.addEventListener(
        "stalled",
        reconnectStream
    );


    player.addEventListener(
        "error",
        reconnectStream
    );



    /* =========================
       RECONNECT
    ========================= */

    function reconnectStream() {

        if (reconnecting)
            return;


        reconnecting = true;


        setStatus(
            "Reconnecting..."
        );


        const wasPlaying =
            !player.paused;


        player.src =
            STREAM_URL +
            "?t=" +
            Date.now();


        player.load();


        if (wasPlaying) {

            player.play()
                .catch(() => {});

        }


        setTimeout(() => {

            reconnecting = false;

        }, 5000);

    }



    /* =========================
       HEALTH CHECK
    ========================= */

    setInterval(() => {

        if (
            player.readyState === 0
        ) {

            reconnectStream();

        }

    }, 15000);




    /* =========================
       🎧 NOW PLAYING
       CENTOVA VERSION
    ========================= */

/* =========================
   🎧 NOW PLAYING
   CENTOVA VERSION
========================= */

function updateNowPlaying() {

    const songElement =
        document.querySelector(".cc_streaminfo");


    if (!songElement)
        return;


    const title =
        songElement.textContent.trim();


    if (
        title &&
        title !== "Loading ..."
    ) {

        statusText.textContent =
            "🔴 " + title;


    } else {

        statusText.textContent =
            "🔴 Live Radio Stream";

    }

}


    updateNowPlaying();


    setInterval(
    updateNowPlaying,
    10000
);


});
