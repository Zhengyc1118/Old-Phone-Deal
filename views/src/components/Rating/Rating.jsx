import "./rating.css";
import { BsStarFill, BsStar} from "react-icons/bs";

const Rating = ({ rating }) => {

    const stars = []
    for (var i = 0; i < 5; i++){
        if (i < rating) {
            stars.push(<BsStarFill/>);
        } else {
            stars.push(<BsStar/>);
        }
    }

    return (
        <div className="rating">
            {stars}
        </div>
        
    );

}

export default Rating;