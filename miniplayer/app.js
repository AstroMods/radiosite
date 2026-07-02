const audio = document.getElementById("miniAudio");
const playBtn = document.getElementById("miniPlay");
const volume = document.getElementById("miniVolume");

let isPlaying = false;

playBtn.addEventListener("click", async () => {
    if (!isPlaying) {
        await audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
    isPlaying = !isPlaying;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});
