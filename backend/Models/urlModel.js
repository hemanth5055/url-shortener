const mongoose = require("mongoose");
const urlschema = mongoose.Schema(
  {
    shortedUrl: {
      type: String,
      required: true,
      unique: true,
    },
    mainUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    visits: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Url = mongoose.model("urls", urlschema);
module.exports = { Url };
