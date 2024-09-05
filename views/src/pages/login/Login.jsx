import "./login.css";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoArrowBackOutline } from "react-icons/io5";

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext, { User } from "../../context/UserContext";

const Login = () => {
  
  const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const userContext = useContext(UserContext);

    const handleSubmit = (e) => {
      e.preventDefault();

      fetch(`/user/${email}/${password}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.length === 0) {
          setInvalidCredentials(true);
        } else {
          const user = new User(response[0]);
          userContext.setUser(user);
          navigate(-1) 
        }
      });
    }
 
	  const goBack = () => {
		  navigate(-1)
    }
    
    return (
        <div className="login-page">
          <i onClick={goBack}>{<IoArrowBackOutline/>}</i>
          <div className="form-container">
          <h1 className="title">SIGN IN</h1>
          {invalidCredentials && <p className="invalid-text">Invalid Credentials</p>}
            <form onSubmit={handleSubmit}>
              <div className="wrapper">
                <i>{<MdOutlineEmail/>}</i>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="email-input"/>
              </div>
              <div className="wrapper">
                <i>{<RiLockPasswordLine/>}</i>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="pw-input" autoComplete="off"/>
              </div>
              <Link to="/reset-password" className="reset-link"><p>Reset Password?</p></Link>
              <button className="login-button">Sign In</button>
              <div className="sign-up-container">
                <p className="sign-up-text">Don't have an account?&nbsp;</p>
                <Link to="/register" className="sign-up-link"><p>Sign Up</p></Link>
              </div>
            </form>
          </div>
        </div>
        
    );
}

export default Login;