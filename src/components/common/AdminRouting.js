import "../../assets/css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../master/homePage/HomePage";
import AdminLogin from "../master/user/Login";
import Donate from "../master/donation/Donate";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";
// import WebDonarCreation from "./components/master/admin/webDonar/WebDonarCreation";

function AdminRouting() {
  return (
    <>
      <div>
        <BrowserRouter>
          <UserHeader />
          <Routes>
          <Route path="/AdminLogin" element={<AdminLogin />} />
          </Routes>
          <UserFooter />
          </BrowserRouter>
      </div>
    </>
  );
}

export default AdminRouting;
