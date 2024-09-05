import "./manageListing.css";
import useFetch from "../../hooks/useFetch";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { MdAddCircle } from "react-icons/md";
import { FormControlLabel, Switch, ButtonGroup, IconButton } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";

const ManageListing = () => {

    const { user } = useContext(UserContext);
    useEffect(() => {}, [user]);
    
    const { data, loading, reFetch } = useFetch(
        `/phone/seller/${user.id}`    
    )

  const [isAdding, setIsAdding] = useState(false);
  const handleClick = () => {
    setIsAdding(true);
  };
  const [phone, setPhone] = useState([
            {title:"", brand:"", stock:"", price:""}]
          )

  const handleChange = ({ currentTarget: input }) => {
    setPhone({ ...phone, [input.name]: input.value });
  };

  const handleSave = () => {
    setIsAdding(false);
    try {
      fetch(`/phone/add/${phone.title}/${phone.brand}/${phone.stock}/${user.id}/${phone.price}`);
      setPhone({
        title: "",
        brand: "",
        stock: "",
        price: ""
      });
      reFetch( `/phone/seller/${user.id}`)
    } catch (error) {
      alert("Add Listing Fail");
    }
  };

  const handleDisable = (id, status) => {
    const newStatus = !status;
    try {
      fetch(`/phone/manage/${id}?disable=${newStatus}`);
      reFetch(`/phone/seller/${user.id}`);
    } catch (error) {
      alert("Fail");
    }
  };
  
  const handleDelete = ({id}) => {
    try{
      fetch( `/phone/delete/${id}`)
      reFetch( `/phone/seller/${user.id}`);
    } catch (error) {
      alert("Fail");
    }
}

    return (
        <div>
            {
            loading ? (
            "Loading please wait"
        ): (
            <div>
                {
                    <div className="my-listings">
                      <h1 className="title">Manage Listings</h1>
                      <table class="listing-table">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Brand</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                            {
                            data && data.map((listing) =>(
                              <tr>
                                <td className="listing-title">{listing.title}</td>
                                <td>{listing.brand}</td>
                                <td>{listing.stock}</td>
                                <td>{listing.price}</td>
                                <td>
                                  <ButtonGroup className="actions">
                                    <FormControlLabel control={<Switch checked={listing.disabled === ""} 
                                                                       onChange={() => handleDisable(listing._id, listing.disabled!=="")}/>} 
                                                      label="Disable" labelPlacement="bottom"/>
                                    <IconButton style={{ color: '#bf2d2d'}} onClick={() => handleDelete({id: listing._id})}>
                                      <FaTrashAlt/>
                                    </IconButton>
                                  </ButtonGroup> 
                                </td>
                              </tr>
                            ))
                            }
                            {
                              isAdding && (
                                <tr>
                                  <td>
                                    <input
                                      type="text"
                                      name="title"
                                      value={phone.title}
                                      onChange={handleChange}
                                    />
                                  </td>
                                  <td>
                                    <input type="text" name="brand" value={phone.brand} onChange={handleChange}/>
                                  </td>
                                  <td>
                                    <input type="number" name="stock" value={phone.stock} onChange={handleChange} />
                                  </td>
                                  <td>
                                    <input type="number" name="price" value={phone.price} onChange={handleChange} />
                                  </td>
                                  <td><button onClick={handleSave} className="save">Save</button></td>
                                </tr>
                              )
                            }
                        </tbody>
                      </table>
                      <i onClick={handleClick}><MdAddCircle/></i>
                    </div>
                }
            </div>
            )}
        </div>)
}

export default ManageListing;