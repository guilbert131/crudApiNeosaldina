const mysql = require('mysql2/promise');
const config = require('../config')

const connection = mysql.createPool({
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password
});

module.exports = connection;