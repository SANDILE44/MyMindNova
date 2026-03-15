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
   GALAXY PARTICLES (UPGRADED)
====================== */

let particles = [];

const particleCount = 700;

for(let i=0;i<particleCount;i++){

let distance = Math.random()*500;
let angle = Math.random()*Math.PI*2;

/* spiral arm effect */

angle += distance * 0.002;

particles.push({

angle:angle,
radius:distance,

speed:0.0004 + Math.random()*0.0015,

size:Math.random()*2 + 0.3,

depth:Math.random()

});

}


function animate(){

ctx.fillStyle="rgba(0,0,0,0.25)";
ctx.fillRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.angle += p.speed;

/* parallax movement */

let r = p.radius * (0.7 + p.depth*0.6);

let x = centerX + Math.cos(p.angle)*r;
let y = centerY + Math.sin(p.angle)*r;

/* glow effect */

ctx.beginPath();
ctx.arc(x,y,p.size,0,Math.PI*2);

let glow = ctx.createRadialGradient(
x,y,0,
x,y,p.size*4
);

glow.addColorStop(0,"white");
glow.addColorStop(1,"transparent");

ctx.fillStyle = glow;
ctx.fill();

});

requestAnimationFrame(animate);

}

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