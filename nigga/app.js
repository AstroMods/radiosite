function summonMyro() {
    const lines = [
        "Myro has spawned... instantly forgot why.",
        "Loading Myro.exe... 404 confidence not found.",
        "Myro entered the chat and caused mild chaos.",
        "Error: Myro is too iconic for this system.",
        "Myro tried to act normal... failed successfully."
    ];

    const msg = document.getElementById("msg");

    msg.innerText = lines[Math.floor(Math.random() * lines.length)];

    document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
}
