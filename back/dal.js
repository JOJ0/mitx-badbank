import db from './dal_connect.js';

console.log("We are running Data Abstraction Layer.")
// console.log(db)



// Clear all data from the users collection
async function db_clear() {
  try {
    let res = await db.collection('users').drop();
    console.log(`db_clear() returns: ${res}`)
    return res;
  }
  catch (err) {
    console.error(`Error in db_clear(): ${err}`);
    return(err);
  }
}

// Fetch a single user and check if it has a matching firebaseUID.
async function db_user_firebase(email, firebaseUID){
  try {
    let res = await db.collection('users').findOne({
      email,
      firebaseUID
    });
    console.log(`db_user_firebase() checking....`);
    if (res == null) {
      console.error(`Email address and firebaseUID combination not found in db_user_firebase(): ${res}`)
    }
    else {
      console.log(`User is existing and has a firebaseUID in db_user_firebase(): ${res}`)
    }
    return res;
  }
  catch (err) {
    console.error(`Error in db_user_firebase(): ${err}`);
    return(err);
  }
}

// Fetch a single user and check if the password is matching.
async function db_user_pass(email, password){
  try {
    let res = await db.collection('users').findOne({
      email: email,
      password: password
    });
    console.log(`db_user_pass() checking....`);
    if (res == null) {
      console.error(`Email address password combination not found in db_user_pass(): ${res}`)
    }
    else {
      console.log(`User is existing in db_user_pass(): ${res}`)
    }
    return res;
  }
  catch (err) {
    console.error(`Error in db_user_pass(): ${err}`);
    return(err);
  }
}

// Fetch a single user
async function db_user(email){
  try {
    let res = await db.collection('users').findOne({email: email});
    console.log(`db_user() successfully returning.`);
    if (res == null) {
      console.error(`Not found in db_user(): ${res}`)
    }
    else {
      console.log(`Success in db_user(): ${res}`)
    }
    return res;
  }
  catch (err) {
    console.error(`Error in db_user(): ${err}`);
    return(err);
  }
}

// Update user's balance
async function db_user_update_balance(email, amount) {
  try {
    let res = await db.collection('users').findOneAndUpdate(
      { email: email},
      { $inc: { balance: parseInt(amount)}},
      { returnNewDocument: true },
    )
    if (res == null) {
      console.error(`Not found in db_user_update_balance():${res}`)
    }
    else {
      console.log(`Success in db_user_update_balance(): ${res}`)
    }
    return res;
  }
  catch (err) {
    console.error(`Error in db_user_update_balance(): ${err}`);
    return(err);
  }
}

// Create user account
async function db_user_create(name, email, password, firebaseUID){
  console.log("db_user_create got: name:", name)
  console.log("db_user_create got: email:", email)
  console.log("db_user_create got: password:", password)
  console.log("db_user_create got: firebaseUID:", firebaseUID)
  let newData;
  if (firebaseUID) {
    newData = {name, email, password, balance: 0, firebaseUID};
  }
  else {
    newData = {name, email, password, balance: 0};
  }
  try {
    let res = await db.collection('users').insertOne(newData);
    console.log(`db_user_create() inserted, id:${res.insertedId}`)
    console.log(`db_user_create() inserted, the whole data object:${res}`)
    return res;
  }
  catch (err) {
    console.error(`Error in db_user_create(): ${err}`);
    return(err);
  }
}

async function db_user_all(){
  try {
    let res = await db.collection('users').find({}).toArray();
    console.log(`db_user_all() successfully returning users array.`);
    return(res);
  }
  catch (err) {
    console.error(`Error in db_user_all(): ${err}`);
    return(err);
  }
}

export { db_user_create, db_user_all, db_user_update_balance, db_user, db_user_pass, db_user_firebase, db_clear };
