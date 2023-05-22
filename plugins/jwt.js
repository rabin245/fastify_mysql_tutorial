import fastifyPlugin from 'fastify-plugin';
import jwt from '@fastify/jwt';

import * as dotenv from "dotenv";

dotenv.config();

const jwtPlugin = async (fastify, options, done) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET,
    sign: { expiresIn: '15s' },
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    }
  });

  fastify.decorate('authenticate', async (req, reply)=> {
    console.log(req.cookies);
    try {
      const {authorization} = req.headers;

      if(!authorization) {
        throw new Error('Missing token header');
      }

      const [scheme, token] = authorization.split(' ');

      if (scheme !== 'Bearer'){
        throw new Error('Invalid token scheme');
      }

      if (token){
        try {
          await req.jwtVerify();
        } catch (error) {
          if (error.message === 'Authorization token expired') {
            // const { refreshToken } = req.cookies;
            //
            // if (!refreshToken) {
            //   throw new Error('Missing refresh token');
            // }

            // const decoded = await req.server.jwt.verify(refreshToken);

            const decoded = await req.jwtVerify({onlyCookie: true});

            const newToken = await req.server.jwt.sign({username: decoded.username});

            req.headers.authorization = `Bearer ${newToken}`;
          } else {
            throw new Error('Invalid token');
          }    
        }
      } else {
        throw new Error('Missing token');
      }
    } catch (error) {
      reply.code(401).send({error: error.message});
    }
  })

  done();
}

export default fastifyPlugin(jwtPlugin);
