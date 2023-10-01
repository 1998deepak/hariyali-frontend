import { useRef, useState } from "react";
import logo from "../../../assets/img/logotrans.png";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useLocation, useNavigate  } from "react-router-dom";
import { SUCCESS} from "../../constants/constants";
import { AuthService } from '../../../services/auth/auth.service';
import { ToastContainer, toast } from "react-toastify";
import "./style.css"

function ConformPassword() {

  const location = useLocation();
  console.log(location.state)
  const UserId = location.state;
  
  const inputRef = useRef(false);
  const confirmInputRef = useRef(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
    //toggle password hide show
    const showIcon = () => <FaEyeSlash />;
    const hideIcon = () => <FaEye />;
    const goToBack = () =>{
      navigate("/Login");
     }



     const setPasswordApi = async (e) =>{
      console.log(UserId);
      e.preventDefault();
      const formData = {
          email : UserId,
          password : newPassword
      };
      console.log(formData);
      const response = await AuthService.changeNewPassword(formData);
      console.log(response);
      console.log(response?.status === SUCCESS);
      if (response?.status === SUCCESS) {
        toast.success(response?.message);
        setTimeout(()=>{
          navigate("/Login");
        },1000)
      } else {
        toast.error(response?.message);
      }
     }

  return (
    <>
    <ToastContainer/>
    <div className="logindiv bggray">
      <div className="mauto">
        <div className="loginlogo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="row justify-content-between bgwite border1 padding30 contact-form-wrap creditial-div">
          <h5 className="header-text">Confirm Password</h5>
          <p>Please Enter your New Password!</p>
          <div className="col-12">
            <form className="form-div contact-form-wrap" >
            <label className="col-12 form-group">
                <input
                  type="password"
                  placeholder="New Password"
                  className="login-input login-password form-control"
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
              <label className="col-12 form-group">
                <input
                  type="password"
                  placeholder="confirm Password"
                  className="login-input login-password form-control"
                  name="conformPassword"
                  ref={confirmInputRef}
                />
                <ReactPasswordToggleIcon className="logineye"
                        inputRef={confirmInputRef}
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
    </>
  );
}

export default ConformPassword;
