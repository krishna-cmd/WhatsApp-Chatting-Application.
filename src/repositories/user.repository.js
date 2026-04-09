const pool = require("../config/db");

async function createUser(username, email, hashed) {
  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, hashed],
  );
  return result.rows[0];
}

async function getUser(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0];
}

module.exports = {
  createUser,
  getUser,
};
