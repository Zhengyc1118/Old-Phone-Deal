import "./editProfile.css";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";

const EditProfile = () =>{

    const { user, setUser }  = useContext(UserContext);
    useEffect(() => {}, [user]);

    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);

    const handleCancel = (e) => {
      e.preventDefault();
      setFirstname("");
      setLastname("");
      setEmail("");
    }    
    
    const updatedData = {
      firstname: firstname || user.firstname,
      lastname: lastname || user.lastname,
      email: email || user.email,
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch(`/user/edit-profile/${user.id}/${firstname}/${lastname}/${email}`)
          .then((res) => res.json())
          .then((response) => {
            if (response.status === "error") {
              console.log("Edition Error");
            } else {
              const updatedUser = { ...user, ...updatedData };
              setUser(updatedUser);
            }
      });
    }

    return (
        <div className="edit-profile-container">
            <h1 className="title">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="profile-form">
              <label>First Name</label>
              <input value={firstname}  onChange={(e) => setFirstname(e.target.value)} type="text" placeholder="First Name"/>
              <label>Last Name</label>
              <input value={lastname}  onChange={(e) => setLastname(e.target.value)} type="text" placeholder="Last Name"/>
              <label>Email</label> 
              <input value={email}  onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="Email"/>
              <div className="btns">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
              </div>
            </form>
        </div>
        
    )
}

export default EditProfile;