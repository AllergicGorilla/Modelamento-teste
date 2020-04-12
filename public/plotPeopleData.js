let py_chart_ctx = document.getElementById('pythonPlotSim').getContext('2d');
let py_chart = new Chart(py_chart_ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets:
        [{
            label: '# Infectados(I)',
            data: [],
            backgroundColor:
                'rgba(255, 99, 132, 1)',
            borderColor:
                'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: '# Finalizados(R)',
            data: [],
            backgroundColor:
                'rgba(100, 100, 255, 1)',
            borderColor:
                'rgba(100, 100, 255, 1)',
            borderWidth: 1
        },
        {
            label: '# Vulneráveis(S)',
            data: [],
            backgroundColor:
                'rgba(23, 155, 88, 1)',
            borderColor:
                'rgba(23, 155, 88, 1)',
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
