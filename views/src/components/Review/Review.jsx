import "./review.css";
import { useState, useContext  } from "react";
import Rating from "../Rating/Rating";
import UserContext from "../../context/UserContext";

const Review = ({data, seller, id}) => {

    const { user } = useContext(UserContext);

    const isLong = data.comment.length > 200;
    const [showMore, setShowMore] = useState(false);
    const [reviewer, setReviewer] = useState("");
    const [hideComment, setHideComment] = useState(false);

    const showName = () => {

        fetch(`/user/${data.reviewer}`)
            .then((res) => res.json())
            .then((user) => {
                setReviewer(`${user.firstname} ${user.lastname}`);
            })
        return reviewer;
    }

    const displayComment = () => {
        if(!showMore && isLong) {
            return `${data.comment.substring(0, 200)}...`
        } else {
            return data.comment;
        }
    }

    const handleClick = () => {
        setShowMore(!showMore);
    }
    
    const handleCommentClick = () => {
        setHideComment(!hideComment);
        const newStatus = !hideComment;
        try {
            fetch(`/phone/${id}/${data.reviewer}?hide=${newStatus}`);
        } catch (error) {
            alert("Fail");
        }
    }

    return (
        <div className={hideComment ? "review-container-hidden" : "review-container"}>
            <div className="reviewer-name">
              <p>{showName()}</p>
            </div>
            <Rating rating={data.rating}/>
            <div className="comment-container">
              <p>{displayComment()}</p>
            {isLong ? (
            <button onClick={handleClick} className="show-more-btn">
                {showMore ? "Show Less" : "Show More"}
            </button>) 
            : <></>}
            { user ? (
                data.reviewer === user.id || seller === user.id ? (
                <button onClick={handleCommentClick} className={hideComment ? "hidden-btn" : "show-btn"}>
                    { hideComment ? "Show" : "Hide"}
                </button>
                ) : null
            ) : null
            }
            </div>
            
        </div>
    )
    
}

export default Review;