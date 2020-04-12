const express = require('express');
const {PythonShell} = require('python-shell');


//Create server
const app = express();
app.listen(3000, ()=>console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

//Python integration
app.get('/coronasim', call_CoronaSim);

function call_CoronaSim(request, response) {
  const options = {
    args: []
  }
  PythonShell.run('./main.py', options, (err, data) => {
    if (err) console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.json(JSON.parse(data));
  });
}
