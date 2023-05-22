export const getAllPosts = async (conn) => {
  try {
    const [rows] = await conn.query("SELECT * FROM posts");

    return rows;
  } catch (error) {
    throw error;  
  }
};

export const getPost = async (conn, id) => {
  try {
    const [rows] = await conn.query("SELECT * FROM posts WHERE id = ?", [id]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const addPost = async (conn, post) => {
  try {
    const [response] = await conn.query(
      "INSERT INTO posts (title, content) VALUES (?, ?)",
      [post.title, post.content]
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export const deletePost = async (conn, id) => {
  try {
    const [response] = await conn.query(
      "DELETE FROM posts WHERE id = ?",
      [id]
    );

    return response;
  } catch (error) {
    throw error;
  }
}
