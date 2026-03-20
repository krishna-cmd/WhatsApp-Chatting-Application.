const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const repo = ("../repositories/user.repository.js");

const SECRET = process.env.SECRET;

async function register(username, password){
    const hashed = await bcrypt(password,10);

    return repo.createUser(username, hashed);
}

async function login(username, password){
    const user = await repo.getUser(username);

    if(!user){
        throw new Error("User not found!")
    }
    const isMatched = await bcrypt.compare(password, hashed);
    if(!isMatched){
        throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
        {userID:user.id, username: user.username},
        SECRET, {expiresIn : "1d"}
    );

    return token;
}

module.exports = {
    register,login
}