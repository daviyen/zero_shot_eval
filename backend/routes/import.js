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

router.get("/import", async(req, res) => {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection(COLLECTION);
        const data = collection.find({});
        //console.log("Importing files from DB...");
        res.json(await data.toArray());
    } catch (error) {
        res.status(500).json("Something went wrong: " + error.message);
    }
});

module.exports = router;