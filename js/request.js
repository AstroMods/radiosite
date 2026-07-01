// Vantix Radio - Premium Song Request System

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("requestForm");

    const result =
        document.getElementById("result");

    const webhook =
        "https://discord.com/api/webhooks/1521948838078976200/3yjzbQfZnE1NBzJnBKe9sM9oRXZwS8W6x-0lGtPvIlg1_JYQqDQIcJw2M-PMtCu72gYJ";

    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const artist =
            document.getElementById("artist")
            .value
            .trim();

        const title =
            document.getElementById("title")
            .value
            .trim();

        const sender =
            document.getElementById("sender")
            .value
            .trim();

        if (!artist || !title || !sender) {

            result.textContent =
                "⚠️ Please complete all fields.";

            result.style.color =
                "#f59e0b";

            return;
        }

        result.textContent =
            "📡 Sending request...";

        result.style.color =
            "#38bdf8";

        const payload = {

            username:
                "Vantix Radio",

            avatar_url:
                "https://i.ibb.co/G4YSyXFc/Chat-GPT-Image-Jun-29-2026-12-47-34-PM.png",

            embeds: [
                {
                    title:
                        "🎵 New Song Request",

                    description:
                        "A new listener request has been submitted to Vantix Radio.",

                    color:
                        961689,

                    thumbnail: {
                        url:
                            "https://i.ibb.co/G4YSyXFc/Chat-GPT-Image-Jun-29-2026-12-47-34-PM.png"
                    },

                    fields: [
                        {
                            name:
                                "🎤 Artist",

                            value:
                                artist,

                            inline:
                                true
                        },
                        {
                            name:
                                "🎶 Song Title",

                            value:
                                title,

                            inline:
                                true
                        },
                        {
                            name:
                                "👤 Requested By",

                            value:
                                sender,

                            inline:
                                true
                        }
                    ],

                    footer: {
                        text:
                            "Vantix Radio • Broadcasting 24/7"
                    },

                    timestamp:
                        new Date().toISOString()
                }
            ]
        };

        try {

            const res =
                await fetch(webhook, {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body:
                        JSON.stringify(payload)
                });

            if (res.ok) {

                result.textContent =
                    "✅ Song request submitted successfully!";

                result.style.color =
                    "#22c55e";

                form.reset();

            } else {

                result.textContent =
                    "❌ Failed to send request.";

                result.style.color =
                    "#ef4444";
            }

        } catch (err) {

            console.error(err);

            result.textContent =
                "❌ Network error while sending request.";

            result.style.color =
                "#ef4444";
        }

    });

});
