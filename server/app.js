require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://philipjasionowski:${password}@contactappcluster.pwqh3ff.mongodb.net/contactsDB/?retryWrites=true&w=majority&appName=contactAppCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();

client
  .connect()
  .then(() => {
    console.log("Connected successfully to the database!");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

app.get("/api/people", async (req, res) => {
  try {
    const database = client.db("contactsDB");
    const collection = database.collection("people");
    const people = await collection.find().toArray();

    if (people.length === 0) {
      res.status(404).json({ error: "No data found" }); // Send 404 if empty
    } else {
      res.json(people); // Send the data if found
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Something went wrong" }); // Server-side error
  }
});

app.listen(3001, () => console.log("Server listening on port 3001"));

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
