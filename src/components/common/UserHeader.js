import React, { useEffect, useState } from "react";
import { Button, Col, Nav, Row, Navbar, NavDropdown } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";
import logo from "../../assets/img/logotrans.png";
import donoteicon from "../../assets/img/donote.png";
import { Link, useNavigate, useLocation} from "react-router-dom";
import plantation from "../../assets/img/GIF's/plant-img.gif";

const Header = () => {

  const [activeTab, setActiveTab] = useState('');

  const navigate = useNavigate();
 const customTitle = "Donar Login"
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
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
  };
  window.addEventListener('scroll', handleScroll);
  return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const location = useLocation();
  console.log(JSON.stringify(location.search))

  const queryParameters = new URLSearchParams(window.location.search)
  const type = queryParameters.get("meconnectId")
  const name = queryParameters.get("source")


  return (
    <>
      <div className={`headermenu ${isSticky ? 'sticky' : ''}`}>
        <div className="d-flex align-items-center justify-content-between">
            <Link to="/" className="logo-container mr-2"><img src={logo} alt="Logo" className="logo" /></Link>
          <div className="">
            <Navbar expanded={expanded} className="pb-0">
              <Navbar.Toggle onClick={handleToggle} aria-controls="responsive-navbar-nav" >
                <AiOutlineBars />

              </Navbar.Toggle >

              <Navbar.Collapse id="responsive-navbar-nav" className="">
           
                <Nav className=" nav-list" activeKey={location.pathname}>
                  <Nav.Item >
                    <Nav.Link href="/AboutUs" className={`${activeTab === 'AboutUs' ? 'active' : ''}`}
        onClick={() => setActiveTab('AboutUs')} eventKey="/AboutUs">Who We Are</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/WhatWeDo" className={`${activeTab === 'WhatWeDo' ? 'active' : ''}`}
        onClick={() => setActiveTab('WhatWeDo')} eventKey="/WhatWeDo">What We Do</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/WhySupportUs" className={`${activeTab === 'WhySupportUs' ? 'active' : ''}`}
        onClick={() => setActiveTab('WhySupportUs')} eventKey="/WhySupportUs">Why Support Us</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/WaystoAssociate" className={`${activeTab === 'WaystoAssociate' ? 'active' : ''}`}
        onClick={() => setActiveTab('WaystoAssociate')} eventKey="/WaystoAssociate">How To Associate</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/FootPrint" className={`${activeTab === 'FootPrint' ? 'active' : ''}`}
        onClick={() => setActiveTab('FootPrint')} eventKey="/FootPrint">Where Are We</Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item>
                    <Nav.Link href="/Faq" className={`${activeTab === 'Faq' ? 'active' : ''}`}
        onClick={() => setActiveTab('Faq')} eventKey="/Faq">FAQ</Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item>
                    <Nav.Link href="/ContactUs" className={`${activeTab === 'ContactUs' ? 'active' : ''}`}
        onClick={() => setActiveTab('ContactUs')} eventKey="/ContactUs">Write To Us</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <Nav
            className="nav-sublist"
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
          >
            <Nav.Item className="text-center">
              <div className="topmenu-icon" onClick={goToLogin} data-title="Donor Login"> 
                <FaUser style={{ color: "#23aa4a"}} />
              </div>
            </Nav.Item>
            <Nav.Item>
              <div className="menu-button-wrapper" onClick={goToDonate}>
                <Button className="menu-button-donet"><img src={plantation} alt="Donote" className="donoteicon" />Plant A Tree </Button>
              </div>
            </Nav.Item>
            
            {/* <Nav.Item className="text-center small-non">
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
            </Nav.Item> */}
          </Nav>
        </div>
        <Row>
          <Col md={4} className="small-center ">
            {/* <Link to="/" className="logo-container"><img src={logo} alt="Logo" className="logo" /></Link> */}
          </Col>
          <Col md={8}>
            
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Header;
