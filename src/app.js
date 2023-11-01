const express = require('express');
const actors = require('./routes/actors');
const cors = require('cors');
const config = require('./config')
var fs = require('fs');
var http = require('http');
var https = require('https');

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/actors', actors);

let server
if (config.server.env == 'DEV') {
    server = http.createServer(app)
} else {
    var privateKey = fs.readFileSync(config.server.key_path, 'utf8');
    var certificate = fs.readFileSync(config.server.cert_path, 'utf8');

    var credentials = { key: privateKey, cert: certificate };
    server = https.createServer(credentials, app)
}


server.listen(config.server.port, function () {
    console.log('API is running...');
    console.log(`API IN MODE ${config.server.env}`);
});