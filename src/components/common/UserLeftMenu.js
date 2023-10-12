/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  Sidebar,
} from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { IoReceiptSharp } from "react-icons/io5";
import { Accordion } from "react-bootstrap";
import { RiUserAddLine } from "react-icons/ri";
import { AiOutlineFolderOpen } from "react-icons/ai";

const LeftMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  console.log(location);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    {/* <button
        className=" baricon  btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent"
        type="button"
        onClick={toggleMenu}
      >
        <span className="navbar-toggle-icon">
          <span className="toggle-line"></span>
        </span>
      </button> */}
      <Sidebar className={isOpen ? "show" : ""}>
        <div className="adminLetNav">
          <Accordion defaultActiveKey='0'>
            {/* <Accordion.Item eventKey="0">
              <Accordion.Header className={location.pathname === '/user/dashboard'? 'active disabled' : 'disabled'} >
                <Link
                  to="/user/dashboard"
                  className="nav-link dropdown-indicator-left label-1"
                >
                  <FaHome />
                  Home
                </Link>
              </Accordion.Header>

            </Accordion.Item> */}
            <Accordion.Item eventKey="1" >
              <Accordion.Header className={location.pathname ==='/user/update'? 'disabled active' : 'disabled'} >
              <Link
                to="/user/update"
                className="nav-link dropdown-indicator-left label-1"
              > <FaUserFriends />Profile
              </Link>
              </Accordion.Header>

            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className={location.pathname ==='/UserDonation'? 'disabled active' : 'disabled'} >
              <Link
                to="/UserDonation"
                className="nav-link dropdown-indicator-left label-1"
              > <MdCreateNewFolder />
                My Donations
              </Link>
              </Accordion.Header>

            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header className={location.pathname ==='/user/receipts'? 'disabled active' : 'disabled'}>
              <Link
                to="/user/receipts"
                className="nav-link dropdown-indicator-left label-1"
              > <IoReceiptSharp/>
                Receipts
              </Link>
              </Accordion.Header>

            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header className={location.pathname ==='/user/donation'? 'disabled active' : 'disabled'}>
              <Link
                to="/user/donation"
                className="nav-link dropdown-indicator-left label-1"
              > <RiUserAddLine/>
                Donation
              </Link>
              </Accordion.Header>

            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header className={location.pathname ==='/userDocuments'? 'disabled active' : 'disabled'}>
              <Link
                to="/userDocuments"
                className="nav-link dropdown-indicator-left label-1"
              > <AiOutlineFolderOpen/>
                My Documents
              </Link>
              </Accordion.Header>

            </Accordion.Item>
          </Accordion>
        </div>

        
      </Sidebar>
    </>
  );
};

export default LeftMenu;
