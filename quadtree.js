function inRange(x, a, b) {
  return (a <= x && x < b);
}
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  display() {
    strokeWeight(8);
    stroke('White');
    point(this.x, this.y);
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  contains(point) {
    return (inRange(point.x, this.x - this.w/2, this.x + this.w/2) &&
            inRange(point.y, this.y - this.h/2, this.y + this.h/2));
  }
  display() {
    noFill();
    stroke(0,255,0);
    strokeWeight(1);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}
class Quadtree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }
  subdivide() {
    let {x, y, w, h} = this.boundary;
    let nw = new Rectangle(x - w/4, y - h/4, w/2, h/2);
    let ne = new Rectangle(x + w/4, y - h/4, w/2, h/2);
    let se = new Rectangle(x + w/4, y + h/4, w/2, h/2);
    let sw = new Rectangle(x - w/4, y + h/4, w/2, h/2);
    this.northwest = new Quadtree(nw, this.capacity);
    this.northeast = new Quadtree(ne, this.capacity);
    this.southeast = new Quadtree(se, this.capacity);
    this.southwest = new Quadtree(sw, this.capacity);

    this.divided = true;
  }
  insert(point) {
    if (!this.boundary.contains(point)){
      return;
    }
    if(this.points.length < this.capacity){
      this.points.push(point);
    } else {
        if (!this.divided){
          this.subdivide();
        }
        this.northwest.insert(point);
        this.northeast.insert(point);
        this.southeast.insert(point);
        this.southwest.insert(point);
    }
  }
  display() {
    this.boundary.display();
    for (let p of this.points) {
      p.display();
    }
    if(this.divided){
      this.northwest.display();
      this.northeast.display();
      this.southeast.display();
      this.southwest.display();
    }
  }
}
