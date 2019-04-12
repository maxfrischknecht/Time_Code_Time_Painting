let certainTime = "8:11:00 PM";
let endTime = "8:12:00 PM";
let counter;
let hue; let saturation = 255; let brightness = 255;
let brightness2 = 255;
let textLayer;

let w = 10;
let cells;
let generation = 0;
let ruleset = [0, 1, 1, 1, 0, 1, 1, 0];

function setup() {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent('p5-sketch-holder');
	setInterval(theDay, 1000);
	colorMode(HSB, 255);
	noStroke();

	textLayer = document.getElementById("text-layer");

	let d = new Date();
	let secs = d.getSeconds() + (60 * d.getMinutes()) + (60 * 60 * d.getHours());
	hue = map(secs, 0, 86400, 0, 255);

	cells = Array(floor(width / w));
  for (let i = 0; i < 8; i++) {
    cells[i] = int(random(2));
	}
	randomRuleset();

	background(hue, saturation, brightness);
}

function draw() {
		for (let i = 0; i < cells.length; i++) {
			if (cells[i] === 1) {
				fill(hue, saturation, brightness2);
				rect(i * w, generation * w, w, w);
			} else {
				fill(hue, saturation, brightness);
				rect(i * w, generation * w, w, w);
			}
		}
		if (generation < height/w) {
			generate();
		} else {
			generation = 0;
			randomRuleset();
		}

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(hue, saturation, brightness);
}

function theDay() {
  let d = new Date();
	document.getElementById("timer").innerHTML = d.toLocaleTimeString(('de'));
	let secs = d.getSeconds() + (60 * d.getMinutes()) + (60 * 60 * d.getHours());

	console.log(secs, hue);

	if(hue > 255){
		hue = 0;
	} else {
		hue = int(map(secs, 0, 86400, 0, 255));
	}



	if(d.toLocaleTimeString() >= certainTime && d.toLocaleTimeString() < endTime){
		if(brightness2 > 0){
			brightness2 = brightness2 - 10;
		}
		textLayer.style.display = "none";
	} else {
		brightness2 = 255;
		textLayer.style.display = "block";
	}

}


// The process of creating the new generation
function generate() {
  // First we create an empty array for the new values
  let nextgen = Array(cells.length);
  // For every spot, determine new state by examing current state, and neighbor states
  // Ignore edges that only have one neighor
  for (let i = 1; i < cells.length-1; i++) {
    let left   = cells[i-1];   // Left neighbor state
    let me     = cells[i];     // Current state
    let right  = cells[i+1];   // Right neighbor state
    nextgen[i] = rules(left, me, right); // Compute next generation state based on ruleset
  }
  // The current generation is the new generation
  cells = nextgen;
  generation++;
}

// Implementing the Wolfram rules
// Could be improved and made more concise, but here we can explicitly see what is going on for each case
function rules(a, b, c) {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
  return 0;
}

function randomRuleset(){
	for (let i = 0; i < cells.length; i++) {
    ruleset[i] = int(random(2));
	}
}
