import dotenv from "dotenv";
dotenv.config();
import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import cors from "cors";  // Import the cors middleware

const PORT = process.env.PORT || 3000;

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS for all routes

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


app.post("/api-blend", async (req, res) => {
  const { pokeName } = req.body;
  console.log("Received pokeName:", pokeName);

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from PokeAPI: ${response.statusText}`);
    }
    const pokemonData = await response.json();
    const imageUrl = pokemonData.sprites.front_default;

    const chatGPTResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: "Write a story about a " + pokeName + " in a magical forest."
        }
      ],
      max_tokens: 100
    });

    const story = chatGPTResponse.choices[0].message.content;

    res.json({
      message: "Form data received successfully.",
      image: imageUrl,
      story: story
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
