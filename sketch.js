let certainTime = "4:58:30 PM";
//let certainTime = "8:01:00 PM";
let counter;
let hue = 0; let saturation = 255; let brightness = 255;

function setup() {
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent('p5-sketch-holder');
	setInterval(theDay, 1000);
	colorMode(HSB, 255);


	let dt = new Date();
	let secs = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
	counter = secs;
}

function draw() {
	background(hue, saturation, brightness);
	hue = map(counter, 0, 86400, 0, 255);
	console.log("hue: ", hue);

	if(hue >= 255){
		hue = 0;
		counter = 0;
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function theDay() {
  let d = new Date();
	document.getElementById("timer").innerHTML = d.toLocaleTimeString();
	counter+=1000;
	console.log(d.toLocaleTimeString());

	if(d.toLocaleTimeString() == certainTime){
		counter = 0;
		hue = 0;
	}
}

