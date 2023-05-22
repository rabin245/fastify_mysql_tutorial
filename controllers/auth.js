import * as authService from '../services/auth.js';

export const getUsers = async (req, reply) => {
  const conn = await req.server.mysql.getConnection();
  const response = await authService.getUsers(conn);
  
  return response;
}

export const register = async (req, reply) => {
  const conn = await req.server.mysql.getConnection();
  const response = await authService.register(conn, req.body);

  return response;
}

export const login = async (req, reply) => {
  const conn = await req.server.mysql.getConnection();
  const response = await authService.login(conn, req.body);

  const token = await req.server.jwt.sign({
    username: response.username,
  })
  console.log(token);

  // set auth header
  reply.header('Authorization', `Bearer ${token}`);

  return {token};
}
