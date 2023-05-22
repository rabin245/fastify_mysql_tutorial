export const getUsers = async (conn) => {
  const [response] = await conn.query("SELECT * FROM users");

  return response;
}

export const register = async (conn, user) => {
  const {username, password}= user;

  const [existingUser] = await conn.query("SELECT * FROM users WHERE username=?", [username]);
  console.log(existingUser)

  if (existingUser.length > 0) {
    return {error: "User already exists"};
  }

  const [response] = await conn.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);

  return response;
}

export const login = async (conn, user) => {
  const {username, password} = user;

  const [existingUser] = await conn.query("SELECT * FROM users WHERE username=?", [username]);

  if (existingUser.length === 0) {
    return {error: "User not found"};
  }

  if (existingUser[0].password !== password) {
    return {error: "Wrong password"};
  }

  return existingUser[0];
}
