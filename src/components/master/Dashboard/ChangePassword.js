import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from "react-toastify";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { PlantationService } from '../../../services/PlantationService/plantation.service';
import { SUCCESS, USER_DETAILS } from "../../constants/constants";
import Loader from "../../common/loader/Loader";
import ReactPaginate from 'react-paginate';
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AuthService } from "../../../services/auth/auth.service";
import { EncryptionService } from "../../../services/encryption.service";

import Card from "react-bootstrap/Card";

const ChangePassword = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const currentPasswordRef = useRef(false);
  const newPasswordRef = useRef(false);
  const confirmPasswordRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleValueChange = (event) => {
    let { name, value }= event.target;
    const updatedValue = { ...formData };
    updatedValue[name] = value;
    setFormData(updatedValue);
    setErrors({ ...errors, [name]: "" });
  };

  const checkCurrentPasswordMatch = async () => {
    console.log(userDetails.password);
    if (userDetails.password != formData.currentPassword) {
      setErrors({ ...errors, ["currentPassword"]: "Current password does not match" });
    }
  }

  const checkNewPasswordMatch = async () => {
    let valid = validPassword(formData.newPassword);
    if (formData.newPassword == '') {
      setErrors({ ...errors, ["newPassword"]: "New password is empty" });
    } else if (userDetails.password == formData.newPassword) {
      setErrors({ ...errors, ["newPassword"]: "New password is same as old password" });
    } else if(!valid){
      setErrors({ ...errors, ["newPassword"]: "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character" });
    } else{
      checkConfirmPasswordMatch();
    }
  }

  const checkConfirmPasswordMatch = async () => {
    if (formData.confirmPassword == '') {
      setErrors({ ...errors, ["confirmPassword"]: "Confirm password is empty" });
    } else if (formData.confirmPassword != "" && formData.newPassword != formData.confirmPassword) {
      setErrors({ ...errors, ["confirmPassword"]: "Confirm password does not match with confirm password" });
    }
  }

  const changePasswordAPI = async () => {
    if (userDetails.password != formData.currentPassword) {
      setErrors({ ...errors, ["currentPassword"]: "Current password does not match" });
    } else if (formData.newPassword == '') {
      setErrors({ ...errors, ["newPassword"]: "New password is empty" });
    } else if (userDetails.password == formData.newPassword) {
      setErrors({ ...errors, ["newPassword"]: "New password is same as old password" });
    } else if (formData.newPassword.length < 8) {
      setErrors({ ...errors, ["newPassword"]: "Minimum 8 character long password required" });
    } else if (formData.confirmPassword == '') {
      setErrors({ ...errors, ["confirmPassword"]: "Confirm password is empty" });
    } else if (formData.confirmPassword != "" && formData.newPassword != formData.confirmPassword) {
      setErrors({ ...errors, ["confirmPassword"]: "Confirm password does not match with confirm password" });
    } else {
      setLoading(true);

      var loginRequest = {
        password: await EncryptionService.encrypt(formData.newPassword)
      }
      const response = await AuthService.changePassword(loginRequest);
      if (response?.status === SUCCESS) {
        setLoading(false);
        toast.success(response?.message);
        var updatedValue = { ...userDetails };
        updatedValue.password = formData.newPassword;
        updatedValue = JSON.stringify(updatedValue);
        console.log(updatedValue);
        localStorage.setItem(USER_DETAILS, await EncryptionService.encrypt(updatedValue));
        setUserDetails(updatedValue);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    }

  }

  const showIcon = () => <FaEyeSlash />;
  const hideIcon = () => <FaEye />;

  useEffect(() => {

    EncryptionService.decrypt(localStorage.getItem(USER_DETAILS)).then(data => {
      setUserDetails(JSON.parse(data));
    });
  }, []);

  const validPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className="container changePassword">
        <div className="row">
          <div className="col-12">
            <h2>Change Password</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <Card>
              <Card.Body>
                <form className="form-div contact-form-wrap">
                  <div className="form-group mb-3">
                    <input
                      autoComplete="off"
                      type="password"
                      placeholder="Current Password"
                      className="login-input login-password form-control"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={(e) => handleValueChange(e)}
                      onBlur={checkCurrentPasswordMatch}
                      ref={currentPasswordRef}
                    />
                    <ReactPasswordToggleIcon
                      className="logineye"
                      inputRef={currentPasswordRef}
                      hideIcon={hideIcon}
                      showIcon={showIcon}
                    />
                    {errors.currentPassword !== "" && (
                      <div className="error-message red-text">{errors.currentPassword}</div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <input
                      autoComplete="off"
                      type="password"
                      placeholder="New Password"
                      className="login-input login-password form-control"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={(e) => handleValueChange(e)}
                      onBlur={checkNewPasswordMatch}
                      ref={newPasswordRef}
                    />
                    <ReactPasswordToggleIcon
                      className="logineye"
                      inputRef={newPasswordRef}
                      hideIcon={hideIcon}
                      showIcon={showIcon}
                    />
                    {errors.newPassword !== "" && (
                      <div className="error-message red-text">{errors.newPassword}</div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <input
                      autoComplete="off"
                      type="password"
                      placeholder="Confirm Password"
                      className="login-input login-password form-control"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => handleValueChange(e)}
                      onBlur={checkConfirmPasswordMatch}
                      ref={confirmPasswordRef}
                    />
                    <ReactPasswordToggleIcon
                      className="logineye"
                      inputRef={confirmPasswordRef}
                      hideIcon={hideIcon}
                      showIcon={showIcon}
                    />
                    {errors.confirmPassword !== "" && (
                      <div className="error-message red-text">{errors.confirmPassword}</div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <Button type='button' className="btn btn-primary" onClick={changePasswordAPI}>
                      Change Password
                    </Button>
                  </div>
                </form>
              </Card.Body>
            </Card>

          </div>
        </div >
      </div >
    </>
  );
};

export default ChangePassword
