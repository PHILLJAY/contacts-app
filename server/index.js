require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://philipjasionowski:${password}@contactappcluster.pwqh3ff.mongodb.net/?retryWrites=true&w=majority&appName=contactAppCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    console.log("Attempting to ping deployment")
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
