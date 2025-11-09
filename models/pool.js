const { Pool } = require('pg');
const { argv } = require('node:process');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const connectionString = argv[2] || process.env.REMOTE_DB_URL || `postgresql://${process.env.LOCAL_DB_USER}:${process.env.LOCAL_DB_PASSWORD}@${process.env.LOCAL_DB_HOST}:${process.env.LOCAL_DB_PORT}/${process.env.LOCAL_DB_NAME}`;

module.exports = new Pool({
    connectionString,
    ssl: connectionString.includes('render.com')
    ? { rejectUnauthorized: false }  
    : false        
})