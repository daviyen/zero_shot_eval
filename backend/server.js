/**
 * Implementation of an Express Server handling requests and forwarding them to the respective routes.
 * Routes:
 * - /api/ner: Gateway to FastAPI service for zero-shot NER
 * - /api/upload: Uploading annotated data to MongoDB
 * - /api/mongodb_test: for testing local MongoDB integration only (not in use in prod)
 */
const express = require("express");
const app = express();
const nerRouter = require("./routes/ner");
const importRouter = require("./routes/import");
//const testRouter = require("./routes/mongodb_test");
const uploadRouter = require("./routes/upload");
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND || "http://localhost:5173";

app.use(express.json());
// Enable CORS for requests from the frontend (https://www.npmjs.com/package/cors)
app.use(cors({
  origin: FRONTEND,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use('/api', nerRouter);
//app.use('/api', testRouter);
app.use('/api', uploadRouter);
app.use('/api', importRouter);
app.listen(PORT, () => console.log("Server listening on port: 3000"));
