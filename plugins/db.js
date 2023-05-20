import fastifyPlugin from "fastify-plugin";
import mysql from "@fastify/mysql";
import * as dotenv from "dotenv";

dotenv.config();

const dbConnector = async (fastify, options, done) => {
  fastify.register(mysql, {
    promise: true,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
  });

  done();
};

export default fastifyPlugin(dbConnector);
