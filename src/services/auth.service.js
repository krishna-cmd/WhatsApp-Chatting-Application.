const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const repo = require("../repositories/user.repository");

const SECRET = process.env.SECRET;

async function register(username, email, password) {
  const hashed = await bcrypt.hash(password, 10);

  return repo.createUser(username, email, hashed);
}

async function login(email, password) {
  const user = await repo.getUser(email);

  if (!user) {
    throw new Error("User not found!");
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      userID: user.id,
      name: user.name ?? user.username ?? null,
      username: user.username ?? user.name ?? null,
      email: user.email,
    },
    SECRET,
    {
      expiresIn: "1d",
    },
  );

  return token;
}

module.exports = {
  register,
  login,
};
