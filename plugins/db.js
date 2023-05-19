import fastifyPlugin from "fastify-plugin";
import mysql from "@fastify/mysql";

const dbConnector = async (fastify, options, done) => {
  fastify.register(mysql, {
    promise: true,
    host: "localhost",
    password: "Sqlp@ssw0rd",
    user: "zaxiya",
    database: "fastify_test",
    port: 3306,
  });

  done();
};

export default fastifyPlugin(dbConnector);
