document.addEventListener(
"DOMContentLoaded",
()=>{


const year =
document.getElementById("year");


if(year){

year.textContent =
new Date().getFullYear();

}



const cards =
document.querySelectorAll(
".feature,.card,.partner-box"
);



cards.forEach(card=>{


card.addEventListener(
"mouseenter",
()=>{

card.style.transform =
"translateY(-8px)";

card.style.transition =
".3s";

}
);



card.addEventListener(
"mouseleave",
()=>{

card.style.transform =
"translateY(0)";

}

);


});


});
