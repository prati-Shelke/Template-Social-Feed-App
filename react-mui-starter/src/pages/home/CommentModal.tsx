import React,{useState,useEffect, Fragment} from 'react'
import { Modal,Box,Card, InputAdornment, Typography, IconButton,TextField,CardContent,Avatar,CardActions, Divider } from '@mui/material'
import SimpleImageSlider from "react-simple-image-slider";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Picker from 'emoji-picker-react';
import FavoriteIcon from "@mui/icons-material/Favorite"
import { post,put,get} from '../../utils/http/httpMethods';
import './home.scss'
import moment from 'moment';
import BookmarkIcon from '@mui/icons-material/Bookmark';


function CommentModal({CurrentPostId,CommentModalOpen,setCommentModalOpen,AllUsers,CurrentUser,handleLikes,handleBookmark,fetchPost}:any) 
{
    
    const [CurrentPost,setCurrentPost] = useState<any>()
    let [Url,setUrl] = useState([])
    const [showPicker, setShowPicker] = useState(false)
    const [Comment,setComment] = useState('')
    const [ReplyId,setReplyId] = useState('')
    const [displayReply,setdisplayReply] = useState<any>([])
    

    const fetchCurrentPost = async() =>
    {
        
        let res:any = await get(`http://192.168.0.22:8080/posts/getPostById/${CurrentPostId}`)
        Url = res.postImg.map((Img:any)=>
        {
            return `http://192.168.0.22:8080/${Img.path}`
            
        })

        res.comments.map((Comment:any,ind:any)=>
        {
            displayReply[ind] = false
        })
        setdisplayReply(displayReply)

        setUrl(Url)
        setCurrentPost(res)
    }

    useEffect(() => 
    {
        fetchCurrentPost()
    }, [handleBookmark,handleLikes])
    
    console.log(CurrentPost)

    const onEmojiClick = (event:React.MouseEvent< Element,MouseEvent>, emojiObject:any) =>
    {
        setComment(Comment+emojiObject.emoji)
        setShowPicker(false);
    }
    
    //---------------------------------WHEN USER COMMENTS THE POST-----------------------------------
    const handlePost = async() =>
    {
        console.log(!ReplyId)
        if(ReplyId=='')
        {
            let res = await put(`http://localhost:8080/posts/comments/${CurrentPost._id}`,{comment:Comment})
            console.log(res)
            fetchPost()
            console.log('hi')
        }
        else
        {
            let temp = Comment.split('_')
            let res = await post(`http://localhost:8080/posts/reply/${CurrentPost._id}/${ReplyId}`,{comment:temp[1]})
            fetchPost()
            setReplyId('')
            // console.log(ReplyId,temp)
        }
       
    }
    
    //---------------------------------WHEN USER LIKES TO THE COMMENT---------------------------------
    const handleLikeToComment = async(commentId:any) => 
    {
        console.log('hi')
        let res = await put(`http://localhost:8080/posts/likeComment/${CurrentPost._id}/${commentId}`)
        console.log(res)
        fetchPost()
        fetchCurrentPost()
    }

    //---------------------------------WHEN USER LIKES TO THE COMMENT---------------------------------
    const handleLikeToReply = async(commentId:any,replyId) => 
    {
        console.log('hi')
        let res = await put(`http://localhost:8080/posts/likeReply/${CurrentPost._id}/${commentId}/${replyId}`)
        console.log(res)
        fetchPost()
        fetchCurrentPost()
    }

    //--------------------------------WHEN USER REPLY TO COMMENT-------------------------------------
    const handleReply = async(commentId:any,userName:any) => 
    {
        setComment(`@${userName}_`)
        setReplyId(commentId)
    }
    

    //------------------------------------WHEN USER WANTS TO HIDE REPLY----------------------------
    const handleHideReply = (ind:any) => 
    {
        let temp1:any =  document.getElementById(`Reply${ind}`)
        let temp2:any = document.getElementById(`AllReplies${ind}`)

        let temp3:any = document.getElementById(`cursor${ind}`)

        temp1.style.display = "block"
        temp2.style.display = "none"
        temp3.style.cursor = "default"

        displayReply[ind] = false
        setdisplayReply(displayReply)
    }
    console.log(displayReply)
    //-----------------------------------------WHEN USER WANTS DISPLAY REPLY-------------------------
    const handleDisplayReply = (ind:any) =>
    {
        let temp1:any = document.getElementById(`Reply${ind}`)
        let temp2:any = document.getElementById(`AllReplies${ind}`)
        let temp3:any = document.getElementById(`cursor${ind}`)

        temp1.style.display = "none"
        temp2.style.display = "flex"

        temp3.style.cursor = "pointer"
        displayReply[ind] = true
        setdisplayReply(displayReply)
        console.log(displayReply)
        
    }

    return (
        <div>
            { CurrentPost && 
            <Modal
                // disableAutoFocus={true}
                open={CommentModalOpen}
                onClose={()=>setCommentModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <Box>
                    <CloseOutlinedIcon sx={{color:'white',float:'right',cursor:'pointer'}} onClick={()=>setCommentModalOpen(false)}> </CloseOutlinedIcon>
                    
                    <Card id='commentModal'>
                        
                        <div style={{display:'flex'}}>
                            {Url.length > 1 ?
                                <SimpleImageSlider
                                    width={500}
                                    height={530}
                                    images={Url}
                                    showBullets={true}
                                    showNavs={true}     
                                /> :
                                <img alt="not found" src={Url} height={530} width={510} />
                            }

                            <CardContent>

                                <div style={{display:'flex'}}>
                                    {CurrentPost && AllUsers.map((user:any) =>
                                        user._id === CurrentPost.createdBy &&

                                        (
                                            <div  key={user._id} style={{display:'flex'}}>
                                                <Avatar aria-label="recipe"
                                                src={`http://192.168.0.22:8080/${user.profileImg}`}>
                                                </Avatar>

                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                    <Typography sx={{color:'#212B36',ml:2,fontWeight:600,fontSize:'14px'}}> {user.name}</Typography>
                                                    <Typography sx={{color:'#637381',ml:2,fontWeight:400,fontSize:'12px'}}> {CurrentPost.location}</Typography>
                                                    <Typography sx={{color:'#212B36',mt:0.5,ml:2,fontWeight:400,fontSize:'12px'}}> {CurrentPost.caption}</Typography>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                <Divider sx={{width:'100%',mt:1.5}} />

                                <div style={{height:'17.5rem',overflowY:'scroll'}}  >
                                    {
                                        CurrentPost.comments.map((comment:any,ind:any)=>

                                        <Fragment key={comment._id}>

                                            <div id={`cursor${ind}`} style={{marginTop:'20px',display:'flex'}} onClick={()=> displayReply[ind] && handleHideReply(ind)}>
                                                <Avatar aria-label="recipe" src={`http://192.168.0.22:8080/${comment.createdBy.profileImg}`}/>
                                                
                                                <div style={{display:'block'}}>
                                                
                                                    <div style={{display:'flex'}}>
                                                        <Typography sx={{color:'#212B36',ml:2,fontWeight:600,fontSize:'14px'}}> {comment.createdBy.name}</Typography>
                                                        <Typography sx={{color:'#637381',ml:2,fontWeight:400,fontSize:'12px'}}> {comment.comment}</Typography>
                                                        
                                                        <FavoriteIcon onClick={()=>handleLikeToComment(comment._id)} style={{ cursor:'pointer',color:`${comment.likes.includes(CurrentUser._id) ? "red" : "gray"}`}}></FavoriteIcon>
                                                    
                                                        <div style={comment.likes.length!=0 ? {display:'block',paddingTop:'1.4rem',fontSize:'14px'} : {display:'none'}}> 
                                                            {comment.likes.length} like
                                                        </div>
                                                    </div>

                                                    <div style={{display:'flex'}}>
                                                        <Typography sx={{color:'#637381',ml:2,mt:-2,fontWeight:400,fontSize:'12px'}}> {moment(comment.createdAt).fromNow()}</Typography>
                                                        <Typography sx={{color:'#637381',ml:2,mt:-2,fontWeight:400,fontSize:'12px',cursor:'pointer'}} onClick={()=> handleReply(comment._id,comment.createdBy.name)}> Reply </Typography>
                                                    </div>
                                                </div>
                                            </div>

                                            <div  style={{marginLeft:'2.5rem'}}>

                                                <Typography id={`Reply${ind}`} sx={comment.reply.length!=0 ? {color:'#637381',ml:2,fontWeight:400,fontSize:'12px',cursor:'pointer'}:{display:'none'}} onClick={()=>handleDisplayReply(ind)}> -- &nbsp; {comment && comment.reply.length} Replies </Typography>
                                                
                                                {comment.reply.map((reply:any)=>
                                                    
                                                    <div key={reply._id} id={`AllReplies${ind}`} style={{marginTop:'20px',display:'none'}} >
                                                        <Avatar aria-label="recipe" src={`http://192.168.0.22:8080/${reply.repliedBy.profileImg}`}/>
                                                        
                                                        <div style={{display:'block'}}>
                                                        
                                                            <div style={{display:'flex'}}>
                                                                <Typography sx={{color:'#212B36',ml:2,fontWeight:600,fontSize:'14px'}}> {reply.repliedBy.name}</Typography>
                                                                <Typography sx={{color:'#637381',ml:2,fontWeight:400,fontSize:'12px'}}> {reply.comment}</Typography>
                                                                
                                                                <FavoriteIcon onClick={()=>handleLikeToReply(comment._id,reply._id)} style={{ cursor:'pointer',color:`${reply.likes.includes(CurrentUser._id) ? "red" : "gray"}`}}></FavoriteIcon>
                                                            
                                                                <div style={comment.likes.length!=0 ? {display:'block',paddingTop:'1.4rem',fontSize:'14px'} : {display:'none'}}> 
                                                                    {reply.likes.length} like
                                                                </div>
                                                            </div>

                                                            <div style={{display:'flex'}}>
                                                                <Typography sx={{color:'#637381',ml:2,mt:-2,fontWeight:400,fontSize:'12px'}}> {moment(reply.repliedAt).fromNow()}</Typography>
                                                                {/* <Typography sx={{color:'#637381',ml:2,mt:-2,fontWeight:400,fontSize:'12px',cursor:'pointer'}} onClick={()=> handleReply(comment._id,comment.createdBy.name)}> Reply </Typography> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                               
                                
               
                                
                                <CardActions>

                                    <IconButton aria-label="add to favorites" onClick={()=>handleLikes(CurrentPost._id)} >
                                        <FavoriteIcon sx={CurrentPost.likes.includes(CurrentUser._id)? { fill: "red" }: { color: "" }}></FavoriteIcon>
                                    </IconButton>

      
                                    <BookmarkIcon sx={CurrentPost.bookmarks.includes(CurrentUser._id)? {color:"black",marginLeft:'18rem',cursor:'pointer'} : {color:'rgb(143, 142, 142)',marginLeft:'18rem',cursor:'pointer'}} onClick={()=>handleBookmark(CurrentPost._id)}></BookmarkIcon>
                                    
                                </CardActions>

                                <div style={CurrentPost.likes.length!=0 ? {display:'block',paddingLeft:'10px',marginTop:'-15px',fontSize:'14px'} : {display:'none'}}> 
                                    {CurrentPost.likes.length} like
                                </div>

                                <div>
                                    <Typography sx={{paddingLeft:'10px',fontSize:'12px',fontWeight:400,color: "#637381",cursor:'pointer'}}>
                                        {moment(CurrentPost.createdAt).fromNow()}
                                    </Typography>
                                </div>


                                <Divider sx={{mt:2}}/>
                                <CardActions >
                                    <img className="emoji-icon" style={{height:'20px',color: "#000000"}} src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg" onClick={() => setShowPicker((val) => !val)}/>
                                        {showPicker && (
                                            <Picker
                                                pickerStyle={{position:'absolute',top:'10rem',width:'43%' }}
                                                onEmojiClick={onEmojiClick}
                                            />
                                        )}

                                    <TextField
                                         
                                        sx={{paddingLeft:'10px',width:'20rem'}} 
                                        InputProps={{disableUnderline: true,endAdornment: (
                                            <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                color="primary"
                                                style={{ fontSize: "16px",fontWeight:700 }}
                                                onClick={handlePost}
                                            >
                                                Post
                                            </IconButton>
                                            </InputAdornment>
                                        )}} 
                                        id="standard-basic" 
                                        placeholder="Add a comment...." 
                                        variant="standard"
                                        value={Comment}
                                        onChange = {(e:any)=> setComment(e.target.value)}
                                    />
                        
                                </CardActions>
                            </CardContent>
                            
                        </div>
                    </Card>
                </Box>
            </Modal>
            }
        </div>
    )
}

export default CommentModal