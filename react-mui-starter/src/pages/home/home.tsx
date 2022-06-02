import React,{useState,useEffect} from 'react'
import { Container, IconButton } from '@mui/material'
import './home.scss'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card } from '@mui/material';
import { get } from '../../utils/http/httpMethods';
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
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function Home() 
{

    const [AllPosts, setAllPosts] = useState([]);
    const [AllUsers,setAllUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    

    useEffect(() => 
    {
        const fetchPost = async() =>
        {
            return get("http://localhost:8080/posts/getPosts?sortBy=desc&limit=5&page=1")
            .then((res:any)=>
                    {   
                        setAllPosts(res.results)
                        // history.push("/auth/login")
                        // window.location.reload()
                    }
            )
        }

        const fetchUser = async() =>
        {
            return get("http://localhost:8080/users")
            .then((res:any)=>
                    {   
                        setAllUsers(res.results)
                        // history.push("/auth/login")
                        // window.location.reload()
                    }
            )
        }
        fetchPost()
        fetchUser()
    }, [])

    // const handleExpandClick = () => 
    // {
    //     setExpanded(!expanded);
    // }
    
    console.log(AllUsers,AllPosts)
    return (
        <Container maxWidth="sm" >
            {AllPosts && AllPosts.map((post:any) =>
                <Card key={post._id} id="postCard" sx={{marginTop:'40px'}}>
                    { AllUsers && AllUsers.map((user:any) =>
                        user._id === post.createdBy &&
                        (<CardHeader
                            key={user._id}
                            avatar={
                                <Avatar  aria-label="recipe"
                                    src={`http://192.168.0.22:8080/${user.profileImg}`}>
                                </Avatar>
                            }
                            action={
                            <IconButton aria-label="settings">
                                {/* <MoreVertIcon /> */}
                            </IconButton>
                            }
                            title={user.name}
                            subheader="September 14, 2016"
                            sx={{marginTop:'-80px'}}
                        />)
                    )}
                    <CardMedia
                        component="img"
                        height="194"
                        image={`http://192.168.0.22:8080/${post.postImg}`}
                        alt="Paella dish"
                        sx={{width: "508px",height: "508px"}}
                    />

                    <CardActions disableSpacing>

                        <IconButton aria-label="add to favorites">
                            <FavoriteBorderIcon id='likeIcon'></FavoriteBorderIcon>
                        </IconButton>

                        <IconButton aria-label="share">
                            <ChatBubbleOutlineIcon id='commentIcon'></ChatBubbleOutlineIcon>
                        </IconButton>

                        <IconButton aria-label="share" sx={{marginLeft:'365px'}}>
                            <BookmarkBorderIcon id='bookmarkIcon'></BookmarkBorderIcon>
                        </IconButton>

                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>

                            

                        </CardContent>
                    </Collapse>

                </Card>
            )}
        </Container>
    )
}

export default Home