const db = require("./dal_connect.js");
console.log("We are running Data Abstraction Layer.")
console.log(db)

// Create user account
async function create(name, email, password){
    await client.connect();
    db = client.db('myproject');
    const newData = {name, email, password, balance: 0};
    res = await db.collection('users').insertOne(newData);
    console.log(`Document inserted, id:${res.insertedId}`)
    return res;
}

// Return all users
async function all_old(){
    await client.connect();
    db = client.db('myproject');
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})  // No criteria == all
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

async function all(){
  // await client.connect();
  // db = client.db('myproject');
  var collection = await db.collection('users');
  try {
    res = collection.find({}).toArray();
    console.log(`dal.all() returning data ${res}`);
    return(res);
  }
  catch (err) {
    console.error(`Something went wrong: ${err}`);
    return(err);
  }
}

module.exports = {create, all};