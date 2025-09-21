/**
 * Implementation of the /ner route (https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes#defining_and_using_separate_route_modules) 
 * which forwards requests to the FastAPI service on port 8000
*/
const express = require("express");
const router = express.Router();
const axios = require("axios");
require('dotenv').config();
const FASTAPI = process.env.FASTAPI || "http://localhost:8000/ner";

/**
 * When receiving a POST request under /ner, forward it to the FastAPI backend
 * which is responsible for running the zero-shot NER
*/
router.post("/ner", async (req, res) => {
    //console.log("Request Body:", req.body);
    try {
        // Async POST request for zero-shot NER to FastAPI backend so it doesnt block other actions
        const response = await axios.post(FASTAPI, req.body);
        console.log("FastAPI response:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("BACKEND ERROR: ", error.message);
    }
});
module.exports = router;