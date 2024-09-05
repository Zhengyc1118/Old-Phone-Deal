import "./comments.css";
import useFetch from "../../hooks/useFetch";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { FormControlLabel, Switch } from "@mui/material";

const Comments = () => {
    const { user } = useContext(UserContext);
    useEffect(() => {}, [user]);

    const { data, loading } = useFetch(
        `/phone/seller/${user.id}`
    );

    const [showHiddenComments, setShowHiddenComments] = useState(true);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (!showHiddenComments) {
            fetch(`/phone/${user.id}/reviews`)
                .then((res) => res.json())
                .then((filteredData) => {
                    setReviews(filteredData);
                });
        }
    }, [showHiddenComments]);
    
    return (
        <div> 
            
            {
            loading ? (
                "Loading please wait"
            ): (
                <div className="comment-page">
                   <h1 className="title">View Comments</h1>
                   <div className="hidden-btn">
                    <FormControlLabel control={<Switch checked={showHiddenComments} onChange={(e) => setShowHiddenComments(e.target.checked)} />} label="Show Hidden Comments" labelPlacement="left" />
                   </div>
                     {
                            showHiddenComments ? (
                                <div>
                                    {
                                        data.map((listing) =>(
                                            <div >
                                                <h1 className="listing-title">{listing.title}</h1>
                                                {listing.reviews.length === 0 ? (
                                                    <div className="review-content">No Reviews</div>
                                                    ) : (
                                                        <div className="comment">
                                                            {listing.reviews.map((review) => (
                                                                <div className="review-content">
                                                                  <p>{review.comment}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                )}
                                            </div>
                                        ))
                                    }
                                </div> 
                            ) : (
                                reviews.length === 0 ? (
                                    <div className="review-content">No Reviews</div>
                                ) : (
                                    <div>
                                        {reviews.map((item) => (
                                            <div>
                                                <h1 className="listing-title">{item.title}</h1>
                                                {item.reviews.length === 0 ? (
                                                    <div className="review-content">No Reviews</div>
                                                    ) : (
                                                        <div className="comment">
                                                            {item.reviews.map((review) => (
                                                                <div className="review-content">
                                                                  <p>{review.comment}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                )} 
                                            </div>
                                    ))}
                                    </div>
                                    
                                )
                            )}
                            </div>
            )
            }
    </div>)
}
export default Comments;