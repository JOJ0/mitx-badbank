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
var db = connect();  // instantiate to something

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
  // finally {
  //   // Ensures that the client will close when you finish/error
  //   await client.close();
  // }
}
module.exports = {db};