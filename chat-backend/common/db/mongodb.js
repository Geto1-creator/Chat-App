const mongoose = require("mongoose");
require("dotenv").config()

const MONGODB_URI =
    process.env.MONGODB_URI

const connect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(MONGODB_URI);

        console.log("Database is successfully connected");
    } catch (error) {
        console.log(error);
        console.log("Failed to connect");
        throw new Error(error);

    }
};

module.exports = connect;
