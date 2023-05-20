export const getAllPosts = async (conn) => {
  const [rows] = await conn.query("SELECT * FROM posts");

  return rows;
};

export const getPost = async (conn, id) => {
  const [rows] = await conn.query("SELECT * FROM posts WHERE id = ?", [id]);

  return rows[0];
};

export const addPost = async (conn, post) => {
  const [response] = await conn.query(
    "INSERT INTO posts (title, content) VALUES (?, ?)",
    [post.title, post.content]
  );

  return response;
}

export const deletePost = async (conn, id) => {
  const [response] = await conn.query(
    "DELETE FROM posts WHERE id = ?",
    [id]
  );

  return response;
}
