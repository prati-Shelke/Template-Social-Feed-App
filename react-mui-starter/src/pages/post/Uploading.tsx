import React,{useEffect} from 'react'
import { Modal,Box,Card,CardActions, Typography, TextField,Button} from '@mui/material'
import { IconButton } from '@mui/material'
import './post.scss'
import uploadImg from './bro.jpg'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PreviewChildModal from './PreviewChildModal'

function Uploading({UploadingOpen,setUploadingOpen,setFinalUploadOpen}:any) 
{


    //-------------------------------------WHEN USER FINALLY UPLOAD THE POST----------------------
    const handleUploadPost = async() =>
    {
        setUploadingOpen(true)
        
        // let formdata = new FormData()

        // let temp = UploadedFile.file.map((img:any)=>{ return img})
        // for(let i=0;i<UploadedFile.file.length;i++)
        // {
        //     formdata.append('postImg',temp[i])
        // }
        
        // formdata.append('caption',Caption)
        // formdata.append('location',Location)
        
        // let res = await post('http://localhost:8080/posts',formdata)
        // console.log(res)
        // setUploadPostOpen(false)
        // setPreviewChildModalOpen(false)
        // setFinalUploadOpen(false)
        // window.location.reload()
    }

    return (
        <div>
            <Modal
                disableAutoFocus={true}
                open={UploadingOpen}
                onClose={()=>setUploadingOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <Box>

                    <Card id='UploadPostCard'>
                        
                        <IconButton sx={{float:'right'}} onClick={()=>setUploadingOpen(false)}>
                            <CloseOutlinedIcon sx={{color:'#919EAB'}}> </CloseOutlinedIcon>
                        </IconButton>
                       
                       <Typography sx={{textAlign:'center',mt:9}}>
                        <img
                            src={uploadImg}
                            alt="Paella dish"
                            style={{width: "150px",height: "150px",textAlign:'center'}}
                        />
                       </Typography>
                        
                        <Typography sx={{color: "#919EAB",fontSize:'14px',fontFamily:'Public sans',fontWeight:400,textAlign:'center'}}>
                            Just set on one place , images being  upload
                        </Typography>

                        <CardActions sx={{mt:14,marginLeft:'170px'}}>
                            <input id='upload' type="file" multiple style={{display:"none"}} onChange={(e:any)=>handleUpload(e.target.files)}></input>
                            <label htmlFor='upload'>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={()=>document.getElementById('upload')?.click()}
                                    sx={{width:'182px',height: "40px",background: "#1890FF",borderRadius:'8px',color: "#FFFFFF",fontSize:"12px",fontWeight:700}}
                                >
                                            Upload from device
                                </Button>
                            </label>
                        </CardActions>
                    </Card>
                  
                </Box>
            </Modal>
        </div>
    )
}

export default Uploading