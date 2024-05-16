let btn
let click = 0
let currenttextsize = 15;
let targettextsize = 15;
let doReduceTextSize = false;
let isScreenShaking = false;
let screenshakeframe = 0;
let balls = [];
let particles = [];

/*s
- colour
- text size changing (with easing)
- screen shake
- sound
- bgm
- button effects
- balls
- particles
- button changes colour on hover
- number size gets bigger as number increases
- added eyes to the button
- appealing text
*/

let mySound;
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/vine-boom');
  bgm = loadSound('assets/better-call-saul');
}

function setup() {
  new Canvas(400, 400);
  btn = createButton('click me for free robux')
  btn.position(width/2-btn.width/2,height/2-btn.height/2)
  btn.mousePressed(todo)
  bgm.play();
}

function draw() {
  background(random(0, 255), random(0, 255), random(0, 255));
  if (frameCount - screenshakeframe == 10) {
    isScreenShaking = false;
    translate(0, 0);
    btn.position(width/2-btn.width/2,height/2-btn.height/2)
  }
  // draw eyes
  if (isScreenShaking == true){
    transx = random(-click/5,click/5);
    transy = random(-click/5,click/5);
		translate(transx, transy);
    btn.position(width/2-btn.width/2 + transx,height/2-btn.height/2 + transy)
	}
  push()
  fill(0)
  circle(width/2-40, height/2-40, 5)
  circle(width/2+40, height/2-40, 5)
  pop()
  if (doReduceTextSize) {
    if (currenttextsize == targettextsize) {
      doReduceTextSize = false;
    } else {
      currenttextsize -= (currenttextsize - targettextsize) / 10;
    }
  }
  for (let currball of balls) {
    if (currball.sprite.x < 0 || currball.sprite.x > width || currball.sprite.y < 0 || currball.sprite.y > height) {
      currball.sprite.speed *= -1;
    }
    currball.draw();
  }
  for (let particle of particles) {
    particle.update();
    push()
    noStroke();
    fill(255, particle.alpha);
    rect(particle.x, particle.y, 10, 10);
    pop()
    if (particle.finished()) {
      particles.splice(particles.indexOf(particle), 1);
    }
  }
  textSize(currenttextsize)
  textAlign(CENTER)
  text(click,width/2,height/4)
  console.log(balls)
}

function todo(){
  click++;
  mySound.play();
  targettextsize += 0.1;
  currenttextsize += 30;
  textSize(currenttextsize)
  doReduceTextSize = true;
  isScreenShaking = true;
  screenshakeframe = frameCount;
  spawnBall();
  for (let i = 0; i < click; i++) {
    particles.push(new Particle(width/2, height/2));
  }
}

function spawnBall() {
  let ball = new Ball(random(0,width),random(0,height))
  balls.push(ball)
}

class Ball {
  constructor(x,y) {
    this.sprite = new Sprite(x, y, 20)
    this.sprite.shapeColor = color(random(0,255),random(0,255),random(0,255))
    this.sprite.speed = click * 10
    this.sprite.direction = random(0,360)
    this.sprite.friction = 0;
    this.sprite.drag = 0
  }

  draw() {
    circle(this.sprite.x, this.sprite.y, this.sprite.size)
  }
}

class Particle {
  constructor(x,y) {
    this.x = x + random(-5,5);
    this.y = y + random(-5,5);
    this.vx = random(-5,5);
    this.vy = random(-5,5);
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }
}