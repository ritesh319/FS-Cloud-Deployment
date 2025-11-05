import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://admin:admin1234@cluster0.t0dxj3h.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const MessageSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);


app.get("/health", (req, res) => res.status(200).send("OK"));
app.get("/api/hello", (req, res) => res.json({ message: "Hello from backend with MongoDB!" }));
app.get("/", (req, res) => {
  res.send("Backend server is up and running 🚀");
});

app.post("/api/message", async (req, res) => {
  try {
    const msg = new Message({ text: req.body.text });
    await msg.save();
    res.json({ success: true, message: "Message saved!" });
  } catch (err) {
    res.status(500).json({ error: "Error saving message" });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: -1 });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
