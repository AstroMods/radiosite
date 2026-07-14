// Vantix Radio - Secure Song Request System
// Cloudflare Worker Version

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("requestForm");

    const result =
        document.getElementById("result");


    /*
    ============================
    CLOUDFLARE WORKER URL
    ============================
    */

    const WORKER_URL =
        "https://vantixradio.vincentyusko-cfalls.workers.dev";



    if (!form) return;



    /*
    ============================
    SETTINGS
    ============================
    */


    const COOLDOWN =
        5 * 60 * 1000;



    /*
    ============================
    HELPERS
    ============================
    */


    function setMessage(message,color){

        if(!result) return;

        result.textContent =
            message;

        result.style.color =
            color;

    }



    function cooldownActive(){

        const last =
            localStorage.getItem(
                "vantix_request_time"
            );


        if(!last)
            return false;



        return (
            Date.now() -
            Number(last)
        ) < COOLDOWN;

    }




    function remainingTime(){

        const last =
            Number(
                localStorage.getItem(
                    "vantix_request_time"
                )
            );


        const remaining =
            COOLDOWN -
            (
                Date.now()
                -
                last
            );


        return Math.ceil(
            remaining / 60000
        );

    }





    /*
    ============================
    SUBMIT FORM
    ============================
    */


    form.addEventListener(
    "submit",
    async (e)=>{


        e.preventDefault();



        const artist =
            document
            .getElementById("artist")
            .value
            .trim();



        const title =
            document
            .getElementById("title")
            .value
            .trim();



        const sender =
            document
            .getElementById("sender")
            .value
            .trim();





        if(
            !artist ||
            !title ||
            !sender
        ){

            setMessage(
                "⚠️ Please complete all fields.",
                "#f59e0b"
            );

            return;

        }





        /*
        ============================
        LENGTH CHECK
        ============================
        */


        if(

            artist.length > 60 ||
            title.length > 100 ||
            sender.length > 40

        ){

            setMessage(
                "⚠️ Your request is too long.",
                "#ef4444"
            );

            return;

        }





        /*
        ============================
        COOLDOWN
        ============================
        */


        if(
            cooldownActive()
        ){

            setMessage(

                `⏳ Please wait ${remainingTime()} minute(s) before requesting again.`,

                "#f59e0b"

            );


            return;

        }





        setMessage(
            "📡 Sending request...",
            "#38bdf8"
        );





        /*
        ============================
        TURNSTILE TOKEN
        ============================
        */


        let turnstileToken = "";



        if(
            window.turnstile
        ){

            const token =
                document.querySelector(
                    "[name='cf-turnstile-response']"
                );


            if(token){

                turnstileToken =
                    token.value;

            }

        }





        const payload = {


            artist:
                artist,


            title:
                title,


            sender:
                sender,


            turnstile:
                turnstileToken


        };







        try {



            const response =
            await fetch(

                WORKER_URL,

                {

                method:
                    "POST",


                headers:
                {

                    "Content-Type":
                    "application/json"

                },


                body:
                    JSON.stringify(payload)

                }

            );





            const data =
                await response.json();







            if(
                response.ok &&
                data.success
            ){


                localStorage.setItem(

                    "vantix_request_time",

                    Date.now()

                );



                setMessage(

                    "✅ Song request submitted successfully!",

                    "#22c55e"

                );


                form.reset();




                if(
                    window.turnstile
                ){

                    turnstile.reset();

                }



            }

            else {



                setMessage(

                    "❌ " +
                    (
                        data.error ||
                        "Request failed."
                    ),

                    "#ef4444"

                );


            }





        }

        catch(error){



            console.error(
                "Request Error:",
                error
            );



            setMessage(

                "❌ Unable to connect to request server.",

                "#ef4444"

            );



        }




    });


});
