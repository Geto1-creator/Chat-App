const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const result = await User.find({});
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(1);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPass,
      roles: role,
    });
    res.status(201).json(user);
  } catch (err) {
    res.send(err);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  try {
    const accessToken = jwt.sign(
      { email: user.email, password: user.password, role: user.roles },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ accessToken: accessToken });
  } catch (err) {
    res.send(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findById({ _id: id });
    res.send(result);
  } catch {
    res.send(error);
  }
};
