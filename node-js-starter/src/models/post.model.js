const mongoose = require('mongoose');
const { paginate, softDelete } = require('./plugins');
const Schema = mongoose.Schema;



const postSchema = mongoose.Schema(
    {
        postImg:{ type:String ,require:true },
        caption:{ type:String , require:true },
        likes:{ type:Array, default:[] },
        comments:{ type:[
                            {
                                comment : String ,
                                likes : {type:Array , default:[]},
                                createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
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


module.exports = mongoose.model('Post', postSchema);