const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
    title: String,
    description: String,
    dueDate: Date,
    complete: Boolean,
    user: {
        type: String,
        default: 'user'
    }
},
    {
        strict: false,
        timestamps: true
    });

module.exports = mongoose.model('todo', todoSchema);