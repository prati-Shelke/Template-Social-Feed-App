const mongoose = require('mongoose');
const { paginate, softDelete } = require('./plugins');
const Schema = mongoose.Schema;



const postSchema = mongoose.Schema(
    {
        postImg:{ type:Array ,require:true },
        location:{type:String},
        caption:{ type:String , require:true },
        likes:{ type:Array, default:[] },
        comments:{ type:[
                            {
                                comment : String ,
                                likes : {type:Array , default:[]},
                                createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
                                createdAt: {type:Date , default:new Date()},
                                reply :{type: 
                                        [{
                                            repliedBy: { type: Schema.Types.ObjectId, ref: 'User' },
                                            comment:{type:String},
                                            likes:{type:Array , default:[]},
                                            repliedAt:{type:Date , default:new Date()}
                                        }]
                                    }
                            }
                        ]},
        bookmarks : { type:Array ,default:[]},
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
)


postSchema.plugin(softDelete);
postSchema.plugin(paginate);

postSchema.pre('save', function(next) 
{
    this.createdAt = Date.now();
    next();
});


module.exports = mongoose.model('Post', postSchema);