// server/index.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const rateLimit = require("express-rate-limit"); // Import rate limiter
const app = express();
const port = process.env.PORT || 3000;

// *** Rate Limiting Middleware ***
// Limit each IP to 100 requests per 15 minutes.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

// Apply the rate limiter to all requests
app.use(limiter);

// *** Activity Tracking Middleware ***
// This middleware updates the /tmp/last_web_activity file on every HTTP request.
app.use((req, res, next) => {
  const activityFile = "/tmp/last_web_activity";
  fs.writeFile(activityFile, Date.now().toString(), (err) => {
    if (err) {
      console.error("Failed to update activity file:", err);
    }
    next();
  });
});

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, "../client/build")));

// Catch-all handler: for any request that doesn't match an API route,
// send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
