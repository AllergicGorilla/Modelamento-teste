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
let transmission = 0.1;
let lethality = 0.05;
let recoveryTime = 10;
let recoveryRate = 0.5;

class CellMatrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.oldCells = []
    this.newCells = []
    this.currTime = 0;
    for (let i = 0; i < rows; i++){
      this.oldCells[i] = [];
      this.newCells[i] = [];
      for (let j = 0; j < cols; j++){
        let c = new Cell(i, j, true, false, false);
        this.oldCells[i][j] = c;
        this.newCells[i][j] = c;
      }
    }
    this.oldCells[11][11].infected = true;
  }
  stepForward() {
    //Update cells
    for (let i = 0; i < rows; i++){
      for (let j = 0; j < cols; j++){
        let cell = this.oldCells[i][j];
        if(cell.alive && !cell.recovered) {
          if(!cell.infected) {
            let neighbors = this.getNeighbors(cell);
            for (let neighbor of neighbors) {
              if (neighbor.infected && random(1) < transmission){
                cell.infected = true;
                cell.infectionTime = this.currTime;
              }
            }
          }
          else if (random(1) < recoveryRate && (this.currTime - cell.infectionTime) >= recoveryTime) {
            cell.recovered = true;
            cell.infected = false;
          }
          else if (random(1) < lethality) {
            cell.recovered = false;
            cell.infected = false;
            cell.alive = false;
          }
        }

      }
    }
    //Swap arrays
    this.newCells = copyArray(this.oldCells);
    this.currTime++;
  }
  getNeighbors(cell) {
    let testVicinity = [];
    let neighbors = [];
    //i = m - 1; j = n - 1;
    for (let m = 0; m < 3; m++){
      testVicinity[m] = [];
      for (let n = 0; n < 3; n++){
        testVicinity[m][n] = true;
      }
    }
    if (cell.i == 0) {
      testVicinity[0][0] = false;
      testVicinity[0][1] = false;
      testVicinity[0][2] = false;
    }
    else if (cell.i == rows-1) {
      testVicinity[2][0] = false;
      testVicinity[2][1] = false;
      testVicinity[2][2] = false;
    }
    if (cell.j == 0) {
      testVicinity[0][0] = false;
      testVicinity[1][0] = false;
      testVicinity[2][0] = false;
    }
    else if (cell.j == cols-1) {
      testVicinity[0][2] = false;
      testVicinity[1][2] = false;
      testVicinity[2][2] = false;
    }
    testVicinity[1][1] = false;
    for (let m = 0; m < 3; m++){
      for (let n = 0; n < 3; n++){
        if (testVicinity[m][n]) {
          neighbors.push(this.oldCells[cell.i+m-1][cell.j+n-1]);
        }
      }
    }
    return neighbors;
  }
  display() {
    //Display
    for (let i = 0; i < rows; i++){
      for (let j = 0; j < cols; j++){
        this.newCells[i][j].display();
      }
    }
  }
  countCells(conditionFunction) {
    let count = 0;
    for (let i = 0; i < rows; i++){
      for (let j = 0; j < cols; j++){
        if(conditionFunction(this.newCells[i][j]))
          count++;
      }
    }
    return count;
  }
}
