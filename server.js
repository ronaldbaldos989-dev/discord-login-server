import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Required para gumana sa ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para mabasa ang JSON body
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Route sa main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route na tatanggap ng POST request galing sa form
app.post("/send", (req, res) => {
  console.log("📩 Received data:", req.body);
  // Dito mo pwedeng i-process o i-save sa database kung gusto mo
  res.status(200).json({ message: "Data received successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
