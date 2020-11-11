const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./todo-model');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://admin:admin1@ds013951.mlab.com:13951/todos',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true, retryWrites: false
    }, () => {
        console.log('Connected to MongoDb!');
    })


app.use((req, res) => res.send('Hello world!'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})