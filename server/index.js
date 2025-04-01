// server/index.js
const express = require("express");
const path = require("path");
const fs = require("fs"); // Added to update the activity file
const app = express();
const port = process.env.PORT || 3000;

// Middleware to record activity
// This middleware updates the /tmp/last_web_activity file on every HTTP request.
// An external script can use this file's modification time to determine inactivity.
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
