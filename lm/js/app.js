const urlInput = document.getElementById("url");
const createBtn = document.getElementById("createBtn");
const loader = document.getElementById("loader");
const result = document.getElementById("result");
const message = document.getElementById("message");
const shortLink = document.getElementById("shortLink");
const json = document.getElementById("json");
const qr = document.getElementById("qr");

createBtn.addEventListener("click", createLink);

async function createLink(){

    message.innerHTML="";
    result.style.display="none";

    const url=urlInput.value.trim();

    if(url===""){
        message.innerHTML="Please enter a URL.";
        return;
    }

    loader.style.display="block";

    try{

        const response=await fetch("api/create.php",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                url:url
            })

        });

        const data=await response.json();

        loader.style.display="none";

        if(!response.ok){

            message.innerHTML=data.message || "Request failed.";

            return;

        }

        const short=data.short_url || data.short || data.url || "";

        shortLink.value=short;

        json.textContent=JSON.stringify(data,null,4);

        qr.innerHTML=
        `<img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(short)}">`;

        result.style.display="block";

    }

    catch(error){

        loader.style.display="none";

        message.innerHTML=error.message;

    }

}

document.getElementById("copyBtn").addEventListener("click",()=>{

    navigator.clipboard.writeText(shortLink.value);

    const btn=document.getElementById("copyBtn");

    btn.innerHTML="Copied!";

    setTimeout(()=>{

        btn.innerHTML="Copy";

    },1500);

});
