let data;
let cleanedData = [];

let on = false;

let obj;
let block;
let block2;
let binLine;
let binLine2;
let boardWalk;
let gravity = 0.1;
let img;
let theSun;
let sunStuff;
let sunStuff2;

function preload() {
  data = loadTable("data/fact_data.csv", "csv", "header");
  img = loadImage('images/crumpled-brown-paper-ball-texture-form_632498-24900.avif');
  water = loadImage('assets/water.png');
  wood = loadImage('assets/wood floor.png');
}

function setup() {
  createCanvas(1000, 1000);
  obj = {
    //image: img,
    x: width / 2,
    y: height / 2,
    r: 50,
    vx: 0,
    vy: 0,
    dragging: false
  };
  //water
  block = { x: -1100, y: 949, w: 1500, h: 51};
  //bin
  block2 = { x: 700, y: 897, w: 100, h: 50};
  binLine = { x1: 700, y1: 948, x2: 650, y2: 750};
  binLine2 = { x1: 800, y1: 948, x2: 850, y2: 750};
  binLid = { x1: 845, y1: 750, x2: 890, y2: 600};
  //boardwalk
  boardWalk = { x: 400, y: 948, w: 700, h: 55};
  //sun
  theSun = { x: 0, y: 0, r: 400};
  sunStuff = {x: 150, y: 100, r: 15};
  sunStuff2 = {x: 30, y: 90, r: 15};
  sunStuff3 = { x1: 70, y1: 140, x2: 120, y2: 140};
  sunStuff4 = { x1: 30, y1: 120, x2: 70, y2: 140};
  
  
  for(let i=0; i<data.rows.length; i++){
		cleanedData.push(data.rows[i].obj)
	}
}

function draw() {
  background('rgb(220,237,243)');
  
  let square = {
    x: width / 4,
    y: height / 2,
    w: width / 2,
    h: 200,
  }
  
  strokeWeight(5);
  fill('rgb(255,211,5)')
  ellipse(theSun.x, theSun.y, theSun.r)
  fill('black')
  ellipse(sunStuff.x, sunStuff.y, sunStuff.r)
  ellipse(sunStuff2.x, sunStuff2.y, sunStuff2.r)
  stroke('black')
  line(sunStuff3.x1, sunStuff3.y1, sunStuff3.x2, sunStuff3.y2);
  line(sunStuff4.x1, sunStuff4.y1, sunStuff4.x2, sunStuff4.y2);
  
  noStroke()
  //water
  fill('rgb(152,203,220)');
  image(water, block.x, block.y, block.w, block.h);
  
  //boardwalk
  fill('rgb(158,97,13)')
  image(wood, boardWalk.x, boardWalk.y, boardWalk.w, boardWalk.h)
  
  //bin
  fill('grey');
  rect(block2.x, block2.y, block2.w, block2.h);
  beginShape()
  vertex(binLine.x1, binLine.y1);
  vertex(binLine.x2, binLine.y2);
  vertex(binLine2.x2, binLine2.y2);
  vertex(binLine2.x1, binLine2.y1);
  endShape()
  strokeWeight(5);
  stroke('grey')
  line(binLid.x1, binLid.y1, binLid.x2, binLid.y2)
  
  if (on) {
    noStroke();
    fill('rgb(246,240,240)');
    rect(square.x, square.y, square.w, square.h);
    textAlign(CENTER)
    strokeWeight(1);
    stroke('black')
    noFill()
    text(cleanedData[0].FactText, square.x + (square.w / 2), square.y + (square.h / 2));
  }
  

  //ball
  noStroke()
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
  
  if ( //water collision
    obj.x > block.x &&
    obj.x < block.x + block.w &&
    obj.y > block.y &&
    obj.y < block.y + block.h
  ) {
    spawnBall(); // Respawn!
    on = !on
  }
  
  if ( //bin collision
    obj.x > block2.x &&
    obj.x < block2.x + block2.w &&
    obj.y > block2.y &&
    obj.y < block2.y + block2.h
  ) {
    spawnBall(); // Respawn!
    on = !on
  }
  
  if ( //boardwalk collision
    obj.x - obj.r > boardWalk.x &&
    obj.x - obj.r < boardWalk.x + boardWalk.w &&
    obj.y + obj.r > boardWalk.y &&
    obj.y + obj.r < boardWalk.y + boardWalk.h
  ) {
      obj.y = boardWalk.y - obj.r;
      obj.vy *= -0.7; // Bounce
      obj.vx *= 1; // Friction
  }

  // Draw ball
  ellipse(obj.x, obj.y, obj.r * 2);
}

function spawnBall() { //the function to respawn the ball when it collides with the water or the bin
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
  on = false;
}

function mouseReleased() {
  obj.dragging = false;
}