/* eslint-disable react-hooks/exhaustive-deps */
import {React,useEffect} from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { MdCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaHome, FaDonate, FaRegCreditCard, FaUserEdit, FaUserFriends } from "react-icons/fa";
import {RiUserAddLine} from "react-icons/ri";
import {BiDonateHeart} from "react-icons/bi";
import {FiUserPlus, FiSettings, FiUsers} from "react-icons/fi";
import {CiViewList} from "react-icons/ci";
import {PiPottedPlantDuotone} from "react-icons/pi";
import {HiOutlineDocumentReport} from "react-icons/hi";
import { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';


const LeftMenu = () => {
  const { collapseSidebar } = useProSidebar();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [isActive, setIsActive] = useState(false);
  const [activeHead, setActiveHead] = useState("home");
  const [mainKey, setMainKey] = useState("0");
  const [donationKey, setDonationKey] = useState("");

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const activeHeadTag = (tag) => {
    setActiveHead(tag);
  };

//   const decoratedOnClick = useAccordionButton(eventKey, () =>
//   console.log('totally custom!'),
// );
  useEffect(() => {
  //  let url = window.location.href;
   
  //  if(url.indexOf('Dashboard')>-1){
  //   setMainKey("0");
  //  }
  //  if(url.indexOf('WebDonarCreation')>-1){
  //   setMainKey("1");
  //   setActiveHead("donationList");
  //  }
  }, []);

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
                to=""
                className="nav-link dropdown-indicator-left label-1"
              > <PiPottedPlantDuotone />
                <span className="link-text">Plantation & Commitment </span>

              </Link>
              </Accordion.Header>

            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header className={activeHead =='reports'? 'disabled active' : 'disabled'} onClick={()=>activeHeadTag('reports')}>
              <Link
                to=""
                className="nav-link dropdown-indicator-left label-1"
              > <HiOutlineDocumentReport />
                Reports

              </Link>
              </Accordion.Header>

            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header className={activeHead =='masters'? 'disabled active' : 'disabled'} onClick={()=>activeHeadTag('masters')}>
              <Link
                to=""
                className="nav-link dropdown-indicator-left label-1"
              > <FiSettings />
                Masters
              </Link>
              </Accordion.Header>

            </Accordion.Item>
          </Accordion>
          {/*<Menu>
            <MenuItem className="sidebar-leftli left-sp">
              <Link
                to="/Dashboard"
                className="nav-link dropdown-indicator-left label-1"
                onClick={toggleMenu}
              >
                <FaHome />
                Home
              </Link>
            </MenuItem>
            <MenuItem className="sidebar-leftli left-sp">
              <Link
                to="/WebDonarCreation"
                className="nav-link dropdown-indicator-left label-1" onClick={toggleMenu}
              > <FaUserFriends />
                Web Donar
              </Link>
            </MenuItem>
            <MenuItem className="sidebar-leftli left-sp">
              <Link
                to="/DonarCreation"
                className="nav-link dropdown-indicator-left label-1" onClick={toggleMenu}
              > <MdCreateNewFolder />
                Approved Donor

              </Link>
            </MenuItem>
            <MenuItem className="sidebar-leftli left-sp">
              <Link
                to=""
                className="nav-link dropdown-indicator-left label-1"
              > <MdCreateNewFolder />
                Plantation & Commitment

              </Link>
            </MenuItem>

  </Menu>*/}
        </div>

        {/* <div>
          <Menu>
            <MenuItem className="sidebar-leftli">
              <Link
                to="/employees"
                className="nav-link dropdown-indicator-left label-1"
              >
                <SubMenu
                  onClick={toggleMenu}
                  label="Employee"
                  className="empmenu-icon menu-icon"
                >
                  <MenuItem className="nav-link-text hideshowmenu">
                    Employee
                  </MenuItem>
                </SubMenu>
              </Link>
            </MenuItem>
          </Menu>
          <div className="clear"></div>
        </div>
        <div>
          <Menu>
            <MenuItem className="sidebar-leftli ">
              <div className="nav-item-wrapper">
                <Link
                  to="/AttendanceMaster"
                  className="nav-link dropdown-indicator-left label-1"
                >
                  <SubMenu
                    onClick={toggleMenu}
                    label="Attendance"
                    className="attemenu-icon menu-icon"
                  >
                    <MenuItem className="nav-link-text hideshowmenu">
                      Attendance
                    </MenuItem>
                  </SubMenu>
                </Link>
                <div className="clear"></div>
              </div>
            </MenuItem>
          </Menu>
          <div className="clear"></div>
        </div>

        <div>
          <Menu>
            <MenuItem className="sidebar-leftli">
              <Link
                to="/billingdata"
                className="nav-link dropdown-indicator-left label-1"
              >
                <SubMenu
                  onClick={toggleMenu}
                  label="Billing Data"
                  className="billingmenu-icon menu-icon"
                >
                  <MenuItem className="nav-link-text hideshowmenu">
                    <div className="nav-link-icon">
                      <HiOutlineCreditCard className="feather feather-pie-chart" />
                    </div>
                    Billing Data
                  </MenuItem>
                </SubMenu>
              </Link>
            </MenuItem>
          </Menu>
          <div className="clear"></div>
        </div>

        <div>
          <Menu>
            <MenuItem className="sidebar-leftli ">
              <div className="nav-item-wrapper">
                <Link
                  to="/pomaster"
                  className="nav-link dropdown-indicator-left label-1"
                >
                  <SubMenu
                    onClick={toggleMenu}
                    label="PO Details"
                    className="pomenu-icon menu-icon"
                  >
                    <MenuItem className="nav-link-text hideshowmenu">
                      PO Details
                    </MenuItem>
                  </SubMenu>
                </Link>
                <div className="clear"></div>
              </div>
            </MenuItem>
          </Menu>
          <div className="clear"></div>
        </div>

        <div>
          <Menu>
            <MenuItem className="sidebar-leftli">
              <SubMenu
                label="Invoice"
                className="masternamemenu-icon menu-icon"
              >
                <Link
                  to="/invoice"
                  className="nav-link dropdown-indicator-left label-1"
                >
                  <SubMenu
                    onClick={toggleMenu}
                    label="Invoice"
                    className="bumenu-icon menu-icon"
                  >
                    <MenuItem className="nav-link-text hideshowmenu">
                      Invoice
                    </MenuItem>
                  </SubMenu>
                </Link>
                <Link
                  to="/invoiceBulk"
                  className="nav-link dropdown-indicator-left label-1"
                >
                  <SubMenu
                    onClick={toggleMenu}
                    label="Invoice Bulk"
                    className="clientmenu-icon menu-icon"
                  >
                    <MenuItem className="nav-link-text hideshowmenu">
                      Invoice Bulk
                    </MenuItem>
                  </SubMenu>
                </Link>
              </SubMenu>
            </MenuItem>
          </Menu>
          <div className="clear"></div>
        </div>
        <div>
          <div className="clear"></div>
        </div>

        <div className="leftmenu-label-line"></div>
        <div>
          <Menu>
            <MenuItem className="sidebar-leftli">
              <SubMenu
                label="Masters"
                className="masternamemenu-icon menu-icon"
              >
                <Link
                  to="/bumaster"
                  className="nav-link dropdown-indicator-left label-1"
                >
                  <SubMenu
                    onClick={toggleMenu}
                    label="BU Master"
                    className="bumenu-icon menu-icon"
                  >
                    <MenuItem className="nav-link-text hideshowmenu">
                      BU Master
                    </MenuItem>
                  </SubMenu>
                </Link>
                <Link
                  to="/clientmaster"
                  className="nav-link dropdown-indicator-left label-1"
                >
                  <SubMenu
                    onClick={toggleMenu}
                    label="Client Master"
                    className="clientmenu-icon menu-icon"
                  >
                    <MenuItem className="nav-link-text hideshowmenu">
                      Client Master
                    </MenuItem>
                  </SubMenu>
                </Link>
                <Link
                  to="/expensesmaster"
                  className="nav-link dropdown-indicator-left label-1"
                >
                  <SubMenu
                    onClick={toggleMenu}
                    label="Expenses Master"
                    className="expmenu-icon menu-icon"
                  >
                    <MenuItem className="nav-link-text hideshowmenu">
                      Expenses Master
                    </MenuItem>
                  </SubMenu>
                </Link>
                <Link
                  to="/approvedmaster"
                  className="nav-link dropdown-indicator-left label-1"
                >
                  <SubMenu
                    onClick={toggleMenu}
                    label="Approved Master"
                    className="appmenu-icon menu-icon"
                  >
                    <MenuItem className="nav-link-text hideshowmenu">
                      Approved Master
                    </MenuItem>
                  </SubMenu>
                </Link>
                <Link
                  to="/locationmaster"
                  className="nav-link dropdown-indicator-left label-1"
                >
                  <SubMenu
                    onClick={toggleMenu}
                    label="Location Master"
                    className="locmenu-icon menu-icon"
                  >
                    <MenuItem className="nav-link-text hideshowmenu">
                      Location Master
                    </MenuItem>
                  </SubMenu>
                </Link>
                <Link
                  to="/departmentmaster"
                  className="nav-link dropdown-indicator-left label-1"
                >
                  <SubMenu
                    onClick={toggleMenu}
                    label="Department Master"
                    className="depmenu-icon menu-icon"
                  >
                    <MenuItem className="nav-link-text hideshowmenu">
                      Department Master
                    </MenuItem>
                  </SubMenu>
                </Link>
              </SubMenu>
            </MenuItem>
          </Menu>
          <div className="clear"></div>
        </div> */}
        {/* <div className="leftmenu-label-line"></div>
        <div>
          <Menu>
            <MenuItem
              className="sidebar-leftli leftmenu-logout"
              onClick={() => collapseSidebar()}
            >
              <SubMenu
                label="Collapsed View"
                className="colmenu-icon menu-icon"
              >
                <MenuItem className="nav-link-text hideshowmenu">
                  <IoMdArrowBack /> Collapsed View
                </MenuItem>
              </SubMenu>
            </MenuItem>
          </Menu>
        </div> */}
      </Sidebar>
    </>
  );
};

export default LeftMenu;
