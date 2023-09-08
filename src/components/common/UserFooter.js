import React from "react";
import {Container, Row } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import logo from "../../assets/img/logotrans-white.png";

const Header = () => {

  return (
    <>
      <div className="footerbg">
        <Container>
          <Row className="justify-content-between ptb50 row">
            <div className="col-12 col-md-12 col-lg-4 small-center">
              <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />  
              </div>              
              <div className="footersocial-div row mb-3">
                <div className="col-2">
                  <div className="footersocial">
                    <FaFacebookF />
                  </div>
                </div>
                <div className="col-2">
                  <div className="footersocial">
                    <FaTwitter />
                  </div>
                </div>
                <div className="col-2">
                  <div className="footersocial">
                    <FaInstagramSquare />
                  </div>
                </div>
                <div className="col-2">
                  <div className="footersocial">
                    <FaWhatsapp />
                  </div>
                </div>
                <div className="col-2">
                  <div className="footersocial">
                    <FaYoutube />
                  </div>
                </div>
              </div>
              
            </div>
            <div className="col-12 col-md-12 col-lg-8 footerlinks">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4 footer-div small-non">
                  <div className="footer-divheading">Company</div>
                  <ul>
                    <li>
                    <a href="/AboutUs"> Who Are We</a></li>
                    <li>
                    <a href="/WhatWeDo"> What We Do</a></li>
                    <li><a href="/WhySupportUs"> Why Support Us</a></li>
                    <li><a href="/WaystoAssociate"> How To Associate</a></li>
                    <li><a href="/FootPrint"> Where Are We</a></li>                    
                    <li><a href="/ContactUs"> Ask Us</a></li>
                  </ul>
                </div>                
                <div className="col-12 col-md-6 col-lg-4 footer-div">
                  <div className="footer-divheading">Resources</div>
                  <ul>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Terms & Conditions</a></li>
                   
                  </ul>
                </div>
                <div className="col-12 col-md-6 col-lg-4 footer-div">
                <div className="footer-divheading">Contact Us </div>
                  <address>
                  <h5 className="mb-0">Mahindra Foundation</h5>
                  <p>Cecil Court, MB Marg, Near Regal Cinema, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001</p>
                  <a href="tel:93224 56789"><i className="bi bi-phone"></i> 93224 56789</a><br/>
                  <a href="tel:022 22021031"><i className="bi bi-telephone-fill"></i> 022 22021031</a> <br/>
                  </address>
                 
                  {/* <i className="bi bi-clock"></i> 10.00am to 7.00pm IST <br/>(Monday to
                    Saturday) */}
                    {/* <div className="footer-divheading">About Us</div>
                    <ul>
                      <li><a href="">Mission & Vision</a></li>
                      <li><a href="">Our Journey</a></li>
                      <li><a href="">Our Team</a></li>
                      <li><a href="">Our Achievements </a></li>
                      <li><a href="">Volunteer with us</a></li>
                    </ul> */}
                </div>
              </div>
            </div>
          </Row>
        </Container>
        <div className="copyright">          
         Copyrights © 2023 <span><a className="colorgreen" href="Hariyali.org.in">Hariyali.org.in</a></span> | All rights reserved | Photo credit Naandi Foundation | We are available at
          <span className="colorgreen"> <a className="colorgreen" href="1t.org">1t.org</a></span>
        </div>
      </div>
    </>
  );
};

export default Header;
