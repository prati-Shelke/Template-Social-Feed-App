import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import { Button } from "@mui/material";
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import {GoogleLogin} from 'react-google-login'
import history from "../../../routes/history";


function Login() 
{
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [Obj,setObj] = useState({email:'',password:''})
    const { handleSubmit } = useForm();
    const theme = createTheme();

  /*
   * Verify Credentials
   */
    const doLogin = (formData: any) => 
    {
        console.log(Obj)
        setButtonDisabled(true);
        authenticationService.verifyCredentials(Obj).then((response: any) => {
            setButtonDisabled(false);
        })
        .catch((error) => {
            setButtonDisabled(false);
        });
    };
    
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" >
                <Card id="loginCard">
                    <CssBaseline />
                        <Box sx={{display: "flex",flexDirection: "column",alignItems: "center",}}>
                            <Typography component="h1" variant="h5" sx={{fontSize:'24px',fontWeight:700,color: '#212B36',marginTop:'-60px'}}>
                                Sign in to social feed
                            </Typography>
                            
                            <Box component="form" onSubmit={handleSubmit(doLogin)} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    // defaultValue="navanath@angularminds.com"
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={Obj.email}
                                    onChange={(e)=>setObj({...Obj,email:e.target.value})}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    // defaultValue="Pass"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={Obj.password}
                                    onChange={(e)=>setObj({...Obj,password:e.target.value})}
                                />
                            
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2,width: "480px",height: "48px",background: "#1890FF",borderRadius:'8px'}}
                                    // loading={isButtonDisabled}
                                >
                                    Sign In
                                </Button>
                            
                                <Grid container display='block'>
                                    <Grid item xs sx={{textAlign:"right"}}>
                                        <a onClick={()=> {history.push("/auth/forgotPassword");window.location.reload()}} style={{color:"#637381",fontSize:'16px',fontFamily:'Public Sans',fontWeight:400,cursor:"pointer"}} >
                                            Forgot password?
                                        </a>
                                    </Grid>

                                    <Grid item onClick={()=> {history.push("/auth/signUp");window.location.reload()}} sx={{cursor:"pointer",fontSize:"16px",color: "#637381",padding:"15px"}}>
                                        Don't have an account?
                                        <a style={{color: "#1890FF"}}>
                                            {"Sign Up"}
                                        </a>
                                    </Grid>
                                </Grid>

                                <Divider sx={{fontSize:'14px',padding:"10px"}}>
                                    <p style={{color: "#637381"}}> OR </p>
                                </Divider>

                                <Grid textAlign="center" sx={{color: "rgba(145, 158, 171, 0.8)",fontSize:'15px',marginBottom:"-50px"}}>
                                    <GoogleLogin 
                                        clientId = "971623344603-0qquan9pcdb9iu7oq9genvpnel77i7oa.apps.googleusercontent.com"
                                        buttonText = "Sign in with Google"
                                        // onSuccess = {responseGoogle}
                                        // onFailure = {responseGoogle}
                                        cookiePolicy = {'single_host_origin'}                
                                    />
                                </Grid> 
                            </Box>
                        </Box>
                </Card>
            </Container>
        </ThemeProvider>
    )
}

export default Login