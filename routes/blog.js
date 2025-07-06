const { Router } = require("express");
const router = Router();
const Blog = require("../models/blog");
const multer = require("multer");
const path = require("path");
const Comment = require("../models/comment");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    return cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/addNew", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/addNew", upload.single("coverImage"), async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.create({
    title,
    content,
    createBy: req.user._id,
    coverImage: `/uploads/${req.file.filename}`,
  });
  return res.redirect("/");
});

// Dynamic routes should come AFTER specific routes
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

router.post("/comment/:blogId", async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    createdBy: req.user._id,
    blogId: req.params.blogId,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
