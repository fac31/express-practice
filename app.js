import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "public")));

app.get("/api-blend", (req, res) => {
  console.log(data);

  res.json({ message: "Form data received successfully." });
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
