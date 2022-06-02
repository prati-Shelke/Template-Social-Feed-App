import React, { useState } from "react";
import './forgotPassword.scss'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import { Button } from "@mui/material";
import history from "../../../routes/history";
import { post } from "../../../utils/http/httpMethods";

function ForgotPassword() 
{

    const [Email,setEmail] = useState('')

    const handleForgotPassword = async() =>
    {   
        // console.log(Email)
        return post("http://localhost:8080/auth/forgot-password",{email:Email})
        .then((res)=>
                    {   
                        console.log("Email is sent",res)
                        history.push("/auth/login")
                        window.location.reload()
                    }
            )
    }
    
    return (
        <Container component="main" maxWidth="xs" >
            <Card id="passwordCard">
                <Box sx={{display: "flex",flexDirection: "column",alignItems: "center",}}>
                    
                    <Typography component="h1" variant="h5" sx={{fontSize:'24px',fontWeight:700,color: '#212B36',marginTop:"-160px",lineHeight:"36px"}}>
                        Forgot Your Password?
                    </Typography>

                    <Typography component="h1" variant="h5" sx={{fontSize:'18px',fontWeight:400,color: '#637381',lineHeight:"24px",padding:"16px"}}>
                        Please enter the email address associated with your account, and we'll email you a link to reset your password.
                    </Typography>

                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        // defaultValue="navanath@angularminds.com"
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={Email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={()=>handleForgotPassword()}
                        sx={{ mt: 3, mb: 2,width: "500px",height: "48px",background: "#1890FF",borderRadius:'8px',color: "#FFFFFF",fontSize:"15pxl"}}
                        // loading={isButtonDisabled}
                    >
                        Reset Password
                    </Button>

                    <Button sx={{marginBottom:"-150px"}} onClick={()=> {history.push("/auth/login");window.location.reload()}}>
                        Back
                    </Button>
                    
                </Box>
            </Card>
        </Container>
    )
}

export default ForgotPassword