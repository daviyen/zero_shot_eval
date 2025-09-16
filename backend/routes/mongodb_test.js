const express = require("express");
/**
 * MongoDB Test Router
 * Tests the connection to the MongoDB database.
 */
const router = express.Router();
require('dotenv').config();
const { MongoClient } = require("mongodb");
const MONGODB = process.env.MONGODB || "";
const DBNAME = process.env.DBNAME || "";
const TEST_COLLECTION = process.env.TEST_COLLECTION || "";

async function connectToMongoDB() {
    const client = new MongoClient(MONGODB);
    await client.connect();
    return client.db(DBNAME);
}

/**
 * THIS IS JUST A TEST ROUTE TO CHECK IF MONGODB IS CONNECTED PROPERLY.
 * IGNORE
 */
router.get("/db-test", async (req, res) => {
    try {
        // wait for DB connection
        const db = await connectToMongoDB();
        // seach for test collection
        const testData = db.collection(TEST_COLLECTION);
        // insert test data to test collection with attributes name and text (as JSON)
        await testData.insertOne({ name: "This", text: "is working!" });
        // returns an filtered array containing only the test data with text "is working!"
        const data = await testData.find({text: "is working!"}).toArray();
        // return parsed JSON data
        res.json(data);
    } catch (error) {
        console.error("ERROR MongoDB test Router: ", error);
    }
});
module.exports = router;
