import "./topBar.css";
import { BsSearch, BsFillCartFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Button, ButtonGroup, IconButton, Dialog, DialogTitle, DialogContent, DialogActions  } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";

const TopBar = () => {

  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    setTitle("");
  }, [user]);


  const navigate = useNavigate();

  const [title, setTitle] = useState("")

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const handleLogout = () => {
    setLogoutDialogOpen(true);
  }
  const handleLogoutConfirm = () => {
    setUser(null);
    navigate("/")
    setLogoutDialogOpen(false);
  }
  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  }

  return (
    <div className="topBar">
      <input type="text" placeholder = "Search by Title..." className="search-box" value={title} onChange={(e) => setTitle(e.target.value)} />
      {
        title.trim() ? (<IconButton component={Link} to={`/result/${title}`} Name="search-icon" style={{ color: 'white'}}><BsSearch /></IconButton>)
        :(<IconButton component={Link} to={"/"} Name="search-icon" style={{ color: 'white'}}><BsSearch /></IconButton>)
      }
      
      <div className="divider"/>
      {user ? 
          (<ButtonGroup className="rightButton" variant="outlined" aria-label="outlined button group">
              <Button component={Link} to="/checkout" variant="containted" startIcon={<BsFillCartFill/>}>Checkout</Button>
              <Button component={Link} to="/profile/edit-profile" variant="containted" startIcon={<MdAccountCircle/>}>Profile</Button> 
              <Button variant="containted" startIcon={<FaSignOutAlt/>} onClick={handleLogout}>Sign-Out</Button>
            </ButtonGroup>
          ): 
          (
            <ButtonGroup className="rightButton" variant="outlined" aria-label="outlined button group">
              <Button component={Link} to="/checkout" variant="containted" startIcon={<BsFillCartFill/>}>Checkout</Button>
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

export default TopBar;