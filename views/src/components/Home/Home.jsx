import BestSeller from "../../components/BestSeller/BestSeller";
import SoldOutSoonListings from "../../components/SoldOutSoonListings/SoldOutSoonListings"; 
import Intro from "../../components/Intro/Intro";

const Home = () => {
    return (
      <div>
        <Intro/>   
        <div>
          <SoldOutSoonListings />
        </div>
        <div>
          <BestSeller/>
        </div>
        
      </div>
    );
  };
  
  export default Home;