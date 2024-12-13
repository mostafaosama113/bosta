const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect()
    .then(() => console.debug('Connected to the database'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = client;