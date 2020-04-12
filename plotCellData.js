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
