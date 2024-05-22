import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 3000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/api-blend", async (req, res) => {
  const data = req.body;
  console.log("====================================");
  console.log(data);
  console.log("====================================");

  // Todo make a call to Pokemon Api:
  // https://pokeapi.co/api/v2/pokemon/ Hint: image is sprites key

  //Todo make call to chat gpt api
  const openai = new OpenAI();

  //Format data to send to front-end

  res.json({
    message: "Form data received successfully.",
    image: "https://picsum.photos/300/300",
    story: test,
  });
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

const test =
  "In a verdant forest, Pikachu roamed freely, sparks flickering playfully from its cheeks. It befriended all creatures, sharing laughter under the starry skies. One stormy night, Pikachu's electric charm illuminated the way for a lost traveler, forging an unbreakable bond of friendship and adventure that lasted a lifetime.";
