document.addEventListener("DOMContentLoaded", () => {


    // Auto update copyright year
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }



    // Discord buttons
    const discordLinks = document.querySelectorAll("[data-discord]");


    discordLinks.forEach(link => {

        const discordURL = link.dataset.discord;


        if (discordURL) {

            link.href = discordURL;

            link.target = "_blank";

            link.rel = "noopener noreferrer";

        }

    });





    // Default Discord fallback
    const defaultDiscord =
    "https://discord.gg/8gp37Ek6tj";


    const discord =
    document.getElementById("discord");


    if (discord && !discord.href.includes("discord.gg")) {

        discord.href = defaultDiscord;

        discord.target = "_blank";

        discord.rel = "noopener noreferrer";

    }






    // Partner card animation

    const cards =
    document.querySelectorAll(
        ".partner-card, .card, .feature, .join, .partner-message"
    );


    cards.forEach(card => {


        card.addEventListener(
            "mouseenter",
            () => {

                card.style.transform =
                "translateY(-8px)";

                card.style.transition =
                ".3s ease";

            }
        );



        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                "translateY(0)";

            }
        );


    });



});
