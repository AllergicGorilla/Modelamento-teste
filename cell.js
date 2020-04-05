class Cell {
  //i: linha, j: coluna
  constructor(i, j, alive, infected, recovered) {
    this.i = i;
    this.j = j;
    this.alive = alive;
    this.infected = infected;
    this.recovered = recovered;
    this.infectionTime = 0;
  }
  display() {
    if (this.alive){
      if (this.infected) fill('red');
      else fill('green');
    }
    else {
      fill('gray');
    }
    if (this.recovered) {
      fill(255, 204, 0);//yellow
    }
    strokeWeight(0.5);
    stroke(255);
    rect(cellWidth*this.j, cellHeight*this.i, cellWidth, cellHeight);
  }
}
