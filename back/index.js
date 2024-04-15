import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("DEBUG __filename, it is:", __filename)
console.log("DEBUG __dirname, it is:", __dirname)

import 'dotenv/config';
import cors from 'cors';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';

import { db_user_create, db_user_all, db_user_update_balance, db_user, db_user_pass, db_user_firebase, db_clear } from './dal.js';


// Initialize express API
var app = express();
app.use(cors());
// Support POST requests
app.use(bodyParser.json())

// Set up swagger API docs
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Express API for the MITx MERN course capstone project "TermBank"',
        version: '1.0.0',
      },
    },
    apis: ['./back/index.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


/**
 * @swagger
 * /accounts/clear:
 *   delete:
 *     summary: Clears all user data.
 *     description: Deletes all data from user collection. Experimental endpoint. Currently unprotected. FIXME
*/
app.delete('/accounts/clear', async (req, res) => {
  console.log("/accounts/clear endpoint active."); 
  try {
    let cleared = await db_clear();
    let msg = {
        "msgType": "success",
        "msg": "User collection cleared.",
        "data": cleared,
      }
      console.log(msg);
      res.send(msg).status(200);
  }
  catch (err) {
    let msg = {
      "msgType": "error",
      "msg": `Database error in /accounts/clear endpoint: ${err}`,
    }
    console.error(msg);
    res.send(msg).status(500);
  }
})


/**
 * @swagger
 * /account/firebaselogin:
 *   post:
 *     summary: Check for an existing email and Firebase UID combination.
 *     description: Login to a Firebase user account. Pass "email", and "firebaseUID" in the request body.
*/
app.post('/account/firebaselogin', async (req, res) => {
  console.log("Endpoint got body:", req.body)
  if (! req.body.firebaseEmail || ! req.body.firebaseUID) {
    let msg = {
      "msgType": "error",
      "msg": `Error in /account/firebaselogin endpoint while trying to login: Missing data.`,
    }
    console.error(msg);
    res.send(msg).status(500);
    return
  }
  try {
    let loggedInUser = await db_user_firebase(req.body.firebaseEmail, req.body.firebaseUID)
    let msg;
    if (loggedInUser == null) {
      msg = {
        "msgType": "error",
        "msg": "User and Firebase UID combination NOT existing. Deny login.",
        "data": null,
      }
      console.log(msg);
      res.send(msg).status(401);
    }
    else
    {
      msg = {
        "msgType": "success",
        "msg": "User and password combination existing. Allow login.",
        "data": loggedInUser,
      }
      console.log(msg);
      res.send(msg).status(200);
    }
  }
  catch (err) {
    let msg = {
      "msgType": "error",
      "msg": `Database error in /account/firebaselogin endpoint while trying to request user: ${err}`,
    }
    console.error(msg);
    res.send(msg).status(500);
  }
})


/**
 * @swagger
 * /account/login:
 *   post:
 *     summary: Login to a user account.
 *     description: Login to an already existing user account. Pass "email", and "password" in the request body.
*/
app.post('/account/login', async (req, res) => {
  if (! req.body.email || ! req.body.password) {
    let msg = {
      "msgType": "error",
      "msg": `Error in /account/login endpoint while trying to login: Missing data.`,
    }
    console.error(msg);
    res.send(msg).status(500);
    return
  }
  try {
    let loggedInUser = await db_user_pass(req.body.email, req.body.password)
    let msg;
    if (loggedInUser == null) {
      msg = {
        "msgType": "error",
        "msg": "User and password combination NOT existing. Deny login.",
        "data": null,
      }
      console.log(msg);
      res.send(msg).status(401);
    }
    else
    {
      msg = {
        "msgType": "success",
        "msg": "User and password combination existing. Allow login.",
        "data": loggedInUser,
      }
      console.log(msg);
      res.send(msg).status(200);
    }
  }
  catch (err) {
    let msg = {
      "msgType": "error",
      "msg": `Database error in /account/login endpoint while trying to request user: ${err}`,
    }
    console.error(msg);
    res.send(msg).status(500);
  }
})


/**
 * @swagger
 * /account/:email:
 *   get:
 *     summary: Retrieve a single user.
 *     description: Retrieve details of a single user account.
*/
app.get('/account/:email', async (req, res) => {
  try {
    let fetchedUser = await db_user(req.params.email)
    let msg;
    if (fetchedUser == null) {
      msg = {
        "msgType": "error",
        "msg": "Can't fetch user details (user not found).",
        "data": fetchedUser,
      }
    }
    else {
      msg = {
        "msgType": "success",
        "msg": "Fetched details for user.",
        "data": fetchedUser,
      }
    }
    console.log(msg);
    res.send(msg).status(200);
  }
  catch (err) {
    let msg = {
      "msgType": "error",
      "msg": `Database error in /account/details endpoint: ${err}`,
    }
    console.error(msg);
    res.send(msg).status(500);
  }
})


/**
 * @swagger
 * /account/update_balance/:email:
 *   put:
 *     summary: Update a users account balance.
 *     description: Update a user's account balance. Pass a field "amount" as a
 *                  number in the request body. Use a negative number for decrements.
*/
app.put('/account/update_balance/:email', async (req, res) => {
  if (! req.body.amount) {
    let msg = {
      "msgType": "error",
      "msg": `Error in /account/update_balance endpoint. Amount missing or zero.`,
    }
    console.error(msg);
    res.send(msg).status(500);
    return
  }
  else if (! Number(req.body.amount)) {
    let msg = {
      "msgType": "error",
      "msg": `Error in /account/update_balance endpoint. Amount is not a number.`,
    }
    console.error(msg);
    res.send(msg).status(500);
    return
  }
  try {
    let updatedUser = await db_user_update_balance(req.params.email, req.body.amount)
    let msg;
    if (updatedUser == null) {
      msg = {
        "msgType": "error",
        "msg": "Can't update balance (user not found).",
        "data": updatedUser,
      }
    }
    else {
      msg = {
        "msgType": "success",
        "msg": "Updated user's balance.",
        "data": updatedUser,
      }
    }
    console.log(msg);
    res.send(msg).status(200);
  }
  catch (err) {
    let msg = {
      "msgType": "error",
      "msg": `Database error in /account/update_balance endpoint: ${err}`,
    }
    console.error(msg);
    res.send(msg).status(500);
  }
})


/**
 * @swagger
 * /account:
 *   post:
 *     summary: Create a user account.
 *     description: Create a new user account. Pass string fields "name",
 *                  "email", "password" in the request body.
*/
app.post('/account/', async (req, res) => {
  console.log("/account endpoint got:", req.body)
  if ((! req.body.email || ! (req.body.password || req.body.firebaseUID))) {
    let msg = {
      "msgType": "error",
      "msg": `Error in /account/ endpoint while trying to create new user: Missing data. Either email/password or email/firebaseUID is required`,
    }
    console.error(msg);
    res.send(msg).status(500);
    return
  }


  try {
    let newUser = await db_user_create(req.body.name, req.body.email, req.body.password, req.body.firebaseUID)
    let msg = {
      "msgType": "success",
      "msg": "Created user.",
      "data": newUser,
    }
    console.log(msg);
    res.send(msg).status(200);
  }
  catch (err) {
    let msg = {
      "msgType": "error",
      "msg": `Database error in /account/ endpoint while trying to create new user: ${err}`,
    }
    console.error(msg);
    res.send(msg).status(500);
  }
})


/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of all existing users. No pagination is
 *                  implemented.
*/
app.get('/accounts', async (req, res) => {
  try {
    let result = await db_user_all();
    let msg = {
      "msgType": "success",
      "msg": "Returning all users.",
      "data": result,
    }
    console.log(msg);
    res.send(msg).status(200);
  }
  catch (err) {
    let msg = {
      "msgType": "error",
      "msg": `Database error in /accounts endpoint: ${err}`
    }
    console.error(msg);
    res.send(msg).status(500);
  }
})


// app.use(express.static(path.join(__dirname, 'front/dist')));
let joinedPath = path.join(__dirname, 'front/dist')
console.log("DEBUG joinedPath:", joinedPath)
app.use(express.static(joinedPath));

let joinedPathPlus = path.join(__dirname + 'front/dist')
console.log("DEBUG joinedPath concat with plus character:", joinedPathPlus)
app.get('*', (req, res) => {
  res.sendFile(joinedPathPlus);
  // res.sendFile(path.join(__dirname + 'front/dist'));
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Running on port ' + port);

