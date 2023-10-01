import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/img/logotrans.png";
import Captcha from "./Captcha";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate  } from "react-router-dom";
import { SUCCESS, TOKEN, USER_DETAILS } from "../../constants/constants";
import { AuthService } from '../../../services/auth/auth.service';
import { toast } from "react-toastify";

function OtpId() {
  
  const navigate = useNavigate();
  
  const goToLogin = () =>{
    navigate("/ConformPassword");
   }
   const goToBack = () =>{
    navigate("/Login");
   }


   const[OTP,setOTP]=useState("")
   const verifyOtp = async (e) => {
     console.log("hii");
     e.preventDefault();
     console.log(OTP);

     const formData = {
       formData: {
         OTP: OTP
       }
     };
     console.log(formData);
     const response = await AuthService.verifyForgetOtp(formData);
     console.log(response);
     console.log(response?.status === SUCCESS);
     if (response?.status === SUCCESS) {
       toast.status("OTP Verified successfully!");
       navigate("/ConformPassword");
     } else {
       toast.error(response?.message);
     }
   
   };
 

  return (
    <div className="logindiv bggray">
      <div className="col-6 mauto">
        <div className="loginlogo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="row justify-content-between bgwite border1 padding30 contact-form-wrap">
          <h5>Conform Your OTP</h5>
          <p>Please Enter your OTP!</p>
          <div className="col-12">
            <form className="form-div contact-form-wrap" >
              <label className="col-12">
              <input type="text" value={OTP} onChange={(e) => setOTP(e.target.value)} />
              </label>
              <button className="mt20 mr10 webform-button--submit" onClick={(e)=>verifyOtp(e)}>
                Next
              </button>
              <button className="mt20 mr10 webform-button--cancel" onClick={goToBack}>
                Back
              </button>
            </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default OtpId;
