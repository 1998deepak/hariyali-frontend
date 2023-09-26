/* eslint-disable react-hooks/exhaustive-deps */
import {React} from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaHome,FaWpforms } from "react-icons/fa";
import {RiUserAddLine} from "react-icons/ri";
import {BiDonateHeart} from "react-icons/bi";
import {FiUserPlus, FiSettings, FiUsers } from "react-icons/fi";
import {CiViewList} from "react-icons/ci";
import {PiPottedPlantDuotone, PiHandshake} from "react-icons/pi";
import {HiOutlineDocumentReport} from "react-icons/hi";
import { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';

const LeftMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [activeHead, setActiveHead] = useState("home");

  const activeHeadTag = (tag) => {
    setActiveHead(tag);
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
      <Sidebar className={isOpen ? "show" : ""}>
        <div className="adminLetNav">
          <Accordion defaultActiveKey='0'>
            <Accordion.Item eventKey="0">
              <Accordion.Header className={activeHead == 'home'? 'active disabled' : 'disabled'} onClick={()=>activeHeadTag('home')}>
                <Link
                  to="/Dashboard"
                  className="nav-link dropdown-indicator-left label-1"
                  onClick={toggleMenu}
                >
                  <FaHome />
                  Home
                </Link>
              </Accordion.Header>

            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className={activeHead==='donations' ? 'active' : ''} onClick={()=>activeHeadTag('donations')}><BiDonateHeart /> Donations</Accordion.Header>
              <Accordion.Body>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header  className={activeHead=='donationList' ? 'active disabled' : 'disabled'} onClick={()=>activeHeadTag('donationList')}>
                      
                      <Link
                          to="/WebDonarCreation"
                          className="nav-link dropdown-indicator-left label-1"
                          onClick={toggleMenu}
                        >
                        <CiViewList/> Donation List
                      </Link>
                    </Accordion.Header>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header className={activeHead =='addDonor'? 'active' : ''} onClick={()=>activeHeadTag('addDonor')}><FiUserPlus/> Add Donor</Accordion.Header>
                    <Accordion.Body>
                      <Menu>
                        <MenuItem className={activeHead == 'existingDonor' ? 'sidebar-leftli left-sp active ' : 'sidebar-leftli left-sp'} onClick={()=>activeHeadTag('existingDonor')}>
                          <Link
                            to="/DonarCreation"
                            className="nav-link dropdown-indicator-left label-1"
                            onClick={toggleMenu}
                          >
                            <FiUsers/>  
                            Existing Donor
                          </Link>
                        </MenuItem>
                        <MenuItem className={activeHead == 'newDonor' ? 'sidebar-leftli left-sp active ' : 'sidebar-leftli left-sp'} onClick={()=>activeHeadTag('newDonor')}>
                          <Link
                            to="/OfflineDonation"
                            className="nav-link dropdown-indicator-left label-1"
                            onClick={toggleMenu}
                          >
                            <RiUserAddLine/>
                            New Donor
                          </Link>
                        </MenuItem>
                      </Menu>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className={activeHead =='plantation'? 'disabled active' : 'disabled'} onClick={()=>activeHeadTag('plantation')}>
              <Link
                to="/Plantation"
                className="nav-link dropdown-indicator-left label-1"
              > <PiPottedPlantDuotone />
                <span className="link-text">Plantation </span>

              </Link>
              </Accordion.Header>

            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header className={activeHead =='commitment'? 'disabled active' : 'disabled'} onClick={()=>activeHeadTag('commitment')}>
              <Link
                to="/Commitment"
                className="nav-link dropdown-indicator-left label-1"
              > <PiHandshake />
                <span className="link-text">Commitment </span>

              </Link>
              </Accordion.Header>

            </Accordion.Item>
            <Accordion.Item eventKey="4">
            <Accordion.Header className={activeHead =='form-16'? 'disabled active' : 'disabled'} onClick={()=>activeHeadTag('form-16')}>
            <Link
                to="/Form10BE"
                className="nav-link dropdown-indicator-left label-1"
              > <FaWpforms/>
                Form 10BE
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
