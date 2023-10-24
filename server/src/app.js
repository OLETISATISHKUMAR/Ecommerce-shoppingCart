const express = require("express");
const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors())

const authRoute = require("./routes/auth.route")
app.use("/", authRoute)

module.exports = app;