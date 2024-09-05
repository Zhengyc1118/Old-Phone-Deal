import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Item from "./components/Item/Item";
import Search from "./components/Search/Search";
import Checkout from "./pages/checkout/Checkout";
import ConfirmEmail from "./components/ConfirmEmail/ConfirmEmail";
import Profile from "./pages/profile/Profile";
import EditProfile from "./components/EditProfile/EditProfile";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import ManageListing from "./components/ManageListing/ManageListing";
import Comments from "./components/Comments/Comments";

import { useState } from "react";
import { UserProvider } from "./context/UserContext"; 

function App() {
  const [ user, setUser ] = useState(null);

  return (
    <UserProvider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Main/>}>
          <Route path="/result/:title" element={<Search />} />
          <Route path="/item/:id" element={<Item />} />
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/reset-password" element={<ConfirmEmail/>}/>
        <Route path="/checkout" element={<Checkout/>}/>

        <Route path="/profile" element={<Profile/>}>
          <Route path="edit-profile" element={<EditProfile/>}/>
          <Route path="change-password" element={<ChangePassword/>}/>
          <Route path="listings" element={<ManageListing/>}/>
          <Route path="comments" element={<Comments/>}/>
        </Route>
      </Routes>
    </UserProvider>
    
  )
}

export default App;