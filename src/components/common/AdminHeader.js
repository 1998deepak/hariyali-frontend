import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
// import headeradmin from "../../assets/img/profile/57.webp";
import Dropdown from "react-bootstrap/Dropdown";
// import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { RiUser3Fill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { BsKey } from "react-icons/bs";
import { RiUserFollowFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md"
import { HiBars3CenterLeft } from "react-icons/hi2";
import Logo from "../../assets/img/logo.png";
import { AuthService } from "../../../src/services/auth/auth.service";
import { SUCCESS, TOKEN, USER_DETAILS } from "../../../src/components/constants/constants";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EncryptionService } from "../../../src/services/encryption.service";
import jwt_decode from "jwt-decode";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    let token = AuthService.getToken();
    setRole(jwt_decode(token).roleName);
    setUsername(jwt_decode(token).sub);
  }, []);

  const logout = async () => {

    let userDetails = await EncryptionService.decrypt(localStorage.getItem(USER_DETAILS));
    const response = await AuthService.logout(
      JSON.parse(userDetails)
    );
    if (response.status === SUCCESS) {
      toast.success(response?.message);
      setTimeout(() => {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(USER_DETAILS);
        setAuthToken(null);
        navigate("/");
      }, 2000);

    } else {
      toast.error("Invalid Credentials..!");
    }
  };
  return (
    <>
      <Navbar className="navbar-top Navbar Navbar-login sticky-navbar">
        <div className="Navbar-div collapse navbar-collapse justify-content-between">
          <div className="navbar-logo">
            <div className="bar-icon">
              <HiBars3CenterLeft />
            </div>
            <Link className="float-left navbar-brand-logo">
              <div className="admintop-logo">
                <img src={Logo} alt="Hariyali" style={{ height: "45px" }} />
              </div>
            </Link>
          </div>
          <div></div>
          <ul className="navbar-nav navbar-nav-icons flex-row">
            <li className="nav-item dropdown">
              <Dropdown className="nav-link lh-1 pe-0">
                <Dropdown.Toggle className="avatar avatar-l userf-later  rounded-circle">
                  <div className="headinguser-icon">
                    <RiUser3Fill />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow">
                    <div className="drop-mar card position-relative border-0">
                      <div className="card-body p-0">
                        <div className="userdetails-tr">
                          <MdEmail className="userdetail-tr-icon" /> {username}</div>
                        <div className="userdetails-tr">
                          <RiUserFollowFill className="userdetail-tr-icon" /> {role}</div>
                        <div className="userdetails-tr">
                          
                          <Link
                            to={role == 'User' ? '/ChangeUserPassword': "/ChangePassword"}
                            className="nav-link dropdown-indicator-left label-1 change-password"
                          > <BsKey className="userdetail-tr-icon" />
                            <span className="link-text">Change Password </span>
                          </Link>
                        </div>
                      </div>
                      <button onClick={logout} className="signout-btn" >
                        <FaSignOutAlt className="userdetail-tr-icon" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </Navbar>
    </>
  );
};

export default AdminHeader;
