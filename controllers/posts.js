import * as postService from "../services/posts.js";

export const getAllPosts = async (req, reply) => {
  try {
    const conn = await req.server.mysql.getConnection();
    const posts = await postService.getAllPosts(conn);
    return posts;
  } catch (error) {
    reply.code(500).send({
      message: "Internal Server Error",
      error: error.message,
    }) 
  }
};

export const getPost = async (req, reply) => {
  try {
    const conn = await req.server.mysql.getConnection();
    const post = await postService.getPost(conn, req.params.id);

    if (!post) {
      reply.code(404).send({
        message: "Post not found",
      });
    }else{
      return post;
    }
  } catch (error) {
    reply.code(500).send({
      message: "Internal Server Error",
      error: error.message,
    }) 
  }
};

export const addPost = async (req, reply) => {
  try {
    const conn = await req.server.mysql.getConnection();
    const response = await postService.addPost(conn, req.body);
    return response;
  } catch (error) {
    reply.code(500).send({
      message: "Internal Server Error",
      error: error.message,
    }) 
  }
}

export const deletePost = async (req, reply) => {
  try {
    const conn = await req.server.mysql.getConnection();
    const response = await postService.deletePost(conn, req.params.id);
    return response;
  } catch (error) {
    reply.code(500).send({
      message: "Internal Server Error",
      error: error.message,
    }) 
  }
}
