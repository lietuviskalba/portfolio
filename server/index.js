// server/index.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const app = express();
const port = process.env.PORT || 3000;

// *** Rate Limiting Middleware ***
// Limit each IP to 100 requests per 15 minutes.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes.",
});
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

// Serve the portfolio's static files under the /portfolio path.
app.use("/portfolio", express.static(path.join(__dirname, "../client/build")));

// Catch-all route for portfolio subpaths (e.g., /portfolio/admin, /portfolio/anything)
app.get("/portfolio/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Optionally, redirect the root URL to /portfolio
app.get("/", (req, res) => {
  res.redirect("/portfolio");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
