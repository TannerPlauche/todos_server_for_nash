const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./todo-model');
const app = express();

mongoose.connect('mongodb://admin:admin1@ds013951.mlab.com:13951/todos',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true, retryWrites: false
    }, () => {
        console.log('Connected to MongoDb!');
    })


app.use((req, res) => res.send('Hello world!'));

app.listen(8080, () => {
    console.log('Listening on port 8080');
})