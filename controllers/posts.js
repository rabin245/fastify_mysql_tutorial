import * as postService from "../services/posts.js";

export const getAllPosts = async (req, reply) => {
  console.log("\n test", req.server.mysql);
  const conn = await req.server.mysql.getConnection();
  const posts = await postService.getAllPosts(conn);
  return posts;
};
