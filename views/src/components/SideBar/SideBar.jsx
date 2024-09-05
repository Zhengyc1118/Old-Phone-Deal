import "./sideBar.css";
import { useState, useContext, useEffect } from "react";
import { FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { RiLockPasswordFill } from "react-icons/ri"
import { MdAccountCircle, MdRateReview } from "react-icons/md";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const SideBar = ({children}) => {

    const { user, setUser } = useContext(UserContext);
    useEffect(() => {}, [user]);

    const navigate = useNavigate();
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const handleLogout = () => {
        setLogoutDialogOpen(true);
    }
    const handleLogoutConfirm = () => {
        navigate("/")
        setUser(null);
        setLogoutDialogOpen(false);
    }
    const handleLogoutCancel = () => {
        setLogoutDialogOpen(false);
    }
    const menuItem=[
        {
            path: "/",
            name: "Home",
            icon: <AiFillHome/>
        },
        {
            path: "edit-profile",
            name: "Edit Profile",
            icon: <MdAccountCircle/>
        },
        {
            path: "change-password",
            name: "Change Password",
            icon: <RiLockPasswordFill/>
        },
        {
            path: "listings",
            name: "Manage Listings",
            icon: <FaClipboardList/>
        },{
            path: "comments",
            name: "View Comments",
            icon: <MdRateReview/>
        },{
            path: "logout",
            name: "Logout",
            icon: <FaSignOutAlt/>
        }
    ]
    return (
        <div className="sidebar-container">
           <div className="sidebar">
               {
                   menuItem.map((item, index)=>(
                    item.path === "logout" ? (
                        <Button variant="contained" startIcon={item.icon} onClick={handleLogout} 
                                style={{ position: "fixed", fontSize:"18px",
                                         top: "483px", borderRadius: "0px", boxShadow: "none", 
                                         backgroundColor: "#5b8298", padding: "24px", paddingLeft: "60px",  paddingRight: "131px" }}>
                            <div className="logout-link">{item.name}</div>
                        </Button>
                      ) : (
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icons">{item.icon}</div>
                           <div className="link_text">{item.name}</div>
                       </NavLink>
                       )
                   ))
               }
               <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
                  <DialogTitle style={{fontWeight: 900}}>Confirm</DialogTitle>
                  <DialogContent>
                    <p style={{fontFamily: "Arial, sans-serif"}}>Are you sure you want to log out?</p>
                    </DialogContent>
                  <DialogActions>
                  <Button onClick={handleLogoutCancel}>Cancel</Button>
                  <Button onClick={handleLogoutConfirm}>Confirm</Button>
                </DialogActions>
                </Dialog>
           </div>
           <main>{children}</main>
        </div>
    );
        
        
}

export default SideBar;