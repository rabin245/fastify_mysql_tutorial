import fastifyPlugin from 'fastify-plugin';
import jwt from '@fastify/jwt';

import * as dotenv from "dotenv";

dotenv.config();

const jwtPlugin = async (fastify, options, done) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET,
  });
  done();

  fastify.decorate('authenticate', async (req, reply)=> {
    console.log("\nauthenticating\n");
    try {
      await req.jwtVerify();
    } catch (error) {
      reply.send(error);
    }
  })
}

export default fastifyPlugin(jwtPlugin);
