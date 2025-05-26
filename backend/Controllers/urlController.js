const shortId = require("short-unique-id");
const uid = new shortId({ length: 6 });
const { Url } = require("../Models/urlModel");
async function createShortUrl(req, res) {
  const data = req.body;
  const ShortedId = uid.rnd();
  const tobeSent = {
    shortedUrl: uid.rnd(),
    mainUrl: data.url,
    userId: data.userId,
    visits: 0,
  };
  const result = await Url.insertOne({ ...tobeSent });
  const urls = await Url.find({ userId: data.userId }).sort({ createdAt: -1 });
  return res.json({ urls: urls });
}
async function redirectUrl(req, res) {
  const shortId = req.params.urlId;
  const data = await Url.findOne({ shortedUrl: String(shortId) });
  if (!data) {
    return res.end("Use a Valid URL");
  }
  const result = await Url.updateOne(
    { shortedUrl: String(shortId) },
    { $inc: { visits: 1 } }
  );
  const urlToredirect = data.mainUrl;
  return res.json({ redirectto: urlToredirect });
  // return res.redirect(urlToredirect);
}
async function deleteUrl(req, res) {
  const data = req.body;
  try {
    const result = await Url.deleteOne({ _id: data._id });
    if (result) {
      return res.json({ code:1,msg: "Deleted URL Successfully" });
    }
    return res.json({ code:0,msg: "Something went wrong" });
  } catch (error) {
    return res.json({code:0, msg:error.message });
  }
}

module.exports = { createShortUrl, redirectUrl,deleteUrl };
