import React,{useState} from 'react'
import { Modal,Card,IconButton,Typography,Grid,TextField,Button } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box } from '@mui/system'
import "../../../components/navbar/Navbar.scss";
import { post } from '../../../utils/http/httpMethods';

const ChangePassword = ({ChangePasswordOpen,setChangePasswordOpen}:any) =>
{
    const [Obj,setObj] = useState({oldPassword:'',newPassword:'',confirmPassword:''})

    const handleChangePassword = async() =>
    {
        let resp = await post(`http://192.168.0.22:8080/auth/change-password`,Obj)
        console.log(resp)
        setChangePasswordOpen(false)
        
    }

    return (
        <div> 
            <Modal
                disableAutoFocus={true}
                open={ChangePasswordOpen}
                onClose={()=>setChangePasswordOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <Box>
                    <Card id='ChangePasswordModal'>

                        <IconButton  sx={{float:'right'}} onClick={()=>setChangePasswordOpen(false)}>
                            <CloseOutlinedIcon sx={{color:'#919EAB'}}> </CloseOutlinedIcon>
                        </IconButton>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontSize:'24px',fontWeight:700,textAlign:'center',mt:4}}>
                            Reset your password
                        </Typography>

                        <Grid container spacing={1} sx={{ml:1}} >
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        sx={{width:'480px'}}
                                        required
                                        label="Current password"
                                        name="Current password"
                                        autoComplete="email"
                                        value={Obj.oldPassword}
                                        onChange={(e:any)=>setObj({...Obj,oldPassword:e.target.value})}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        sx={{width:'480px'}}
                                        label="New password"
                                        name="New password"
                                        autoComplete="email"
                                        required
                                        value={Obj.newPassword}
                                        onChange={(e:any)=>setObj({...Obj,newPassword:e.target.value})}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        sx={{width:'480px'}}
                                        required
                                        label="Confirm password"
                                        name="Confirm password"
                                        autoComplete="email"
                                        value={Obj.confirmPassword}
                                        onChange={(e:any)=>setObj({...Obj,confirmPassword:e.target.value})}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <div>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            onClick={()=>handleChangePassword()}
                                            sx={{width:'480px',height: "48px",background: "#1890FF",borderRadius:'8px',color: "#FFFFFF",fontSize:"15pxl"}}
                                        >
                                            Reset Password
                                        </Button>
                                    </div>
                                  
                                </Grid>
                        </Grid>

                    </Card>
                </Box>
            </Modal>
        </div>
    )
}

export default ChangePassword