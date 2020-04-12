const express = require('express');
const {PythonShell} = require('python-shell');


//Create server
const app = express();
app.listen(3000, ()=>console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '10mb'}));

//Python integration
app.post('/coronasim', call_CoronaSim);

function call_CoronaSim(request, response) {
  const req_body = request.body
  const options = {
    args: [req_body.iterations,
           req_body.num_people,
           req_body.width,
           req_body.height]
  }
  PythonShell.run('./main.py', options, (err, data) => {
    if (err) console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.json(JSON.parse(data));
  });
}
