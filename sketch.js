const rows = 50;
const cols = 50;
const CHEIGHT = 600;
const CWIDTH = 600;
let cellWidth = CWIDTH / cols;
let cellHeight = CHEIGHT / rows;
//Simulation variables
let matrix;
let fps = 2;

let ctx1 = document.getElementById('chart1').getContext('2d');
let chart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '# Vulneráveis',
            data: [],
            fill: false,
            backgroundColor:
                'rgba(23, 155, 88, 0.2)',
            borderColor:
                'rgba(23, 155, 88, 1)',
            borderWidth: 1
        },
        {
            label: '# Infectados',
            data: [],
            fill: false,
            backgroundColor:
                'rgba(255, 99, 132, 0.2)',
            borderColor:
                'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
              gridLines: {
                  display:false
              }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        elements: {
            point:{
              radius: 0
          }
        },
        responsive: false
    }
});
let ctx2 = document.getElementById('chart2').getContext('2d');
let chart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '# Vulneráveis',
            data: [],
            backgroundColor:
                'rgba(23, 155, 88, 1)',
            borderColor:
                'rgba(23, 155, 88, 1)',
            borderWidth: 1
        },
        {
            label: '# Infectados',
            data: [],
            backgroundColor:
                'rgba(255, 99, 132, 1)',
            borderColor:
                'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: '# Mortos',
            data: [],
            backgroundColor:
                'rgba(100, 100, 100, 1)',
            borderColor:
                'rgba(100, 100, 100, 1)',
            borderWidth: 1
        },
        {
            label: '# Recuperados',
            data: [],
            backgroundColor:
                'rgba(255, 204, 0, 1)',
            borderColor:
                'rgba(255, 204, 0, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
              gridLines: {
                  display:false
              }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                stacked: true
            }]
        },
        elements: {
            point:{
              radius: 0
          }
        },
        responsive: false
    }
});
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
