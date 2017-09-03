'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    date: { 
        type: Date,
        required: true, 
        default: Date.now 
    }
});

var Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;