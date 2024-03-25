import express from 'express';
import cors from 'cors';
import { db_user_create, db_user_all } from './dal.js';

var app = express();
app.use(express.static('public'));
app.use(cors());


// Create user account route
app.get('/account/create/:name/:email/:password', async (req, res) => {
  try {
    let newUser = await db_user_create(req.params.name, req.params.email, req.params.password)
    let msg = `/account/create endpoint created new user: ${newUser}`
    console.log(msg);
    res.send(msg).status(200);
  }
  catch (err) {
    let msg = `Error in /account/create endpoint: ${err}`
    console.error(msg);
    res.send(msg).status(500);
  }
})


// List all accounts route
app.get('/account/all', async (req, res) => {
  try {
    let result = await db_user_all();
    console.log('/account/all endpoint is returning data...');
    res.send(result).status(200);
  }
  catch (err) {
    console.error(`Error in /account/all endpoint: ${err}`);
    return(err);
  }
})

var port = 3000;
app.listen(port);
console.log('Running on port ' + port);