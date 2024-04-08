import express from 'express';
import cors from 'cors';
import { db_user_create, db_user_all, db_user_update_balance, db_user } from './dal.js';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from 'swagger-ui-express';

// Initialize express API
var app = express();
app.use(express.static('public'));
app.use(cors());

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
 * /account/details/:email:
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

// Update user's balance route
app.get('/account/update_balance/:email/:amount', async (req, res) => {
  try {
    let updatedUser = await db_user_update_balance(req.params.email, req.params.amount)
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


// Create user account route
app.get('/account/create/:name/:email/:password', async (req, res) => {
  try {
    let newUser = await db_user_create(req.params.name, req.params.email, req.params.password)
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
      "msg": `Database error in /account/create endpoint: ${err}`,
    }
    console.error(msg);
    res.send(msg).status(500);
  }
})


// List all accounts route
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