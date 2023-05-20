import * as postService from "../services/posts.js";

export const getAllPosts = async (req, reply) => {
  const conn = await req.server.mysql.getConnection();
  const posts = await postService.getAllPosts(conn);
  return posts;
};

export const getPost = async (req, reply) => {
  const conn = await req.server.mysql.getConnection();
  const post = await postService.getPost(conn, req.params.id);
  return post;
};

export const addPost = async (req, reply) => {
  const conn = await req.server.mysql.getConnection();
  const response = await postService.addPost(conn, req.body);
  return response;
}

export const deletePost = async (req, reply) => {
  const conn = await req.server.mysql.getConnection();
  const response = await postService.deletePost(conn, req.params.id);
  return response;
}
