import { pool } from "../database/connection.js";

const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const createPosts = async (titulo, img, descripcion, likes) => {
  const sqlQuery = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [titulo, img, descripcion, likes]
  const results = await pool.query(sqlQuery, values);
  return results.rows
};

const eliminarPost = async(id) => {
  const consulta = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(consulta, values);
  return result.rows[0];
};

const darLike = async (id) => {
  const consulta = "UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(consulta, values);
  return result; // retorna el objeto completo con .rows
};

export const model = {
  getPosts,
  createPosts,
  eliminarPost, 
  darLike
};