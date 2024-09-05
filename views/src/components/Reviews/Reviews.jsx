import "./reviews.css";
import { useEffect, useState } from "react";
import Review from "../Review/Review";

const Reviews = ({id, reviews, seller}) => {

    const isNotEmpty = reviews.length > 0;
    const [ reviewsDisplay, setReviewsDisplay ] = useState(Math.min(3, reviews.length));
    useEffect(() => {
        setReviewsDisplay(Math.min(3, reviews.length));
      }, [reviews]);

    const getReviews = () => {
        const res = [];
        for(var i = 0; i < reviewsDisplay; i++) {
            res.push(<Review data={reviews[i]} key={i} seller={seller} id={id}/>)
        }
        return res;
    }

    const showMoreHandler = () => {
        setReviewsDisplay(Math.min(reviews.length, reviewsDisplay + 3));
    }
    
    return (
        <div id="reviews-part">
            <h2 className="reviews-title">Reviews</h2>
            <div id="reviews-container">
                {
                isNotEmpty ? 
                    getReviews() : 
                <p className="no-reviews"> No Reviews</p> 
                } 
            </div>
            {reviews.length > reviewsDisplay &&
                <div className="center">
                  <button className="show-more-btn" onClick={showMoreHandler}>
                    Show more
                  </button>
                </div>
            }
        </div>
    );

}

export default Reviews;