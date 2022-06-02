const httpStatus = require('http-status');
const {Post, User} = require('../models');
const ApiError = require('../utils/ApiError');

//----------------------------------------SERVICE TO CREATE POST----------------------------------
/**
 * Create a user
 * @param {Object} postBody
 * @param {Object} postImg
 * @returns {Promise<Post>}
 */
const createPost = async (postBody,postImg,userId) => 
{
    return Post.create({...postBody , createdBy:userId ,postImg : postImg.path});
}


//--------------------------------------------SERVICE TO LIKE THE POST----------------------------
/**
 * Create a user
 * @param {ObjectId} userId
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */


const likePost = async(postId,userId) =>
{
    try 
    {
        const post = await Post.findById(postId)
        if(post)
        {
            if(userId)
            {
                if (!post.likes.includes(userId)) 
                {
                    await post.updateOne({ $push: { likes: userId } })
                    return Post.findById(postId)
                    // resp.status(200).json({message:"The post has been liked"})
                } 
                else 
                {
                    await post.updateOne({ $pull: { likes: userId } })
                    return Post.findById(postId)
                    // return res.status(200).json({message:"The post has been disliked"})
                }
            }
        }
       
    } catch (err) {
        // resp.status(500).json({message:err.message})
        throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found');
    }
}


//--------------------------------------------SERVICE TO ADD COMMENT TO THE POST----------------------------
/**
 * Create a user
 * @param {ObjectId} userId
 * @param {ObjectId} postId
 * @param {Object} commentBody
 * @returns {Promise<Post>}
 */


 const commentPost = async(postId,userId,commentBody) =>
 {
     try 
     {
        const post = await Post.findById(postId)
        // console.log("hi"+post)
        if(post)
        {
            if(commentBody.comment)
            {
                await post.updateOne({ $push: { comments: {comment:commentBody.comment , createdBy:userId}}})
                return Post.findById(postId)
                // resp.status(200).json({message:"The comment has been added"})
            }
            else
            {
                throw new ApiError(httpStatus.BAD_REQUEST, 'caption can not be null');
            }
        }
    } catch (err) {
        // resp.status(500).json({message:err.message})
        throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found');
    }
}

//--------------------------------------------SERVICE TO BOOKMARK THE POST----------------------------
/**
 * Create a user
 * @param {ObjectId} userId
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */


const bookmarkPost = async(postId,userId) =>
{
    try 
    {
        const post = await Post.findById(postId)
        if(post)
        {
            if(userId)
            {
                if (!post.bookmarks.includes(userId)) 
                {
                    await post.updateOne({ $push: { bookmarks: userId } })
                    await User.findByIdAndUpdate(userId,{$push :{ bookmarks:postId}})
                    
                    return Post.findById(postId)
                } 
                else 
                {
                    await post.updateOne({ $pull: { bookmarks: userId } })
                    await User.findByIdAndUpdate(userId,{$pull :{ bookmarks:postId}})
                    return Post.findById(postId)   
                }
            }
        }
        
    } catch (err) {
         // resp.status(500).json({message:err.message})
         throw new ApiError(httpStatus.BAD_REQUEST, 'Post not found');
    }
}
 


  
//------------------------------------------------FOR PAGINATION-----------------------------
/**
 * Query for users
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (_, options) => 
{
    let posts = await Post.paginate(_, options)
    return posts; 
}

module.exports = {createPost,likePost,commentPost,queryUsers,bookmarkPost}