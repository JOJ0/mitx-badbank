import db from './dal_connect.js';

console.log("We are running Data Abstraction Layer.")
// console.log(db)

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
    console.log(`db_user_all() returning data ${res}`);
    return(res);
  }
  catch (err) {
    console.error(`Error in db_user_all(): ${err}`);
    return(err);
  }
}

export { db_user_create, db_user_all };