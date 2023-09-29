import React from 'react'
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APIService } from '../../services/api/api-service';
import { UserService } from '../../services/userService/user.service';

import { AuthService } from "../../services/auth/auth.service";
import { USER_DETAILS } from "../../components/constants/constants";
import { EncryptionService } from "../../services/encryption.service";

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
        toast.error("Session Expired , Please Login Again");
       
        let userDetails = EncryptionService.decrypt(localStorage.getItem(USER_DETAILS)).then(data =>{
            const response = AuthService.logout(JSON.parse(data)).then(data=>{
                APIService.Instance.removeToken();
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            });  
        });   
    }

    function checkAuthority(role) {
        if (admin && user) {
            if (admin === role || user === role)
                return true;
        } if (admin) {
            if (admin === role)
                return true;
        } else if(user === role){
            return true;
        }else{
            return false;
        }
    }


    if (userDetails) {
        const role = userDetails.role;
        console.log(role);
        setTimeout(() => {
            if(userDetails.expiryTime*1000 < Date.now()){
                sessionExpired();
            }
          }, 900000);
        return userDetails.expiryTime * 1000 < Date.now() ?
            sessionExpired() :
            checkAuthority(role) ? children : navigate("/Unauthorised");
    }



}

export default ProtectedRoutes