import { getAllPosts, getPost } from "../controllers/posts.js";
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
      response: {
        200: postSchema,
      },
    },
    handler: getPost,
  };

  fastify.get("/", getAllPostsOption);

  fastify.get("/:id", getPostOption);

  done();
};

export default postRoutes;
