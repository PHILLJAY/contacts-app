require("dotenv").config();
const express = require('express')
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

const app = express()


app.get('/api/people', async (req, res) => {
  const collection = database.collection('people');
  const people = await collection.find().toArray();
  res.json(people); 
});


// Below is code to add a file to server, will be used later
// async function run() {
//   try {
//     console.log("Attempting to ping deployment")
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }


app.listen(3001, () => console.log('Server listening on port 3001'));
