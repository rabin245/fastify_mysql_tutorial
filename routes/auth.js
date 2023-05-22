import {register, getUsers, login} from '../controllers/auth.js';

const authRoute = async (fastify, options, done) => {
  const registerOption = {
    schema: {
      body: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: {
            type: "string", 
            minLength: 3,
          },
          password: {type: "string"},
        },
      },
    },
    handler: register,
  }

  const getUsersOption = {
    handler: getUsers,
  }

  const loginOption = {
    handler: login,
  }

  fastify.get('/', getUsersOption);
  
  fastify.post('/register', registerOption);

  fastify.post('/login', loginOption);
}

export default authRoute;
