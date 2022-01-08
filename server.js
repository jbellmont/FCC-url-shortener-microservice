require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Static file path.
app.use("/public", express.static(`${process.cwd()}/public`));
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// API endpoints.
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
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
