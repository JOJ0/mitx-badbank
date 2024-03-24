const { MongoClient, ServerApiVersion } = require("mongodb");
// FIXME, not sure if these timeout strings actually work
const uri = 'mongodb://localhost:27017?connectTimeoutMS=1000&socketTimeoutMS=1000';  // ?directConnection=true
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);
var db = null;  // instantiate to something
console.log("We are running Data Abstraction Layer.")

// Test connection and get db handle
async function connect() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    var reply = await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB! Reply was:");
    console.log(reply);
    // Instantiate a db object
    db = client.db('myproject');
    return db;
  }
  catch(err) {
    console.log(`We caught an error in our main function run(): ${err}.`);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


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
  await client.connect();
  db = client.db('myproject');
  var collection = db.collection('users');
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