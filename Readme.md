# URL Shrinker Backend

A simple backend service for shortening URLs and redirecting users from short URLs to their original long URLs. Built with Node.js and Express, this project is part of a MERN stack application.

## Features
- Shorten long URLs to short, easy-to-share links
- Redirect users from short URLs to the original long URLs
- Error handling for invalid or expired URLs

## Project Structure
```
app.js
package.json
server.js
config/
controllers/
  urlController.js
middlewares/
  errorHandler.js
models/
  urlModel.js
routes/
  urlRoutes.js
Screenshots/
  RedirectingToLongUrlUsingShortUrl.png
  ShorteningLongUrl.png
```

## Getting Started

### Prerequisites
- Node.js (v14 or above recommended)
- npm

### Installation
1. Clone the repository:
   ```powershell
   git clone <repo-url>
   cd url-shrinker-backend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Configure environment variables in the `config` folder as needed.
4. Start the server:
   ```powershell
   npm start
   ```

## API Endpoints
- `POST /api/url/shorten` - Shorten a long URL
- `GET /:shortUrl` - Redirect to the original long URL

## Screenshots

### Shortening a Long URL
![Shortening Long URL](Screenshots/ShorteningLongUrl.png)

### Redirecting to Long URL Using Short URL
![Redirecting to Long URL](Screenshots/RedirectingToLongUrlUsingShortUrl.png)

## Folder Details
- **config/**: Configuration files
- **controllers/**: Business logic for URL shortening and redirection
- **middlewares/**: Error handling middleware
- **models/**: Mongoose models for URL data
- **routes/**: Express routes for API endpoints

## License
MIT
