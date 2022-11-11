import React,{ useEffect, useState } from 'react'
import { Card, CardMedia, Grid } from '@mui/material'
import { get,post,put } from '../../utils/http/httpMethods';
import SimpleImageSlider from "react-simple-image-slider";
import CommentModal from '../home/CommentModal';

function BookmarkedPost()
{
    let [Url,setUrl] = useState([])
    let [bookmarkedPosts, setbookmarkedPosts] = useState([] as any);
    const [CurrentUser,setCurrentUser] = useState((JSON.parse(localStorage.getItem('currentUser') as any))||{})
    let [CommentModalOpen,setCommentModalOpen] = useState(false)
    let [CurrentPostId,setCurrentPostId] = useState()
    let [AllUsers,setAllUsers] = useState()


    //-------------------------------FOR GETTING ALL POSTS----------------------------------------
    const fetchPost = () =>
    {
        let images:any = []
        get("http://localhost:8080/posts/getPosts?sortBy=desc&limit=200&page=1")
        .then((res:any)=>
            {   
                let temp:any = []
                res.results.map((post:any)=>
                {
                    
                    CurrentUser.bookmarks.map((id:any)=> 
                    {
                        
                        if(id === post._id)
                            temp.push(post)
                    })
                })
                setbookmarkedPosts(temp)

                Url = temp.length!=0 && temp.map((post:any)=>
                {
                    return post.postImg?.map((Img:any)=>
                    {
                        return `http://localhost:8080/${Img.path}`
                    })
                })
               
                setUrl(Url) 
            }
        )

        
    }
    console.log(bookmarkedPosts)

    useEffect(() => 
    {
        fetchPost() 
        fetchUser()
    }, [])

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
        
    return(
        <Grid container >
            {bookmarkedPosts?.map((post:any,ind:any) =>
                <Grid item key={post._id}>
                    <Card sx={{marginLeft:'160px',marginTop:'40px' }}>
                        { post.postImg.length === 1 ? post.postImg.map((img:any) =>
                            <img
                            key={post._id}
                            height="304"
                            width="304"
                            src={`http://localhost:8080/${img.path}`}
                            alt="Paella dish"
                            onClick={()=>{setCommentModalOpen(true);setCurrentPostId(post._id)}}
                        />)
                        :
                        (
                            <SimpleImageSlider
                                width={304}
                                height={304}
                                images={Url[ind]}
                                showBullets={true}
                                showNavs={true}
                                onClick={()=>{setCommentModalOpen(true);setCurrentPostId(post._id)}}

                            />

                        )}
                    </Card>
                </Grid>
            )}
            {CommentModalOpen == true && <CommentModal CurrentPostId={CurrentPostId} CommentModalOpen={CommentModalOpen} setCommentModalOpen={setCommentModalOpen} AllUsers={AllUsers} CurrentUser={CurrentUser} handleLikes={handleLikes} handleBookmark={handleBookmark} fetchPost={fetchPost}/>}
        </Grid>

    )
}
export default BookmarkedPost