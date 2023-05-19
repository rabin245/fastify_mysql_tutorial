import Fastify from "fastify";
import postRoutes from "./routes/posts.js";
import dbConnector from "./plugins/db.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(dbConnector);

fastify.register(postRoutes, { prefix: "/api/posts" });

fastify.get("/", async (req, reply) => {
  return { hello: "world" };
});

const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
