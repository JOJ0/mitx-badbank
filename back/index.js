import express from 'express';
import cors from 'cors';
import { db_user_create, db_user_all, db_user_update_balance, db_user } from './dal.js';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';

// Initialize express API
var app = express();
app.use(express.static('public'));
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
 * /account/:email:
 *   get:
 *     summary: Retrieve a single user.
 *     description: Retrieve details of a single user account.
*/
app.get('/account/details/:email', async (req, res) => {
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
 * /account/:email:
 *   post:
 *     summary: Create a user account.
 *     description: Create a new user account. Pass string fields "name",
 *                  "email", "password" in the request body.
*/
app.post('/account/', async (req, res) => {
  if (! req.body.email || ! req.body.password) {
    let msg = {
      "msgType": "error",
      "msg": `Error in /account/ endpoint while trying to create new user: Missing data.`,
    }
    console.error(msg);
    res.send(msg).status(500);
    return
  }
  try {
    let newUser = await db_user_create(req.body.name, req.body.email, req.body.password)
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
 * /account/all:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of all existing users. No pagination is
 *                  implemented.
*/
app.get('/account/all', async (req, res) => {
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
      "msg": `Database error in /account/all endpoint: ${err}`
    }
    console.error(msg);
    res.send(msg).status(500);
  }
})

var port = 3000;
app.listen(port);
console.log('Running on port ' + port);