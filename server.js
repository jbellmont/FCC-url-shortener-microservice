require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const ShortenedURL = require("./model/ShortenedURL");

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
// Validation.
// Reject URLs that have already been added.
// Respond with the existing shortened URL if so.
app.post("/api/shorturl", function (req, res) {
  const submittedURL = req.body.url;

  // Returns a number between 1 - 9999.
  const randomID = Math.floor(Math.random() * (9999 - 1)) + 1;

  const newURL = new ShortenedURL({
    shortened_id: randomID,
    url: submittedURL,
  });
  newURL.save();

  res.json({ original_url: submittedURL, short_url: randomID });
});

// Port to listen to requests.
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

// Requirements.
// You can POST a URL to /api/shorturl and get a JSON response with original_url
// and short_url properties. Here's an example:
// { original_url : 'https://freeCodeCamp.org', short_url : 1}

// When you visit /api/shorturl/<short_url>, you will be redirected to the
// original URL.

// If you pass an invalid URL that doesn't follow the valid
// http://www.example.com format, the JSON response will contain
// { error: 'invalid url' }

// HINT: Do not forget to use a body parsing middleware to handle the POST
// requests.
// Also, you can use the function dns.lookup(host, cb) from the dns core module
// to verify a submitted URL.
