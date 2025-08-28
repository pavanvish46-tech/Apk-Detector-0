const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 10000; // Render ke liye dynamic port

// Static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Multer setup (agar file upload hai)
const upload = multer({ dest: "uploads/" });

// Example API
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully", file: req.file });
});

// Root route (homepage serve karega)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
