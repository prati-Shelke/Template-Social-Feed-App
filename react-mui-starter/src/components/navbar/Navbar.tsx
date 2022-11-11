import React,{useEffect, useState} from 'react'
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from './logo.png'
import { Box } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { IconButton } from '@mui/material';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Avatar } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditProfile from '../../pages/home/EditProfile'
import { Divider } from '@mui/material';
import ChangePassword from '../../pages/auth/changePassword/ChangePassword';
import UploadPost from '../../pages/post/uploadPost';
import history from "../../routes/history"

export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
};

export const Navbar = ({ onLogout }: NavbarProps)  =>
{

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [CurrentUser,setCurrentUser] = useState((JSON.parse(localStorage.getItem('currentUser') as any))||{})
    let [EditProfileOpen,setEditProfileOpen] = useState(false)
    let [ChangePasswordOpen,setChangePasswordOpen] = useState(false)
    let [UploadPostOpen,setUploadPostOpen] = useState(false)
    let [currentTab,setcurrentTab] = useState((JSON.parse(localStorage.getItem('currentTab') as any))||"home")


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => 
    {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => 
    {
        setAnchorEl(null);
    }

    const handleEditProfileClose = () =>
    {
        // e.stopPropagation()
        setEditProfileOpen(false)
        window.location.reload()
        
    }

    const handleChangePasswordClose = () =>
    {
        // e.stopPropagation()
        setChangePasswordOpen(false)
        window.location.reload()
    }
    
    

    return (
        <Box >
            <AppBar color='transparent' position="static" >
                <Toolbar>

                <div style={{marginLeft:'150px',fontFamily:'Public sans'}}>
                    <img src={logo} style={{width: '25px',height: "25px",float:'left'}}/> &nbsp;

                    <a style={{fontSize:'20px',fontWeight:600}}>
                            Instagram
                    </a>
                </div>
            
                <Box sx={{flexGrow:1,fontFamily:'Public sans'}}></Box>
                    <div style={{display:"flex",marginRight:'180px'}}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={()=>{setcurrentTab("home");localStorage.setItem("currentTab",JSON.stringify("home"));history.push("/home");window.location.reload()}}>
                            {currentTab === "home" ? <HomeIcon/> : <HomeOutlinedIcon/> }
                        </IconButton> &nbsp;
                        
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={()=>{setcurrentTab("photo");localStorage.setItem("currentTab",JSON.stringify("photo"));setUploadPostOpen(true)}}>
                            {currentTab === "photo" ?  <AddAPhotoIcon/> : <AddAPhotoOutlinedIcon />}
                        </IconButton> &nbsp;
                        
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={()=>{setcurrentTab("bookmark");localStorage.setItem("currentTab",JSON.stringify("bookmark"));history.push("/bookmark");window.location.reload()}}>
                            {currentTab === "bookmark" ? <BookmarkIcon/> : <BookmarkBorderOutlinedIcon/> }
                        </IconButton>&nbsp;

                        <div style={{display:'flex',alignItems:'center',cursor:'pointer'}} >
                            <Avatar 
                                sx={{width: "28px",height: "28px"}}
                                onClick={handleMenu}
                                src={`http://localhost:8080/${CurrentUser.profileImg}`}
                            /> 
                            
                            <a style={{paddingLeft:'4px',fontSize:'18px',fontWeight:600,fontFamily:'Public sans'}}>{CurrentUser.name}</a>
                        </div>

                        
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
                            style={{ width: "225px", height: "170px", borderRadius: "12px" }}
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
                                right: 10,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                                },
                            },
                            }}
                        >
                            <MenuItem onClick={()=>setEditProfileOpen(true)}>
                                <ManageAccountsOutlinedIcon> </ManageAccountsOutlinedIcon> &nbsp;
                                Edit Profile
                            </MenuItem>

                            <MenuItem onClick={()=>setChangePasswordOpen(true)}>
                                <LockResetOutlinedIcon> </LockResetOutlinedIcon> &nbsp;
                                Change Password
                            </MenuItem>

                            <Divider />
                            <MenuItem onClick={onLogout}>
                                <LogoutOutlinedIcon> </LogoutOutlinedIcon>  &nbsp;
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>

                </Toolbar>
                    {EditProfileOpen==true && <EditProfile EditProfileOpen handleEditProfileClose={handleEditProfileClose}/>}
                    {ChangePasswordOpen==true && <ChangePassword ChangePasswordOpen setChangePasswordOpen={setChangePasswordOpen}/>}
                    <UploadPost UploadPostOpen={UploadPostOpen} setUploadPostOpen={setUploadPostOpen} setcurrentTab={setcurrentTab}/>
            </AppBar>
        </Box>
    )
}

{/* <AppBar  color='transparent' id="navbar">
            <Toolbar variant="dense" >
            <Box sx={{display: {xs:"none",md: "flex",paddingLeft: "10px"}}}>
                <div>
                    <img src={logo} style={{width: '25px',height: "25px",float:'left'}}/> &nbsp;

                    <a style={{fontSize:'20px',fontWeight:600}}>
                            Life@AM
                    </a>
                </div>


                
                    <div style={{display:'flex',float:'right'}}>
                        <IconButton edge="start" color="inherit" aria-label="menu" >
                            <HomeIcon ></HomeIcon>
                        </IconButton>
                    </div>
                    
                </Box>
                
            </Toolbar>
</AppBar> */}
