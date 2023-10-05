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
  const [password, setPassword] = useState({
    newPassword:"",
    confirmPassword:""
  });
  const [error, setError] = useState({
    newPassword:"",
    confirmPassword:"",
  });
  const navigate = useNavigate();
    //toggle password hide show
    const showIcon = () => <FaEyeSlash />;
    const hideIcon = () => <FaEye />;
    const goToBack = () =>{
      navigate("/Login");
     }

     const setPasswordApi = async (e) =>{
      e.preventDefault();
      if(error.newPassword || error.confirmPassword){
        return;
      }
      
      if (!password.newPassword) {
        setError({...error,newPassword:"Enter New Password"});
        return;
      }
      if (!password.confirmPassword) {
        setError({...error,confirmPassword:"Enter Confirm Password"});
        return;
      }
      if (password.newPassword !== password.confirmPassword) {
        setError({...error,confirmPassword:"New Password and Confirm Password do not match"});
      }
     
      console.log(UserId);
      const formData = {
          email : UserId,
          password : password.newPassword
      };
      console.log(formData);
      const response = await AuthService.changeNewPassword(formData);
      console.log(response);
      console.log(response?.status === SUCCESS);
      if (response?.status === SUCCESS) {
        toast.success(response?.message);
        setTimeout(()=>{
          navigate("/Login");
        },2000)
      } else {
        toast.error(response?.message);
      }
     }

     const validaPassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
      return passwordRegex.test(password);
    };

    const validatePassword = (event)=>{
      let { value } = event.target;
      if (value === password.newPassword) {
        setError("");
      }else{
        setError({...error,confirmPassword:"New Password and Confirm Password do not match"});
      }
    }

    const handlePasswordChange = (event) =>{
      let { name,value } = event.target;
      let passwords = {...password};
      passwords[name] = value;
      setPassword(passwords);
      if (error[name]) {
        setError({...error,[name]:""});
      }
      if (name === "newPassword") {
        let valid = validaPassword(value);
        if (!valid) {
          setError({...error,newPassword:"Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."});
        }else{
          setError({...error,newPassword:""});
        }
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
        <div className="row justify-content-between bgwite padding30 contact-form-wrap creditial-div">
          <h5 className="header-text">Confirm Password</h5>
          <p>Please Enter your New Password</p>
          <div className="col-12">
            <form className="form-div contact-form-wrap" >
            <label className="col-12 form-group">
                <input
                  type="password"
                  placeholder="New Password"
                  className="login-input login-password form-control"
                  name="newPassword"
                  ref={inputRef}
                  onChange={(e) => handlePasswordChange(e)}
                />
                <ReactPasswordToggleIcon className="logineye"
                        inputRef={inputRef}
                        hideIcon={hideIcon}
                        showIcon={showIcon}
                      />
                      {error.newPassword && (
                  <div className="error-message red-text">{error.newPassword}</div>
                )}
              </label>
              
              <label className="col-12 form-group">
                <input
                  type="password"
                  placeholder="confirm Password"
                  className="login-input login-password form-control"
                  name="confirmPassword"
                  ref={confirmInputRef}
                  onBlur={validatePassword}
                  onChange={(e) => handlePasswordChange(e)}
                />
                <ReactPasswordToggleIcon className="logineye"
                        inputRef={confirmInputRef}
                        hideIcon={hideIcon}
                        showIcon={showIcon}
                      />
                      {error.confirmPassword && (
                  <div className="error-message red-text">{error.confirmPassword}</div>
                )}
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
