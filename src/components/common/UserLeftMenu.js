/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";

const LeftMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className=" baricon  btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent"
        type="button"
        onClick={toggleMenu}
      >
        <span className="navbar-toggle-icon">
          <span className="toggle-line"></span>
        </span>
      </button>
      <Sidebar className={isOpen ? "show remove-top-margin" : ""}>
        <div>
          <Menu>
            <MenuItem className="sidebar-leftli left-sp">
              <Link
                to="/user/dashboard"
                className="nav-link dropdown-indicator-left label-1"
              >
                <FaHome />
                <SubMenu
                  onClick={toggleMenu}
                  label="Home"
                  className="homemenu-icon menu-icon"
                >
                  <MenuItem className=" hideshowmenu">Home</MenuItem>
                </SubMenu>
              </Link>
            </MenuItem>
          </Menu>
          <div className="clear"></div>
        </div>
        <div>
          <Menu>
            <MenuItem className="sidebar-leftli left-sp">
              <Link
                to="/user/update"
                className="nav-link dropdown-indicator-left label-1"
              > <FaUserFriends />
                <SubMenu
                  onClick={toggleMenu}
                  label="Web Donar"
                  className="homemenu-icon menu-icon"
                >
                  <MenuItem className=" hideshowmenu">Profile</MenuItem>
                </SubMenu>
              </Link>
            </MenuItem>
          </Menu>

          <Menu>
            <MenuItem className="sidebar-leftli left-sp">
              <Link
                to="/UserDonation"
                className="nav-link dropdown-indicator-left label-1"
              > <MdCreateNewFolder />
                <SubMenu
                  onClick={toggleMenu}
                  label="Donar  Creation"
                  className="homemenu-icon menu-icon"
                >
                  <MenuItem className=" hideshowmenu">Donar  Creation</MenuItem>
                </SubMenu>
              </Link>
            </MenuItem>
          </Menu>
          <div className="clear"></div>
        </div>
      </Sidebar>
    </>
  );
};

export default LeftMenu;
