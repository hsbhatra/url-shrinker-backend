const Url = require('../models/urlModel'); 
const { nanoid } = require('nanoid'); // Import nanoid for generating unique codes
// "nanoid" is a secure, URL-friendly, and very fast unique ID generator for JavaScript.
const validUrl = require('valid-url'); // Import valid-url for URL validation
const dotenv = require('dotenv'); 

dotenv.config(); // Load environment variables from .env file

const BASE_URL = process.env.BASE_URL; // Get the base URL from environment variables

// Controller to handle POST /url/shorten
exports.createShortUrl = async (req, res) => {
    try {
        const { longUrl } = req.body; // Extract longUrl from request body

        // Validate the provided longUrl
        if (!longUrl || !validUrl.isUri(longUrl)) {
            return res.status(400).send({
                status: false,
                message: "Invalid longUrl provided",
            });
        }

        // "google.com"
        // "just-a-string"
        // "htttps://google.com"

        // Check if the longUrl has already been shortened
        const existing = await Url.findOne({ longUrl });
        if (existing) {
            // If found, return the existing shortened URL data
            return res.status(200).send({
                status: true,
                data: {
                    longUrl: existing.longUrl,
                    shortUrl: existing.shortUrl,
                    urlCode: existing.urlCode,
                }
            });
        }

        // Generate a custom slug (urlCode) from the last segment of the longUrl
        let urlCode = longUrl.split('/').filter(Boolean).pop().toLowerCase();
        // Extract a potential slug from the longUrl:
        // 1. Split the URL by '/' to get its segments.
        //    Example: 'https://linkedin.com/in/himanshu-sharma/' → ['https:', '', 'linkedin.com', 'in', 'himanshu-sharma']
        // 2. Remove empty segments caused by '//' using .filter(Boolean).
        // 3. Take the last segment with .pop(), e.g., 'himanshu-sharma'.
        // 4. Convert to lowercase for consistency.

        urlCode = urlCode.replace(/[^a-z0-9]/gi, '').slice(0, 10); // Clean and trim slug
        // Removes non-alphanumeric characters using regex ([^a-z0-9])
        // Limits slug length to 10 characters (.slice(0, 10))

        // If slug is too short or empty, generate a random one
        if (!urlCode || urlCode.length < 3) {
            urlCode = nanoid(6).toLowerCase();
        }

        // Ensure the generated urlCode is unique in the database
        while (await Url.findOne({ urlCode })) {
            urlCode = nanoid(6).toLowerCase();
        }

        const shortUrl = `${BASE_URL}/${urlCode}`; // Construct the short URL

        // Save the new shortened URL entry to the database
        const newEntry = await Url.create({ longUrl, shortUrl, urlCode });

        // Return the newly created shortened URL data
        return res.status(201).send({
            status: true,
            data: {
                longUrl: newEntry.longUrl,
                shortUrl: newEntry.shortUrl,
                urlCode: newEntry.urlCode,
            }
        });

    } catch (err) {
        // Handle unexpected errors
        return res.status(500).send({
            status: false,
            message: err.message,
        });
    }
};

// Controller to handle GET /:urlCode
exports.getOriginalUrl = async (req, res) => {
    try {
        const { urlCode } = req.params; // Extract urlCode from request parameters

        // Validate that urlCode is provided
        if (!urlCode) {
            return res.status(400).send({
                status: false,
                message: "Missing urlCode in request",
            });
        }

        // Find the original URL by urlCode (case-insensitive)
        const urlData = await Url.findOne({ urlCode: urlCode.trim().toLowerCase() });

        // If not found, return 404
        if (!urlData) {
            return res.status(404).send({
                status: false,
                message: "URL not found",
            });
        }

        // Redirect to the original long URL
        return res.status(302).redirect(urlData.longUrl);

    } catch (err) {
        // Handle unexpected errors
        return res.status(500).send({
            status: false,
            message: err.message,
        });
    }
};
