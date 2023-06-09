import { getAllPosts, getPost, addPost, deletePost } from "../controllers/posts.js";
import { postSchema } from "../schemas/postSchema.js";

const postRoutes = async (fastify, options, done) => {
  const getAllPostsOption = {
    schema: {
      response: {
        200: {
          type: "array",
          items: postSchema,
        },
      },
    },
    handler: getAllPosts,
  };

  const getPostOption = {
    schema: {
      params: {
        type: "object",
        properties: {
          id: {type: "number"}
        }
      },
      response: {
        200: postSchema,
      },
    },
    onRequest: fastify.authenticate, 
    handler: getPost,
  };

  const addPostOption = {
    schema: {
      body: postSchema,
      response: {
        200: {
          type: "object",
          properties: {
            affectedRows: { type: "number" },
            insertId: { type: "number" },
          }
        }
      }
    },
    onRequest: fastify.authenticate, 
    handler: addPost,
  } 

  const deletePostOption = {
    schema: {
      params: {
        type: "object",
        properties: {
          id: {type: "number"},
        }
      },
      response: {
        200:{
          type: "object",
          properties: {
            affectedRows: { type: "number" },
          }
        }
      }
    },
    onRequest: fastify.authenticate, 
    handler: deletePost,
  }

  fastify.get("/", getAllPostsOption);

  fastify.get("/:id", getPostOption);

  fastify.post("/", addPostOption);

  fastify.delete('/:id', deletePostOption);

  done();
};

export default postRoutes;
