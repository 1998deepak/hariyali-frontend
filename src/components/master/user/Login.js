import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/img/logotrans.png";
import Captcha from "./Captcha";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SUCCESS, TOKEN, USER_DETAILS } from "../../constants/constants";
import { AuthService } from '../../../services/auth/auth.service';
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const inputRef = useRef(false);
  const [redirectFlag, setRedirectFlag] = useState(false);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const regexMail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  useEffect(() => {
    if (localStorage.getItem(TOKEN) !== null) {
      navigate("/Dashboard");
    }
  }, []);

  const checkEmail = (e) => {
    if (regexMail.test(e) == false) {
      setErrors({ ...errors, email: "Invalid email address" });
    } else {
      setErrors({ ...errors, email: "" });
      return true;
    }
  };

  const handleValueChange = (event) => {
    const updatedValue = { ...formData };
    updatedValue[event?.target?.name] = event?.target?.value;
    setFormData(updatedValue);
    setErrors({ ...errors, [event?.target?.name]: "" });
  };

  const handleEmailChange = (event) => {
    checkEmail(event.target.value);
    setEmail(event.target.value)
  };

  const login = async (e) => {
    e.preventDefault();
    if (formData.username == "") {
      setErrors({ ...errors, username: "Enter the Username" })
    }
    else if (formData.password == "") {
      setErrors({ ...errors, password: "Enter the Password" })
    } else if (errors.username == "" && errors.password == "") {
      const response = await AuthService.login(formData);
      console.log(response);
      if (response) {
        if (response?.status === SUCCESS) {
          console.log("Hiiiiiiii");
          console.log(response?.token);
          localStorage.setItem(TOKEN, response?.token);
          localStorage.setItem(USER_DETAILS, JSON.stringify(formData));
          toast.success("Successfully Login!");
          setTimeout(() => {
            navigate("/Dashboard");
          }, 2000);
        } else {
          toast.error(response?.message);
        }
      } else {
        toast.error("Invalid credentials ! Username or Password Incorrect");
      }
    }
  };
  const [donarID, setDonarID] = useState("");
  const sendEmail = async (e) => {
    console.log("hii");

    e.preventDefault();

    console.log(donarID);

    const formData = {
      formData: {
        donarID: donarID,
      },
    };
    console.log(formData);
    const response = await AuthService.sendForgetPasswordLink(formData);
    console.log(response);
    console.log(response?.status === SUCCESS);
    if (response?.status === SUCCESS) {
      toast.success("Email sent successfully!");
      navigate("/OtpId");
    } else {
      toast.error(response?.message);
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
  const otpLink = (e) => {
    e.preventDefault();
    if (document.getElementById("otpDiv")) {
      if (document.getElementById("otpDiv").style.display === "none") {
        document.getElementById("otpDiv").style.display = "none";
        document.getElementById("forgotDiv").style.display = "block";
      } else {
        document.getElementById("forgotDiv").style.display = "none";
        document.getElementById("otpDiv").style.display = "block";
      }
    }
  };
  //toggle password hide show
  const showIcon = () => <FaEyeSlash />;
  const hideIcon = () => <FaEye />;
  const goToLogin = () => {
    navigate("/OtpId");
  }
  return (
    <div className="logindiv bggray">
      <div className="col-6 mauto">
        <div className="loginlogo">
          <img src={logo} alt="Logo" />
        </div>
        <div id="loginDiv" className="row justify-content-between bgwite border1 padding30 contact-form-wrap">
          <h5>THANKS FOR YOUR INTEREST IN HARIYALI</h5>
          <p>
            Please provide your UserName and password, so we can help you
            better!
          </p>
          <div className="col-12">
            <form className="form-div contact-form-wrap" >
              <label className="col-12">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => handleValueChange(e)}
                />
              </label>
              <label className="col-12">
                <input
                  type="password"
                  placeholder="Password"
                  className="login-input login-password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleValueChange(e)}
                  ref={inputRef}
                />
                <ReactPasswordToggleIcon className="logineye"
                  inputRef={inputRef}
                  hideIcon={hideIcon}
                  showIcon={showIcon}
                />
              </label>
              <div className="for-accdiv row justify-content-between">
                <div className="col-6 account-act">Account Activation</div>
                <div className="col-6 forgot-pass justify-content-end" onClick={forgotLink}>Forgot Password</div>
              </div>
              <Captcha verified={verified} setVerified={setVerified}></Captcha>
              <button onClick={login}
                className="webform-button--submit button button--primary js-form-submit form-submit"
              >
                Login
              </button>
            </form>
            <div className="loginpoli-text pt10">
              Your information is secured under our privacy policy.
            </div>
          </div>
        </div>
        <div id="forgotDiv" className="hide row justify-content-between bgwite border1 padding30 contact-form-wrap">
          <h5>Donor ID</h5>
          <p>Please Enter your Donor ID!</p>
          <div className="col-12">
            <form className="form-div contact-form-wrap" >
              <label className="col-12">
                <input type="text" value={donarID} onChange={(e) => setDonarID(e.target.value)} />

              </label>
              <button className="mt20 mr10 webform-button--submit" onClick={(e) => sendEmail(e)}>
                Next
              </button>
              <button onClick={toggleDiv} className="mt20 mr10 webform-button--cancel">
                Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
