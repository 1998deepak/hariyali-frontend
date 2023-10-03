import React, { useState, useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi";
function Captcha({ verified, setVerified }) {
  
  const [captcha, setCaptcha] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    setIsRefreshing(true); // Disable the input field during refresh
    setCaptcha(generateString(6));
    setTimeout(() => {
      setIsRefreshing(false); // Re-enable the input field after refresh
    }, 500);
  }

  const onSubmit = (e) => {
    debugger;
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
              disabled={verified === true || isRefreshing}
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
