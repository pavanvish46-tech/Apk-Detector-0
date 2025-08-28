const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static(path.join(__dirname)));

app.post("/scan", upload.single("apk"), (req, res) => {
  // Dummy scan logic
  let risk = Math.floor(Math.random() * 100);
  res.json({
    file: req.file.originalname,
    risk: risk,
    issues: risk > 70 ? ["Suspicious permissions", "Possible banking fraud"] :
           risk > 40 ? ["Some unusual behavior detected"] :
           ["Safe APK"]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
