require("dotenv").config();
const mongoose = require("mongoose");
const connecttoDb = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Successfully connected to Database"))
    .catch((err) => console.log(err));
};
module.exports = { connecttoDb };
