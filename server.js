'use strict';

/* Packages */
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var port = process.env.PORT || 8080;
var app = express();

/* Routes */
var todosRoute = require('./routes/todos.js');

/* Connect to Mongo */
mongoose.connect("mongodb://localhost:27017/todos");
var db = mongoose.connection;
db.on("error", function (err) {
    console.error("\x1b[31m%s\x1b[0m", "Connection error:", err);
});
db.once("open", function () {
    console.log("\x1b[36m%s\x1b[0m", "Connected to Mongo");
});

/* Middleware */
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

// Register 'todos' Route
app.use("/api/todos", todosRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

// Start Server
app.listen(port, function () {
    console.log("\x1b[36m%s\x1b[0m", "Server up and running on port:", port);
});