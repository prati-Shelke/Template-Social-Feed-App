const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const postService = require('../services/post.service')
const pick = require('../utils/pick');

//------------------------------------------TO CREATE THE POST-----------------------------------
const createPost = catchAsync(async (req, res) => 
{
  
    let post = await postService.createPost(req.body,req.files,req.user.id)
    post = await post.populate("createdBy","_id name profileImg")
    res.status(httpStatus.CREATED).send(post);
    
})

//--------------------------------------------TO GET POSTS BY PAGINATION----------------------------
const getPosts = catchAsync(async (req,res) =>
{
    let temp
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    let post = await postService.queryUsers(null,{...options,populate:[{path:"comments.createdBy",select:"_id name profileImg"}]})
    res.status(httpStatus.OK).send(post)
})

//-----------------------------------------TO LIKE THE POST---------------------------------------
const likePost = catchAsync(async(req,res) =>
{
    let post = await postService.likePost(req.params.postId,req.user.id)
    res.status(httpStatus.CREATED).send(post);
})


//-----------------------------------------TO COMMENT THE POST---------------------------------------
const commentPost = catchAsync(async(req,res) =>
{
    let post = await postService.commentPost(req.params.postId , req.user.id , req.body)
    post = await post.populate({path:"comments.createdBy",select:"_id name profileImg"})
    // console.log(post)
    res.status(httpStatus.CREATED).send(post);
})


//-----------------------------------------TO BOOKMARK THE POST---------------------------------------
const bookmarkPost = catchAsync(async(req,res) =>
{
    let post = await postService.bookmarkPost(req.params.postId , req.user.id)
    res.status(httpStatus.CREATED).send(post);
})


module.exports = {createPost,likePost,commentPost,getPosts,bookmarkPost}