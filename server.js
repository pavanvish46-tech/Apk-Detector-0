import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;
const SECRET = process.env.JWT_SECRET || "supersecretkey";

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ✅ MongoDB connection (Atlas ka URL Render ke Environment Variables me daalna hoga)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model("User", UserSchema);

// ✅ Register
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email }, SECRET, { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Serve main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "apk.html"));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
