let qt;
let displayable = []
function setup() {
  createCanvas(400, 400);
  let r = new Rectangle(200, 200, 400, 400);
  qt = new Quadtree(r, 4);
  for (let i = 0; i < 100; i++){
    let p = new Point(random(width), random(height));
    qt.insert(p);
  }
}

function draw() {
  background(64);
  qt.display();
}

function spawnPoint(x, y) {
  let p = new Point(x, y);
  qt.insert(p);
}
function mousePressed(){
  spawnPoint(mouseX, mouseY);
}
