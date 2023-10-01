import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/img/logotrans.png";
import Captcha from "./Captcha";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate  } from "react-router-dom";
import { SUCCESS, TOKEN, USER_DETAILS } from "../../constants/constants";
import { AuthService } from '../../../services/auth/auth.service';
import { toast } from "react-toastify";

function ConformPassword() {
  
  const inputRef = useRef(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
    //toggle password hide show
    const showIcon = () => <FaEyeSlash />;
    const hideIcon = () => <FaEye />;
    const goToBack = () =>{
      navigate("/Login");
     }

     const setPasswordApi = async (e) =>{
      console.log("hii");
 
      e.preventDefault();
  
      const formData = {
          password : newPassword
      };
      console.log(formData);
      const response = await AuthService.changeNewPassword(formData);
      console.log(response);
      console.log(response?.status === SUCCESS);
      if (response?.status === SUCCESS) {
        toast.status("Password changed successfully!");
        //navigate("/ConformPassword");
      } else {
        toast.error(response?.message);
      }
    
     }

  return (
    <div className="logindiv bggray">
      <div className="col-6 mauto">
        <div className="loginlogo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="row justify-content-between bgwite border1 padding30 contact-form-wrap">
          <h5>Conform Password</h5>
          <p>Please Enter your New Password!</p>
          <div className="col-12">
            <form className="form-div contact-form-wrap" >
            <label className="col-12">
                <input
                  type="newPassword"
                  placeholder="New Password"
                  className="login-input login-password"
                  name="newPassword"
                  ref={inputRef}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <ReactPasswordToggleIcon className="logineye"
                        inputRef={inputRef}
                        hideIcon={hideIcon}
                        showIcon={showIcon}
                      />
              </label>
              <label className="col-12">
                <input
                  type="conformPassword"
                  placeholder="conform Password"
                  className="login-input login-password"
                  name="conformPassword"
                  ref={inputRef}
                />
                <ReactPasswordToggleIcon className="logineye"
                        inputRef={inputRef}
                        hideIcon={hideIcon}
                        showIcon={showIcon}
                      />
              </label>
              <button className="mt20 mr10 webform-button--submit" onClick={setPasswordApi}>
                Done
              </button>
              <button className="mt20 mr10 webform-button--cancel"  onClick={goToBack}>
                Back
              </button>
            </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ConformPassword;
