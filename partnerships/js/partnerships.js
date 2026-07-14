document.addEventListener("DOMContentLoaded", () => {


const year =
document.getElementById("year");


if(year){

year.textContent =
new Date().getFullYear();

}



// Discord links per page

const discord =
document.getElementById("discord");


if(discord){

discord.href =
"https://discord.gg/YOUR-LA-ROLEPLAY-INVITE";

}


});
