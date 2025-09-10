// Implementation of an Express Server handling requests and forwarding them to the respective route
const express = require("express");
const app = express();
const nerRouter = require("./routes/ner");
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
app.use('/api', nerRouter);
app.listen(PORT, () => console.log("Server listening on port: 3000"));