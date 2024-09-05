import useFetch from "../../hooks/useFetch";
import "./bestseller.css";

import { Link } from "react-router-dom";

const BestSeller = () => 
{
    const { data, loading } = useFetch(
        "/phone/best-seller"
    );

    return (
        <div className="best-seller-container">
            <h2>Best Seller</h2>
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
                                  <h4>{listing.averageRating} out of 5</h4>
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

export default BestSeller; 