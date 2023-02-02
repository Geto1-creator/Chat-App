const express = require("express"),
    cors = require("cors");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signUpMiddleWare, checkUser, verifyToken } = require("../common/db/middleware/userMiddleware");
const { getUsers, createUser, getUser, loginUser } = require("../controllers/userController");


router
    .get('/users', getUsers)
    .get('/user/:id', getUser)
    .post("/users", signUpMiddleWare, createUser)
    .post("/login", checkUser, loginUser)
    .get('/token', verifyToken)


exports.userRoutes = router;
