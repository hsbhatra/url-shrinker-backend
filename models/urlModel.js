const mongoose = require('mongoose');

// Define the schema for storing URL information
const urlSchema = new mongoose.Schema({
  // Unique code generated for the shortened URL
  urlCode: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  // The original, full-length URL provided by the user
  longUrl: {
    type: String,
    required: true,
    trim: true
  },
  // The shortened URL that redirects to the original URL
  shortUrl: {
    type: String,
    required: true,
    unique: true
  }
}, { 
  // Automatically adds createdAt and updatedAt fields
  timestamps: true 
});

// Export the model to interact with the 'urls' collection in MongoDB
module.exports = mongoose.model('Url', urlSchema);
