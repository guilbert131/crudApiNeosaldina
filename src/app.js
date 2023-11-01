const express = require('express');
const actors = require('./routes/actors');
const cors = require('cors');

const app = express();

app.use(express.json());

const PORT = 3302;

app.use(cors({
    origin: '*'
}));
app.use('/actors', actors);

app.listen(PORT, () => {
    console.log(`Executando a aplicação na porta ${PORT}`)
});