require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const controllers = require("./resources/shorturl/controllers");

// Basic configuration.
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(
  () => console.log("Connected to MongoDB"),
  () => {
    console.error("Could not connect to MongoDB");
  }
);

// Middleware.
app.use(cors());
app.use(express.json());

// Static file path.
app.use("/public", express.static(`${process.cwd()}/public`));
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// API endpoints.
// TODO:
// Handler for GET requests.
app.get("/api/shorturl", () => {});

// TODO:
// Reject URLs that have already been added.
// Respond with the existing shortened URL if so.
app.post("/api/shorturl", controllers.createNewURL);

// Port to listen to requests.
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

// Requirements.
// When you visit /api/shorturl/<short_url>, you will be redirected to the
// original URL.
