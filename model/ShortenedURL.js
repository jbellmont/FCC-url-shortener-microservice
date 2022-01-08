const mongoose = require("mongoose");

const urlShortenerSchema = new mongoose.Schema({
  shortened_id: Number,
  url: String,
});

module.exports = mongoose.model("url", urlShortenerSchema);
