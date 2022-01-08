require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const dns = require("dns");
const { URL } = require("url");
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
// Reject URLs that have already been added.
// Respond with the existing shortened URL if so.
app.post("/api/shorturl", function (req, res) {
  const submittedURL = req.body.url;
  const parsedLookupURL = new URL(submittedURL);

  // Validate URL.
  dns.lookup(
    parsedLookupURL.protocol ? parsedLookupURL.host : parsedLookupURL.path,
    (error, address) => {
      if (error || !address) {
        console.error(error);
        res.json({ error: "invalid url" });
      } else {
        // Returns a number between 1 - 9999.
        const randomID = Math.floor(Math.random() * (9999 - 1)) + 1;

        const newURL = new ShortenedURL({
          shortened_id: randomID,
          url: submittedURL,
        });
        newURL.save();

        res.json({ original_url: submittedURL, short_url: randomID });
      }
    }
  );
});

// Port to listen to requests.
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

// Requirements.
// When you visit /api/shorturl/<short_url>, you will be redirected to the
// original URL.
