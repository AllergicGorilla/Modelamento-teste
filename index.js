const express = require('express')

//Create server
const app = express();
app.listen(3000, ()=>console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
