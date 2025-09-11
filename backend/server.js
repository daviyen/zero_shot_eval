// Implementation of an Express Server handling requests and forwarding them to the respective route
const express = require("express");
const app = express();
const nerRouter = require("./routes/ner");
const testRouter = require("./routes/mongodb_test");
const cors = require("cors");

//  require .env
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND || "http://localhost:5173";

app.use(express.json());
// Enable CORS for requests from the frontend (https://www.npmjs.com/package/cors)
app.use(cors({
  origin: FRONTEND,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
// Use route for zero-shot NER
app.use('/api', nerRouter);
// Use test route for testing local MongoDB integration
app.use('/api', testRouter);
app.listen(PORT, () => console.log("Server listening on port: 3000"));
