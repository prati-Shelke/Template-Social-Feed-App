import React,{useState,useEffect} from 'react'
import { Modal,Box,Card, CardMedia, Typography, } from '@mui/material'
import SimpleImageSlider from "react-simple-image-slider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DiscardProcess from './DiscardProcess';
import FinalUpload from './FinalUpload';

function PreviewChildModal({setUploadPostOpen,PreviewChildModalOpen,setPreviewChildModalOpen,UploadedFile,setUploadedFile}:any) 
{
    
    const [Preview,setPreview] = useState([])
    const [DiscardProcessOpen,setDiscardProcessOpen] = useState(false)
    const [FinalUploadOpen,setFinalUploadOpen] = useState(false)

    useEffect(() => {
        let temp = UploadedFile.filePreview.map((path:any)=>
        {
            return path
        })
        setPreview(temp)
    }, [PreviewChildModalOpen])    

    return (
        <div>
            <Modal
                disableAutoFocus={true}
                open={PreviewChildModalOpen}
                onClose={()=>setPreviewChildModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <Box>
                    
                    <Card id='UploadPostCard'>

                        <div style={{marginTop:'10px',marginLeft:'10px',}}>
                            <ArrowBackIcon sx={{color:'#919EAB',cursor:'pointer'}} onClick={()=>setDiscardProcessOpen(true)}></ArrowBackIcon>
                        </div>

                        <Typography onClick={()=> setFinalUploadOpen(true)} sx={{color:'#1890FF',textAlign:'right',marginTop:'-25px',marginRight:'10px',fontSize:'16px',fontWeight:700,cursor:'pointer'}}>
                            Next
                        </Typography>

                        {Preview.length >1 ?
                            <SimpleImageSlider
                                width={530}
                                height={490}
                                images={Preview}
                                showBullets={true}
                                showNavs={true}  
                                style={{marginTop:'10px'}}          
                            /> :
                            <img alt="not found" src={Preview} style={{marginTop:'10px'}} height={480} width={520} />
                        }
                        </Card>
                        <DiscardProcess setPreviewChildModalOpen={setPreviewChildModalOpen} DiscardProcessOpen={DiscardProcessOpen} setDiscardProcessOpen={setDiscardProcessOpen} setUploadedFile={setUploadedFile} />
                        <FinalUpload setUploadPostOpen={setUploadPostOpen} setPreviewChildModalOpen={setPreviewChildModalOpen} FinalUploadOpen={FinalUploadOpen} setFinalUploadOpen={setFinalUploadOpen} UploadedFile={UploadedFile} setUploadedFile={setUploadedFile} />
                </Box>
            </Modal>
        </div>
    )
}

export default PreviewChildModal