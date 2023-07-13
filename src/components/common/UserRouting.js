import "../../assets/css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../master/homePage/HomePage";
import Login from "../master/user/Login";
import Donate from "../master/donation/Donate";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";
// import WebDonarCreation from "./components/master/admin/webDonar/WebDonarCreation";

function UserRouting() {
  return (
    <>
      <div>
      {/* <Route path="/Login" element={<Login />} /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/Login" element={<Login />} />
          </Routes>
          <UserHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Donate" element={<Donate />} />
          </Routes>
          <UserFooter />
          </BrowserRouter>
      </div>
    </>
  );
}

export default UserRouting;
