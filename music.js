const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function startMusic(){

const osc = audioCtx.createOscillator();
const gain = audioCtx.createGain();

osc.type = "sine";
osc.frequency.value = 432;   // calming frequency

gain.gain.value = 0.03;

osc.connect(gain);
gain.connect(audioCtx.destination);

osc.start();

}

document.addEventListener("click", startMusic, {once:true});