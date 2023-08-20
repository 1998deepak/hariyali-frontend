import React from "react";
import { useState } from "react";
import { Button, Col, Nav, Row, Navbar, NavDropdown } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { BsChevronBarLeft } from "react-icons/bs";
import logo from "../../assets/img/logotrans.png";
import donoteicon from "../../assets/img/donote.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/Login");
  };
  const goToDonate = () => {
    navigate("/OnlineDonation");
  };
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className="headermenu">
        <Row>
          <Col md={4} className="small-center ">
            <Link to="/" className="logo-container"><img src={logo} alt="Logo" className="logo" /></Link>
          </Col>
          <Col md={8}>
            <Navbar expand="lg" expanded={expanded} className="pb-0">
              <Navbar.Toggle onClick={handleToggle} aria-controls="responsive-navbar-nav" >
                <BsChevronBarLeft />

              </Navbar.Toggle >

              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav
                  className="justify-content-end  nav-sublist"
                  activeKey="/home"
                  onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                  <Nav.Item>
                    <div className="menu-button-wrapper" onClick={goToDonate}>
                      <Button className="menu-button-donet"><img src={donoteicon} alt="Donote" className="donoteicon" />Plant A Tree </Button>
                    </div>
                  </Nav.Item>
                  <Nav.Item className="text-center small-non">
                    <div className="topmenu-icon" onClick={goToLogin}>
                      <FaUser />
                    </div>
                  </Nav.Item>
                  <Nav.Item className="text-center small-non">
                    <div className="topmenu-icon">
                      <FaFacebookF />
                    </div>
                  </Nav.Item>
                  <Nav.Item className="text-center small-non">
                    <div className="topmenu-icon">
                      <FaTwitter />
                    </div>
                  </Nav.Item>
                  <Nav.Item className="text-center small-non">
                    <div className="topmenu-icon">
                      <FaYoutube />
                    </div>
                  </Nav.Item>
                  <Nav.Item className="text-center small-non">
                    <div className="topmenu-icon">
                      <FaInstagramSquare />
                    </div>
                  </Nav.Item>
                </Nav>
                <div className="clear"></div>

                <Nav className="justify-content-end  nav-list" activeKey="/home">
                  <Nav.Item>
                    <Nav.Link href="/AboutUs" eventKey="link-0">About Us</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/WhatWeDo" eventKey="link-1">What we do</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/WhySupportUs" eventKey="link-2">Why support us</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/WaystoAssociate" eventKey="link-2">Ways to associate</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/FootPrint" eventKey="link-3">FootPrint</Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item>
                    <Nav.Link href="/GalleryAwards" eventKey="link-4">Gallery & Awards</Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item>
                    <Nav.Link href="/ContactUs" eventKey="link-5">Contact Us</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Header;
