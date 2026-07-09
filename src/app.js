const express = require("express");
const pool = require("./config/database");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "CRUD API is running"
    });
});

app.get("/health", async (req, res) => {
    try {
        await pool.query("SELECT NOW()");

        res.status(200).json({
            status: "UP",
            application: "Running",
            database: "Connected"
        });
    } catch (error) {
        res.status(500).json({
            status: "DOWN",
            application: "Running",
            database: "Disconnected",
            error: error.message
        });
    }
});

module.exports = app;