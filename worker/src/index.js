export default {

async fetch(request, env) {


if(request.method !== "POST") {

return new Response(
"Method Not Allowed",
{
status:405
});

}



try {


const data =
await request.json();



const ip =
request.headers.get(
"CF-Connecting-IP"
);



/*
========================
INPUT CLEANING
========================
*/


const artist =
String(data.artist || "")
.trim();


const title =
String(data.title || "")
.trim();


const sender =
String(data.sender || "")
.trim();


const captcha =
data.turnstile;



if(!artist || !title || !sender){

return Response.json({

error:
"Missing information"

},{
status:400
});

}



/*
========================
LIMIT LENGTH
========================
*/


if(

artist.length > 60 ||
title.length > 100 ||
sender.length > 40

){

return Response.json({

error:
"Input too long"

},{
status:400
});

}




/*
========================
BAD WORD FILTER
========================
*/


const blockedWords=[

"fuck",
"shit",
"bitch",
"cunt",
"nigger",
"faggot",
"porn",
"sex",
"discord.gg",
"http://",
"https://"

];


const combined =
`${artist} ${title} ${sender}`
.toLowerCase();



for(
const word of blockedWords
){

if(
combined.includes(word)
){

return Response.json({

error:
"Blocked content"

},{
status:403
});

}

}




/*
========================
TURNSTILE VERIFY
========================
*/


const captchaCheck =
await fetch(

"https://challenges.cloudflare.com/turnstile/v0/siteverify",

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
captcha,

remoteip:
ip

})

}

);



const captchaResult =
await captchaCheck.json();



if(
!captchaResult.success
){

return Response.json({

error:
"Captcha failed"

},{
status:403
});

}





/*
========================
RATE LIMIT
========================

1 request every 5 minutes
per IP

*/


const key =
`request:${ip}`;



const exists =
await env.RATE_LIMIT.get(key);



if(exists){


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
========================
SEND DISCORD
========================
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


avatar_url:

"https://i.ibb.co/G4YSyXFc/Chat-GPT-Image-Jun-29-2026-12-47-34-PM.png",


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
artist,

inline:true
},

{
name:
"🎶 Song",

value:
title,

inline:true
},

{
name:
"👤 Requested By",

value:
sender,

inline:true
}

],


footer:{

text:
"Vantix Radio • Secure Request System"

},


timestamp:

new Date()

}]


})

}

);



if(!discord.ok){

throw new Error(
"Discord failed"
);

}




return Response.json({

success:true

});



}

catch(error){


console.error(error);


return Response.json({

error:
"Server Error"

},{
status:500
});


}


}

};
