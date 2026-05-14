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
// let rocketY = 500;
// let velocity = 0;

// let state = "idle";
// let countdown = 3;
// let lastCountTime = 0;

// let particles = [];
// let beepSound; 

// //sound
// function preload() {
//     beepSound = loadSound('beep.mp3'); 
// }

// function setup() {
//     createCanvas(800, 600);
//     userStartAudio(); 

//     // prevent overlap
//     beepSound.playMode('restart');
// }

// function draw() {
//     background(135, 206, 235);

//     drawLand();
//     drawTowers();
//     drawConnectors();

//     if (state === "countdown" || state === "launchText") {
//         showCountdown();
//     }

//     if (state === "launch") {
//         velocity += 0.05;
//         rocketY -= velocity;

//         generateSmoke(400, rocketY);
//         updateSmoke();
//     }

//     drawRocket(400, rocketY);
//     drawFlame(400, rocketY);
// }

// function mousePressed() {
//     if (state === "idle") {
//         state = "countdown";
//         countdown = 3;
//         lastCountTime = millis();
//     }
// }

// //countdown
// function showCountdown() {
//     fill(0);
//     textSize(50);
//     textAlign(LEFT, CENTER);

//     let x = 50;
//     let y = height - 100;

//     if (state === "countdown") {
//         if (countdown > 0) {
//             text(countdown, x, y);
//         }

//         if (millis() - lastCountTime > 1000) {

//             //play sound
//             if (countdown > 0 && beepSound) {
//                 beepSound.play();
//             }

//             countdown--;
//             lastCountTime = millis();

//             if (countdown === 0) {
//                 state = "launchText";
//                 lastCountTime = millis();
//             }
//         }
//     } 
//     else if (state === "launchText") {
//         text("LAUNCH", x, y);

//         if (millis() - lastCountTime > 1000) {
//             state = "launch";
//         }
//     }
// }

// //smoke 
// function generateSmoke(x, y) {
//     for (let i = 0; i < 5; i++) {
//         particles.push({
//             x: x + random(-20, 20),
//             y: y + 20,
//             size: random(10, 25),
//             alpha: 200
//         });
//     }
// }

// function updateSmoke() {
//     noStroke();
//     for (let i = particles.length - 1; i >= 0; i--) {
//         let p = particles[i];

//         fill(200, p.alpha);
//         ellipse(p.x, p.y, p.size);

//         p.y += random(1, 3);
//         p.x += random(-1, 1);
//         p.alpha -= 3;

//         if (p.alpha <= 0) {
//             particles.splice(i, 1);
//         }
//     }
// }

// //land 
// function drawLand() {
//     fill(100, 200, 100);
//     rect(0, 520, width, 80);

//     fill(120);
//     rect(350, 500, 100, 20);
// }

// //tower
// function drawTowers() {
//     stroke(120);
//     strokeWeight(2);
//     noFill();

//     drawTower(300, 250, 40, 270);
//     drawTower(460, 250, 40, 270);
// }

// function drawTower(x, y, w, h) {
//     push();
//     translate(x, y);

//     rect(0, 0, w, h);

//     let step = 20;
//     for (let i = 0; i < h; i += step) {
//         line(0, i, w, i + step);
//         line(w, i, 0, i + step);
//     }

//     pop();
// }

// //connectors 
// function drawConnectors() {
//     let fixedY = 500;

//     stroke(120);
//     strokeWeight(2);
//     noFill();

//     let h = 20;
//     let w = 80;
//     let segments = 6;

//     drawZigZag(340, fixedY - 120, w, h, segments);
//     drawZigZag(380, fixedY - 120, w, h, segments);
// }

// function drawZigZag(x, y, w, h, segments) {
//     push();
//     translate(x, y);

//     rect(0, 0, w, h);

//     let step = w / segments;

//     for (let i = 0; i < segments; i++) {
//         let x1 = i * step;
//         let x2 = (i + 1) * step;

//         if (i % 2 === 0) {
//             line(x1, 0, x2, h);
//         } else {
//             line(x1, h, x2, 0);
//         }
//     }

//     pop();
// }

// //Rocket
// function drawRocket(x, y) {
//     push();
//     translate(x, y);
//     rectMode(CENTER);
//     noStroke();

//     fill(240);
//     rect(0, -60, 40, 120);
//     rect(0, -160, 40, 80);

//     fill(128, 0, 0);
//     rect(0, -220, 40, 40);

//     fill(240);
//     rect(0, -255, 40, 30);

//     rect(0, -280, 40, 20);
//     triangle(-20, -290, 20, -290, 0, -340);

//     fill(255, 153, 51);
//     rect(0, -170, 40, 5);
//     fill(255);
//     rect(0, -165, 40, 5);
//     fill(19, 136, 8);
//     rect(0, -160, 40, 5);

//     fill(128, 0, 0);
//     rect(-28, -40, 16, 80);
//     triangle(-36, -80, -20, -80, -28, -95);
//     fill(80);
//     rect(-28, 5, 12, 10);

//     fill(128, 0, 0);
//     rect(28, -40, 16, 80);
//     triangle(20, -80, 36, -80, 28, -95);
//     fill(80);
//     rect(28, 5, 12, 10);

//     fill(80);
//     quad(-15, 0, 15, 0, 20, 15, -20, 15);

//     pop();
// }

// //flame 
// function drawFlame(x, y) {
//     push();
//     translate(x, y);
//     noStroke();

//     fill(255, 150, 0, 200);
//     triangle(-15, 15, 15, 15, random(-5, 5), random(40, 70));

//     fill(255, 255, 0, 200);
//     triangle(-10, 15, 10, 15, random(-3, 3), random(30, 50));

//     fill(255, 150, 0, 200);
//     triangle(-32, 10, -24, 10, -28 + random(-2, 2), random(25, 45));
//     triangle(24, 10, 32, 10, 28 + random(-2, 2), random(25, 45));

//     pop();
// }
// let spaceRocketX = 450;
// let spaceRocketY = 400;
// let currentAngle = 70;

// // Mission stages
// let missionStage = 0;

// let debrisParts = [];

// function setup() {
//     createCanvas(900, 800);
// }

// function draw() {
//     drawSpacePhase();
// }

// //space phase 
// function drawSpacePhase() {

//     drawSpaceBackground();

//     // Debris animation
//     for (let i = debrisParts.length - 1; i >= 0; i--) {
//         debrisParts[i].update();
//         debrisParts[i].show();

//         if (debrisParts[i].alpha <= 0) {
//             debrisParts.splice(i, 1);
//         }
//     }

//     let hover = sin(frameCount * 0.05) * 5;

//     push();
//     translate(spaceRocketX, spaceRocketY + hover);
//     rotate(radians(currentAngle));

//     // Flame only before stage 2
//     if (missionStage < 2) {
//         drawFlame(0, -120);
//     }

//     drawRocket(0, 0, missionStage);

//     pop();

//     //Instructions
//     fill(255);
//     textAlign(CENTER);
//     textSize(18);

//     if (missionStage < 3) {
//         text("PRESS 1, 2, 3 FOR STAGE SEPARATION", width / 2, height - 40);
//     } else {
//         fill(0, 255, 120);
//         text("SATELLITE SUCCESSFULLY DEPLOYED", width / 2, height - 40);
//     }
// }

// //Key control 
// function keyPressed() {

//     if (key === '1' && missionStage === 0) {
//         debrisParts.push(new Debris(-70, -20, "booster"));
//         debrisParts.push(new Debris(30, -20, "booster"));
//         missionStage = 1;
//     }

//     if (key === '2' && missionStage === 1) {
//         debrisParts.push(new Debris(0, 15, "main"));
//         missionStage = 2;
//     }

//     if (key === '3' && missionStage === 2) {
//         debrisParts.push(new Debris(0, -120, "fairing"));
//         missionStage = 3;
//     }
// }

// //derbis class
// class Debris {
//     constructor(offX, offY, type) {
//         this.x = spaceRocketX;
//         this.y = spaceRocketY;
//         this.offX = offX;
//         this.offY = offY;
//         this.type = type;

//         this.vx = random(-1, 1);
//         this.vy = random(1, 3);
//         this.rot = random(-1, 1);

//         this.alpha = 255;
//     }

//     update() {
//         this.x += this.vx;
//         this.y += this.vy;
//         this.offX += this.rot;
//         this.alpha -= 2;
//     }

//     show() {
//         push();
//         translate(this.x + this.offX, this.y + this.offY);

//         noStroke();
//         fill(230, this.alpha);

//         if (this.type === "booster") {
//             rect(0, 0, 20, 80);
//         } 
//         else if (this.type === "main") {
//             rect(0, 0, 40, 120);
//         } 
//         else if (this.type === "fairing") {
//             arc(0, 0, 40, 40, PI, TWO_PI);
//         }

//         pop();
//     }
// }

// //rocket
// function drawRocket(x, y, stage) {

//     push();
//     translate(x, y);
//     rectMode(CENTER);
//     noStroke();

//     //Booster
//     if (stage === 0) {
//         fill(128, 0, 0);
//         rect(-28, -40, 16, 80);
//         rect(28, -40, 16, 80);
//     }

//     // Main body
//     if (stage <= 1) {
//         fill(240);
//         rect(0, -60, 40, 120);
//         rect(0, -160, 40, 80);
//     }

//     // Upper stage
//     if (stage <= 2) {
//         fill(128, 0, 0);
//         rect(0, -220, 40, 40);

//         fill(240);
//         rect(0, -255, 40, 30);
//         triangle(-20, -280, 20, -280, 0, -320);
//     }

//     //satellite
//     if (stage === 3) {

//         let satX = 0;
//         let satY = -200;

//         push();
//         translate(satX, satY);

//         scale(1.3);

//         fill(240, 200, 80);
//         rect(0, 0, 20, 12, 3);

//         fill(100, 120, 255);
//         rect(-25, 0, 20, 10);
//         rect(25, 0, 20, 10);

//         stroke(255, 200);
//         for (let i = -32; i <= -18; i += 4) {
//             line(i, -5, i, 5);
//         }
//         for (let i = 18; i <= 32; i += 4) {
//             line(i, -5, i, 5);
//         }
//         noStroke();

//         fill(220);
//         ellipse(0, -12, 16, 10);

//         fill(180);
//         ellipse(0, -12, 6, 6);

//         pop();
//     }

//     pop();
// }
// function drawFlame(x, y) {

//     noStroke();
  
//     fill(255, 100, 0, 180);
//     ellipse(x, y + 100, 70, 180);

//     fill(255, 160, 0, 200);
//     ellipse(x, y + 70, 50, 130);

   
//     fill(255, 255, 200);
//     ellipse(x, y + 40, 25, 80);
// }
// // background

// function drawSpaceBackground() {

//     background(0);

//     fill(255);
//     for (let i = 0; i < 100; i++) {
//         circle(random(width), random(height), random(1, 3));
//     }

//     // Earth glow
//     for (let i = 0; i < 200; i++) {
//         stroke(0, 150, 255, 100 - i * 0.5);
//         line(0, 600 + i, width, 600 + i);
//     }

//     noStroke();
//     fill(135, 206, 250);
//     rect(0, 600, width, 200);
// }

// ---- global state ----
let scene = 'ground'; // ground | countdown | launch | stages | space_transition | orbit

let countdown = 3;
let countStartTime = 0;

let rocketY;
let rocketVel = 0;
let smokes = [];

let missionStage = 0; // 0=full | 1=boosters gone | 2=main gone | 3=fairing gone / sat deployed
let debris = [];
let hoverOffset = 0;

let spaceRocketY = 0;
let spaceRocketVel = 0;

// orbit vars
let orbitPhase = 'earth'; // earth | transfer | mars
let orbitAngle = 0;
let spiralRadius = 40;
let satX, satY;
let trail = [];
let transferT = 0;
let startX, startY, endX, endY;

let fadeAlpha = 0;
let stars = [];

// ============================================================
//  SETUP
// ============================================================
function setup() {
  createCanvas(1200, 600);
  textFont('sans-serif');
  initStars();
  resetMission();
}

function initStars() {
  stars = [];
  for (let i = 0; i < 180; i++) {
    stars.push({ x: random(width), y: random(height), s: random(0.5, 2.5) });
  }
}

function resetMission() {
  scene        = 'ground';
  countdown    = 3;
  countStartTime = 0;
  rocketY      = height - 100;
  rocketVel    = 0;
  smokes       = [];
  missionStage = 0;
  debris       = [];
  hoverOffset  = 0;
  spaceRocketY = 0;
  spaceRocketVel = 0;
  orbitPhase   = 'earth';
  orbitAngle   = 0;
  spiralRadius = 40;
  satX         = undefined;
  satY         = undefined;
  trail        = [];
  transferT    = 0;
  fadeAlpha    = 0;
}

// ============================================================
//  DRAW (main loop)
// ============================================================
function draw() {
  if      (scene === 'ground')            drawGround_scene();
  else if (scene === 'countdown')         drawCountdown_scene();
  else if (scene === 'launch')            drawLaunch_scene();
  else if (scene === 'stages')            drawStages_scene();
  else if (scene === 'space_transition')  drawTransition_scene();
  else if (scene === 'orbit')             drawOrbit_scene();
}

// ============================================================
//  SCENE: GROUND (idle)
// ============================================================
function drawGround_scene() {
  drawGroundBackground();
  drawGroundRocket(width / 2, rocketY);
  drawHUD('Click to begin launch sequence');
}

// ============================================================
//  SCENE: COUNTDOWN
// ============================================================
function drawCountdown_scene() {
  drawGroundBackground();
  drawSmokeParticles();
  drawGroundRocket(width / 2, rocketY);

  let elapsed = (millis() - countStartTime) / 1000;
  let remain  = countdown - floor(elapsed);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(64);
  textStyle(BOLD);
  if (remain > 0) {
    text(remain, width / 2, height - 110);
  } else {
    text('LAUNCH!', width / 2, height - 110);
  }
  textStyle(NORMAL);

  if (elapsed > countdown + 0.8) {
    scene = 'launch';
  }
}

// ============================================================
//  SCENE: LAUNCH (rocket ascent)
// ============================================================
function drawLaunch_scene() {
  rocketVel += 0.1;
  rocketY   -= rocketVel;
  addSmoke(width / 2, rocketY + 22);

  drawGroundBackground();
  drawSmokeParticles();
  drawGroundRocket(width / 2, rocketY);

  if (rocketY < -400) {
    scene        = 'stages';
    spaceRocketY = height * 0.55;
    spaceRocketVel = 0;
    drawHUD('');
  }
}

// ============================================================
//  SCENE: STAGE SEPARATIONS (in space)
// ============================================================
function drawStages_scene() {
  drawSpaceBackground(1);
  updateAndDrawDebris();

  hoverOffset = sin(frameCount * 0.05) * 5;

  push();
  translate(width / 2, spaceRocketY + hoverOffset);
  rotate(radians(20)); // slight angle, rocket flying up-right

  if (missionStage < 2) drawFlame(0, -120);
  drawSpaceRocket(0, 0, missionStage);
  pop();

  // instruction text
  fill(255, 255, 255, 200);
  textAlign(CENTER, CENTER);
  textSize(16);

  let msgs = [
    'Press 1 — separate boosters',
    'Press 2 — separate main stage',
    'Press 3 — jettison fairing  (satellite deploys)',
    'Press 4 — proceed to Earth orbit'
  ];
  text(msgs[min(missionStage, 3)], width / 2, height - 24);

  if (missionStage === 3) {
    fill(80, 255, 120, 220);
    textSize(18);
    text('Satellite successfully deployed!', width / 2, height - 50);
  }
}

// ============================================================
//  SCENE: SPACE TRANSITION (rocket flies off-screen)
// ============================================================
function drawTransition_scene() {
  spaceRocketVel += 0.025;
  spaceRocketY   -= spaceRocketVel;
  fadeAlpha       = constrain(fadeAlpha + 0.004, 0, 1);

  drawSpaceBackground(fadeAlpha);

  if (spaceRocketY > -200) {
    push();
    translate(width / 2, spaceRocketY + hoverOffset);
    rotate(radians(20));
    drawSpaceRocket(0, 0, 3);
    pop();
  }

  if (spaceRocketY < -350) {
    scene      = 'orbit';
    orbitPhase = 'earth';
    orbitAngle = 0;
    spiralRadius = 40;
    trail      = [];
    fadeAlpha  = 1;
    satX       = width * 0.22;
    satY       = height / 2 - 40;
  }
}

// ============================================================
//  SCENE: ORBIT (Earth spiral → transfer arc → Mars orbit)
// ============================================================
function drawOrbit_scene() {
  drawSpaceBackground(1);

  let earthX = width  * 0.22,  earthY = height / 2;
  let marsX  = width  * 0.78,  marsY  = height / 2;
  endX = marsX - 115;
  endY = marsY;

  // dashed orbit rings
  drawingContext.setLineDash([4, 7]);
  noFill();
  stroke(255, 255, 255, 45);
  strokeWeight(1);
  for (let r = 60; r <= 180; r += 40) {
    ellipse(earthX, earthY, r * 2, r * 2);
  }
  push();
  translate(marsX, marsY);
  scale(1, 0.68);
  ellipse(0, 0, 230, 230);
  pop();
  drawingContext.setLineDash([]);

  // Earth
  noStroke();
  fill(70, 160, 255);
  ellipse(earthX, earthY, 80);
  fill(80, 200, 120);
  ellipse(earthX - 10, earthY, 25, 15);
  ellipse(earthX + 15, earthY + 8, 20, 12);
  fill(255, 255, 255, 210);
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Earth', earthX, earthY - 56);

  // Mars
  fill(255, 80, 50);
  ellipse(marsX, marsY, 72);
  fill(255, 255, 255, 210);
  text('Mars', marsX, marsY - 54);

  // satellite motion
  if (orbitPhase === 'earth') {
    satX = earthX + spiralRadius * cos(-orbitAngle);
    satY = earthY + spiralRadius * sin(-orbitAngle);
    orbitAngle  += 0.025;
    spiralRadius += 0.12;
    if (spiralRadius > height * 0.26 && orbitAngle > PI * 3) {
      orbitPhase = 'transfer';
      startX = satX;  startY = satY;
      transferT  = 0;
    }
  } else if (orbitPhase === 'transfer') {
    transferT += 0.004;
    let arc = sin(transferT * PI) * (height * 0.18);
    satX = lerp(startX, endX, transferT);
    satY = lerp(startY, endY, transferT) - arc;
    if (transferT >= 1) {
      orbitPhase = 'mars';
      orbitAngle = PI;
    }
  } else if (orbitPhase === 'mars') {
    satX = marsX + 115 * cos(orbitAngle);
    satY = marsY + 78  * sin(orbitAngle) * 0.68;
    orbitAngle += 0.025;
  }

  // trail
  trail.push({ x: satX, y: satY });
  if (trail.length > 150) trail.shift();
  noStroke();
  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];
    let a = map(i, 0, trail.length, 0, 200);
    fill(255, 210, 80, a);
    circle(p.x, p.y, 3.5);
  }

  // satellite
  let dir = orbitPhase === 'transfer'
    ? atan2(endY - startY, endX - startX)
    : orbitAngle + HALF_PI;
  drawMiniSatellite(satX, satY, dir);

  // title
  fill(255, 255, 255, 230);
  textAlign(CENTER, CENTER);
  textSize(22);
  textStyle(BOLD);
  text('Mars Orbiter Mission', width / 2, 38);
  textStyle(NORMAL);

  // HUD hint
  if (orbitPhase === 'mars') {
    drawHUD('Mars orbit achieved ✓   Click to replay');
  } else if (orbitPhase === 'transfer') {
    drawHUD('Hohmann transfer burn…');
  } else {
    drawHUD('Spiralling out of Earth orbit…');
  }
}

// ============================================================
//  INPUT
// ============================================================
function mousePressed() {
  if (scene === 'ground') {
    scene          = 'countdown';
    countStartTime = millis();
  } else if (scene === 'orbit' && orbitPhase === 'mars') {
    resetMission();
  }
}

function keyPressed() {
  if (scene !== 'stages') return;

  if (key === '1' && missionStage === 0) {
    // separate boosters (two side pieces fly away)
    debris.push(new Debris(-28, -40, 'booster', -2, 2));
    debris.push(new Debris( 28, -40, 'booster',  2, 2));
    missionStage = 1;
  }
  if (key === '2' && missionStage === 1) {
    debris.push(new Debris(0, -60, 'main', 0, 2.5));
    missionStage = 2;
  }
  if (key === '3' && missionStage === 2) {
    debris.push(new Debris(-20, -300, 'fairing_l', -2, 1.5));
    debris.push(new Debris( 20, -300, 'fairing_r',  2, 1.5));
    missionStage = 3;
  }
  if (key === '4' && missionStage === 3) {
    scene = 'space_transition';
  }
}

// ============================================================
//  DEBRIS CLASS
// ============================================================
class Debris {
  constructor(offX, offY, type, vx, vy) {
    this.x    = width / 2 + offX;
    this.y    = spaceRocketY + offY;
    this.vx   = vx + random(-0.5, 0.5);
    this.vy   = vy + random(0.2, 1);
    this.rot  = 0;
    this.rspd = random(-0.04, 0.04);
    this.a    = 255;
    this.type = type;
  }

  update() {
    this.x   += this.vx;
    this.y   += this.vy;
    this.rot += this.rspd;
    this.a   -= 2;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.rot);
    noStroke();
    fill(220, 220, 220, this.a);

    if (this.type === 'booster') {
      rectMode(CENTER); rect(0, 0, 16, 80);
    } else if (this.type === 'main') {
      rectMode(CENTER); rect(0, 0, 40, 120);
    } else if (this.type === 'fairing_l') {
      arc(0, 0, 42, 42, PI, TWO_PI);
    } else if (this.type === 'fairing_r') {
      arc(0, 0, 42, 42, 0, PI);
    }
    pop();
  }
}

// ---- debris helpers ----
function updateAndDrawDebris() {
  for (let i = debris.length - 1; i >= 0; i--) {
    debris[i].update();
    debris[i].show();
    if (debris[i].a <= 0) debris.splice(i, 1);
  }
}

// ============================================================
//  BACKGROUND HELPERS
// ============================================================
function drawGroundBackground() {
  // sky gradient (simulated with two rects)
  background(135, 206, 235);

  // ground
  fill(100, 200, 100);
  noStroke();
  rect(0, height * 0.87, width, height * 0.13);

  // launch pad
  fill(130, 130, 130);
  rect(width / 2 - 55, height - 102, 110, 22);

  // towers & connectors
  drawTower(width / 2 - 140, height - 350, 40, 270);
  drawTower(width / 2 + 100, height - 350, 40, 270);
  drawConnector(width / 2 - 105, height - 215, 80, 20);
  drawConnector(width / 2 -  65, height - 215, 80, 20);
}

function drawSpaceBackground(alpha) {
  background(5, 10, 30);

  // stars
  noStroke();
  for (let s of stars) {
    fill(255, 255, 255, 180 * alpha);
    circle(s.x, s.y, s.s);
  }

  // earth horizon glow at bottom
  for (let i = 0; i < 120; i++) {
    stroke(0, 100 + i, 255, (80 - i * 0.65) * alpha);
    line(0, height - 90 + i, width, height - 90 + i);
  }
  noStroke();
  fill(80, 160, 240, 150 * alpha);
  rect(0, height - 90, width, 90);
}

// ============================================================
//  LAUNCH-PAD STRUCTURES
// ============================================================
function drawTower(x, y, tw, th) {
  push();
  translate(x, y);
  stroke(120); strokeWeight(1.5); noFill();
  rect(0, 0, tw, th);
  let step = 20;
  for (let i = 0; i < th; i += step) {
    line(0, i, tw, i + step);
    line(tw, i, 0, i + step);
  }
  pop();
}

function drawConnector(cx, cy, cw, ch) {
  push();
  translate(cx, cy);
  stroke(120); strokeWeight(1.5); noFill();
  rect(0, 0, cw, ch);
  let segs = 6, step = cw / segs;
  for (let i = 0; i < segs; i++) {
    if (i % 2 === 0) { line(i * step, 0, (i + 1) * step, ch); }
    else             { line(i * step, ch, (i + 1) * step, 0); }
  }
  pop();
}

// ============================================================
//  SMOKE
// ============================================================
function addSmoke(x, y) {
  for (let i = 0; i < 4; i++) {
    smokes.push({
      x: x + random(-22, 22),
      y: y,
      vx: random(-1, 1),
      vy: random(1, 2.5),
      r: random(8, 18),
      a: 180
    });
  }
}

function drawSmokeParticles() {
  noStroke();
  for (let i = smokes.length - 1; i >= 0; i--) {
    let p = smokes[i];
    fill(200, 200, 200, p.a);
    circle(p.x, p.y, p.r);
    p.x += p.vx; p.y += p.vy; p.a -= 4;
    if (p.a <= 0) smokes.splice(i, 1);
  }
}

// ============================================================
//  GROUND ROCKET (full PSLV with Indian flag stripe)
// ============================================================
function drawGroundRocket(rx, ry) {
  push();
  translate(rx, ry);
  rectMode(CENTER);
  noStroke();

  // exhaust flame
  if (scene === 'launch') {
    fill(255, 150, 0, 200);
    triangle(-15, 15, 15, 15, random(-6, 6), 50 + random(30));
    fill(255, 240, 0, 200);
    triangle(-9, 15, 9, 15, random(-4, 4), 36 + random(20));
    // side boosters flame
    fill(255, 130, 0, 160);
    triangle(-38, 8, -24, 8, -31 + random(-3, 3), 28 + random(18));
    triangle( 24, 8,  38, 8,  31 + random(-3, 3), 28 + random(18));
  }

  // side boosters
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

  // nozzle skirt
  fill(80);
  quad(-15, 0, 15, 0, 20, 16, -20, 16);

  // main body
  fill(240);
  rect(0, -60, 40, 120);
  rect(0, -160, 40, 80);

  // Indian tricolour stripe
  fill(255, 153, 51); rect(0, -170, 40, 5);
  fill(255);          rect(0, -165, 40, 5);
  fill(19, 136,  8);  rect(0, -160, 40, 5);

  // upper stage
  fill(128, 0, 0); rect(0, -220, 40, 40);
  fill(240);
  rect(0, -255, 40, 30);
  rect(0, -280, 40, 20);

  // nose cone
  triangle(-20, -290, 20, -290, 0, -340);

  pop();
}

// ============================================================
//  SPACE ROCKET (staged versions)
// ============================================================
function drawSpaceRocket(x, y, stage) {
  push();
  translate(x, y);
  rectMode(CENTER);
  noStroke();

  // side boosters (stage 0 only)
  if (stage === 0) {
    fill(128, 0, 0);
    rect(-28, -40, 16, 80);
    rect( 28, -40, 16, 80);
  }

  // main body (stages 0 & 1)
  if (stage <= 1) {
    fill(240);
    rect(0, -60, 40, 120);
    rect(0, -160, 40, 80);
    fill(255, 153, 51); rect(0, -170, 40, 5);
    fill(255);          rect(0, -165, 40, 5);
    fill(19, 136,  8);  rect(0, -160, 40, 5);
  }

  // upper stage / fairing (stages 0-2)
  if (stage <= 2) {
    fill(128, 0, 0); rect(0, -220, 40, 40);
    fill(240);
    rect(0, -255, 40, 30);
    triangle(-20, -280, 20, -280, 0, -320);
  }

  // satellite deployed (stage 3)
  if (stage === 3) {
    push();
    translate(0, -200);
    scale(1.3);
    drawSatelliteBody();
    pop();
  }

  pop();
}

// ============================================================
//  SATELLITE BODY (shared between stage view & orbit view)
// ============================================================
function drawSatelliteBody() {
  rectMode(CENTER);
  noStroke();

  // body
  fill(240, 200, 80);
  rect(0, 0, 20, 12, 3);

  // solar panels
  fill(100, 120, 255);
  rect(-25, 0, 20, 10);
  rect( 25, 0, 20, 10);

  // panel grid lines
  stroke(255, 200); strokeWeight(0.8);
  for (let i = -32; i <= -18; i += 4) { line(i, -5, i, 5); }
  for (let i =  18; i <=  32; i += 4) { line(i, -5, i, 5); }
  noStroke();

  // dish
  fill(220); ellipse(0, -12, 16, 10);
  fill(180); ellipse(0, -12,  6,  6);
}

function drawMiniSatellite(sx, sy, dir) {
  push();
  translate(sx, sy);
  rotate(dir);
  scale(1.2);
  drawSatelliteBody();
  pop();
}

// ============================================================
//  FLAME  (engine exhaust — used in space stages scene)
// ============================================================
function drawFlame(x, y) {
  noStroke();
  fill(255, 100, 0, 170);
  ellipse(x, y + 100, 70, 180);
  fill(255, 180, 0, 190);
  ellipse(x, y +  70, 50, 130);
  fill(255, 255, 180, 220);
  ellipse(x, y +  40, 26,  80);
}

// ============================================================
//  HUD TEXT
// ============================================================
function drawHUD(msg) {
  if (!msg) return;
  fill(255, 255, 255, 180);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text(msg, width / 2, height - 22);
}