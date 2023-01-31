const { Schema, types, model } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: [isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Minimum password length is 6 character"],
  },
  createdAt: { type: Date, default: Date.now() },

  roles: { type: Object, default: { User: 200 } },
});

const User = model("User", userSchema);

exports.User = User;
