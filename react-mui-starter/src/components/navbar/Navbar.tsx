import React,{useState} from 'react'
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from './logo.jpeg'
import { Box } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { Avatar } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

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

   
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => 
    {
        setAnchorEl(event.currentTarget);
    }
    
    const handleClose = () => 
    {
        setAnchorEl(null);
    }
    
    return (
        <Box >
            <AppBar color='transparent' position="static" >
                <Toolbar>

                <div style={{marginLeft:'150px',fontFamily:'Public sans'}}>
                    <img src={logo} style={{width: '25px',height: "25px",float:'left'}}/> &nbsp;

                    <a style={{fontSize:'20px',fontWeight:600}}>
                            Life@AM
                    </a>
                </div>
            
                <Box sx={{flexGrow:1,fontFamily:'Public sans'}}></Box>
                    <div style={{display:"flex",marginRight:'180px'}}>
                        <IconButton edge="start" color="inherit" aria-label="menu" >
                            <HomeIcon ></HomeIcon>
                        </IconButton> &nbsp;
                        
                        <IconButton edge="start" color="inherit" aria-label="menu" >
                            <AddAPhotoOutlinedIcon ></AddAPhotoOutlinedIcon>
                        </IconButton> &nbsp;
                        
                        <IconButton edge="start" color="inherit" aria-label="menu" >
                            <BookmarkBorderOutlinedIcon ></BookmarkBorderOutlinedIcon>
                        </IconButton>&nbsp;

                        <div style={{display:'flex',alignItems:'center',cursor:'pointer'}} onClick={handleMenu}>
                            <Avatar 
                                sx={{width: "28px",height: "28px"}}
                                alt="user"
                                src={`http://192.168.0.22:8080/${CurrentUser.profileImg}`}
                            > </Avatar>
                            
                            <a style={{paddingLeft:'4px',fontSize:'18px',fontWeight:600,fontFamily:'Public sans'}}>{CurrentUser.name}</a>
                        </div>

                        <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{vertical: 'top',horizontal: 'right',}}
                                keepMounted
                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                open={Boolean(anchorEl)}
                                sx={{marginTop:'40px'}}
                                onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <ManageAccountsOutlinedIcon> </ManageAccountsOutlinedIcon> &nbsp;
                                Edit Profile
                            </MenuItem>

                            <MenuItem onClick={handleClose}>
                                <LockResetOutlinedIcon> </LockResetOutlinedIcon> &nbsp;
                                Change Password
                            </MenuItem>
                            
                            <MenuItem onClick={onLogout}>
                                <LogoutOutlinedIcon> </LogoutOutlinedIcon>  &nbsp;
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>

                    
                </Toolbar>
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
