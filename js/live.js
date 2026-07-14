document.addEventListener("DOMContentLoaded", () => {

    const counter = document.getElementById("listenerCount");

    if (!counter) {
        console.warn("Listener counter element missing");
        return;
    }


    /*
        Centova Cast Stream Info
        No CORS issues
    */

    const listenerSource = document.createElement("span");

    listenerSource.className = "cc_streaminfo";
    listenerSource.dataset.type = "listeners";
    listenerSource.dataset.username = "vantixradio";
    listenerSource.style.display = "none";

    document.body.appendChild(listenerSource);


    const REFRESH_TIME = 5000;


    function updateListeners() {

        let value = listenerSource.textContent.trim();


        if (value === "" || value === "Loading ...") {

            counter.textContent = "0";
            counter.classList.remove("online");
            counter.classList.add("offline");

            return;
        }


        const listeners = Number(value);


        if (!Number.isNaN(listeners)) {

            counter.textContent =
                listeners.toLocaleString();

            counter.classList.remove("offline");
            counter.classList.add("online");

        } else {

            counter.textContent = "0";

        }

    }



    // Initial load
    updateListeners();


    // Update every 5 seconds
    setInterval(updateListeners, REFRESH_TIME);



});
