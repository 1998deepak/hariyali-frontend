import React from "react";
import { useState } from "react";
import { Button, Col, Nav, Row,Navbar, NavDropdown } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import logo from "../../assets/img/logotrans.png";
import { useNavigate } from "react-router-dom";

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
          <Col md={4}>
            <img src={logo} alt="Logo" className="logo" />
          </Col>
          <Col md={8}>
            <Nav
              className="justify-content-end nav-sublist"
              activeKey="/home"
              onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
              <Nav.Item>
                <div className="menu-button-wrapper" onClick={goToDonate}>
                  <Button className="menu-button-donet">Plant Hope</Button>
                </div>
              </Nav.Item>
              <Nav.Item className="text-center">
                <div className="topmenu-icon" onClick={goToLogin}>
                  <FaUser />
                </div>
              </Nav.Item>
              <Nav.Item className="text-center">
                <div className="topmenu-icon">
                  <FaFacebookF />
                </div>
              </Nav.Item>
              <Nav.Item className="text-center">
                <div className="topmenu-icon">
                  <FaTwitter />
                </div>
              </Nav.Item>
              <Nav.Item className="text-center">
                <div className="topmenu-icon">
                  <FaYoutube />
                </div>
              </Nav.Item>
              <Nav.Item className="text-center">
                <div className="topmenu-icon">
                  <FaInstagramSquare />
                </div>
              </Nav.Item>
            </Nav>
            <div className="clear"></div>
            <Navbar expand="lg" expanded={expanded}>
      <Navbar.Toggle onClick={handleToggle} aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className=" nav-list" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">About Us</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">What we do</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Why support us</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Project</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Media</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Contact Us</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
            {/* <Nav
              className="justify-content-end nav-list"
              activeKey="/home"
              onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
              <Nav.Item>
                <Nav.Link href="/home">About Us</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">What we do</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Why support us</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Project</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Media</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Contact Us</Nav.Link>
              </Nav.Item>
            </Nav> */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Header;
