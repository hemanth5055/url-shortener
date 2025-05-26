const express = require("express");
const urlRouter = express.Router();
const {
  createShortUrl,
  redirectUrl,
  deleteUrl,
} = require("../Controllers/urlController");
const { checkPermission } = require("../Middlewares/restricted");
urlRouter.post("/create", checkPermission, createShortUrl);
urlRouter.post("/delete", checkPermission, deleteUrl);
urlRouter.get("/redirect/:urlId", redirectUrl);

module.exports = { urlRouter };
