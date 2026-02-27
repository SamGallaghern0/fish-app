let obj;
let block;
let gravity = 0.1;

function setup() {
  createCanvas(1000, 1000);
  colorMode(HSL)
  obj = {
    x: width / 2,
    y: height / 2,
    r: 50,
    vx: 0,
    vy: 0,
    dragging: false
  };
  block = { x: -1100, y: 948, w: 1500, h: 50 };
  block2 = { x: 700, y: 900, w: 100, h: 50 };
  
  bg = new WhiteBg()
  popup = new Popup(200, 200, 200, 40, CENTER)
}

function draw() {
  background('rgb(220,237,243)');
  
  bg.draw()
  popup.draw()
  fill('rgb(152,203,220)');
  rect(block.x, block.y, block.w, block.h);
  
  fill('grey');
  rect(block2.x, block2.y, block2.w, block2.h);

  fill('red');
  // Interaction logic
  if (obj.dragging) {
    obj.x = mouseX;
    obj.y = mouseY;
    obj.vx = mouseX - pmouseX; // Calculate velocity based on drag speed
    obj.vy = mouseY - pmouseY;
  } else {
    // Physics logic
    obj.vy += gravity;
    obj.x += obj.vx;
    obj.y += obj.vy;
    
    // ground collision
    if (obj.y > height - obj.r) {
      obj.y = height - obj.r;
      obj.vy *= -0.7; // Bounce
      obj.vx *= 1.0; // Friction
    }
    
    // right wall collision
    if (obj.x > width - obj.r) {
      obj.x = width - obj.r;
      obj.vy *= 0.7; // Bounce
      obj.vx *= -0.95; // Friction
    }
    
    // left wall collision
    if (-obj.x > width + obj.r) {
      obj.x = -width - obj.r;
      obj.vy *= -0.7; // Bounce
      obj.vx *= 0.0; // Friction
    }
    
    // ceiling collision
    if (-obj.y > width - obj.r) {
      obj.y = -width + obj.r;
      obj.vy *= 0.7; // Bounce
      obj.vx *= -0.50; // Friction
    }
  }
  
  if (
    obj.x > block.x &&
    obj.x < block.x + block.w &&
    obj.y > block.y &&
    obj.y < block.y + block.h
  ) {
    spawnBall(); // Respawn!
    popup.toggle()
  }
  
  if (
    obj.x > block2.x &&
    obj.x < block2.x + block2.w &&
    obj.y > block2.y &&
    obj.y < block2.y + block2.h
  ) {
    spawnBall(); // Respawn!
    popup.toggle()
  }

  // Draw object
  ellipse(obj.x, obj.y, obj.r * 2);
}

function spawnBall() {
  obj = {
    x: width / 2,
    y: height / 2,
    r: 50,
    vx: 0,
    vy: 0,
    dragging: false
  };
}

function mousePressed() {
  // Check if mouse is inside the ellipse
  if (dist(mouseX, mouseY, obj.x, obj.y) < obj.r) {
    obj.dragging = true;
  }
}

function mouseReleased() {
  obj.dragging = false;
}


//code taken from Popup by kangabru
class OnOff {
  constructor() {
    this.on = false
    this._val = 0
  }
  
  get val() { return ease(this._val / 100, 3) }
  
  updateOnOff() {
    const tar = this.on ? 100 : 0
    this._val += constrain(tar - this._val, -4, 4)
  }
}

class Popup extends OnOff {
  constructor(x, y, w, h, mode) {
    super()
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.mode = mode
  }
  
  toggle() {
    this.on = !this.on
    bg.on = this.on
  }
  
  draw(drawContent) {
    this.updateOnOff()
    const t = this.val
    push()
    rectMode(this.mode)
    translate(this.x, this.y)
    fill(100, t)
    stroke(0, t)
    strokeWeight(2)
    rectMode(CENTER)
    rect(250, (1 - t) * 50, 400, 100, 5)
    textAlign(CENTER)
    text("this is text", 250, (1 - t) * 50)
    drawContent?.(t)
    pop()
  }
}

class WhiteBg extends OnOff {
  constructor() {
    super()
  }
  
  draw() {
    this.updateOnOff()
    fill(100, this.val * 0.4)
    noStroke()
    rectMode(CORNER)
    rect(0, 0, width, height)
  }
}

function ease(_p, g=1.75, neg=false) {
  let p = 1 - abs(1 - _p % 2) // make continuous between 0-1
  let res = p < 0.5
    ? 0.5 * pow(2*p, g)
    : 1 - 0.5 * pow(2*(1 - p), g);
  return neg ? res * 2 - 1 : res
}
