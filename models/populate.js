const { Client } = require('pg');
const { argv } = require('node:process')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const createTables = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR (255) UNIQUE,
        firstname VARCHAR (255),
        lastname VARCHAR (255),
        is_member BOOLEAN DEFAULT false,
        is_admin BOOLEAN DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS messages (
        message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER references users(id) ON DELETE CASCADE,
        title VARCHAR (255),
        message_text TEXT,
        date_posted VARCHAR (255)
    );
`

const populateTables = `
    INSERT INTO users (username, firstname, lastname) 
    VALUES ('lta', 'liz', 'lee');
    
    INSERT INTO users (username, firstname, lastname, is_member, is_admin)
    VALUES ('admin_guy', 'admin', 'guy', true, true);

    INSERT INTO users (username, firstname, lastname, is_member)
    VALUES ('club_member', 'club', member, true)


    INSERT INTO messages (user_id, title, message_text, date_posted) 
    VALUES (1, 'First Message', 'Hello World!', 'Sun Nov 9 2025')
`

async function main() {
  console.log("seeding...");

  const connectionString = argv[2] || process.env.REMOTE_DB_URL || `postgresql://${process.env.LOCAL_DB_USER}:${process.env.LOCAL_DB_PASSWORD}@${process.env.LOCAL_DB_HOST}:${process.env.LOCAL_DB_PORT}/${process.env.LOCAL_DB_NAME}`;
  
  const client = new Client({
    connectionString,
    ssl: connectionString.includes('render.com')
      ? { rejectUnauthorized: false }
      : false
  });
  await client.connect();
  await client.query(createTables);
  await client.query(populateTables);
  await client.end();
  console.log("done");
}

main();