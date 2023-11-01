const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host:'127.0.0.1',
    port: '3306',
    database: 'db_neosaldina',
    user:'root',
    password:'P@070301'
});

module.exports = connection;