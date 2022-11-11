import React,{useState} from 'react'
import { Box, Button, Card, Container, TextField, Typography } from '@mui/material';
import './resetPassword.scss'
import { post } from '../../../utils/http/httpMethods';
import history from "../../../routes/history";
import { Toast } from '../../../utils/toastUtil';

function ResetPassword() 
{
    let [newPassword,setnewPassword] = useState('')
    let [confirmPassword,setconfirmPassword] = useState('')
    let [token,setToken] = useState(JSON.parse(localStorage.getItem('resetPasswordToken') as any))||' '

    const handleResetPassword = () =>
    {
        if(confirmPassword === newPassword)
        {
            return post(`http://localhost:8080/auth/reset-password?token=${token}`,{password:newPassword})
            .then((res:any)=>
                        {   
                            Toast.success("Password updated successfully.....")
                            history.push("/auth/login")
                            window.location.reload()
                        }
                ).catch((error)=>
                Toast.error(
                    error.message || 'Error occurred !!!'
                )
            )
        }
        else{
            Toast.error("password not matched!!!!!")
        }
       
    }

    return(
        <Container component="main" maxWidth="xs" >
            <Card id="passwordCard">
                <Box sx={{display: "flex",flexDirection: "column",alignItems: "center",}}>
                    
                    <Typography component="h1" variant="h5" sx={{fontSize:'24px',fontWeight:700,color: '#212B36',marginTop:"-160px",lineHeight:"36px"}}>
                        Reset Your Password
                    </Typography>

                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="email"
                        value={newPassword}
                        type="password"
                        onChange={(e)=>setnewPassword(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        name="email"
                        type="password"
                        value={confirmPassword}
                        onChange={(e)=>setconfirmPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={()=>handleResetPassword()}
                        sx={{ mt: 3, mb: 2,width: "500px",height: "48px",background: "#1890FF",borderRadius:'8px',color: "#FFFFFF",fontSize:"15pxl"}}
                        // loading={isButtonDisabled}
                    >
                        Reset Password
                    </Button>

                    <Button sx={{marginBottom:"-150px"}} 
                    onClick={()=> {history.push("/auth/login");window.location.reload()}}
                    >
                        Back
                    </Button>
                    
                </Box>
            </Card>
        </Container>
    )
}

export default ResetPassword