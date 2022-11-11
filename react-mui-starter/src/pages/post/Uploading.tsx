import { Box, Button, Card, Grid, IconButton, Modal, Typography } from '@mui/material';
import React,{useState,useEffect} from 'react'
import CloseIcon from "@mui/icons-material/Close";
import bro from "./bro.jpg"
import LinearProgress from '@mui/material/LinearProgress';
interface booleanProps{
    UploadingOpen:boolean,
    setUploadingOpen:any,
    progress:number
}

function Uploading({UploadingOpen,setUploadingOpen,progress}:booleanProps) 
{
    let [currentTab,setcurrentTab] = useState((JSON.parse(localStorage.getItem('currentTab') as any))||"home")

    useEffect(() => {
        setcurrentTab('home');
        localStorage.setItem("currentTab",JSON.stringify("home"))
    }, [UploadingOpen])
    
    
    

    return (
        <Modal open={UploadingOpen} onClose={() => {setUploadingOpen(false);}} >
           
                <Box className="addModal">
                    <Grid container spacing={3} sx={{ width: 230, margin: "auto" }}>
                        <IconButton  onClick={() => setUploadingOpen(false)}>
                        <CloseIcon
                            style={{ position: "relative", top: "-400%", right: "-1600%" }}
                        />
                        </IconButton>

                        <Grid item xs={12}>
                        <img
                            src={bro}
                            alt="upload"
                            style={{ height: "180px",marginBottom: "90px"}}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography style={{color: "#919EAB"}}>Uploading...</Typography>
                        </Grid>

                        <Grid item xs={12}>
                        <LinearProgress variant="determinate" value={progress} />
                            </Grid>
                        </Grid>
                </Box>
            
        </Modal>
    )
}
export default Uploading