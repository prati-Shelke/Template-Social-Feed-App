const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const postValidation = require("../validations/post.validation");
const postController = require("../controllers/post.controller");
const multer = require("../middlewares/multer");
const { route } = require("./auth.route");

const router = express.Router();

router.use(auth())

router
  .route("/")
  .post(multer.post.array("postImg"),validate(postValidation.createPost), postController.createPost);
//   .get(validate(userValidation.getUsers), userController.getUsers); 

router
  .route("/likes/:postId")
  .put(validate(postValidation.likePost),postController.likePost)

router
  .route("/comments/:postId")
  .put(validate(postValidation.commentPost) , postController.commentPost)
module.exports  = router


router
  .route("/likeComment/:postId/:commentId")
  .put(postController.likeToComment)


router  
  .route("/bookmarkPost/:postId")
  .post(postController.bookmarkPost)

router  
  .route("/getPosts")
  .get(postController.getPosts)

router  
  .route("/getPostById/:postId")
  .get(postController.getPostById)

router
  .route("/reply/:postId/:commentId")
  .post(postController.replyToComment)

router
  .route("/likeReply/:postId/:commentId/:replyId")
  .put(postController.likeToReply)
