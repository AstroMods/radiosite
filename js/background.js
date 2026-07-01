document.addEventListener("DOMContentLoaded", () => {

    const canvas =
        document.getElementById("particles");

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    function resize() {
        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;
    }

    resize();

    window.addEventListener(
        "resize",
        resize
    );

    const particles = [];

    const particleCount =
        window.innerWidth < 768
            ? 40
            : 80;

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

            size:
                Math.random() * 2 + 1,

            vx:
                (Math.random() - 0.5) * 0.4,

            vy:
                (Math.random() - 0.5) * 0.4
        });
    }

    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            const p =
                particles[i];

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0)
                p.x = canvas.width;

            if (p.x > canvas.width)
                p.x = 0;

            if (p.y < 0)
                p.y = canvas.height;

            if (p.y > canvas.height)
                p.y = 0;

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(255,255,255,.35)";

            ctx.fill();

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const p2 =
                    particles[j];

                const dx =
                    p.x - p2.x;

                const dy =
                    p.y - p2.y;

                const dist =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (dist < 120) {

                    ctx.beginPath();

                    ctx.moveTo(
                        p.x,
                        p.y
                    );

                    ctx.lineTo(
                        p2.x,
                        p2.y
                    );

                    ctx.strokeStyle =
                        `rgba(255,255,255,${
                            (120 - dist) /
                            120 *
                            0.15
                        })`;

                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(
            animate
        );
    }

    animate();

});
