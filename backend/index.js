const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./Routes/userRoute");
const { urlRouter } = require("./Routes/urlRoute");
const { dashboard } = require("./dashboard");
const { connecttoDb } = require("./connection");
const { checkPermission } = require("./Middlewares/restricted");

const app = express();

app.use(express.json()); //middleware for processing raw data
app.use(cors());

connecttoDb();
app.get("/dashboard", checkPermission, dashboard);
app.use("/users", userRouter);
app.use("/url", urlRouter);
app.get("/", (req, res) => res.end("Hello Backend"));

app.listen(process.env.PORT, () => {
  console.log("Server Started Sucessfully ✅", process.env.PORT);
});
