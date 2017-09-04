"use strict";

var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');

var Todo = require("../models/todo");

router.get('/', function(req, res, next) {
    Todo.find(function(err, todos){
        if (err) return next(err);
        res.json(todos);
    })
    // res.json({message: 'API working!'})
});

router.post('/', function(req, res, next) {
    var todo = new Todo(req.body);
    todo.status = false;
    todo.save(function(err, todo) {
        if (err) return next(err);
        res.status(201);
        res.json({message: "Todo Created!", todo: todo});
    });
});

router.param("id", function (req, res, next, id) {
    id = mongoose.Types.ObjectId(req.params.id);
    Todo.findById(id).exec(function (err, todo) {
        if (err) return next(err);
        if (!todo) { err = new Error("Not Found"); err.status = 404; return next(err); }
        req.todo = todo
        return next();
    });
});

router.get('/:id', function(req, res, next) {
    res.json(req.todo);
});

router.put('/:id', function (req, res, next) {
    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, function (err, todo) {
        if (err) return next(err);
        if (!todo) { err = new Error("Todo Not Found"); err.status = 404; return next(err); }
        res.json({ message: "Todo updated!", todo: todo });
    });
});

router.delete('/:id', function (req, res, next) {
    req.todo.remove(function(err){
        if (err) return next(err);
        res.json({ message: "Todo deleted!" });
    });
});

module.exports = router;