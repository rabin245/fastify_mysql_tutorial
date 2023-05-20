export const getAllPosts = async (conn) => {
  const [rows] = await conn.query("SELECT * FROM posts");

  return rows;
};

export const getPost = async (conn, id) => {
  const [rows] = await conn.query("SELECT * FROM posts WHERE id = ?", [id]);

  return rows[0];
};

export const addPost = async (conn, post) => {
  const [rows] = await conn.query(
    "INSERT INTO posts (title, content) VALUES (?, ?)",
    [post.title, post.content]
  );

  return rows;
}
