import React,{useState,useEffect} from 'react'
import { Container, IconButton } from '@mui/material'
import './home.scss'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card } from '@mui/material';
import { get,post,put } from '../../utils/http/httpMethods';
import { Skeleton } from '@mui/material';
import { CardMedia,CardContent,CardActions } from '@mui/material';
import FavoriteIcon from "@mui/icons-material/Favorite"
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse } from '@mui/material';
import { Avatar } from '@mui/material';
import { CardHeader } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import moment from 'moment';
import Picker from 'emoji-picker-react';
import { InputAdornment } from '@mui/material';
import SimpleImageSlider from "react-simple-image-slider";
import CommentModal from './CommentModal';


function Home() 
{

    const [AllPosts, setAllPosts] = useState([]);
    const [AllUsers,setAllUsers] = useState([])
    const [CurrentUser,setCurrentUser] = useState((JSON.parse(localStorage.getItem('currentUser') as any))||{})
    const [showPicker, setShowPicker] = useState(false)
    let [Url,setUrl] = useState([])
    const [Comment,setComment] = useState('')
    const [CommentModalOpen,setCommentModalOpen] = useState(false)
    const [CurrentPostId,setCurrentPostId] = useState('')
 
    //-------------------------------FOR GETTING ALL POSTS----------------------------------------
    const fetchPost = async() =>
    {
        return get("http://localhost:8080/posts/getPosts?sortBy=desc&limit=200&page=1")
        .then((res:any)=>
            {   
                setAllPosts(res.results)
                // history.push("/auth/login")
                // window.location.reload()

                Url = res.results.map((post:any)=>
                {
                    return post.postImg.map((Img:any)=>
                    {
                        return `http://192.168.0.22:8080/${Img.path}`
                    })
                })
                setUrl(Url)
            }
        )
    }


    //------------------------------------FOR GETTING ALL THE USERS-------------------------------
    const fetchUser = async() =>
    {
        return get("http://localhost:8080/users")
        .then((res:any)=>
            {   
                setAllUsers(res.results)

                res.results.map((user:any) =>
                {
                    user._id === CurrentUser._id && localStorage.setItem('currentUser',JSON.stringify(user))
                })
                // history.push("/auth/login")
                // window.location.reload()
            }
        )
    }
   
    useEffect(() => 
    {
        fetchPost()
        fetchUser()
    }, [])

    
 
    const onEmojiClick = (event:React.MouseEvent< Element,MouseEvent>, emojiObject:any) =>
    {
        setShowPicker(false);
    }

    //-------------------------------WHEN USER LIKES OR DISLIKES THE POST-----------------------------
    const handleLikes = async (postId:any) => 
    {
        
        const res = await put(`http://localhost:8080/posts/likes/${postId}`);
        fetchPost()
        console.log(res)
    }

    //--------------------------------WHEN USER BOOKMARK THE POST-------------------------------------
    const handleBookmark = async(postId:any) =>
    {
        const res = await post(`http://localhost:8080/posts/bookmarkPost/${postId}`)
        fetchPost()
        fetchUser()
        console.log(res)
    }
    
    
    //---------------------------------WHEN USER COMMENTS THE POST-----------------------------------
    const handleComment = async(postId:any) =>
    {

        let res = await put(`http://localhost:8080/posts/comments/${postId}`,{comment:Comment})
        console.log(res)
        fetchPost()
    }

    // console.log(AllUsers,AllPosts)

    return (
        <Container maxWidth="sm" >
            {AllPosts && AllPosts.map((post:any,ind:any) =>
                <Card key={post._id} id="postCard" sx={{marginTop:'40px'}}>
                    { AllUsers && AllUsers.map((user:any,ind) =>
                        user._id === post.createdBy &&
                        (<CardHeader
                            key={user._id}
                            avatar={
                                <Avatar aria-label="recipe"
                                    src={`http://192.168.0.22:8080/${user.profileImg}`}>
                                </Avatar>
                            }
                            action={
                            <IconButton aria-label="settings">
                                {/* <MoreVertIcon /> */}
                            </IconButton>
                            }
                            title={user.name}
                            subheader={post.location}
                            sx={{marginTop:'-10px'}}
                        />)
                    )}

                    { post.postImg.length === 1 ? post.postImg.map((img:any) =>
                       
                            (<CardMedia
                                key={post._id}
                                component="img"
                                height="194"
                                image={`http://192.168.0.22:8080/${img.path}`}
                                alt="Paella dish"
                                sx={{width: "508px",height: "508px"}}
                            />))
                        :
                            (
                                <SimpleImageSlider
                                    // key={}
                                    width={508}
                                    height={468}
                                    images={Url[ind]}
                                    showBullets={true}
                                    showNavs={true}
                                    
                                />
                            )

                    }

                    <CardActions disableSpacing>

                        <IconButton aria-label="add to favorites" onClick={()=>handleLikes(post._id)} >
                            <FavoriteIcon sx={post.likes.includes(CurrentUser._id)? { fill: "red" }: { color: "" }}></FavoriteIcon>
                        </IconButton>

                        <IconButton aria-label="share" onClick={()=> {setCurrentPostId(post._id);setCommentModalOpen(true)}}>
                            <ChatBubbleOutlineIcon id='commentIcon' ></ChatBubbleOutlineIcon>
                        </IconButton>

                        <IconButton aria-label="share" sx={{marginLeft:'365px'}} onClick={()=>handleBookmark(post._id)}>
                            <BookmarkIcon sx={post.bookmarks.includes(CurrentUser._id)? {color:"black"} : {color:''}} ></BookmarkIcon>
                        </IconButton>

                    </CardActions>

                        <div style={post.likes.length!=0 ? {display:'block',paddingLeft:'10px',marginTop:'-10px',fontSize:'14px'} : {display:'none'}}> 
                            {post.likes.length} like
                        </div>

                    <CardActions sx={{marginTop:'-15px'}}>
                            {AllUsers && AllUsers.map((user:any) =>
                            user._id === post.createdBy &&
                            (
                                <div key={user._id} style={{display:'flex'}}>
                                    <p style={{fontSize:'14px',fontWeight:600}}> {user.name} :  </p> &nbsp;
                                    <p style={{fontSize:'14px',fontWeight:400}}> {post.caption}</p>
                                </div>
                            ))}
                    </CardActions>

                    <CardActions>
                        {post.comments.length!==0 ?  
                        <Typography sx={{fontSize:'14px',fontWeight:400,marginTop:'-35px',color: "#919EAB",cursor:'pointer'}} onClick={()=> {setCurrentPostId(post._id);setCommentModalOpen(true)}}>
                            View all {post.comments.length} comments
                        </Typography>
                        :
                        <Typography sx={{fontSize:'14px',fontWeight:400,marginTop:'-35px',color: "#919EAB",cursor:'pointer'}}>
                            No comments yet...
                        </Typography>
                        }
                    </CardActions>

                    <CardActions>
                        <Typography sx={{fontSize:'12px',fontWeight:400,marginTop:'-28px',color: "#637381",cursor:'pointer'}}>
                            {moment(post.createdAt).fromNow()}
                        </Typography>
                    </CardActions>
                       
                    <CardActions  sx={{marginTop:'-10px'}}>
                        <img className="emoji-icon" style={{height:'20px',color: "#000000"}} src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg" onClick={() => setShowPicker((val) => !val)}/>
                            {showPicker && (
                                <Picker
                                    pickerStyle={{position:'absolute',top:"50px",left:'30px',width:'450px',height:'200px',marginBottom:'20px' }}
                                    onEmojiClick={onEmojiClick}
                                />
                            )}
                        <TextField 
                            sx={{paddingLeft:'10px',width:'28rem'}} 
                            InputProps={{disableUnderline: true,endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    edge="end"
                                    color="primary"
                                    style={{ fontSize: "16px",fontWeight:700 }}
                                    onClick={()=> handleComment(post._id)}
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
                            
                </Card>
            )}
            {CommentModalOpen == true && <CommentModal CurrentPostId={CurrentPostId} CommentModalOpen={CommentModalOpen} setCommentModalOpen={setCommentModalOpen} AllUsers={AllUsers} CurrentUser={CurrentUser} handleLikes={handleLikes} handleBookmark={handleBookmark} fetchPost={fetchPost}/>}
        </Container>
    )
}

export default Home