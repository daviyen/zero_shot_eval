/**
 * Upload Route which handles file upload requests and stores them in a MongoDB.
 */
const express = require("express");
const router = express.Router();
require('dotenv').config();
const { MongoClient } = require("mongodb");

const MONGODB = process.env.MONGODB || "";
const DBNAME = process.env.DBNAME || "";
const COLLECTION = process.env.COLLECTION || "";

async function connectToMongoDB() {
    const client = new MongoClient(MONGODB);
    await client.connect();
    return client.db(DBNAME);
}

/**
 * Receives a file upload request and stores the file in MongoDB.
 * Expects a JSON body with the file data.
 */
router.post("/upload", async (req, res) => {
  try {
    //console.log("Received upload request: ", req.body);
    const db = await connectToMongoDB();
    //console.log("Connected to MongoDB");
    const collection = db.collection(COLLECTION);
    //console.log("Inserting document... ", req.body);
    const result = await collection.insertOne(req.body);
    //console.log("Upload result: ", result);
    res.json({ message: "Upload successful", result });
  } catch (error) {
    //console.error("Upload error: ", error);
    res.status(500).json("Something went wrong: " + error.message);
  }
});

module.exports = router;