const express = require("express");
const router = express.Router();
const adminLayout = "../views/layouts/admin";
const No_adminLayout = "../views/layouts/admin_Nologout";
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Post = require("../models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_Secret = `${process.env.JWT_SECRET}`;

/**
 * Check Login
 */

const checkLogin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect("/admin");
  } else {
    try {
      const decode = jwt.verify(token, jwt_Secret);
      req.userId = decode.userId;
      next();
    } catch (err) {
      res.redirect("/admin");
    }
  }
};

// Admin Page
// get /admin

router.get("/admin", (req, res) => {
  const locals = {
    title: "관리자 페이지",
  };

  res.render("admin/index", { locals, layout: No_adminLayout });
});

router.post(
  "/admin",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign({ id: user._id }, jwt_Secret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/allPosts");
  })
);

// Get allpost
// / allpost

router.get(
  "/allPosts",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = {
      title: "Posts",
    };
    const data = await Post.find();
    res.render("admin/allPosts", { locals, data, layout: adminLayout });
  })
);

// logout
// GET /logout

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// 게시물 상세 보기
// get /POST/:id

router.get(
  "/post/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    const data = await Post.findOne({ _id: req.params.id });
    res.render("post", { data, layout: adminLayout });
  })
);

// admin - Add post
// get /add

router.get(
  "/add",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = {
      title: "게시물 작성",
    };
    res.render("admin/add", { locals, layout: adminLayout });
  })
);

// admin -add post
//  Post /add

router.post(
  "/add",
  checkLogin,
  asyncHandler(async (req, res) => {
    const { title, body } = req.body;
    const newPost = new Post({
      title: title,
      body: body,
    });

    await Post.create(newPost);
    res.redirect("/allPosts");
  })
);

/**
 * admin - edit post
 * Get /edit/:id
 */

router.get(
  "/edit/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = { title: "게시물 편집" };
    const data = await Post.findOne({ _id: req.params.id });
    res.render("admin/edit", { locals, data, layout: adminLayout });
  })
);

/**
 * admin - edit post
 * Put /edit/:id
 */

router.put(
  "/edit/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      createAt: Date.now(),
    });
    res.redirect("/allPosts");
  })
);

// admin - Delete Post
// Delete /delete/:id

router.delete(
  "/delete/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect("/allPosts");
  })
);

module.exports = router;
