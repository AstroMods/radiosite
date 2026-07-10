// Vantix Radio - Cloudflare Live Visitor Counter

const WORKER_URL =
    "https://api.vantixradio.online";


let userId = localStorage.getItem("uid");


if (!userId) {

    userId = crypto.randomUUID();

    localStorage.setItem(
        "uid",
        userId
    );

}


// Smooth counter animation

let currentDisplayed = 0;


function animateCount(target) {

    const counter =
        document.getElementById(
            "listenerCount"
        );


    if (!counter) return;


    function step() {

        if (currentDisplayed === target)
            return;


        currentDisplayed +=
            Math.sign(
                target - currentDisplayed
            );


        counter.textContent =
            currentDisplayed;


        requestAnimationFrame(step);

    }


    step();

}



// Live badge

function updateLiveBadge(count) {

    const container =
        document.querySelector(
            ".listener-counter"
        );


    if (!container)
        return;



    let badge =
        document.getElementById(
            "liveBadge"
        );


    if (!badge) {

        badge =
        document.createElement(
            "span"
        );


        badge.id =
            "liveBadge";


        badge.style.marginLeft =
            "8px";


        badge.style.padding =
            "3px 8px";


        badge.style.fontSize =
            "11px";


        badge.style.color =
            "#fff";


        badge.style.borderRadius =
            "5px";


        container.appendChild(
            badge
        );

    }



    badge.textContent =
        count > 0
        ? "LIVE"
        : "OFFLINE";


    badge.style.background =
        count > 0
        ? "red"
        : "gray";

}



// Send heartbeat

async function heartbeat() {

    try {

        await fetch(
            WORKER_URL + "/heartbeat",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify({
                    id:userId
                })
            }
        );


    } catch(err) {

        console.error(
            "Heartbeat failed:",
            err
        );

    }

}



// Get visitor count

async function getVisitors() {

    try {

        const response =
            await fetch(
                WORKER_URL + "/online"
            );


        const data =
            await response.json();


        animateCount(
            data.online || 0
        );


        updateLiveBadge(
            data.online || 0
        );


    } catch(err) {


        console.error(
            "Visitor count failed:",
            err
        );


        animateCount(0);

        updateLiveBadge(0);

    }

}



// Start

async function startTracker() {

    await heartbeat();

    await getVisitors();



    setInterval(
        async () => {

            await heartbeat();

            await getVisitors();

        },
        10000
    );

}


startTracker();
