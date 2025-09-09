// Implementation of an Express Server handling requests and forwarding them to the respective route
const express = require("express");
const app = express();
const nerRouter = require("./routes/ner");
const cors = require("cors");

app.use(express.json());
// Enable CORS for requests from the frontend (https://www.npmjs.com/package/cors)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use('/api', nerRouter);
app.listen(3000, () => console.log("Server listening on port: 3000"));