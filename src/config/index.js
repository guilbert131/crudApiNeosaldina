require("dotenv").config();

const server = {
    port: process.env.PORT,
    env: process.env.ENV,
    cert_path: process.env.CERT_PATH,
    key_path: process.env.KEY_PATH
}

const db = {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port:  process.env.DB_PORT
}

const neosaldina = {
    token: process.env.API_TOKEN,
    url: process.env.URL
}

const config = {
    server,
    db,
    neosaldina
}

module.exports = config