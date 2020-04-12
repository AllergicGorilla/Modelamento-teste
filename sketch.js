const rows = 100;
const cols = 100;
const CHEIGHT = 600;
const CWIDTH = 600;
let cellWidth = CWIDTH / cols;
let cellHeight = CHEIGHT / rows;
//Simulation variables
let matrix;
let fps = 2;


function setup() {
  createCanvas(CWIDTH, CHEIGHT);
  matrix = new CellMatrix(rows, cols);
  frameRate(fps);
}

function draw() {
  background(64);

  matrix.stepForward();
  matrix.display();
  const susceptible = matrix.countCells(x => x.alive && !x.infected && !x.recovered)
  const infected = matrix.countCells(x => x.alive && x.infected && !x.recovered)
  const dead = matrix.countCells(x => !x.alive)
  const recovered = matrix.countCells(x => x.alive && !x.infected && x.recovered)
  chart1.data.labels.push("")
  chart1.data.datasets[0].data.push(susceptible)
  chart1.data.datasets[1].data.push(infected)
  // C2
  chart2.data.labels.push("")
  chart2.data.datasets[0].data.push(susceptible)
  chart2.data.datasets[1].data.push(infected)
  chart2.data.datasets[2].data.push(dead)
  chart2.data.datasets[3].data.push(recovered)
  chart1.update()
  chart2.update()
  document.getElementById('susceptible').textContent = susceptible
  document.getElementById('infected').textContent = infected
  document.getElementById('dead').textContent = dead
  document.getElementById('recovered').textContent = recovered

}
