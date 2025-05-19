const express = require("express");
const urlRouter = express.Router();
const { createShortUrl, redirectUrl } = require("../Controllers/urlController");
const { checkPermission } = require("../Middlewares/restricted");
urlRouter.post("/create", checkPermission, createShortUrl);
urlRouter.get("/redirect/:urlId", redirectUrl);

module.exports = { urlRouter };
