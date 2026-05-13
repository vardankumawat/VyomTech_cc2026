let phase = "earth";
let angle = 0;
let spiralRadius = 40;
let spiralTurns = 2;
let satX, satY;
let transferT = 0;
let trail = [];
let startX, startY, endX, endY;
let stars = [];
let speedSlider;

function setup() {
  createCanvas(1200, 600);

  speedSlider = createSlider(0.5, 3, 1, 0.1);
  speedSlider.position(20, 70);

  for (let i = 0; i < 150; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      s: random(1, 3)
    });
  }
}
function draw() {
  let speed = speedSlider.value();
  background(5, 10, 30);
  drawStars();

  let earthX = 220;
  let earthY = height / 2;

  let marsX = 900;
  let marsY = height / 2;

  //orbit 

  noFill();
  stroke(255, 255, 255, 60);
  strokeWeight(1);

  for (let r = 60; r <= 180; r += 40) {
    ellipse(earthX, earthY, r * 2, r * 2);
  }

  ellipse(marsX, marsY, 220, 150);

  //Earth
  noStroke();
  fill(70, 160, 255);
  ellipse(earthX, earthY, 80);

  fill(80, 200, 120);
  ellipse(earthX - 10, earthY, 25, 15);
  ellipse(earthX + 15, earthY + 10, 20, 12);

  fill(0, 255, 120);
  ellipse(earthX + 15, earthY - 10, 10);

  fill(255);
  text("Earth", earthX - 25, earthY - 90);

  //Mars 
  fill(255, 80, 50);
  ellipse(marsX, marsY, 70);

  fill(255);
  text("Mars", marsX - 20, marsY - 90);

  //entry point (left)
  endX = marsX- 110;
  endY = marsY;

  // Motion 
  if (phase === "earth") {

    satX = earthX + spiralRadius * cos(-angle);
    satY = earthY + spiralRadius * sin(-angle);

    angle += 0.03 * speed;
    spiralRadius += 0.15 * speed;

    if (angle > PI * 1.5 + (spiralTurns - 1) * TWO_PI && spiralRadius > 160) {
      phase = "transfer";

      startX = satX;
      startY = satY;

      transferT = 0;
    }
  }
  else if (phase === "transfer") {

    transferT += 0.005 * speed;

    let t = transferT;

    //linear motion from earth to mars 
    satX = lerp(startX, endX, t);
    satY = lerp(startY, endY, t);

    if (transferT >= 1) {
      phase = "mars";
      angle = PI;
    }
  }

  else if (phase === "mars") {

    satX = marsX + 110 * cos(angle);
    satY = marsY + 75 * sin(angle);

    angle += 0.03 * speed;
  }
  
  //trail
  trail.push({ x: satX, y: satY });
  if (trail.length > 120) trail.shift();

  noStroke();
  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];
    let alpha = map(i, 0, trail.length, 0, 255);
    fill(255, 255, 255, alpha * 0.8);
    circle(p.x, p.y, 4);
  }

  //satellite
  push();
  translate(satX, satY);

  //face direction of motion
  let angleDir = atan2(endY - startY, endX - startX);
  rotate(angleDir);

  scale(1.3);

  fill(240, 200, 80);
  rectMode(CENTER);
  rect(0, 0, 20, 12, 3);

  fill(100, 120, 255);
  rect(-25, 0, 20, 10);
  rect(25, 0, 20, 10);

  stroke(255, 200);
  for (let i = -32; i <= -18; i += 4) {
    line(i, -5, i, 5);
  }
  for (let i = 18; i <= 32; i += 4) {
    line(i, -5, i, 5);
  }

  noStroke();

  fill(220);
  ellipse(0, -12, 16, 10);
  fill(180);
  ellipse(0, -12, 6, 6);

  pop();

  //speed
  fill(255);
  text("Speed: " + speed.toFixed(1) + "x", 20, 60);
}

function drawStars() {
  noStroke();
  fill(255);
  for (let s of stars) {
    circle(s.x, s.y, s.s);
  }
textAlign(CENTER);
textSize(26);
text("Mars Orbiter Mission Successful", width / 2, 50);
  textSize(16)
textAlign(LEFT);
}
