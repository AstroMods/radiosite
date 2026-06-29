const player = document.getElementById('radioPlayer');
const playBtn = document.getElementById('playBtn');
const volumeSlider = document.getElementById('volumeSlider');

let playing = false;

playBtn.addEventListener('click', () => {

```
if(!playing){
    player.play();
    playBtn.textContent = '⏸ Pause Radio';
    playing = true;
} else {
    player.pause();
    playBtn.textContent = '▶ Play Radio';
    playing = false;
}
```

});

volumeSlider.addEventListener('input', () => {
player.volume = volumeSlider.value;
});
