const express = require("express"),
    cors = require("cors");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { getUsers, createUser, getUser } = require("../controllers/userController");


router
    .get('/users', getUsers)
    .get('/user/:id', getUser)
    .post("/users", createUser)


exports.userRoutes = router;
