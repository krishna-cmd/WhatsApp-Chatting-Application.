const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const repo = "../repositories/user.repository.js";

const SECRET = process.env.SECRET;

async function register(name, email, password) {
  const hashed = await bcrypt(password, 10);

  return repo.createUser(name, email, hashed);
}

async function login(email, password) {
  const user = await repo.getUser(username);

  if (!email) {
    throw new Error("User not found!");
  }
  const isMatched = await bcrypt.compare(password, hashed);
  if (!isMatched) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign(
    { userID: user.id, email: user.email },
    process.env.SECRET,
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
