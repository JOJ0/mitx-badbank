var express = require('express');
var app = express();
var cors = require('cors');

app.use(express.static('public'));
app.use(cors());

// Create user account route
app.get('/account/create/:name/:email/:password', (req, res) => {
  res.send({
    name: req.params.name,
    email: req.params.email,
    password: req.params.password
  })
})


// List all accounts route
app.get('/account/all', (req, res) => {
  res.send({
    name: 'Peter',
    email: 'peter@mit.edu',
    password: 'secret'
  })
})

var port = 3000;
app.listen(port);
console.log('Running on port ' + port);