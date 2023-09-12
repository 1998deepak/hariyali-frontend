import "./App.css";
import "./assets/css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/master/homePage/HomePage";
import AboutUs from "./components/master/otherMenu/AboutUs";
import Login from "./components/master/user/Login";
import UserHeader from "./components/common/UserHeader";
import UserFooter from "./components/common/UserFooter";
import WebDonarCreation from "./components/master/admin/webDonar/WebDonarCreation";
import AdminHeader from "./components/common/AdminHeader";
import AdminLeftMenu from "./components/common/AdminLeftMenu";
import UserLeftMenu from "./components/common/UserLeftMenu";
import OnlineDonation from "./components/master/donation/OnlineDonation";
import DonarCreation from "./components/master/admin/donarCreation/DonarAdd";
import DonarView from "./components/master/admin/donarCreation/Donarview";
import OfflineDonationUpdate from "./components/master/admin/offlineDonation/OfflineDonationUpdate";
import OfflinePlanAndDonationUpdate from "./components/master/admin/offlineDonation/OfflinePlanAndDonationUpdate";
import Dashboard from "./components/master/admin/dashboard/Dashboard";
import { lazy, Suspense, useEffect, useState } from 'react';
import { AuthService } from './services/auth/auth.service';
import ConformPassword from "./components/master/user/ConformPassword";
import OtpId from "./components/master/user/OtpId";
import { ROLEAUTHORITY } from "./components/constants/constants";
import ProtectedRoutes from "./components/guards/ProtectedRoutes";
import Unauthorised from "./components/common/Unautherised";
import OfflineDonation from "./components/master/admin/offlineDonation/OfflineDonation";
import WhatWeDo from "./components/master/otherMenu/WhatWeDo";
import WhySupportUs from "./components/master/otherMenu/WhySupportUs";
import FootPrint from "./components/master/otherMenu/FootPrint";
import GalleryAwards from "./components/master/otherMenu/GalleryAwards";
import ContactUs from "./components/master/otherMenu/ContactUs";
import Policy from "./components/master/otherMenu/PolicyPayment";
import WaystoAssociate from "./components/master/otherMenu/WaystoAssociate";
import OnlineExistingDonar from "./components/master/donation/OnlineExistingDonar";
import UserUpdate from "./components/master/user/UserUpdate";
import UserdonationView from "./components/master/admin/donarCreation/UserdonationView";
import { UserService } from "./services/userService/user.service";
import UserSpecificDonationView from "./components/master/admin/donarCreation/UserSpecificDonationView";
import UserDashboard from "./components/master/user/UserDashboard";
import UserReceipts from "./components/master/user/UserReceipts";
import Faq from "./components/master/otherMenu/Faq";
import DashboardTable from "./components/master/Dashboard/DashboardTable";


function HomeWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <Home />
      <UserFooter />
    </>
  );
}
function AboutWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <AboutUs />
      <UserFooter />
    </>
  );
}
function PolicyWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <Policy />
      <UserFooter />
    </>
  );
}
function WaystoAssociateWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <WaystoAssociate />
      <UserFooter />
    </>
  );
}
function WhatWeDoWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <WhatWeDo />
      <UserFooter />
    </>
  );
}
function WhySupportUsWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <WhySupportUs />
      <UserFooter />
    </>
  );
}
function FootPrintWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <FootPrint />
      <UserFooter />
    </>
  );
}
function GalleryAwardsWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <GalleryAwards />
      <UserFooter />
    </>
  );
}
function FaqWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <Faq />
      <UserFooter />
    </>
  );
}
function ContactUsWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <ContactUs />
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
function ExistingOnlineDonate() {
  return (
    <>
    <AdminHeader />
    <div className="leftmenu-main">
        <UserLeftMenu />
        <div className="float-left page-scroll remove-top-margin" style={{ width: "100%" }}>
        <OnlineExistingDonar />
        </div>
      </div>
    </>
  );
}

function UpdateUserWithHeaderFooter() {
  return (
    <>
    <AdminHeader />
    <div className="leftmenu-main">
        <UserLeftMenu />
        <div className="float-left page-scroll remove-top-margin" style={{ width: "100%" }}>
        <UserUpdate />
        </div>
      </div>
    </>
  );
}
function UserReceiptsWithHeaderFooter() {
  return (
    <>
    <AdminHeader />
    <div className="leftmenu-main">
        <UserLeftMenu />
        <div className="float-left page-scroll remove-top-margin" style={{ width: "100%" }}>
        <UserReceipts />
        </div>
      </div>
    </>
  );
}

function UserDashboardWithHeaderFooter() {
  return (
    <>
    <AdminHeader />
    <div className="leftmenu-main">
        <UserLeftMenu />
        <div className="float-left page-scroll remove-top-margin" style={{ width: "100%" }}>
        <UserDashboard />
        </div>
      </div>
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
function LoginWithHeaderAndFooter() {
  return (
    <>
      <UserHeader />
      <Login />
      <UserFooter />
    </>
  );
}
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
function PlantingWithHeaderAndFooter() {
  return (
    <>
       <AdminHeader />
      <div className="leftmenu-main">
        <AdminLeftMenu />
        <div className="float-left page-scroll" style={{ width: "100%" }}>
        <DashboardTable />
      </div>
      </div>
    </>
  );
}
function UserDonationView({ userDetails, setAuthToken, authToken }) {
  return (
    <>
     <AdminHeader />
      <div className="leftmenu-main">
      <UserLeftMenu />
        <div className="float-left" style={{ width: "100%" }}>
        <UserdonationView userDetails={userDetails?.email} setAuthToken={setAuthToken} authToken={authToken} />
        </div>
      </div>
    </>
  );
}

function UserSpecificDonation() {
  return (
    <>
       <AdminHeader />
      <div className="leftmenu-main">
      <UserLeftMenu />
        <div className="float-left" style={{ width: "100%" }}>
      <UserSpecificDonationView />
      </div></div>
    </>
  );
}
function App() {
  const [authToken, setAuthToken] = useState();
  const userDetails = UserService.userDetails();
  console.log("userDetails:", userDetails);

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
        <Route path="/Policy" element={<PolicyWithHeaderAndFooter />} />
        <Route path="/AboutUs" element={<AboutWithHeaderAndFooter />} />
        <Route path="/WaystoAssociate" element={<WaystoAssociateWithHeaderAndFooter />} />
        <Route path="/WhatWeDo" element={<WhatWeDoWithHeaderAndFooter />} />
        <Route path="/WhySupportUs" element={<WhySupportUsWithHeaderAndFooter />} />
        <Route path="/FootPrint" element={<FootPrintWithHeaderAndFooter />} />
        <Route path="/GalleryAwards" element={<GalleryAwardsWithHeaderAndFooter />} />
        <Route path="/Faq" element={<FaqWithHeaderAndFooter />} />
        <Route path="/ContactUs" element={<ContactUsWithHeaderAndFooter />} />
        <Route path="/Login" element={<LoginWithHeaderAndFooter />} />
        <Route path="/OtpId" element={<OtpId />} />
        <Route path="/ConformPassword" element={<ConformPassword />} />
        <Route path="/OnlineDonation" element={<DonateWithHeaderAndFooter />} />

        <Route path="/ExistingOnlineDonation" element = {<ProtectedRoutes user={authority.user}>
                    <ExistingOnlineDonate  />
                  </ProtectedRoutes>}/>
        
                  <Route path="/user/dashboard" element = {<ProtectedRoutes user={authority.user}>
                    <UserDashboardWithHeaderFooter setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>}/>
                  <Route path="/user/update" element = {<ProtectedRoutes user={authority.user}>
                    <UpdateUserWithHeaderFooter/>
                  </ProtectedRoutes>}/>
                  <Route path="/user/receipts" element = {<ProtectedRoutes user={authority.user}>
                    <UserReceiptsWithHeaderFooter />
                  </ProtectedRoutes>}/>




                  <Route path="/UserDonation/:email?"
                element={
                  <ProtectedRoutes user={authority.user}>
                    <UserDonationView userDetails={userDetails} setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } />

            <Route path="/UserSpecificDonationView/:id?"
                element={
                  <ProtectedRoutes user={authority.user}>
                    <UserSpecificDonation setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } />

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
        {/* <Route path="/TryingDonation"
                element={
                  <ProtectedRoutes admin={authority.admin} user={authority.user}>
                    <TryWithHeaderAndFooter setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } /> */}
        {/* <Route
          path="/Dashboard"
          element={<DashboardWithHeaderAndFooter />}
        /> */}
        <Route path="/Dashboard"
                element={
                  <ProtectedRoutes admin={authority.admin} >
                    <DashboardWithHeaderAndFooter setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } />

        <Route path="/Plantation"
                element={
                  <ProtectedRoutes admin={authority.admin} >
                    <PlantingWithHeaderAndFooter setAuthToken={setAuthToken} authToken={authToken} />
                  </ProtectedRoutes>
                } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
