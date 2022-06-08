import React,{useState} from 'react'
import { Modal,Box,Card,CardActions, Typography, TextField,Button} from '@mui/material'
import { IconButton } from '@mui/material'
import './post.scss'
import uploadImg from './bro.jpg'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PreviewChildModal from './PreviewChildModal'

function UploadPost({UploadPostOpen,setUploadPostOpen}:any) 
{
    const [PreviewChildModalOpen,setPreviewChildModalOpen] = useState(false)
    const [UploadedFile,setUploadedFile] = useState({file:[],filePreview:[]})

    const handleUpload = (files:any) =>
    {
        for(let i=0;i<files.length;i++)
        {
            
            const objectUrl:any = URL.createObjectURL(files[i])
            UploadedFile.file.push(files[i])
            UploadedFile.filePreview.push(objectUrl)
            // setUploadedFile({...UploadedFile , file:e.target.files[i]})
        }
        setPreviewChildModalOpen(true)
    }
    console.log(UploadedFile)
    
    return (
        <div>
            <Modal
                disableAutoFocus={true}
                open={UploadPostOpen}
                onClose={()=>setUploadPostOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <Box>

                    <Card id='UploadPostCard'>
                        
                        <IconButton sx={{float:'right'}} onClick={()=>setUploadPostOpen(false)}>
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
                            Drag photo from device to upload
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
                    {PreviewChildModalOpen==true && <PreviewChildModal PreviewChildModalOpen setPreviewChildModalOpen={setPreviewChildModalOpen} UploadedFile={UploadedFile}/>}
                </Box>
            </Modal>
        </div>
    )
}

export default UploadPost