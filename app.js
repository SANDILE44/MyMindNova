const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* star system */

let stars = [];

for(let i=0;i<250;i++){

stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2
});

}

function animate(){

ctx.fillStyle="black";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="white";

stars.forEach(s=>{

ctx.beginPath();
ctx.arc(s.x,s.y,s.size,0,Math.PI*2);
ctx.fill();

s.y += 0.2;

if(s.y > canvas.height){
s.y = 0;
s.x = Math.random()*canvas.width;
}

});

requestAnimationFrame(animate);

}

animate();

/* image upload */

const upload = document.getElementById("imageUpload");
const preview = document.getElementById("preview");

let images = [];

upload.addEventListener("change",()=>{

preview.innerHTML="";
images=[];

Array.from(upload.files).forEach(file=>{

const reader = new FileReader();

reader.onload = function(e){

images.push(e.target.result);

const img=document.createElement("img");
img.src=e.target.result;

preview.appendChild(img);

};

reader.readAsDataURL(file);

});

});

/* generate universe */

const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click",()=>{

const text=document.getElementById("goalText").value;

localStorage.setItem("goalText",text);
localStorage.setItem("goalImages",JSON.stringify(images));

window.location.href="universe.html";

});