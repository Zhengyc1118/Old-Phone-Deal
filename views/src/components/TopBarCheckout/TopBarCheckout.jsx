import "./topBarCheckout.css";
import { MdAccountCircle } from "react-icons/md";
import { FaSignInAlt, FaSignOutAlt, FaHome } from "react-icons/fa";
import { Button, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogActions  } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";

const TopBarCheckout = () => {
const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const handleLogout = () => {
    setLogoutDialogOpen(true);
  }
  const handleLogoutConfirm = () => {
    navigate("/")
    setLogoutDialogOpen(false);
  }
  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  }
  

  return (
    <div className="topBar">
      
      
      
      <div className="divider"/>
      {user ? 
          (<ButtonGroup className="rightButton" variant="outlined" aria-label="outlined button group">
                <Button component={Link} to="/" variant="containted" startIcon={<FaHome/>}>Home</Button>
                <Button component={Link} to="/profile/edit-profile" variant="containted" startIcon={<MdAccountCircle/>}>Profile</Button> 
                <Button variant="containted" startIcon={<FaSignOutAlt/>} onClick={handleLogout}>Sign-Out</Button>
            </ButtonGroup>
          ): 
          (
            <ButtonGroup className="rightButton" variant="outlined" aria-label="outlined button group">
              <Button component={Link} to="/" variant="containted" startIcon={<FaHome/>}>Home</Button>
              <Button component={Link} to="/login" variant="containted" startIcon={<FaSignInAlt/>}>Sign-in</Button>
            </ButtonGroup>
          )
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
  )
}

export default TopBarCheckout;