const express = require("express");

const app = express();

app.get("/health", (req, res) => {
  res.send("Chat Server is Running");
});

app.module.exports = app;
