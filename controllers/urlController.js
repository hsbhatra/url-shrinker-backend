const Url = require('../models/urlModel');
const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const dotenv = require('dotenv');

dotenv.config();

const BASE_URL = process.env.BASE_URL;

// POST /url/shorten
exports.createShortUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;

        // Validate longUrl
        if (!longUrl || !validUrl.isUri(longUrl)) {
            return res.status(400).send({
                status: false,
                message: "Invalid longUrl provided",
            });
        }

        // Check if URL already shortened
        const existing = await Url.findOne({ longUrl });
        if (existing) {
            return res.status(200).send({
                status: true,
                data: {
                    longUrl: existing.longUrl,
                    shortUrl: existing.shortUrl,
                    urlCode: existing.urlCode,
                }
            });
        }

        // Custom slug logic based on longUrl
        let urlCode = longUrl.split('/').filter(Boolean).pop().toLowerCase();
        urlCode = urlCode.replace(/[^a-z0-9]/gi, '').slice(0, 10);

        if (!urlCode || urlCode.length < 3) {
            urlCode = nanoid(6).toLowerCase(); // fallback
        }

        // Ensure uniqueness of slug
        let existingByCode = await Url.findOne({ urlCode });
        if (existingByCode) {
            urlCode = nanoid(6).toLowerCase(); // fallback again
        }

        const shortUrl = `${BASE_URL}/${urlCode}`;

        // Save to DB
        const newEntry = await Url.create({ longUrl, shortUrl, urlCode });

        return res.status(201).send({
            status: true,
            data: {
                longUrl: newEntry.longUrl,
                shortUrl: newEntry.shortUrl,
                urlCode: newEntry.urlCode,
            }
        });

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message,
        });
    }
};

// GET /:urlCode
exports.getOriginalUrl = async (req, res) => {
    try {
        const { urlCode } = req.params;

        if (!urlCode) {
            return res.status(400).send({
                status: false,
                message: "Missing urlCode in request",
            });
        }

        const urlData = await Url.findOne({ urlCode: urlCode.toLowerCase() });

        if (!urlData) {
            return res.status(404).send({
                status: false,
                message: "URL not found",
            });
        }

        return res.status(302).redirect(urlData.longUrl);

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message,
        });
    }
};
