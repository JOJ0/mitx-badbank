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

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    var reply = await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB! Reply was:");
    console.log(reply);
    // Instantiate a db object
    const db = client.db('myproject');
    // Generate some test data
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';
    var document = {name, email};
    // Insert into customer collection
    console.log('Trying to insert data into "customer" collection...');
    var collection = db.collection('customers');
    await collection.insertOne(document, {w:1}, function(err, result) {
      console.log(err);
    });
    // Read all data from the collection
    console.log('Trying to read back data from DB...');
    var customers = await collection.find().toArray();
    console.log('Collection:', customers);
  }
  catch(err) {
    console.log(`We caught an error in our main function run(): ${err}.`);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// Just run the async function...
run();

