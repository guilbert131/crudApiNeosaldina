require("dotenv").config();

const server = {
    env: process.env.ENV,
    port: process.env.PORT,
    cert_path: process.env.CERT_PATH,
    key_path: process.env.KEY_PATH
}

const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}

const config = {
    server,
    db
}

module.exports = config