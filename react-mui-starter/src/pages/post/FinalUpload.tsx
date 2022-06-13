import React,{useState,useEffect,useRef} from 'react'
import { Modal,Box,Card, CardMedia, Typography, IconButton,TextField,CardContent,Avatar,TextareaAutosize } from '@mui/material'
import SimpleImageSlider from "react-simple-image-slider";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Picker from 'emoji-picker-react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import './post.scss'
import { post } from '../../utils/http/httpMethods';
import Uploading from './Uploading';

function FinalUpload({setUploadPostOpen,setPreviewChildModalOpen,FinalUploadOpen,setFinalUploadOpen,UploadedFile,setUploadedFile}:any) 
{
    const [Preview,setPreview] = useState([])
    const [CurrentUser,setCurrentUser] = useState((JSON.parse(localStorage.getItem('currentUser') as any))||{})
    const [showPicker, setShowPicker] = useState(false)
    const fileRef:any = useRef()
    const [Caption,setCaption] = useState('')
    const [Location,setLocation] = useState('')
    const [UploadingOpen,setUploadingOpen] = useState(false)
    
    const handlePreview = () =>
    {
        let temp = UploadedFile.filePreview.map((path:any)=>
        {
            return path
        })
        setPreview(temp)
    }

    useEffect(() => {
        handlePreview()
    }, [FinalUploadOpen])    

    //------------------------------------TO CLOSE THE MODAL----------------------------
    const handleClose = () =>
    {
        setUploadedFile({file:[],filePreview:[]})
        setUploadPostOpen(false);
        setPreviewChildModalOpen(false);
        setFinalUploadOpen(false);
    }

    const onEmojiClick = (event:React.MouseEvent< Element,MouseEvent>, emojiObject:any) =>
    {
        setCaption(Caption+emojiObject.emoji)
        setShowPicker(false);
    }

    //--------------------------------------WHEN USER SELECTS IMAGES FOR POST----------------------
    const handleUpload = (files:any) =>
    {
        console.log("hi")
        for(let i=0;i<files.length;i++)
        {
            
            const objectUrl:any = URL.createObjectURL(files[i])
            UploadedFile.file.push(files[i])
            UploadedFile.filePreview.push(objectUrl)
            // setUploadedFile({...UploadedFile , file:e.target.files[i]})
        }
        // setPreviewChildModalOpen(true)
        handlePreview()
    }
   


    //-------------------------------------WHEN USER FINALLY UPLOAD THE POST----------------------
    const handleUploadPost = async() =>
    {
        // setUploadingOpen(true)
        
        let formdata = new FormData()

        let temp = UploadedFile.file.map((img:any)=>{ return img})
        for(let i=0;i<UploadedFile.file.length;i++)
        {
            formdata.append('postImg',temp[i])
        }
        
        formdata.append('caption',Caption)
        formdata.append('location',Location)
        
        let res = await post('http://localhost:8080/posts',formdata)
        console.log(res)
        setUploadPostOpen(false)
        setPreviewChildModalOpen(false)
        setFinalUploadOpen(false)
        window.location.reload()
    }
   

    return (
        <div>
            
            <Modal
                // disableAutoFocus={true}
                open={FinalUploadOpen}
                // onClose={()=>setFinalUploadOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <Box>
                    <CloseOutlinedIcon sx={{color:'#919EAB',float:'right',marginTop:'50px',marginRight:'100px',cursor:'pointer'}} onClick={handleClose}> </CloseOutlinedIcon>
                    <Card id='FinalUploadPostCard'>
                        
                        <Typography onClick={handleUploadPost} sx={{color:'#1890FF',textAlign:'right',marginTop:'10px',marginRight:'30px',fontSize:'16px',fontWeight:700,cursor:'pointer'}} >
                            Upload
                        </Typography>

                        <div style={{display:'flex'}}>
                            {Preview.length >1 ?
                                <SimpleImageSlider
                                    width={490}
                                    height={490}
                                    images={Preview}
                                    showBullets={true}
                                    showNavs={true}  
                                    style={{marginTop:'20px'}}          
                                /> :
                                <img alt="not found" src={Preview} style={{marginTop:'10px'}} height={480} width={520} />
                            }

                            <CardContent>

                                <div style={{display:'flex'}}>
                                    <Avatar aria-label="recipe"
                                        src={`http://192.168.0.22:8080/${CurrentUser.profileImg}`}>
                                    </Avatar>
                                    <Typography sx={{mt:1,ml:2,fontWeight:600}}> {CurrentUser.name}</Typography>
                                </div>

                                <TextareaAutosize
                                  
                                    placeholder="Write a caption...."
                                    minRows={12}
                                    style={{border:"none"}}
                                    value={Caption}
                                    onChange={(e:any)=>setCaption(e.target.value)}
                                />

                                <div>
                                    <img className="emoji-icon" style={{height:'20px',color: "#000000",marginTop:'20px'}} src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg" onClick={() => setShowPicker((val) => !val)}/>
                                    {showPicker && (
                                        <Picker
                                            pickerStyle={{width:'100%'}}
                                            onEmojiClick={onEmojiClick}
                                        />
                                    )}
                                </div>

                                <div style={{display:'flex'}}>
                                    <TextField
                                        margin="normal"
                                        sx={{width:'305px'}}
                                        placeholder="Add location "
                                        name="location"
                                        size="small"
                                        value={Location}
                                        onChange={(e)=>setLocation(e.target.value)}
                                    />
                                    <LocationOnOutlinedIcon sx={{color:'#919EAB',position:'relative',right:'10%',top:'23px'}}></LocationOnOutlinedIcon>
                                </div>

                                <div style={{display:'flex'}}>
                                    <input ref={fileRef} type="file" multiple style={{display:"none"}} onChange={(e:any)=>handleUpload(e.target.files)}></input>
                            
                                    <label htmlFor='add'>
                                        <TextField      
                                            margin="normal"
                                            sx={{width:'305px',border:'none'}}
                                            placeholder="Add images"
                                            name="images"
                                            size="small"
                                        />
                                        <AddAPhotoOutlinedIcon onClick={()=>fileRef.current.click()} sx={{color:'#919EAB',position:'relative',right:'10%',top:'23px',cursor:'pointer'}}></AddAPhotoOutlinedIcon>
                                    </label>
                                </div>
                            </CardContent>
                        </div>
                    </Card>

                    <Uploading UploadingOpen={UploadingOpen} setUploadingOpen={setUploadingOpen} setFinalUploadOpen={setFinalUploadOpen}/>
                        
                </Box>
            </Modal>
        </div>
    )
}

export default FinalUpload