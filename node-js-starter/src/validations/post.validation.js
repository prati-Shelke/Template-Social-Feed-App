const Joi = require('joi');
const {  objectId } = require('./custom.validation');


const createPost = 
{
    body: Joi.object().keys(
        {
            postImg: Joi.string(),
            caption: Joi.string().required(),
            location:Joi.string(),
            createdBy : Joi.string()
        })
}


const likePost = 
{
    params: Joi.object().keys({
        postId: Joi.required().custom(objectId),
      })
}


const commentPost = 
{
    params: Joi.object().keys({
        postId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        comment: Joi.string().required()
    })
}

module.exports = {createPost,likePost,commentPost}