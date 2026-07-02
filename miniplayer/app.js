const audio = document.getElementById("miniAudio");
const play = document.getElementById("miniPlay");

let playing = false;

play.addEventListener("click", () => {

    if (playing) {

        audio.pause();

        play.innerHTML =
        '<i class="fa-solid fa-play"></i>';

    } else {

        audio.play();

        play.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

    }

    playing = !playing;

});
