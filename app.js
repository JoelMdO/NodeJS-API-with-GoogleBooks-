require('dotenv').config();

const { initDatabase } = require('./src/models/db');
initDatabase();

const express = require('express');
const app = express();

app.use(express.json());

const booksRouter = require('./src/routes/books');
const connectionRouter = require('./src/routes/connection');

app.use(connectionRouter);
app.use(booksRouter);

app.listen(process.env.SERVER_PORT, function () {
    console.log('Listening Port:' + process.env.SERVER_PORT);
});