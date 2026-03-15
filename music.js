const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

let started = false;

function startUniverseSound(){

if(started) return;
started = true;

/* base cosmic drone */

const osc1 = audioCtx.createOscillator();
const osc2 = audioCtx.createOscillator();
const osc3 = audioCtx.createOscillator();

const gain = audioCtx.createGain();
const filter = audioCtx.createBiquadFilter();

/* frequencies */

osc1.frequency.value = 110;
osc2.frequency.value = 220;
osc3.frequency.value = 432;

/* sound types */

osc1.type = "sine";
osc2.type = "triangle";
osc3.type = "sine";

/* filter for space effect */

filter.type = "lowpass";
filter.frequency.value = 800;

/* volume */

gain.gain.value = 0.03;

/* connect */

osc1.connect(filter);
osc2.connect(filter);
osc3.connect(filter);

filter.connect(gain);
gain.connect(audioCtx.destination);

/* start sound */

osc1.start();
osc2.start();
osc3.start();

/* slow frequency movement for atmosphere */

setInterval(()=>{

osc2.frequency.value = 200 + Math.random()*40;
osc3.frequency.value = 420 + Math.random()*30;

},4000);

}

/* phones require user interaction */

document.addEventListener("click", startUniverseSound, { once:true });