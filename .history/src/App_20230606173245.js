import "./App.css";
import "./assets/css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/master/homePage/HomePage";
import Login from "./components/master/user/Login";
import UserHeader from "./components/common/UserHeader";
import UserFooter from "./components/common/UserFooter";
import WebDonarCreation from "./components/master/admin/webDonar/WebDonarCreation";
import AdminHeader from "./components/common/AdminHeader";
import AdminLeftMenu from "./components/common/AdminLeftMenu";
import OnlineDonation from "./components/master/donation/OnlineDonation";
import DonarCreation from "./components/master/admin/donarCreation/DonarAdd";
import DonarView from "./components/master/admin/donarCreation/Donarview";
import OfflineDonationUpdate from "./components/master/admin/offlineDonation/OfflineDonationUpdate";
import OfflinePlanAndDonationUpdate from "./components/master/admin/offlineDonation/OfflinePlanAndDonationUpdate";
import TryingDonation from "./components/master/donation/TryingDonation";
import Dashboard from "./components/master/admin/dashboard/Dashboard";
import { lazy, Suspense, useEffect, useState } from 'react';
import { AuthService } from './services/auth/auth.service';
import ConformPassword from "./components/master/user/ConformPassword";
import OtpId from "./components/master/user/OtpId";
import { ROLEAUTHORITY } from "./components/constants/constants";
import ProtectedRoutes from "./components/guards/ProtectedRoutes";
import Unauthorised from "./components/common/Unautherised";
import OfflineDonation from "./components/master/admin/offlineDonation/OfflineDonation";


function HomeWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <Home />
      <UserFooter />
    </>
  );
}

function DonateWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <OnlineDonation />
      <UserFooter />
    </>
  );
}
function OfflineDonationWithHeaderAndFooter() {
  return (
    <>
      <AdminHeader />
      <div className="leftmenu-main">
        <AdminLeftMenu />
        <div className="float-left page-scroll" style={{ width: "100%" }}>
      <OfflineDonation />
      </div>
      </div>
    </>
  );
}
function AdminWithHeaderAndFooter() {
  return (
    <>
      <AdminHeader />
      <div className="leftmenu-main">
        <AdminLeftMenu />
        <div className="float-left page-scroll" style={{ width: "100%" }}>
          <WebDonarCreation />
        </div>
      </div>
    </>
  );
}
function DonarAdminWithHeaderAndFooter() {
  return (
    <>
      <AdminHeader />
      <div className="leftmenu-main">
        <AdminLeftMenu />
        <div className="float-left page-scroll" style={{ width: "100%" }}>
          <DonarCreation />
        </div>
      </div>
    </>
  );
}
function DonarAdminViewWithHeaderAndFooter() {
  return (
    <>
      <AdminHeader />
      <div className="leftmenu-main">
        <AdminLeftMenu />
        <div className="float-left page-scroll" style={{ width: "100%" }}>
          <DonarView />
        </div>
      </div>
    </>
  );
}
function DonarAdminEditWithHeaderAndFooter() {
  return (
    <>
     <AdminHeader />
      <div className="leftmenu-main">
        <AdminLeftMenu />
        <div className="float-left page-scroll" style={{ width: "100%" }}>
      <OfflineDonationUpdate />
      </div></div>    </>
  );
}
function DonarAdminPayWithHeaderAndFooter() {
  return (
    <>
       <AdminHeader />
      <div className="leftmenu-main">
        <AdminLeftMenu />
        <div className="float-left page-scroll" style={{ width: "100%" }}>
      <OfflinePlanAndDonationUpdate />
      </div></div>
    </>
  );
}
// function TryWithHeaderAndFooter() {
//   return (
//     <>
//       <UserHeader />
//       <TryingDonation />
//       <UserFooter />
//     </>
//   );
// }
function DashboardWithHeaderAndFooter() {
  return (
    <>
       <AdminHeader />
      <div className="leftmenu-main">
        <AdminLeftMenu />
        <div className="float-left page-scroll" style={{ width: "100%" }}>
      <Dashboard  />
      </div>
      </div>
    </>
  );
}
function App() {
  const [authToken, setAuthToken] = useState();

  const authority = ROLEAUTHORITY;
  useEffect(() => {
    setAuthToken(AuthService.getToken());
  }, [])
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/Unauthorised"
                element={<Unauthorised />} />
        <Route path="/" element={<HomeWithHeaderAndFooter />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/OtpId" element={<OtpId />} />
        <Route path="/ConformPassword" element={<ConformPassword />} />
        <Route path="/OnlineDonation" element={<DonateWithHeaderAndFooter />} />
        {/* <Route
          path="/OfflineDonation"
          element={<OfflineDonationWithHeaderAndFooter />}
        /> */}
 <Route path="/OfflineDonation"
                element={
                  <ProtectedRoutes admin={authority.admin} user={authority.user}>
                    <OfflineDonationWithHeaderAndFooter setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } />
      
        {/* <Route
          path="/WebDonarCreation"
          element={<AdminWithHeaderAndFooter />}
        /> */}
         <Route path="/WebDonarCreation"
                element={
                  <ProtectedRoutes admin={authority.admin} user={authority.user}>
                    <AdminWithHeaderAndFooter setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } />
      
        {/* <Route
          path="/DonarCreation"
          element={<DonarAdminWithHeaderAndFooter />}
        /> */}
         <Route  path="/DonarCreation"
                element={
                  <ProtectedRoutes admin={authority.admin} user={authority.user}>
                    <DonarAdminWithHeaderAndFooter setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } />
        {/* <Route
          path="/DonarView/:id?"
          element={<DonarAdminViewWithHeaderAndFooter />}
        /> */}
         <Route path="/DonarView/:id?"
                element={
                  <ProtectedRoutes admin={authority.admin} user={authority.user}>
                    <DonarAdminViewWithHeaderAndFooter setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } />
        {/* <Route
          path="/OfflineDonationEdit/:id?"
          element={<DonarAdminEditWithHeaderAndFooter />}
        /> */}
         <Route path="/OfflineDonationUpdate/:id?"
                element={
                  <ProtectedRoutes admin={authority.admin} user={authority.user}>
                    <DonarAdminEditWithHeaderAndFooter setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } />
        {/* <Route
          path="/OfflineDonationPay/:id?"
          element={<DonarAdminPayWithHeaderAndFooter />}
        /> */}
        <Route path="/OfflinePlanAndDonationUpdate/:id?"
                element={
                  <ProtectedRoutes admin={authority.admin} user={authority.user}>
                    <DonarAdminPayWithHeaderAndFooter setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } />
        {/* <Route
          path="/TryingDonation"
          element={<TryWithHeaderAndFooter />}
        /> */}
        <Route path="/TryingDonation"
                element={
                  <ProtectedRoutes admin={authority.admin} user={authority.user}>
                    <TryWithHeaderAndFooter setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } />
        {/* <Route
          path="/Dashboard"
          element={<DashboardWithHeaderAndFooter />}
        /> */}
        <Route path="/Dashboard"
                element={
                  <ProtectedRoutes admin={authority.admin} user={authority.user}>
                    <DashboardWithHeaderAndFooter setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
