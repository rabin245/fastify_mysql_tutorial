import Fastify from "fastify";
import postRoutes from "./routes/posts.js";
import dbConnector from "./plugins/db.js";
import authRoutes from "./routes/auth.js";
import jwtPlugin from "./plugins/jwt.js";
import cookie from '@fastify/cookie';

const fastify = Fastify({
  logger: true,
});

fastify.register(dbConnector);

fastify.register(jwtPlugin);

fastify.register(cookie);

fastify.register(postRoutes, { prefix: "/api/posts" });

fastify.register(authRoutes, { prefix: "/api/auth"});

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
