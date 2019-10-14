//Importando o os pacotes que foram baixados via npm
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://userD1:100senha@telemedicina-qjjgj.mongodb.net/telemedicina?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());

app.use(routes)

app.listen(3333);