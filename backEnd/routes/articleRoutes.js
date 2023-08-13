const express = require("express");
const router = express.Router();
const articleController = require("../Controllers/articleController");
const userController = require("../controllers/userController");
const authn=require("../middleware/authn");


// User registration route
router.post("/register", userController.registerUser);

// User login route
router.post("/login", authn,userController.loginUser);

router.get("/", articleController.getArticles);
router.post("/", articleController.createArticle);
router.post("/:id/like", articleController.likeArticle);
router.get("/top", articleController.getTopArticles);

module.exports = router;
