//TODO
//reviewer not login error msg

import "./item.css";
import { useState, useContext, useEffect  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Reviews from "../Reviews/Reviews";
import { Rating } from '@mui/material';
import UserContext from "../../context/UserContext";

const Listing = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [reviewer, setReviewer] = useState("");
    const [ rating, setRating ] = useState(5);
    const [ comment, setComment ] = useState("");
    const [reviews, setReviews] = useState([]);
    const [ loggedInUser, setLoggedInUser ] = useState(null);

    const [showPopup, setShowPopup] = useState(false);
    const [quantity, setQuantity] = useState(1);
    
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
      setLoggedInUser(user);
    }, [user]);

    const [ numInCart, setNumInCart ] = useState(0);
    //useState(cart ? cart.find((item) => item.id === params.id)?.quantity || 0 : 0);
    useEffect(() => {
      if(user){
        //setNumInCart(user.cart.find((item) => item.id === params.id)?.quantity);
        setNumInCart(user.cart ? user.cart.find((item) => item.id === params.id)?.quantity || 0 : 0);
      }else{
        setNumInCart(0);
      } 
      
    }, []);

    const showName = (uid) => {
        fetch(`/user/${uid}`)
            .then((res) => res.json())
            .then((user) => {
                setReviewer(`${user.firstname} ${user.lastname}`);
            })
        return reviewer;
    }

  const [data, setData] = useState(null);
  

  const openPopup = () => {
    if (user) {
      setShowPopup(true);
    } else {
      navigate("/login");
    }
    
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  //After pressing add to cart

  const addToCart = (item) => {
    if (loggedInUser === null) {
      sessionStorage.setItem("phone-id", params.id);
      navigate("/login");
    } else {
    let exist = false;
    user.cart.map((i) => {
      if(i.id === item.listing._id){
        const updatedItem = { ...i };
        i.quantity += parseInt(quantity);
        if(i.quantity > item.listing.stock){

          i.quantity = item.listing.stock;
          alert("Quantity set to max stock");
        }
        setNumInCart(i.quantity);
        closePopup();
        exist = true;
      }
    })
    if(!exist){
      const newItem = { id: item.listing._id,
        title: item.listing.title, 
        brand: item.listing.brand, 
        price: item.listing.price, 
        quantity: parseInt(quantity), 
        stock: item.listing.stock };

      const updatedUser = { ... user };
      updatedUser.cart.push(newItem);
      setUser(updatedUser);
      setNumInCart(parseInt(quantity));
      closePopup();
    }
};
}

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch(`/phone/${params.id}`);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [rating, comment]);

	  const goBack = () => {
		  navigate(-1, {replace: true});
	  }


    const handleSubmit = (event, {id}) =>{	
      event.preventDefault();	
      if (loggedInUser !== null) {
        fetch(`/phone/${id}/${loggedInUser.id}/${rating}/${comment}`)	
        .then((res) => res.json())	
        .then((response) => {	
          if (response.status === "error") {	
            alert("Failure");	
          } else {	
            setComment("");	
          }	
        })	
      } else {
        setComment("");	
      }
      
    }

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <div className="item-container">
            <i onClick={goBack}>{<IoArrowBackOutline/>}</i>
            <div>
                {
                  data && (data.map((listing) =>(
                    <div>
                      <div className="info">
                        <div>
                          <img src={`/phone_images/${listing.brand}.jpeg`} alt=""/>
                        </div>
                        <div className="right-part">
                          <p>{listing.brand}</p>
                          <p className="item-title">{listing.title}</p>
                          <p className="item-price">A${listing.price}</p>
                          <div className="text">
                            <div className="seller">
                              <p>Sold By&nbsp;</p>
                              <p id="seller-name">{showName(`${listing.seller}`)}</p>
                            </div>
                            <p>{listing.stock} LEFT!</p>
                          </div>
                          <div className="cart-section">
                            <button type="button" className="add-to-cart-btn" onClick={openPopup}>ADD TO CART</button>
                            <p>{numInCart} IN CART</p>
                          </div>
                          {showPopup && (
                            <div className="popup">
                              <div className="popup-content">
                                <div className="qty-container">
                                  <h4>Enter Quantity:</h4>
                                  <input type="number" value={quantity} min="0" max={listing.stock} onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                                <div>
                                  <button type="button" onClick={() => addToCart({listing: listing})} className="confirm-btn">
                                    Confirm
                                  </button>
                                  <button type="button" onClick={closePopup} className="cancel-btn">
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                      </div>
                      <Reviews id={listing._id} reviews={listing.reviews} seller={listing.seller}/>
                      <form className="add-review-form">
                        <p className="leave-review-msg">Leave a review!</p>
                        <div className="rating-box">
                          <p>Click the stars to rate your experience</p>
                          <Rating size="large" value={rating} onChange={(event, newValue) => {setRating(newValue);}} className="Rating"/>
                        </div>
                        <div className="comment-box">
                          <textarea className="add-comment-textarea" value={comment} onChange={handleChange} placeholder="Write a review" rows="4"/>
                        </div>
                        <div className="right-btn">
                        <button type="submit" className="post-btn" onClick={(event) => handleSubmit(event, { id: listing._id})}>Post</button>
                        </div>
                      </form>
                    </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default Listing;