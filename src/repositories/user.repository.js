const pool = require("../config/db");

async function createUser(username, password){
    
        const result = await pool.query(
            "INSERT INTO user (username, password) VALUES ($1,$2) RETURNING *",
            [username, password]
        );
        return result.rows[0];
     
    
}

async function getUser(username){
    
        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        return result.rows[0]
    
}

module.exports = {
    createUser,
    getUser
}