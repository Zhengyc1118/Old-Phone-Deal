import "./profile.css"

import { Routes, Route } from "react-router-dom";

import SideBar from "../../components/SideBar/SideBar";
import EditProfile from "../../components/EditProfile/EditProfile";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import ManageListing from "../../components/ManageListing/ManageListing";
import Comments from "../../components/Comments/Comments";

const Profile = () => {
    
    return (
        <div className="profile-page">
            <SideBar>
                <Routes>
                  <Route path="edit-profile" element={<EditProfile/>}/>
                  <Route path="change-password" element={<ChangePassword/>}/>
                  <Route path="listings" element={<ManageListing/>}/>
                  <Route path="comments" element={<Comments/>}/>
                </Routes>
            </SideBar>
            
        </div>
    )
        
}

export default Profile;