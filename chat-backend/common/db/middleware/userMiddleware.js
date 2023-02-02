const { User } = require("../../../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.signUpMiddleWare = async (req, res, next) => {
    const { email, password, username } = req.body;
    const isAlreadyEmail = await User.findOne({ email: email });
    const isAlreadyUsername = await User.findOne({ username: username });

    try {
        if (isAlreadyEmail !== null) {
            res.status(409).send("That email is already registered");
            return;
        }
        if (isAlreadyUsername !== null) {
            res.status(409).send("That username is already registered");
            return
        }
        next();
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).send(err);
        console.log('aldaa')
    }
}

exports.checkUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    try {
        if (user) {
            if (user.email !== null && user.password !== null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    next();
                } else {
                    res.status(401).json({ message: "Invalid password" });
                }
            } else {
                res.status(401).json({ message: "Unreadable password or email" });
            }
        } else {
            res.status(401).json({ message: "Email not found" });
        }
    } catch (err) {
        res.send(err)
        console.log('login aldaa')
    }

};

exports.verifyToken = async (req, res, next) => {

    const token = req.headers.authorization
    console.log(token, "authenticateToken");
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, result) => {
        if (err) {
            res.send(err);
        } else {
            const email = result.email;
            const user = await User.findOne({ email: email });
            res.send(user);

        }
    });


}