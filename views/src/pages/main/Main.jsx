import "./main.css"
import { Link, Route, Routes } from 'react-router-dom';


import TopBar from "../../components/TopBar/TopBar";
import Home from "../../components/Home/Home";
import Item from "../../components/Item/Item";
import Search from "../../components/Search/Search";

const Main = () => {
    return (
      <div className="main-page">
        <div className="header">
          <Link to="/" className="home-link">
            <h1>Old Phone Deals</h1>
          </Link>
          <TopBar/>
        </div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/result/:title" element={<Search />}/>
          <Route path="/item/:id" element={<Item />} />
        </Routes>
      </div>
      
    );
  };
  
  export default Main;