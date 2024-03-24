var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

app.use(express.static('public'));
app.use(cors());

async function create_user(req) {
  result = await dal.create(req.params.name, req.params.email, req.params.password)
  return result;
}

// Create user account route
app.get('/account/create/:name/:email/:password', (req, res) => {
  try {
    newUser = create_user(req);
    msg = `Created new user: ${newUser}`
    console.log(msg);
    res.send(msg);
  }
  catch (err) {
    console.error(`Error while creating user: ${err}`);
    return(err);
  }
})


// List all accounts route
app.get('/account/all', (req, res) => {
  dal.all()
    .then((documents) => {
      console.log('/account/all endpoint returning data.');
      res.send(documents);
    })
})

var port = 3000;
app.listen(port);
console.log('Running on port ' + port);