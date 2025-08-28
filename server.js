const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000; // Render dynamic port use karega

// Static files serve karna (CSS, JS)
app.use(express.static(__dirname));

// Root route → apk.html serve karega
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "apk.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
