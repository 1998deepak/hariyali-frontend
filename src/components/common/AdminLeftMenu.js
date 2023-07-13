/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { MdCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaHome, FaRegCreditCard, FaUserEdit, FaUserFriends } from "react-icons/fa";
import { useState } from "react";

const LeftMenu = () => {
  const { collapseSidebar } = useProSidebar();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
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
        <div>
          <Menu>
            <MenuItem className="sidebar-leftli left-sp">
              <Link
                to="/Dashboard"
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
                to="/WebDonarCreation"
                className="nav-link dropdown-indicator-left label-1"
              > <FaUserFriends />
                <SubMenu
                  onClick={toggleMenu}
                  label="Web Donar"
                  className="homemenu-icon menu-icon"
                >
                  <MenuItem className=" hideshowmenu">Web Donar Creation</MenuItem>
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
                to="/DonarCreation"
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
