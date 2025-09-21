/**
 * Route to save a file to the system.
 * Expects a JSON body with the file data.
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

router.post("/save", async(req, res) => {
    console.log("Received save request with body: ", req.body);
    try {
        const db = await connectToMongoDB();
        const collection = db.collection(COLLECTION);
        const { filename, content } = req.body;
        if(!filename) {
            console.log("TODO: Handle missing filename when user creating new File...");
            res.status(400).json("ERROR: Missing filename");
            return;
        }
        const { _id, ...remainingContent } = content; //exclude _id
        //console.log("Saving file: " + filename);
        const result = await collection.updateOne(
            { filename },
            { $set: { ...remainingContent, filename } },
            { upsert: true }
        );
        res.json({ message: "Save successful", result });
    } catch (error) {
        console.error("Error when saving file to system: " + error);
        res.status(500).json( "ERROR: " + error.message );
    }
})

module.exports = router;