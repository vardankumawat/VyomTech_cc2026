/*let phase = "earth";
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
}*/
let rocketY = 500;
let velocity = 0;

let state = "idle";
let countdown = 3;
let lastCountTime = 0;

let particles = [];
let beepSound; 

//sound
function preload() {
    beepSound = loadSound('beep.mp3'); 
}

function setup() {
    createCanvas(800, 600);
    userStartAudio(); 

    // prevent overlap
    beepSound.playMode('restart');
}

function draw() {
    background(135, 206, 235);

    drawLand();
    drawTowers();
    drawConnectors();

    if (state === "countdown" || state === "launchText") {
        showCountdown();
    }

    if (state === "launch") {
        velocity += 0.05;
        rocketY -= velocity;

        generateSmoke(400, rocketY);
        updateSmoke();
    }

    drawRocket(400, rocketY);
    drawFlame(400, rocketY);
}

function mousePressed() {
    if (state === "idle") {
        state = "countdown";
        countdown = 3;
        lastCountTime = millis();
    }
}

//countdown
function showCountdown() {
    fill(0);
    textSize(50);
    textAlign(LEFT, CENTER);

    let x = 50;
    let y = height - 100;

    if (state === "countdown") {
        if (countdown > 0) {
            text(countdown, x, y);
        }

        if (millis() - lastCountTime > 1000) {

            //play sound
            if (countdown > 0 && beepSound) {
                beepSound.play();
            }

            countdown--;
            lastCountTime = millis();

            if (countdown === 0) {
                state = "launchText";
                lastCountTime = millis();
            }
        }
    } 
    else if (state === "launchText") {
        text("LAUNCH", x, y);

        if (millis() - lastCountTime > 1000) {
            state = "launch";
        }
    }
}

//smoke 
function generateSmoke(x, y) {
    for (let i = 0; i < 5; i++) {
        particles.push({
            x: x + random(-20, 20),
            y: y + 20,
            size: random(10, 25),
            alpha: 200
        });
    }
}

function updateSmoke() {
    noStroke();
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];

        fill(200, p.alpha);
        ellipse(p.x, p.y, p.size);

        p.y += random(1, 3);
        p.x += random(-1, 1);
        p.alpha -= 3;

        if (p.alpha <= 0) {
            particles.splice(i, 1);
        }
    }
}

//land 
function drawLand() {
    fill(100, 200, 100);
    rect(0, 520, width, 80);

    fill(120);
    rect(350, 500, 100, 20);
}

//tower
function drawTowers() {
    stroke(120);
    strokeWeight(2);
    noFill();

    drawTower(300, 250, 40, 270);
    drawTower(460, 250, 40, 270);
}

function drawTower(x, y, w, h) {
    push();
    translate(x, y);

    rect(0, 0, w, h);

    let step = 20;
    for (let i = 0; i < h; i += step) {
        line(0, i, w, i + step);
        line(w, i, 0, i + step);
    }

    pop();
}

//connectors 
function drawConnectors() {
    let fixedY = 500;

    stroke(120);
    strokeWeight(2);
    noFill();

    let h = 20;
    let w = 80;
    let segments = 6;

    drawZigZag(340, fixedY - 120, w, h, segments);
    drawZigZag(380, fixedY - 120, w, h, segments);
}

function drawZigZag(x, y, w, h, segments) {
    push();
    translate(x, y);

    rect(0, 0, w, h);

    let step = w / segments;

    for (let i = 0; i < segments; i++) {
        let x1 = i * step;
        let x2 = (i + 1) * step;

        if (i % 2 === 0) {
            line(x1, 0, x2, h);
        } else {
            line(x1, h, x2, 0);
        }
    }

    pop();
}

//Rocket
function drawRocket(x, y) {
    push();
    translate(x, y);
    rectMode(CENTER);
    noStroke();

    fill(240);
    rect(0, -60, 40, 120);
    rect(0, -160, 40, 80);

    fill(128, 0, 0);
    rect(0, -220, 40, 40);

    fill(240);
    rect(0, -255, 40, 30);

    rect(0, -280, 40, 20);
    triangle(-20, -290, 20, -290, 0, -340);

    fill(255, 153, 51);
    rect(0, -170, 40, 5);
    fill(255);
    rect(0, -165, 40, 5);
    fill(19, 136, 8);
    rect(0, -160, 40, 5);

    fill(128, 0, 0);
    rect(-28, -40, 16, 80);
    triangle(-36, -80, -20, -80, -28, -95);
    fill(80);
    rect(-28, 5, 12, 10);

    fill(128, 0, 0);
    rect(28, -40, 16, 80);
    triangle(20, -80, 36, -80, 28, -95);
    fill(80);
    rect(28, 5, 12, 10);

    fill(80);
    quad(-15, 0, 15, 0, 20, 15, -20, 15);

    pop();
}

//flame 
function drawFlame(x, y) {
    push();
    translate(x, y);
    noStroke();

    fill(255, 150, 0, 200);
    triangle(-15, 15, 15, 15, random(-5, 5), random(40, 70));

    fill(255, 255, 0, 200);
    triangle(-10, 15, 10, 15, random(-3, 3), random(30, 50));

    fill(255, 150, 0, 200);
    triangle(-32, 10, -24, 10, -28 + random(-2, 2), random(25, 45));
    triangle(24, 10, 32, 10, 28 + random(-2, 2), random(25, 45));

    pop();
}