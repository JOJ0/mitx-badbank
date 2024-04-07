import db from './dal_connect.js';

console.log("We are running Data Abstraction Layer.")
// console.log(db)

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
async function db_user_create(name, email, password){
  try {
    const newData = {name, email, password, balance: 0};
    let res = await db.collection('users').insertOne(newData);
    console.log(`db_user_create() inserted, id:${res.insertedId}`)
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

export { db_user_create, db_user_all, db_user_update_balance, db_user };
