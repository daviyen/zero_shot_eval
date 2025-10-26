const express = require("express");
const router = express.Router();
require('dotenv').config();
const { MongoClient } = require("mongodb");

const MONGODB = process.env.MONGODB || "";
const DBNAME = process.env.DBNAME || "";
const COLLECTION = process.env.COLLECTION || "";

async function connectToMongoDB() {
    console.log("Connecting to MongoDB with URI:", MONGODB);
    const client = new MongoClient(MONGODB);
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(DBNAME);
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        throw err;
    }
}

/** Import data from MongoDB 
 * GET request returns all documents from the Database.
*/
router.get("/import", async(req, res) => {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection(COLLECTION);
        const data = collection.find({});
        res.json(await data.toArray());
    } catch (error) {
        console.error("MongoDB connection error:", error);
        res.status(500).json("Something went wrong: " + error.message);
    }
});

module.exports = router;