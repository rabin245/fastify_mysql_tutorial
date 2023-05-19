export const getAllPosts = async (conn) => {
  const [rows] = await conn.query("SELECT * FROM posts");

  return rows;
};

export const getPost = async (conn, id) => {
  const [rows] = await conn.query("SELECT * FROM posts WHERE id = ?", [id]);

  return rows[0];
};
