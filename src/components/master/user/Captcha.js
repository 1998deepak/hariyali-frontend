import React, { useState, useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi";
function Captcha({ verified, setVerified }) {
  
  const [captcha, setCaptcha] = useState("");

  useEffect(() => {
    setCaptcha(generateString(6));
  }, []);

  const characters = "abc123";

  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function handleCaptchaRefresh() {
    setCaptcha(generateString(6));
  }

  const onSubmit = (e) => {
    const { value } = e.target;
      if (captcha === value) {
        setVerified(true);
      } else {
        setVerified(false);
      }
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="captactcode ">
            <div className="capt-code" id="captcha">
              {captcha}
            </div>

            <button
              onClick={handleCaptchaRefresh}
              type="reset"
              className="capt-refresh"
              disabled={verified === true}
            >
              <FiRefreshCcw />
            </button>
          </div>
        </div>
        
        <div className="col captcha-wrapper">
          <input
            type="text"
            id="inputType"
            className="login-input login-captcha form-control"
            placeholder="Enter Captcha"
            name="username"
            autoComplete="off"
            onBlur={onSubmit}
            disabled={verified}
          />
        </div>
      </div>
    </>
  );
}
export default Captcha;
