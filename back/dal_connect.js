import { MongoClient, ServerApiVersion } from "mongodb";
import 'dotenv/config';
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}+@termbank.lp2lbop.mongodb.net/?retryWrites=true&w=majority&appName=termbank`
console.log("Debug dotenv on Heroku:", process.env)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);


let conn;
try {
  conn = await client.connect();
  var reply = await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB! Reply was:");
  console.log(reply);
} catch(e) {
  console.error(e);
}
let db = conn.db("myproject");


export default db;