const pool = require('./pool')

async function createUser(user){
    await pool.query(`
        INSERT INTO users (username, firstname, lastname, password)
        VALUES ($1, $2, $3, $4d)    
    `, [user.username, user.firstName, user.lastName, user.password])
}

async function makeMember(username){
    await pool.query(`
        UPDATE users
        SET is_member = true
        WHERE username = $1
    `, [username])
}

async function makeAdmin(username){
    await pool.query(`
        UPDATE users
        SET is_admin = true
        WHERE username = $1
    `, [username])
}

async function getMessages(){
    const { rows } = await pool.query(`
        SELECT message_id, username, title, message_text, date_posted
        FROM users INNER JOIN messages
        ON id = user_id;    
    `)

    return rows;
}

async function createMessage(data){
    await pool.query(`
        INSERT INTO messages (user_id, title, message_text, date_posted)
        VALUES ($1, $2, $3, $4);
    `, [data.user_id, data.title, data.message_text, data.date_posted])
}

async function deleteMessage(id){
    await pool.query(`
        DELETE FROM messages
        WHERE message_id = $1
    `, [id])
}

async function findUserByName(name){
    const { rows } = await pool.query(`
        SELECT * FROM users 
        WHERE username = $1
    `, [name])

    return rows[0];
}

async function findUserById(id){
    const { rows } = await pool.query(`
        SELECT * FROM users 
        WHERE username = $1
    `, [id])

    return rows[0];
}

module.exports = {
    createUser,
    makeMember,
    makeAdmin,
    getMessages,
    createMessage,
    deleteMessage,
    findUserByName,
    findUserById
}

