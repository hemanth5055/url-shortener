const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../Models/userModel");
const { createToken, validateToken } = require("../webtoken");
require("dotenv").config();

async function signup(req, res) {
  const user = req.body;
  let hashedpassword = await bcrypt.hash(
    user.password,
    parseInt(process.env.SALT_ROUNDS)
  );
  user.password = hashedpassword;
  try {
    const sent = await User.insertOne({ ...user });
  } catch (error) {
    return res.json({ code: 0 });
  }
  return res.json({ code: 1 });
}
async function login(req, res) {
  const user = req.body;
  const userIndb = await User.findOne({ email: user.email });
  if (!userIndb) {
    return res.end("Enter valid Email");
  } else {
    const passwordFromdb = userIndb.password;
    const result = await bcrypt.compare(user.password, passwordFromdb);
    if (result) {
      const payload = {
        name: userIndb.name,
        _id: userIndb._id,
        email: userIndb.email,
      };
      const token = createToken(payload);
      return res.json({ code: 1, token: token });
    } else {
      return res.json({ code: 0, msg: "Invalid email or password" });
    }
  }
}

module.exports = { signup, login};
