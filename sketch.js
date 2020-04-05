const rows = 50;
const cols = 50;
const CHEIGHT = 600;
const CWIDTH = 600;
let cellWidth = CWIDTH / cols;
let cellHeight = CHEIGHT / rows;
//Simulation variables
let oldCells = []
let newCells = []
let transmission = 0.1;
let lethality = 0.05;
let recoveryTime = 10;
let recoveryRate = 0.5;
let currTime = 0;
let fps = 3;


function setup() {
  createCanvas(CWIDTH, CHEIGHT);
  for (let i = 0; i < rows; i++){
    oldCells[i] = [];
    newCells[i] = [];
    for (let j = 0; j < cols; j++){
      let c = new Cell(i, j, true, false, false);
      oldCells[i][j] = c;
      newCells[i][j] = c;
    }
  }
  oldCells[11][11].infected = true;
  frameRate(fps);
}

function draw() {
  background(64);
  //Update cells
  for (let i = 0; i < rows; i++){
    for (let j = 0; j < cols; j++){
      let cell = oldCells[i][j];
      if(cell.alive && !cell.recovered) {
        if(!cell.infected) {
          let neighbors = getNeighbors(cell);
          for (let neighbor of neighbors) {
            if (neighbor.infected && random(1) < transmission){
              cell.infected = true;
              cell.infectionTime = currTime;
            }
          }
        }
        else if (random(1) < recoveryRate && (currTime - cell.infectionTime) >= recoveryTime) {
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

  //Display
  for (let i = 0; i < rows; i++){
    for (let j = 0; j < cols; j++){
      newCells[i][j].display();
    }
  }
  //Swap arrays
  newCells = copyArray(oldCells);
  //
  currTime++;
}

function getNeighbors(cell) {
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
        neighbors.push(oldCells[cell.i+m-1][cell.j+n-1]);
      }
    }
  }
  return neighbors;
}
