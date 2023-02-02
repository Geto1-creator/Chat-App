const { User } = require("../../../models/userModel");


exports.signUpMiddleware = async (req, res, next) => {
    const {email, password}  =req.body;
    const isAlready = await User.find({})
}

