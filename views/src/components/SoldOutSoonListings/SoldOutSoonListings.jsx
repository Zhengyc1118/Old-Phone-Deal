import useFetch from "../../hooks/useFetch";
import "./soldOutSoonListings.css";

import { Link } from "react-router-dom";

const SoldOutSoonListings = () => 
{
    const { data, loading } = useFetch(
        "/phone/sold-out-soon"
    );

    return (
        <div className="sold-container">
            <h2>Sold Out Soon</h2>
            {loading ? (
                "Loading please wait"
            ): (
                <div className="sold-listings">
                    {
                        data.map((listing) =>(
                            <Link to={`/item/${listing._id}`} className="item-link">
                              <div>
                                <img src={`/phone_images/${listing.brand}.jpeg`} alt="" className="images"/>
                                <div className="price">
                                  <h4>A${listing.price}</h4>
                                </div>
                              </div>
                            </Link>
                        ))
                    }
                </div>)
            }
        </div>
    )
}

export default SoldOutSoonListings; 