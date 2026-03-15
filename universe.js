const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

/* ======================
   CANVAS SIZE
====================== */

function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

centerX = canvas.width / 2;
centerY = canvas.height / 2;
}

let centerX;
let centerY;

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* ======================
   GALAXY PARTICLES
====================== */

let particles = [];

for(let i=0;i<600;i++){   // reduced for performance

particles.push({
angle:Math.random()*Math.PI*2,
radius:Math.random()*500,
speed:0.0005 + Math.random()*0.002,
size:Math.random()*2
});

}

function animate(){

ctx.fillStyle="rgba(0,0,0,0.2)";
ctx.fillRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.angle += p.speed;

let x = centerX + Math.cos(p.angle)*p.radius;
let y = centerY + Math.sin(p.angle)*p.radius;

ctx.fillStyle="white";
ctx.fillRect(x,y,p.size,p.size);

});

requestAnimationFrame(animate);

}

animate();


/* ======================
   DESCRIPTION ENGINE
====================== */

let goal = localStorage.getItem("goalText") || "";

goal = goal.replace(/\n/g," ").trim();

let sentences = goal.split(/[.!?]/).filter(s => s.trim().length > 4);

let affirmations = [];

sentences.forEach(s => {

let clean = s.trim().toLowerCase();

affirmations.push("I am creating " + clean);
affirmations.push("Every day I move closer to " + clean);

});

if(affirmations.length < 3){

affirmations = [

"My discipline creates my future.",
"My vision becomes reality.",
"I move forward every day."

];

}


/* ======================
   AFFIRMATION ROTATION
====================== */

const textElement = document.getElementById("affirmation");

let index = 0;

function showAffirmation(){

textElement.style.opacity = 0;

setTimeout(()=>{

textElement.textContent = affirmations[index];

textElement.style.opacity = 1;

index++;

if(index >= affirmations.length){
index = 0;
}

},1200);

}

showAffirmation();
setInterval(showAffirmation,7000);


/* ======================
   ORBITING GOAL IMAGES
====================== */

let storedImages = JSON.parse(localStorage.getItem("goalImages") || "[]");

let orbitImages = [];

storedImages.forEach((src,i)=>{

let img = document.createElement("img");

img.src = src;
img.className = "orbit-img";

document.body.appendChild(img);

orbitImages.push({

element:img,
angle:Math.random()*Math.PI*2,

// keep orbit inside screen
radius:180 + (i*35),

speed:0.002 + Math.random()*0.002

});

});


function orbitImagesAnimation(){

orbitImages.forEach(obj=>{

obj.angle += obj.speed;

let x = centerX + Math.cos(obj.angle)*obj.radius;
let y = centerY + Math.sin(obj.angle)*obj.radius;

/* center image properly */

obj.element.style.left = (x - 35) + "px";
obj.element.style.top = (y - 35) + "px";

});

requestAnimationFrame(orbitImagesAnimation);

}

orbitImagesAnimation();