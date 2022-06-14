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
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    let post = await postService.queryUsers(null,{...options,populate:[{path:"comments.createdBy",select:"_id name profileImg"},{path:"comments.reply.repliedBy",select:"_id name profileImg"}]})
    res.status(httpStatus.OK).send(post)
})

//--------------------------------------------TO GET ONE POST BY ID----------------------------
const getPostById = catchAsync(async (req,res) =>
{
    const {postId} = req.params
    const post = await(await postService.getPostById(postId)).populate([{path:"comments.createdBy",select:"_id name profileImg"},{path:"comments.reply.repliedBy",select:"_id name profileImg"}])
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
    res.status(httpStatus.CREATED).send(post);
})


//-----------------------------------------TO LIKE THE COMMENT---------------------------------------
const likeToComment = catchAsync(async(req,res) =>
{
    const {postId,commentId} = req.params
    let post = await postService.likeToComment(postId,commentId,req.user.id)
    res.status(httpStatus.CREATED).send(post);
})



//------------------------------------------REPLY TO COMMENT------------------------------------------
const replyToComment = catchAsync(async(req,res) =>
{
    const {postId,commentId} = req.params
    if(req.body.comment)
    {
        let post = await postService.replyToComment(postId , commentId , req.user.id , req.body)
        post = await post.populate({path:"comments.reply.repliedBy",select:"_id name profileImg"})
        res.status(httpStatus.CREATED).send(post);
    }
    else
    {
        res.status(httpStatus.BAD_REQUEST).json({message:"comment can not be null"})
    }
   
})

//-----------------------------------------TO LIKE THE REPLY ---------------------------------------
const likeToReply = catchAsync(async(req,res) =>
{
    const {postId,commentId,replyId} = req.params
    let post = await postService.likeToReply(postId,commentId,replyId,req.user.id)
    res.status(httpStatus.CREATED).send(post);
})


//-----------------------------------------TO BOOKMARK THE POST---------------------------------------
const bookmarkPost = catchAsync(async(req,res) =>
{
    let post = await postService.bookmarkPost(req.params.postId , req.user.id)
    res.status(httpStatus.CREATED).send(post);
})


module.exports = {createPost,getPostById,likePost,commentPost,likeToComment,replyToComment,likeToReply,getPosts,bookmarkPost}