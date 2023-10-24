const express = require("express")
const authController = require("../controllers/auth.controller")
const route = express.Router()

route.post("/register-user", authController.create)
route.post("/login-user", authController.login)
module.exports = route