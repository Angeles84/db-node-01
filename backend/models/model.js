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

export const model = {
  getPosts,
  createPosts,
};