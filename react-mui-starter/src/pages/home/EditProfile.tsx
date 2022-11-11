import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../../components/navbar/Navbar.scss"
import { Card, CardActions, RadioGroup } from '@mui/material';
import { Avatar } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import { FormLabel } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Radio } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PhoneInput from 'react-phone-input-international'
import 'react-phone-input-international/lib/style.css'
import { put } from '../../utils/http/httpMethods';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import IconButton from '@mui/material/IconButton';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Divider } from '@mui/material';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const EditProfile = ({EditProfileOpen,handleEditProfileClose}:any) =>
{
    const [CurrentUser,setCurrentUser] = useState((JSON.parse(localStorage.getItem('currentUser') as any))||{})
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [Preview, setPreview] = useState()
    const [ImageFile,setImageFile] = useState(false)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => 
    {
        setAnchorEl(event.currentTarget);
    }
    
    const handleClose = () => 
    {
        setAnchorEl(null);
    }

    const handleEditProfile = async() =>
    {
        // console.log('gi',CurrentUser)
        const res = await put("http://localhost:8080/users/edit-profile",CurrentUser);
        localStorage.setItem('currentUser',JSON.stringify(CurrentUser))
        console.log(res)

        handleClose()
        // window.location.reload()
        handleEditProfileClose()
    }

    const handleUploadProfileImg = async(file:any) =>
    {
        
        CurrentUser.removeImg = false
        setImageFile(true)

        const formdata = new FormData()
        formdata.append("profileImg",file)
        formdata.append("removeImg",CurrentUser.removeImg)
        
        const objectUrl:any = URL.createObjectURL(file)
        setPreview(objectUrl)
        
        setCurrentUser(CurrentUser)
        const res:any = await put("http://localhost:8080/users/edit-profile",formdata);
        console.log(res)
        localStorage.setItem('currentUser',JSON.stringify(res.user))
        handleClose()

    }

    const handleRemoveProfileImg = async() =>
    {
        
        CurrentUser.profileImg = ''
        CurrentUser.removeImg = true
        setCurrentUser(CurrentUser)
        handleEditProfile()
    }
    // console.log(CurrentUser)

    return (
        <div> 
            <Modal
                disableAutoFocus={true}
                open={EditProfileOpen}
                onClose={handleEditProfileClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box >
                    <Card id="editModal">
                        <IconButton sx={{marginTop:'-25px',marginLeft:'440px'}} onClick={handleEditProfileClose}>
                            <CloseOutlinedIcon sx={{color:'#919EAB'}}> </CloseOutlinedIcon>
                        </IconButton>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontSize:'24px',fontWeight:700,marginTop:'-45px'}}>
                            Profile Update
                        </Typography>

                        <div style={{marginTop:'-10px',cursor:'pointer'}} onClick={handleMenu}  >
                            <Avatar sx={{width:'80px',height:'80px'}} src={ImageFile===false ? `http://localhost:8080/${CurrentUser.profileImg}` : Preview} />
                            <IconButton edge="start" color="inherit" aria-label="menu" sx={{marginLeft:'50px',marginTop:'-50px'}}>
                                <AddAPhotoRoundedIcon color='primary' sx={{backgroundColor:'white',padding:'5px',borderRadius:"50%",border:'2px solid #DCE0E4'}}></AddAPhotoRoundedIcon>
                            </IconButton>
                        </div>

                        <div style={{marginTop:'-20px'}}>
                            <Grid container >
                                <Grid item >
                                    <TextField
                                        margin="normal"
                                        sx={{width:'480px'}}
                                        label="Name"
                                        name="email"
                                        size="small"
                                        autoComplete="email"
                                        value={CurrentUser.name}
                                        onChange={(e:any)=>setCurrentUser({...CurrentUser,name:e.target.value})}
                                    />
                                </Grid>

                                <Grid item sx={{marginTop:'-10px'}}>
                                    <TextField
                                        margin="normal"
                                        sx={{width:'480px'}}
                                        label="Email id"
                                        name="email"
                                        autoComplete="email"
                                        size="small"
                                        value={CurrentUser.email}
                                        onChange={(e)=>setCurrentUser({...CurrentUser,email:e.target.value})}
                                    />
                                </Grid>

                                <Grid item sx={{marginTop:'8px'}}>
                                    <TextareaAutosize
                                        
                                        aria-label="minimum height"
                                        placeholder="Enter your bio here..."
                                        style={{ width: '475px',height:"70px",border:'1px solid rgba(145, 158, 171, 0.32)'}}
                                        value={CurrentUser.bio}
                                        onChange={(e:any)=>setCurrentUser({...CurrentUser,bio:e.target.value})}
                                        />
                                </Grid>

                                <Grid item >
                                    <FormLabel id="demo-radio-buttons-group-label" sx={{fontSize:"16px",fontWeight:400,color: "#919EAB"}}>Gender</FormLabel>
                                    <RadioGroup >
                                        <div style={{marginTop:'-10px'}}>
                                            <FormControlLabel sx={{fontSize:"16px",fontWeight:400,color: "#919EAB"}} value="male" control={<Radio checked={CurrentUser.gender==='male'&&true} onChange={(e:any)=>setCurrentUser({...CurrentUser,gender:e.target.value})} />} label="Male" />
                                            <FormControlLabel sx={{fontSize:"16px",fontWeight:400,color: "#919EAB"}} value="female" control={<Radio checked={CurrentUser.gender==='female'&&true} onChange={(e:any)=>setCurrentUser({...CurrentUser,gender:e.target.value})} />} label="Female" />
                                            <FormControlLabel sx={{fontSize:"16px",fontWeight:400,color: "#919EAB"}} value="other" control={<Radio checked={CurrentUser.gender==='other'&&true} onChange={(e:any)=>setCurrentUser({...CurrentUser,gender:e.target.value})} />} label="Other" />
                                        </div>
                                    </RadioGroup>
                                </Grid>

                                <Grid item>
                                    <FormLabel id="demo-radio-buttons-group-label" sx={{fontSize:"16px",fontWeight:400,color: "#919EAB"}}>Date of birth</FormLabel>
                                        <div style={{marginTop:'1px'}}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    // label="Basic example"
                                                    value={CurrentUser.dob}
                                                    onChange={(newValue:any) => {
                                                        setCurrentUser({...CurrentUser,dob:newValue})
                                                    }}
                                                    renderInput={(params) => <TextField {...params} size="small"/>}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                </Grid>

                                <Grid item sx={{marginTop:'12px'}} xs={12}>
                                    <FormLabel id="demo-radio-buttons-group-label" sx={{fontSize:"16px",fontWeight:400,color: "#919EAB"}}>Enter contact number </FormLabel>
                                    <div style={{marginTop:'4px'}}>
                                        <PhoneInput
                                                country={'in'}
                                                value={CurrentUser.mobile}
                                                onChange={(phone:any)=>setCurrentUser({...CurrentUser,mobile:phone})}/>
                                    </div>
                                </Grid>

                                <Grid item style={{marginTop:'20px'}}>
                                    <div>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            onClick={()=>handleEditProfile()}
                                            sx={{width:'480px',height: "40px",background: "#1890FF",borderRadius:'8px',color: "#FFFFFF",fontSize:"15pxl"}}
                                        >
                                            Save Profile
                                        </Button>
                                    </div>
                                  
                                </Grid>
                            </Grid>

                            <Menu
                                id="basic-menu"
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                                MenuListProps={{
                                "aria-labelledby": "basic-button",
                                }}
                                style={{ width: "400px", height: "170px", borderRadius: "12px",marginTop:'-20px',marginLeft:'20px'}}
                                PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                    },
                                    "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    left: 75,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                    },
                                },
                                }}
                            >
                            <MenuItem >
                                <TextField type="file" id="upload-photo" sx={{display:'none'}} onChange={(e:any)=>handleUploadProfileImg(e.target.files[0])}></TextField>
                                <label htmlFor='upload-photo'>
                                    <AddAPhotoOutlinedIcon sx={{color:'#919EAB'}} onClick={()=>document.getElementById('upload')?.click()}></AddAPhotoOutlinedIcon> &nbsp;
                                    Upload photo
                                </label>
                                
                            </MenuItem>

                            <MenuItem onClick={()=>handleRemoveProfileImg()} >
                               <DeleteOutlineOutlinedIcon sx={{color:'#919EAB'}}> </DeleteOutlineOutlinedIcon>&nbsp;
                                Remove photo
                            </MenuItem>

                            <Divider />

                            <MenuItem onClick={handleClose} >
                                <CloseOutlinedIcon sx={{color:'#919EAB'}}> </CloseOutlinedIcon>&nbsp;
                                Cancel
                            </MenuItem>
                            </Menu>
                        </div>
                    </Card>
                </Box>
            </Modal>
        </div>

  )
}

export default EditProfile