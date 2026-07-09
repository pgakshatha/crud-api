const express = require("express");

const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
    res.json({
        message: "CRUD API is running"
    });
});

module.exports = app;