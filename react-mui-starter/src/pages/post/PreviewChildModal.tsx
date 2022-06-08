import React,{useState,useEffect} from 'react'
import { Modal,Box,Card, CardMedia, } from '@mui/material'
import SimpleImageSlider from "react-simple-image-slider";


function PreviewChildModal({PreviewChildModalOpen,setPreviewChildModalOpen,UploadedFile}:any) 
{
    console.log(UploadedFile)
    const [Preview,setPreview] = useState([])

    useEffect(() => {
        let temp = UploadedFile.filePreview.map((path:any)=>
        {
            return path
        })
        setPreview(temp)

    }, [])    

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
                        {Preview.length >1 ?
                            <SimpleImageSlider
                                width={530}
                                height={479}
                                images={Preview}
                                showBullets={true}
                                showNavs={true}  
                                style={{marginTop:'50px'}}          
                            /> :
                            <img alt="not found" sx={{marginTop:'90px'}} height={479} width={530} src={Preview}/>
                        }
                        </Card>
                </Box>
            </Modal>
        </div>
    )
}

export default PreviewChildModal