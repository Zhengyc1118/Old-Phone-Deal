import "./changePW.css";

import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";

const ChangePassword = () => {
    
    const { user }  = useContext(UserContext);
    useEffect(() => {}, [user]);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        //validate current password


        // update new password
        fetch(`/user/change-password/${user.id}/${newPassword}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.status === "error") {
            console.log("Error");
          } else {
            setCurrentPassword("");
            setNewPassword("");
          }
    });
    }

    return (
        <div className="change-form-container">
            <h1 className="title">Change Password</h1>
            <form onSubmit={handleSubmit} className="change-form">
                <label>Current Password</label>
                <input value={currentPassword} 
                       onChange={(e) => setCurrentPassword(e.target.value)} 
                       type="password" 
                       placeholder="Current Password" 
                       className="curre t-password"/>
                <label>New Password</label>
                <input value={newPassword} 
                       onChange={(e) => setNewPassword(e.target.value)} 
                       type="password" 
                       placeholder="New Password" 
                       className="new-password"
                       required
                       pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                       onInvalid={(e) => {e.target.setCustomValidity("Password should have a minimum of 8 characters including a capital letter, a lower-case letter, a number and a symbol");}}
                       onInput={(e) => {e.target.setCustomValidity("");}}/>
              <button type="submit" className="reset-button">Confirm</button>
            </form>
        </div>
        
    );
}
export default ChangePassword;