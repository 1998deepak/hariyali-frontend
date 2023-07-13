import React from 'react'
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APIService } from '../../services/api/api-service';
import { UserService } from '../../services/userService/user.service';
// import APIService from "../../services/api/api-service";
const ProtectedRoutes = ({ children, admin, user }) => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState();

    useMemo(() => {
        let token = APIService.Instance.getToken();
        console.log(token);
        console.log(token === null || token === undefined);
        if (token === null || token === undefined) {
            window.location.href = "/";
        }
        setUserDetails(UserService.userDetails());
    }, [])
    console.log(userDetails);



    function sessionExpired() {
        toast.error("Session Expired , Please Login Again")
        APIService.Instance.removeToken();
        setTimeout(() => {
            window.location.href = "/";
        }, 1500);
    }
    function checkAuthority(role) {
        if (admin && user) {
            if (admin === role || user === role)
                return true;
        } if (admin) {
            if (admin === role)
                return true;
        } else {
            return false;
        }
    }


    if (userDetails) {
        const role = userDetails.role;
        console.log(role);
        return userDetails.expiryTime * 1000 < Date.now() ?
            sessionExpired() :
            checkAuthority(role) ? children : navigate("/Unauthorised");
    }



}

export default ProtectedRoutes