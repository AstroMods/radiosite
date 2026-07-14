// Vantix Radio - Song Request System (Direct Discord Webhook)

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("requestForm");
    const result = document.getElementById("result");

    // Replace with your NEW webhook.
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1521948838078976200/3yjzbQfZnE1NBzJnBKe9sM9oRXZwS8W6x-0lGtPvIlg1_JYQqDQIcJw2M-PMtCu72gYJ";

    if (!form || !result) return;

    const COOLDOWN_MS = 5 * 60 * 1000;

    const BLOCKED = [
        "discord.gg",
        "http://",
        "https://",
        "porn",
        "fuck",
        "shit",
        "bitch",
        "cunt",
        "faggot",
        "nigger",
        "pedo"
    ];

    function setStatus(text, color) {
        result.textContent = text;
        result.style.color = color;
    }

    function normalize(text) {
        return text
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();
    }

    function containsBlocked(text) {
        const value = normalize(text);
        return BLOCKED.some(word => value.includes(word));
    }

    function getCooldownRemaining() {
        const last = Number(localStorage.getItem("vr_last_request") || 0);
        const remaining = COOLDOWN_MS - (Date.now() - last);
        return Math.max(0, remaining);
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const artist = document.getElementById("artist").value.trim();
        const title = document.getElementById("title").value.trim();
        const sender = document.getElementById("sender").value.trim();

        if (!artist || !title || !sender) {
            setStatus("⚠️ Please complete all fields.", "#f59e0b");
            return;
        }

        if (artist.length > 60 || title.length > 100 || sender.length > 40) {
            setStatus("⚠️ One or more fields are too long.", "#ef4444");
            return;
        }

        const combined = `${artist} ${title} ${sender}`;

        if (containsBlocked(combined)) {
            setStatus("🚫 Your request contains blocked words or links.", "#ef4444");
            return;
        }

        const cooldown = getCooldownRemaining();

        if (cooldown > 0) {
            const minutes = Math.ceil(cooldown / 60000);
            setStatus(`⏳ Please wait ${minutes} minute(s) before sending another request.`, "#f59e0b");
            return;
        }

        const requestHash = normalize(`${artist}|${title}|${sender}`);

        if (requestHash === localStorage.getItem("vr_last_hash")) {
            setStatus("⚠️ You already submitted this request.", "#f59e0b");
            return;
        }

        setStatus("📡 Sending request...", "#38bdf8");

        const payload = {
            username: "Vantix Radio",
            avatar_url: "https://i.ibb.co/G4YSyXFc/Chat-GPT-Image-Jun-29-2026-12-47-34-PM.png",
            embeds: [{
                title: "🎵 New Song Request",
                color: 961689,
                fields: [
                    {
                        name: "🎤 Artist",
                        value: artist,
                        inline: true
                    },
                    {
                        name: "🎶 Song",
                        value: title,
                        inline: true
                    },
                    {
                        name: "👤 Requested By",
                        value: sender,
                        inline: true
                    }
                ],
                footer: {
                    text: "Vantix Radio • Broadcasting 24/7"
                },
                timestamp: new Date().toISOString()
            }]
        };

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Discord returned ${response.status}`);
            }

            localStorage.setItem("vr_last_request", Date.now().toString());
            localStorage.setItem("vr_last_hash", requestHash);

            setStatus("✅ Song request submitted successfully!", "#22c55e");
            form.reset();

        } catch (err) {
            console.error(err);
            setStatus("❌ Failed to send request.", "#ef4444");
        }
    });
});
