import express from 'express';
import cors from 'cors';
import { db_user_create, db_user_all } from './dal.js';

var app = express();
app.use(express.static('public'));
app.use(cors());

async function create_user(req) {
  result = await db_user_create(req.params.name, req.params.email, req.params.password)
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