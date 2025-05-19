const { Url } = require("./Models/urlModel");
async function dashboard(req, res) {
  const user = req.user;
  const urls = await Url.find({ userId: user._id }).sort({ createdAt: -1 });
  console.log(urls);
  return res.json({ user: user, urls: urls });
}
module.exports = { dashboard };
