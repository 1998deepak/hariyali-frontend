import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import logo from "../../../assets/img/logotrans.png";
import Captcha from "./Captcha";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate  } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const inputRef = useRef(false);
  const navigate = useNavigate();


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: handle authentication logic here
  };
 
  // eye icon
  const showIcon = () => <FaEyeSlash />;
  const hideIcon = () => <FaEye />;

  const goToLogin = () =>{
    navigate("/Dashboard");
   }
  return (
    <div className="logindiv bggray">
      <div className="col-6 mauto">
        <div className="loginlogo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="row justify-content-between bgwite border1 padding30 contact-form-wrap">
          <h5>THANKS FOR YOUR INTEREST IN HARIYALI</h5>
          <p>
            Please provide your UserName and password, so we can help you
            better!
          </p>
          <div className="col-12">
            <form
              onSubmit={handleSubmit}
              className="form-div contact-form-wrap"
            >
              <label className="col-12">
                <input
                  placeholder="UserName"
                  className="form-control"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </label>
              <label className="col-12">
                <input
                  placeholder="Password"
                  className=" form-control"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
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
            <div className="col-6 forgot-pass justify-content-end">Forgot Password</div>
          </div>
              <Captcha verified={verified} setVerified={setVerified}></Captcha>
              <button
                type="submit"  onClick={goToLogin}
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
      </div>
    </div>
  );
}

export default Login;
