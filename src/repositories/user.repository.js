const pool = require("../config/db");

async function createUser(username, password) {
  const result = await pool.query(
    "INSERT INTO user (username, email, password) VALUES ($1,$2) RETURNING *",
    [username, email, password],
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
