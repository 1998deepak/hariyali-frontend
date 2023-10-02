import { useState } from "react";
import logo from "../../../assets/img/logotrans.png";
import { useNavigate,useLocation  } from "react-router-dom";
import { SUCCESS } from "../../constants/constants";
import { AuthService } from '../../../services/auth/auth.service';
import { ToastContainer, toast } from "react-toastify";

function OtpId() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  
   const goToBack = () =>{
    navigate("/Login");
   }


   const[OTP,setOTP]=useState("")
   const verifyOtp = async (e) => {
     e.preventDefault();
     console.log(OTP);
     const response = await AuthService.verifyForgetOtp(data, OTP);
     console.log(response);
     console.log(response?.status === SUCCESS);
     if (response?.status === SUCCESS) {
       toast.success(response?.message);
       setTimeout(() => {
        navigate("/ConformPassword",
        {
          state: data,
        }
        );
       }, 1000);
        
     } else {
       toast.error(response?.message);
     }
   };
 

  return (
    <>
    <ToastContainer/>
    <div className="logindiv bggray">
      <div className="mauto">
        <div className="loginlogo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="row justify-content-between bgwite padding30 contact-form-wrap creditial-div">
          <h5 className="header-text">Confirm Your OTP</h5>
          <p>Please Enter your OTP!</p>
          <div className="col-12">
            <form className="form-div contact-form-wrap" >
              <label className="col-12">
              <input className="form-control" type="text" value={OTP} onChange={(e) => setOTP(e.target.value)} />
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
    </>
  );
}

export default OtpId;
