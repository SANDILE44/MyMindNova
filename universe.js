const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

let centerX;
let centerY;

/* ======================
   RESPONSIVE CANVAS
====================== */

function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

centerX = canvas.width/2;
centerY = canvas.height/2;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ======================
   MOBILE PERFORMANCE
====================== */

const isMobile = window.innerWidth < 700;
const particleCount = isMobile ? 350 : 800;

/* ======================
   PARTICLES
====================== */

let particles = [];

for(let i=0;i<particleCount;i++){

particles.push({
angle:Math.random()*Math.PI*2,
radius:Math.random()*400,
speed:0.0005 + Math.random()*0.002,
size:Math.random()*2 + 0.4,
life:Math.random()*100
});

}

/* ======================
   PHASE SYSTEM
====================== */

let phase = 0;

setInterval(()=>{
phase++;
if(phase > 7) phase = 0;
},15000);

/* ======================
   COLOR PALETTES
====================== */

const palettes = [

["#4fc3f7","#7e57c2","#1a237e"],

["#00e5ff","#2979ff","#651fff"],

["#ff4081","#e040fb","#7c4dff"],

["#18ffff","#00e676","#00b0ff"],

["#ffd740","#ffab00","#ff6d00"],

["#ffffff","#90caf9","#80d8ff"],

["#00ffff","#00e5ff","#1de9b6"],

["#ffcc80","#ffd180","#ffab40"]

];

/* ======================
   ANIMATION
====================== */

function animate(){

ctx.fillStyle = "rgba(0,0,0,0.2)";
ctx.fillRect(0,0,canvas.width,canvas.height);

let colors = palettes[phase];

particles.forEach(p=>{

p.angle += p.speed;
p.life += 0.02;

let radius = p.radius;

/* PHASE BEHAVIOR */

if(phase === 1){
radius += Math.sin(p.life)*30;
}

if(phase === 2){
radius += Math.cos(p.life)*50;
}

if(phase === 3){
p.angle += 0.002;
}

if(phase === 4){
radius += Math.sin(p.life*2)*80;
}

if(phase === 5){
radius *= 1.2;
}

if(phase === 6){
radius += Math.sin(p.life*3)*100;
}

let x = centerX + Math.cos(p.angle)*radius;
let y = centerY + Math.sin(p.angle)*radius;

ctx.beginPath();
ctx.arc(x,y,p.size,0,Math.PI*2);

ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
ctx.fill();

});

requestAnimationFrame(animate);

}

animate();

/* ======================
   AFFIRMATION ENGINE
====================== */

let goal = localStorage.getItem("goalText") || "";

goal = goal.replace(/\n/g," ").trim();

let sentences = goal.split(/[.!?]/).filter(s=>s.length>4);

let affirmations = [];

sentences.forEach(s=>{
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

},1000);

}

showAffirmation();
setInterval(showAffirmation,6000);

/* ======================
   ORBITING IMAGES
====================== */

let storedImages = JSON.parse(localStorage.getItem("goalImages") || "[]");

let orbitImages = [];

storedImages.forEach((src,i)=>{

let img = document.createElement("img");

img.src = src;
img.className = "orbit-img";
img.style.position = "fixed";

document.body.appendChild(img);

orbitImages.push({

element:img,
angle:Math.random()*Math.PI*2,
radius:Math.min(canvas.width,canvas.height)*0.25 + (i*40),
speed:0.002 + Math.random()*0.002

});

});

function orbitImagesAnimation(){

orbitImages.forEach(obj=>{

obj.angle += obj.speed;

let x = centerX + Math.cos(obj.angle)*obj.radius;
let y = centerY + Math.sin(obj.angle)*obj.radius;

let size = obj.element.offsetWidth;

obj.element.style.left = (x - size/2) + "px";
obj.element.style.top = (y - size/2) + "px";

});

requestAnimationFrame(orbitImagesAnimation);

}

orbitImagesAnimation();