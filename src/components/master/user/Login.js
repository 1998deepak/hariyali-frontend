import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/img/logotrans.png";
import Captcha from "./Captcha";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SUCCESS, TOKEN, USER_DETAILS } from "../../constants/constants";
import { AuthService } from "../../../services/auth/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { EncryptionService } from "../../../services/encryption.service";
import { UserService } from "../../../services/userService/user.service";
import Loader from "../../common/loader/Loader";
import useScrollTop from "../../hooks/useScrollTop";

function Login() {
  //scroll Screen to top
  useScrollTop();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const inputRef = useRef(false);
  const [redirectFlag, setRedirectFlag] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
    captcha: "",
    donarID: "",
  });
  const navigate = useNavigate();
 
  

  const handleValueChange = (event) => {
    const updatedValue = { ...formData };
    updatedValue[event?.target?.name] = event?.target?.value;
    setFormData(updatedValue);
    setErrors({ ...errors, [event?.target?.name]: "" });
  };

  const login = async (e) => {
    e.preventDefault();

    setErrors({ ...errors, captcha: "" });
    if (formData.username == "") {
      setErrors({ ...errors, username: "Enter the Username" });
    } else if (formData.password == "") {
      setErrors({ ...errors, password: "Enter the Password" });
    } else if (!verified) {
      setErrors({ ...errors, captcha: "Please verify captcha" });
    } else if (errors.username == "" && errors.password == "" && errors.captcha == "") {
      setLoading(true)
      const response = await AuthService.login(formData);
      console.log(response);
      if (response) {
        if (response?.status === SUCCESS) {
          console.log("Response: " + response);
          let userDetails = await EncryptionService.encrypt(JSON.stringify(formData));
          localStorage.setItem(USER_DETAILS, userDetails);
          toast.success("OTP Send Successfully!")
          setIsHidden(!isHidden);
          setIsHide(!isHide);
          setLoading(false)
        } else {
          toast.error("Email/Password wrong");
          //toast.error(response?.data);
          setLoading(false)
        }
      } else {
        toast.error("Email ID Wrong");
        setLoading(false)
      }
    }
  };


  const [donarIdOrEmail, setDonarIdOrEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isHide, setIsHide] = useState(true);

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.verifyOtp(formData.username, otp);
      console.log("Response: " + JSON.stringify(response));

      setLoading(true)
      if (response) {
        if (response?.status === SUCCESS) {
          //console.log(response?.data.token);
          localStorage.setItem(TOKEN, response?.token);
          // Assuming the response contains a 'status' or 'message' field indicating the verification status
          setVerificationStatus(response.status);
          const { roleId } = UserService.getUserDetailsFromToken(
            response?.token
          );
          console.log(roleId);
          if (roleId === 1) {
            setTimeout(() => {
              navigate("/Dashboard");
            }, 2000);
          } else {
            setTimeout(() => {
              navigate("/UserDonation");
            }, 2000);
          }
          toast.success("Successfully Login!");
        } else {
          
          toast.error("Invalid OTP!");
          console.log("Response: " + response.status);
        }
        setLoading(false)
      } else {
        //toast.error("Invalid credentials ! Username or Password Incorrect");
        console.log("Failed To Login");
        setLoading(false)
      }
    } catch (error) {
      console.error(error);
      //console.log(error.response.data.message);
      toast.success("OTP verification failed");
      setVerificationStatus("OTP verification failed");
      setLoading(false)
    }
  };

  const [donarID, setDonarID] = useState("");
  const sendEmail = async (e) => {
    e.preventDefault();
    console.log(donarID);
    if (!donarID) {
      // If donorID is empty, set an error message
      setErrors({ ...errors, donarID: "Please enter Donor Id / Email ID" });
      return;
    }
    const formData = {
      donorId: donarID,
    };
    console.log(formData);
    setLoading(true)
    const response = await AuthService.sendForgetPasswordOtp(formData);
    console.log(response);
    console.log(response?.status === SUCCESS);
    if (response?.status === SUCCESS) {
      toast.success("Email sent successfully!");
      setLoading(false)
      navigate("/OtpId",{
        state: formData.donorId,
      });
    } else {
      toast.error("Invalid Donor Id ! Please Try Again");
      setLoading(false)
      setDonarID('');

    }
    //  }
  };

  if (redirectFlag === true) {
    return navigate("/Dashboard");
  }
  // hide show forgot link
  const forgotLink = (e) => {
    e.preventDefault();
    if (document.getElementById("forgotDiv")) {
      if (document.getElementById("forgotDiv").style.display === "none") {
        document.getElementById("loginDiv").style.display = "none";
        document.getElementById("forgotDiv").style.display = "block";
      } else {
        document.getElementById("loginDiv").style.display = "none";
        document.getElementById("forgotDiv").style.display = "block";
      }
    }
  };

  const toggleDiv = (e) => {
    e.preventDefault();
    if (document.getElementById("loginDiv")) {
      if (document.getElementById("forgotDiv").style.display === "none") {
        document.getElementById("forgotDiv").style.display = "none";
        document.getElementById("loginDiv").style.display = "block";
      } else {
        document.getElementById("forgotDiv").style.display = "none";
        document.getElementById("loginDiv").style.display = "block";
      }
    }
  };

  //toggle password hide show
  const showIcon = () => <FaEyeSlash />;
  const hideIcon = () => <FaEye />;
  const goToLogin = () => {
    navigate("/OtpId");
  };


  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className="logindiv bggray">

        <div
          id="loginDiv"
          className="row justify-content-between contact-form-wrap login-wrapper"
        >
          {/* <h5>THANKS FOR YOUR INTEREST IN HARIYALI</h5> */}
          {/* <p>
            Please provide your UserName and password, so we can help you
            better!
          </p> */}
          <div className="loginlogo">
            <img src={logo} alt="Logo" />
          </div>
          <p>Welcome! This login is exclusively for our valued existing donors. Log in to access your profile and donation history.</p>
          <div className="">
            <form className="form-div contact-form-wrap">
              <div className="form-group mb-3">
                <input
                  autoComplete="off"
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  value={formData.username}
                  onChange={(e) => handleValueChange(e)}
                />
                {errors.username !== "" && (
                  <div className="error-message red-text">{errors.username}</div>
                )}
              </div>
              <div className="form-group mb-3">
                <input
                  autoComplete="off"
                  type="password"
                  placeholder="Password"
                  className="login-input login-password form-control"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleValueChange(e)}
                  ref={inputRef}
                />
                <ReactPasswordToggleIcon
                  className="logineye"
                  inputRef={inputRef}
                  hideIcon={hideIcon}
                  showIcon={showIcon}
                />
                {errors.password !== "" && (
                  <div className="error-message red-text">{errors.password}</div>
                )}
              </div>

              <div className="row justify-content-between mb-3">
                {/* <div className="col-6 account-act">Account Activation</div> */}
                <div
                  className="col-6 account-act"
                  onClick={forgotLink}
                >
                  Forgot Password
                </div>
              </div>

              <Captcha verified={verified} setVerified={setVerified}></Captcha>
              {errors.captcha != "" && (
                <div className="error-message red-text">{errors.captcha}</div>
              )}

             

              <div id="VerifyOTP" className=" my-3">
                {/* <label className="my-2"> */}
                <input
                  name="verifyOTP"
                  className={isHidden ? "hide" : "form-control"}
                  type="text"
                  placeholder="Verify OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {/* </label> */}
              </div>
              <div className="text-center mb-4">
               
                <button
                  onClick={login}
                  //className="webform-button--submit button button--primary js-form-submit form-submit"
                  className={
                    isHide
                      ? "btn webform-button--submit button button--primary js-form-submit form-submit"
                      : "hide"
                  }
                >
                  Send OTP
                </button>
              </div>
              <div className="text-center mb-4">
                <button
                  onClick={verifyOtp}
                  className={
                    isHidden
                      ? "hide"
                      : "btn webform-button--submit button button--primary js-form-submit form-submit"
                  }
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-muted text-center">
              Your information is secured under our privacy policy.
            </div>
          </div>
        </div>
        <div
          id="forgotDiv"
          className="hide row justify-content-between contact-form-wrap login-wrapper"
        >
          <h5 className="text-center">Donor ID</h5>
          <p>Please Enter your Donor ID / Email ID!</p>
          <div className="">
            <form className="form-div contact-form-wrap">
              <input
                type="text"
                className="form-control"
                value={donarID}
                onChange={(e) => setDonarID(e.target.value)}
              />
              {errors.donarID !== "" && (
                <div className="error-message red-text">{errors.donarID}</div>
              )}
              <div className="text-center">
                <button
                  className="btn mt20 mr10 webform-button--submit"
                  onClick={(e) => sendEmail(e)}
                >
                  Next
                </button>
                <button
                  onClick={toggleDiv}
                  className="btn mt20 mr10 webform-button--cancel"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
