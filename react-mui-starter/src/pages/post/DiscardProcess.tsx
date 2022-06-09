import React from 'react'
import { Modal,Box,Card,CardActions, Typography, TextField,Button,IconButton} from '@mui/material'
import VectorImg from './Vector.png'


function DiscardProcess({setPreviewChildModalOpen,DiscardProcessOpen,setDiscardProcessOpen,setUploadedFile}:any) 
{

    const handleClose = ( ) =>
    {
        setUploadedFile({file:[],filePreview:[]})
        setDiscardProcessOpen(false)
        setPreviewChildModalOpen(false)
    }

    return (
        <Modal
            disableAutoFocus={true}
            open={DiscardProcessOpen}
            onClose={()=>setDiscardProcessOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>

                <Card id='UploadPostCard'>
                   
                   <Typography sx={{textAlign:'center',mt:9}}>
                        <img
                            src={VectorImg}
                            alt="Paella dish"
                            style={{textAlign:'center'}}
                        />
                   </Typography>
                        
                    <Typography sx={{color: "#919EAB",fontSize:'14px',fontFamily:'Public sans',fontWeight:400,textAlign:'center'}}>
                            Do you really want to  discard uploading?
                    </Typography>

                    <CardActions sx={{marginLeft:'160px',mt:6}}>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleClose}
                            sx={{width:'162px',height: "40px",background: "#1890FF",borderRadius:'8px',color: "#FFFFFF",fontSize:"12px",fontWeight:700}}
                        >
                            Discard Process
                        </Button>
                    </CardActions>

                    <Button variant="text" sx={{marginLeft:'210px'}} onClick={()=>setDiscardProcessOpen(false)}>Cancel</Button>
                </Card>
                
            </Box>
        </Modal>
    )
}

export default DiscardProcess