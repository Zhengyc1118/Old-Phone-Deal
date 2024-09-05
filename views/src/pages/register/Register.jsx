import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

import UserContext, { User } from "../../context/UserContext";
import "./register.css"

const Register = () => {
  
    const [user, setUser] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });

    const userContext = useContext(UserContext);

    const handleChange = ({ currentTarget: input }) => {
      setUser({ ...user, [input.name]: input.value });
    };

    const handleSubmit = (e) =>{
      e.preventDefault();

      fetch(`/user/search/${user.email}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.length === 0) {
            fetch(`/user/${user.firstname}/${user.lastname}/${user.email}/${user.password}`)
                  .then((res) => res.json())
                  .then((response) => {
                    if (response.status === "error") {
                      alert("Registration Failure");
                    } else {
                      fetch(`/user/${user.email}/${user.password}`)
                      .then((res) => res.json())
                      .then((response) => {
                          const user = new User(response[0]);
                          userContext.setUser(user);
                          navigate(-2) 
                      });
                    }
                  });
          } else {
            alert("Email already registered");
          }
        });

      
    }
    
    const navigate = useNavigate();
	  const goBack = () => {
		  navigate(-1, {replace: true});
	  }

    return (
      <div className="register-page">
        <i onClick={goBack}>{<IoArrowBackOutline/>}</i>
        <div className="register-form-container">
          <h1>SIGN UP</h1>
          <form onSubmit={handleSubmit} className="register-form">
            <label htmlFor="firstname">First Name</label>
            <input value={user.firstname} 
                   onChange={handleChange} 
                   name="firstname" 
                   type="text" 
                   placeholder="First Name"
                   required
                   pattern="[A-Za-z]+" 
                   onInvalid={(e) => {e.target.setCustomValidity("Please enter a valid first name");}}
                   onInput={(e) => {e.target.setCustomValidity("");}}/>
            <label htmlFor="lastname">Last Name</label>
            <input value={user.lastname} 
                   onChange={handleChange} 
                   name="lastname" 
                   type="text" 
                   placeholder="Last Name"
                   required
                   pattern="[A-Za-z]+" 
                   onInvalid={(e) => {e.target.setCustomValidity("Please enter a valid last name");}}
                   onInput={(e) => {e.target.setCustomValidity("");}}/>
            <label htmlFor="email">Email</label> 
            <input value={user.email} 
                   onChange={handleChange} 
                   name="email" 
                   type="email" 
                   placeholder="Email" 
                   className="register-email-input"
                   required 
                   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                   onInvalid={(e) => {e.target.setCustomValidity("Please enter a valid email address");}}
                   onInput={(e) => {e.target.setCustomValidity("");}}/>
            <label htmlFor="password">Password</label> 
            <input value={user.password} 
                   onChange={handleChange} 
                   name="password" 
                   type="password" 
                   placeholder="Password" 
                   className="register-pw-input"
                   required
                   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                   onInvalid={(e) => {e.target.setCustomValidity("Password should have a minimum of 8 characters including a capital letter, a lower-case letter, a number and a symbol");}}
                   onInput={(e) => {e.target.setCustomValidity("");}}/>
            <button type="submit" className="sign-up-button">Sign Up</button>
          </form>
          <div className="login-container">
            <p>Already have an account?</p>
            <Link to="/login" className="login-link"><p>Sign In</p></Link>
          </div>
        </div> 
      </div>
  );
}

export default Register;