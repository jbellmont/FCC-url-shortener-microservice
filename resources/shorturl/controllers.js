const dns = require("dns");
const { URL } = require("url");
const ShortenedURL = require("../../model/ShortenedURL");

function createNewURL(req, res) {
  const submittedURL = req.body.url;
  const parsedLookupURL = new URL(submittedURL);

  // Validate URL.
  dns.lookup(
    parsedLookupURL.protocol ? parsedLookupURL.host : parsedLookupURL.path,
    (error, address) => {
      if (error || !address) {
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
}

function getShortenedURL(req, res, error) {
  const requestedID = req.params.url;
  ShortenedURL.findOne({ shortened_id: requestedID }, (error, data) => {
    if (data.url) {
      res.redirect(data.url);
    } else {
      res.json({ error: "Could not find URL in database" });
    }
  });
}

module.exports = {
  createNewURL,
  getShortenedURL,
};
