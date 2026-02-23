let obj;
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
}

function draw() {
  background(220);

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
      obj.vx *= 0.95; // Friction
    }
    
    // right wall collision
    if (obj.x > width - obj.r) {
      obj.x = width - obj.r;
      obj.vy *= 0.7; // Bounce
      obj.vx *= -0.95; // Friction
    }
    
    // left wall collision
    if (-obj.x > width - obj.r) {
      obj.x = -width + obj.r;
      obj.vy *= 0.7; // Bounce
      obj.vx *= -0.95; // Friction
    }
    
    // ceiling collision
    if (-obj.y > width - obj.r) {
      obj.y = -width + obj.r;
      obj.vy *= 0.7; // Bounce
      obj.vx *= -0.50; // Friction
    }
  }

  // Draw object
  ellipse(obj.x, obj.y, obj.r * 2);
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