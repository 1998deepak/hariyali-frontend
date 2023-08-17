import React, { useState, useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi";
function Captcha({ verified, setVerified }) {
  const [captcha, setCaptcha] = useState("");
  const [user, setUser] = useState({
    username: "",
  });
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
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    user[name] = value;
    setUser(user);
  };

  const onSubmit = (e) => {
    var element = document.getElementById("succesBTN");
    var inputData = document.getElementById("inputType");
    element.style.cursor = "wait";
    element.innerHTML = "Checking...";
    inputData.disabled = true;
    element.disabled = true;

    var myFunctions = function () {
      if (captcha === user.username) {
        element.style.backgroundColor = "green";
        element.style.color = "#fff";
        element.innerHTML = "Verified";
        element.disabled = true;
        element.style.cursor = "not-allowed";
        setVerified(true);
      } else {
        element.style.backgroundColor = "red";
        element.style.color = "#fff";
        element.style.cursor = "not-allowed";
        element.innerHTML = "Not Matched";
        element.disabled = true;
        //  element.disabled = true;
        var myFunction = function () {
          element.style.backgroundColor = "#d6d6d6";
          element.style.border = "#c9c9c9";
          element.style.color = "#818181";
          element.style.cursor = "pointer";
          element.innerHTML = "Verify Captcha";
          element.disabled = false;
          inputData.disabled = false;
          inputData.value = "";
        };
        setTimeout(myFunction, 2000);
      }
    };
    setTimeout(myFunctions, 2000);
  };

  return (
    <>
      <div className="row">
        <div className="captactcode">
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
        <div className="col-6">
          <input
            type="text"
            id="inputType"
            className="login-input login-captcha"
            placeholder="Enter Captcha"
            name="username"
            onChange={handleChange}
            autoComplete="off"
          />
          <button
            type="button"
            id="succesBTN"
            onClick={onSubmit}
            className="verify-capt"
          >
            Verify Captcha
          </button>
        </div>
      </div>
    </>
  );
}
export default Captcha;
