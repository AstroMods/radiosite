export default {
    async fetch(request, env) {

        if (request.method !== "POST") {
            return new Response(
                "Method Not Allowed",
                {
                    status: 405
                }
            );
        }


        try {

            const data =
                await request.json();


            const ip =
                request.headers.get(
                    "CF-Connecting-IP"
                );


            const artist =
                String(data.artist || "")
                .trim();


            const title =
                String(data.title || "")
                .trim();


            const sender =
                String(data.sender || "")
                .trim();


            const turnstile =
                data.turnstile;



            if (!artist || !title || !sender) {

                return Response.json({
                    error:
                    "Missing fields"
                },{
                    status:400
                });

            }



            /*
            ====================
            BAD WORD FILTER
            ====================
            */


            const blocked = [
                "fuck",
                "shit",
                "bitch",
                "porn",
                "sex",
                "discord.gg",
                "http://",
                "https://"
            ];


            const text =
            `${artist} ${title} ${sender}`
            .toLowerCase();



            if(
                blocked.some(word =>
                    text.includes(word)
                )
            ){

                return Response.json({

                    error:
                    "Blocked content"

                },{
                    status:403
                });

            }




            /*
            ====================
            TURNSTILE
            ====================
            */


            const verify =
            await fetch(

            "https://challenges.cloudflare.com/turnstile/v0/api/siteverify",

            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify({

                    secret:
                    env.TURNSTILE_SECRET,

                    response:
                    turnstile,

                    remoteip:
                    ip

                })

            });



            const captcha =
            await verify.json();



            if(!captcha.success){

                return Response.json({

                    error:
                    "Captcha failed"

                },{
                    status:403
                });

            }





            /*
            ====================
            RATE LIMIT
            ====================
            */


            const key =
            `request-${ip}`;


            const used =
            await env.RATE_LIMIT.get(key);



            if(used){

                return Response.json({

                    error:
                    "Please wait before requesting again"

                },{
                    status:429
                });

            }



            await env.RATE_LIMIT.put(

                key,

                "true",

                {
                    expirationTtl:
                    300
                }

            );






            /*
            ====================
            SEND DISCORD
            ====================
            */


            const discord =
            await fetch(

                env.DISCORD_WEBHOOK,

                {

                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },


                body:
                JSON.stringify({

                    username:
                    "Vantix Radio",


                    embeds:[{

                        title:
                        "🎵 New Song Request",


                        color:
                        961689,


                        fields:[

                        {
                            name:
                            "🎤 Artist",

                            value:
                            artist
                        },


                        {
                            name:
                            "🎶 Song",

                            value:
                            title
                        },


                        {
                            name:
                            "👤 Requested By",

                            value:
                            sender
                        }

                        ],


                        footer:{
                            text:
                            "Vantix Radio • Secure Requests"
                        }

                    }]

                })

            });



            if(!discord.ok){

                throw new Error(
                    "Discord failed"
                );

            }



            return Response.json({

                success:true

            });



        } catch(error){


            return Response.json({

                error:
                "Server error"

            },{
                status:500
            });


        }

    }
};
