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
    });

app.use(bodyParser.json());

app.get('/:username/todos', (req, res) => {
    Todo.find({ user: req.params.username }, (err, todos) => {
        if (err) {
            console.log('err: ', err);
            res.send({ error: `There was an error fetching your todos: ${err}` });
        } else {
            res.send(todos);
        }
    });
})


app.get('/:username/todos/:id', (req, res) => {
    Todo.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, todos) => {
        if (err) {
            console.log('err: ', err);
            res.send({ error: `There was an error fetching your todos: ${err}` });
        } else {
            res.send(todos);
        }
    });
})

app.post('/:username/todos', (req, res) => {
    let username = req.params.username;
    let todo = {
        ...req.body,
        user: username
    }
    let newTodo = new Todo(todo);
    newTodo.save().then((savedTodo) => {
        res.send(savedTodo);
    }).catch(err => {
        res.send({ error: `There was an error fetching your todos: ${err}` });
    })
});

app.put('/:username/todos/:id', (req, res) => {
    let id = req.params.id;
    let username = req.params.username;
    let todo = req.body;

    Todo.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, todo, { new: true }, (err, todo) => {
        if (err) {
            console.log('err: ', err);
            res.send({ error: `There was an error updating your todos: ${JSON.stringify(err)}` });
        } else {
            res.send(todo);
        }
    });
});

app.delete('/:username/todos/:id', (req, res) => {
    let id = req.params.id;
    let username = req.params.username;

    Todo.deleteOne({ _id: mongoose.Types.ObjectId(id) }).then((value) => {
        res.send(`${id} deleted`);
    });
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})