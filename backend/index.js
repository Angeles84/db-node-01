import express from "express";
//import bodyParser from "body-parser";
import cors from "cors";
import { model } from "./models/model.js";

import "dotenv/config";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())
// Middleware para parsear el cuerpo de las peticiones
//app.use(bodyParser.json());

// Habilitamos CORS
app.use(cors());

// GET /posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await model.getPosts();
    console.log(posts)
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /posts
app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  if (!titulo) {
    return res.status(400).json({ message: "Title is required" });
  }
  try {
    const newPosts = await model.createPosts(titulo, img, descripcion, likes);
    return res.json(newPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});