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
  if (!titulo || !img || !descripcion) {
    return res.status(400).json({ message: "Los campos título, imagen y descripción son obligatorios" });
  }
  try {
    const newPosts = await model.createPosts(titulo, img, descripcion, likes);
    return res.json(newPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.put("/posts/like/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  console.log("ID recibido para like:", id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }
  try {
    const result = await model.darLike(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    return res.status(200).json({
      message: "Le has dado like al post",
      post: result.rows[0],
    });
  } catch (error) {
    console.error("Error al incrementar likes:", error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await model.eliminarPost(id)
    if (result.rowCount === 0) {
      return res.status(404).json({message: "Post no encontrado"});
    }
    res.status(200).json({message: 'Post eliminado correctamente'});
    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al eliminar post:", error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});