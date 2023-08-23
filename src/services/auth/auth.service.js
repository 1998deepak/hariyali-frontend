import { toast } from "react-toastify";
import { USER_DETAILS, TOKEN } from "../../components/constants/constants";
import { URLS } from "../../components/constants/urls";
import { APIService } from '../api/api-service'
import jwt_decode from "jwt-decode";
import { getLoginModel } from "./auth.model";

export const AuthService = {
  
  login: async (data) => {
    console.log(data);
    try {
      const response = await APIService.Instance.post(
        URLS.LOGIN,data        
      );
      console.log(response);

      return response?.data;
    }
     catch (err) {
      // console.log(err);
      // if (err?.response?.data) {
      //   return err?.response?.data;
      // }else{
      // toast.error(err?.message);
      //  }
    }
  },

  logout: async (data) => {
    try {
      const response = await APIService.Instance.post(
        URLS.LOGOUT,
          data
        );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      }else{
      toast.error(err?.message);
       }
    }
  },

  getUserDetails: () => {
    const stringifiedResponse = localStorage.getItem(USER_DETAILS);
    if (!stringifiedResponse) return null;
    return JSON.parse(stringifiedResponse);
  },

  getToken: () => {
    return localStorage.getItem(TOKEN);
  },

  sendForgetPasswordLink: async (formData) => {
    console.log(formData);
    try {
      const response = await APIService.Instance.post(
        URLS.SENDMAILFORGETPASSWORD,
        formData
      );
      console.log(response);
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },
  

  verifyOtp: async ( email, otp) => {
    try {
      const response = await APIService.Instance.post(
        URLS.VERIFYOTP+`?donarIdOrEmail=${email}&otp=${otp}`,
      );
      console.log(response);
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },







  resetPassword: async (password,token) => {
    try {
      const response = await APIService.Instance.post(
        URLS.RESETPASSWORD+"?password="+password+"&token="+token       
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      }else{
      toast.error(err?.message);
       }
    }
  },  
};