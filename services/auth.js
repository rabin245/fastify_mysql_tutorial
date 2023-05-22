export const getUsers = async (conn) => {
  const [response] = await conn.query("SELECT * FROM users");

  return response;
}

export const register = async (conn, user) => {
  try {
    const {username, password}= user;

    const [existingUser] = await conn.query("SELECT * FROM users WHERE username=?", [username]);

    if (existingUser.length > 0){
      throw new Error("User already exists");
    }

    const [response] = await conn.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);

    return response;
  } catch (error) {
    throw error; 
  }
}

export const login = async (conn, user) => {
  try {
    const {username, password} = user;

    const [existingUser] = await conn.query("SELECT * FROM users WHERE username=?", [username]);

    if (existingUser.length === 0) {
      throw new Error("User does not exist");
    }

    if (existingUser[0].password !== password) {
      throw new Error("Invalid password");
    }

    return existingUser[0];
  } catch (error) {
    throw error;
  }
}
