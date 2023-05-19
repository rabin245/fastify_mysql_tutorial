import { getAllPosts } from "../controllers/posts.js";
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

  fastify.get("/", getAllPostsOption);

  done();
};

export default postRoutes;
