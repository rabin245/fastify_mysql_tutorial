export const getAllPosts = async (conn) => {
  const [rows] = await conn.query("SELECT * FROM posts");

  return rows;
};
