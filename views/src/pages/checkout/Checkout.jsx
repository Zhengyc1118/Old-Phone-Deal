import "./checkout.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

import TopBarCheckout from "../../components/TopBarCheckout/TopBarCheckout";
import UserContext from "../../context/UserContext";

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1, {replace: true});
    }
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
      setCart(user ? user.cart : []);
    }, [user]);
    
    const [cart, setCart] = useState([]);
  
    const handleUpdateQuantity = (itemId, quantity) => {
      // Update the quantity of the item in the cart
      const updatedCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      );
      setCart(updatedCart);
      const updatedUser = { ...user };
      updatedUser.cart = updatedCart;
      setUser(updatedUser);
    };
  
    const handleRemove = (itemId) => {
      const itemIndex = cart.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        // Create a new array by excluding the item at the found index
        const updatedCart = [...cart.slice(0, itemIndex), ...cart.slice(itemIndex + 1)];
    
        // Update the cart state
        setCart(updatedCart);
    
        // Update the user's cart
        const updatedUser = { ...user };
        updatedUser.cart = updatedCart;
        setUser(updatedUser);
      }
    }; 

    useEffect(() => {
      const calculateTotalPrice = () => {
        let totalPrice = 0;
        cart.forEach((item)=>{
          totalPrice += item.price * item.quantity;
        })
        setTotalPrice(totalPrice);
      };
  
      calculateTotalPrice();
    }, [cart])

    const placeOrder = async () => {
      if (user) {
        // Loop through the cart and update each item's stock
        for (const item of cart) {
          const newStock = item.stock - item.quantity;
          await updateItemStock(item.id, newStock);
        }
        //After updating stock, remove the item from cart
        setCart([]);
        const updatedUser = {...user };
        updatedUser.cart = [];
        setUser(updatedUser);

        navigate('/');
      }
    };

    const updateItemStock = async (itemId, newStock) => {
      await fetch(`/phone/update/${itemId}/${newStock}`);
    }

    return (
        <div className="checkout-page">
            <div className="header">
                <Link to="/" className="home-link">
                  <h1>Old Phone Deals</h1>
                </Link>
                <TopBarCheckout/>
            </div>
            
            <i onClick={goBack}>{<IoArrowBackOutline/>}</i>
            {/* All of added items in the cart with these information
            -The title of the phone listing.
            -The price of each item.
            -The quantity selected.
            A button and textbox to modify the quantity of the item (selecting 0 will remove the item.
            A button to remove an item. */}
            <div className="checkout-container">
              <h2>Shopping Cart</h2>
              <table className="checkout-table">
                <thead >
                    <tr>
                    <th colSpan={2}>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th></th>
                    </tr>
                </thead>
                
                <tbody>
                  {
                    user && cart.length > 0 ? cart.map((item) => (
                      <tr key={item.id}>
                        <td> <img src={`/phone_images/${item.brand}.jpeg`} alt="" className="item-image"/></td>
                        <td>{item.title}</td>
                        <td>${item.price}</td>
                        <td>
                          <input type="number" min="1" max={item.stock} defaultValue={item.quantity} onChange={(e)=>handleUpdateQuantity(item.id, parseInt(e.target.value))} />
                        </td>
                        <td>
                          <i onClick={()=>handleRemove(item.id)}>{<RxCross2/>}</i>
                        </td>
                      </tr>
                    )) : <tr className="no-item-row"><td colSpan={5}>No Items</td></tr>
                  }
                  <tr>
                    <td colSpan={5} className="total-price-row">
                    <p>Total Price: ${Math.round(totalPrice).toFixed(2)}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="checkout-btn-container">
                <button className="checkoutButton" onClick={placeOrder}>Place Order</button>
              </div>
            </div>
        </div>
    )
}
export default Checkout;