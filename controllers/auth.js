import * as authService from "../services/auth.js";

export const getUsers = async (req, reply) => {
  try {
    const conn = await req.server.mysql.getConnection();
    const response = await authService.getUsers(conn);

    return response;
  } catch (error) {
    reply.code(500).send({
      message: "Internal Server Error",
      error: error.message,
    }) 
  }
};

export const register = async (req, reply) => {
  try {
    const conn = await req.server.mysql.getConnection();
    const response = await authService.register(conn, req.body);

    return response;
  } catch (error) {
    if (error.message === 'User already exists') {
      reply.code(409).send({ error: 'User already exists' });
    } else {
      reply.code(500).send({ error: 'Failed to register user' });
    }  
  }
};

export const login = async (req, reply) => {
  try {
    const conn = await req.server.mysql.getConnection();
    const response = await authService.login(conn, req.body);

    const authToken = await req.server.jwt.sign({
      username: response.username,
    });


    const refreshToken = await reply.jwtSign({
      username: response.username,
    }, {expiresIn: '30s'});

    // set refresh token in cookie
    reply.setCookie('refreshToken', refreshToken, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
      maxAge: 30 * 1000,
    })

    return { authToken };
  } catch (error) {
    if (error.message === 'User does not exist') {
      reply.code(404).send({ error: 'User does not exist' });
    } else if (error.message === 'Invalid password') {
      reply.code(401).send({ error: 'Wrong password' });
    } else {
      reply.code(500).send({ error: 'Failed to login' });
    }
  }
};
