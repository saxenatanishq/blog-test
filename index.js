const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const userRoute = require("./routes/user");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const CheckAuth = require("./middlewares/auth");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");

mongoose.connect(process.env.MONGO_URL).then((e) => {
  console.log("MongoDB connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(CheckAuth("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allblogs = await Blog.find({});
  return res.render("home", {
    user: req.user,
    blogs: allblogs,
  });
});

app.use("/users", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`);
});
