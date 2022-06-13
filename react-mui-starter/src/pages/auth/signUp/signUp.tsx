import React, { useState } from "react";
import './signUp.scss'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import history from "../../../routes/history";
import { post } from "../../../utils/http/httpMethods";

function SignUp() 
{

    let [Obj,setObj] = useState({email:'',password:''})
    const [fname,setfname] = useState('');
    const [lname,setlname] = useState('');

    const handleSignUp = async() =>
    {   
        
        let temp = fname +" "+ lname
        // const {fname,lname,...rest} = Obj
        Obj = {...Obj,name:temp}
        setObj(Obj)

        return post("http://localhost:8080/auth/register",Obj)
        .then((res)=>
                    {   
                        console.log(res)
                        history.push("/auth/login")
                        window.location.reload()
                    }
            )
    }
    // console.log(Obj)
    
    return (
        <Container component="main" maxWidth="xs" >
            <Card id="signUpCard">
                <Box sx={{display: "flex",flexDirection: "column",alignItems: "center",}}>
                    
                    <Typography component="h1" variant="h5" sx={{fontSize:'24px',fontWeight:700,color: '#212B36',marginTop:'-80px',lineHeight:"36px"}}>
                        Sign Up to Social Feed
                    </Typography>

                    <Grid container spacing={2} sx={{marginTop:'2px'}}>
                    
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                // defaultValue="navanath@angularminds.com"
                                id="email"
                                label="First Name"
                                name="email"
                                autoComplete="email"
                                value={fname}
                                onChange={(e)=>setfname(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                // defaultValue="navanath@angularminds.com"
                                id="email"
                                label="Last Name"
                                name="email"
                                autoComplete="email"
                                value={lname}
                                onChange={(e)=>setlname(e.target.value)}
                            />
                        </Grid>
                    
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email id"
                                name="email"
                                autoComplete="email"
                                value={Obj.email}
                                onChange={(e)=>setObj({...Obj,email:e.target.value})}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Password"
                                name="email"
                                autoComplete="email"
                                value={Obj.password}
                                onChange={(e)=>setObj({...Obj,password:e.target.value})}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={()=>handleSignUp()}
                                sx={{height: "48px",background: "#1890FF",borderRadius:'8px',color: "#FFFFFF",fontSize:"15pxl"}}
                                // loading={isButtonDisabled}
                            >
                                Sign Up
                            </Button>
                        </Grid>

                        <Grid item onClick={()=> {history.push("/auth/login");window.location.reload()}} sx={{cursor:"pointer",fontSize:"16px",color: "#637381"}}>
                            Already have an account?
                            <a style={{color: "#1890FF"}}>
                                {"Sign in"}
                            </a>
                        </Grid>
                    </Grid>
                    
                </Box>
            </Card>
        </Container>
    )
}

export default SignUp