import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./confirmEmail.css";
import { MdOutlineEmail } from "react-icons/md";

const ConfirmEmail = () => {
    const [email, setEmail] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        //check if email does not exist
        fetch(`/user/search/${email}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.length === 0) {
            alert("Email Does Not Exist.")
            setEmail("");
          } else {
            setModalIsOpen(true);
          }
        });
        

    }
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");

    const navigate = useNavigate();
    
    const handleReset = (e) => {
      e.preventDefault();
      if (pw1 === pw2) {
        fetch(`/user/reset-password/${email}/${pw1}`)
          .then((res) => res.json())
          .then((response) => {
            if (response.status === "error") {
              console.log("Error");
            } else {
              setPw1("");
              setPw2("");
              navigate("/");
            }
          })
      } else {
        setPw1("");
        setPw2("");
        alert("Values do not match");
      }
  } 
    
    return (
        <div className="pw-reset-page">
          <div className="reset-form-container">
            <h1 className="title">RESET PASSWORD</h1>
            <form onSubmit={handleSubmit}>
              <p className="text">Enter you email address and we'll send you a link to reset your password.</p>
              <div className="wrapper">
                <i>{<MdOutlineEmail/>}</i>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="email-input"/>
              </div>
              <button className="submit-button" >Continue</button>
            </form>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Reset Password Modal"
            className="modal"
            overlayClassName="overlay"
          >
             <div className="reset-form-container">
              <form onSubmit={handleReset} className="reset-form">
                <h1 className="title">RESET PASSWORD</h1>
                  <label>New Password</label>
                  <input value={pw1} 
                         onChange={(e) => setPw1(e.target.value)} 
                         type="password" 
                         placeholder="New Password" 
                         className="new-password"
                         required
                         pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                         onInvalid={(e) => {e.target.setCustomValidity("Password should have a minimum of 8 characters including a capital letter, a lower-case letter, a number and a symbol");}}
                         onInput={(e) => {e.target.setCustomValidity("");}}/>
                  <label>Confirm Password</label>
                  <input value={pw2} 
                         onChange={(e) => setPw2(e.target.value)} 
                         type="password" 
                         placeholder="Confirm Password" 
                         className="new-password"
                         required
                         pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                         onInvalid={(e) => {e.target.setCustomValidity("Password should have a minimum of 8 characters including a capital letter, a lower-case letter, a number and a symbol");}}
                         onInput={(e) => {e.target.setCustomValidity("");}}/>
                <button type="submit" className="reset-button" >Reset password</button>
              </form>
            </div>

            
          </Modal>
        </div>
        
    );
}

export default ConfirmEmail;