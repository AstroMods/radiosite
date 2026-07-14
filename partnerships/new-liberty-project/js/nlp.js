document.addEventListener(
"DOMContentLoaded",
()=>{


const year =
document.getElementById("year");


if(year){

year.textContent =
new Date().getFullYear();

}




const elements =
document.querySelectorAll(
".card,.feature,.partner-box"
);



elements.forEach(element=>{


element.addEventListener(
"mouseenter",
()=>{

element.style.transform =
"translateY(-8px)";

element.style.transition =
".3s";

}

);



element.addEventListener(
"mouseleave",
()=>{

element.style.transform =
"translateY(0)";

}

);



});



});
