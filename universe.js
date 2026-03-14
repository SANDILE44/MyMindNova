const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

/* ======================
   GALAXY PARTICLES
====================== */

let particles = [];

for(let i=0;i<900;i++){

particles.push({
angle:Math.random()*Math.PI*2,
radius:Math.random()*700,
speed:0.0004 + Math.random()*0.002,
size:Math.random()*2
});

}

function animate(){

ctx.fillStyle="rgba(0,0,0,0.15)";
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

/* split sentences */

let sentences = goal.split(/[.!?]/).filter(s=>s.trim().length>4);

/* generate affirmations */

let affirmations = [];

sentences.forEach(s=>{

let clean = s.trim().toLowerCase();

affirmations.push("I am creating " + clean);
affirmations.push("Every day I move closer to " + clean);

});

/* fallback */

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
radius:280 + (i*40),
speed:0.002 + Math.random()*0.002

});

});


function orbitImagesAnimation(){

orbitImages.forEach(obj=>{

obj.angle += obj.speed;

let x = centerX + Math.cos(obj.angle)*obj.radius;
let y = centerY + Math.sin(obj.angle)*obj.radius;

obj.element.style.left = x + "px";
obj.element.style.top = y + "px";

});

requestAnimationFrame(orbitImagesAnimation);

}

orbitImagesAnimation();