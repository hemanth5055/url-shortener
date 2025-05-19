const express = require("express");
const { validateToken } = require("../webtoken");
require("dotenv").config();

const checkPermission = async (req, res, next) => {
  const headers = req.headers;
  if (headers.authorization || headers.Authorization) {
    const token = headers.authorization.split(" ")[1];
    try {
      const result = validateToken(token, process.env.JWT_KEY);
      if (result) {
        req.user = result;
        next();
      }
    } catch (error) {
      return res.end("Not allowed 1");
    }
  } else {
    return res.end("Not allowed");
  }
};
module.exports = { checkPermission };
