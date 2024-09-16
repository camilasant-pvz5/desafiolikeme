const { Pool } = require('pg');
const pool = new Pool({
 host: 'localhost',
 user: 'postgres',
 password: '261295.',
 database: 'likeme',
 allowExitOnIdle: true,
 port: 5432,
 schema: 'public',
});

const obtenerPost = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts;");
    return rows;
  } catch (error) {
    console.error("Error al obtener los posts:", error);
        throw error; 
  }
};

const escribirPost = async (titulo, url, descripcion) => {
    const consulta =
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0)";
    const values = [titulo, url, descripcion];
    const result = await pool.query(consulta, values);
    console.log("Post Agregado", result);
  };

 obtenerPost()

 const addLike = async (id) => {
 const like = "UPDATE posts SET likes = (likes + 1) WHERE id = $1";
 const values = [id];
 await pool.query(like, values);
 }

  const borrarPost = async (id) => {
  const consulta ="DELETE FROM posts WHERE id =$1";
  const values = [id];
 await pool.query(consulta, values);
 } 

module.exports = {obtenerPost, escribirPost, addLike, borrarPost};