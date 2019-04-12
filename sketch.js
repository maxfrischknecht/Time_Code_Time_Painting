function setup() {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent('p5-sketch-holder');
}

function draw() {
	background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

