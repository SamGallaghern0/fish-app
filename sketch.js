let obj;
let block;
let gravity = 0.1;

function setup() {
  createCanvas(1000, 1000);
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
}

function draw() {
  background(220);
  fill('lightblue');
  rect(block.x, block.y, block.w, block.h);
  
  fill('grey');
  rect(block2.x, block2.y, block2.w, block2.h);

  fill('white');
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
  }
  
  if (
    obj.x > block2.x &&
    obj.x < block2.x + block2.w &&
    obj.y > block2.y &&
    obj.y < block2.y + block2.h
  ) {
    spawnBall(); // Respawn!
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