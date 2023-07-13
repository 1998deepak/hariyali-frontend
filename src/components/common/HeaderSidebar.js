import React from "react";
import AdminHeader from "./AdminHeader";
import LeftMenu from "./AdminLeftMenu";
 

function HeaderSidebar({authToken,setAuthToken}) {
   if(authToken)
    return (
          <>
          <AdminHeader
          />
          <LeftMenu 
          />
          </>
        )
    };

    export default HeaderSidebar;