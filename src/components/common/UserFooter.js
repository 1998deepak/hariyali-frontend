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
              {/* <div className="footersocial-div row mb-3">
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
              </div> */}
              
            </div>
            <div className="col-12 col-md-12 col-lg-8 footerlinks">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4 footer-div small-non">
                  <div className="footer-divheading">Company</div>
                  <ul>
                    <li>
                    <a href="/AboutUs"> Who We Are</a></li>
                    <li>
                    <a href="/WhatWeDo"> What We Do</a></li>
                    <li><a href="/WhySupportUs"> Why Support Us</a></li>
                    <li><a href="/WaystoAssociate"> How To Associate</a></li>
                    <li><a href="/FootPrint"> Where Are We</a></li>                    
                    <li><a href="/ContactUs"> Write To Us</a></li>
                  </ul>
                </div>                
                <div className="col-12 col-md-6 col-lg-4 footer-div">
                  <div className="footer-divheading">Resources</div>
                  <ul>
                    <li><a href="/Policy">Privacy Policy</a></li>
                    <li><a href="TermsandConditions">Terms Of Use</a></li>
                    <li>Legal Documents
                        <ul className="nested-ul">
                          <li><a href={require('../../assets/pdf/Hariyali Regd Revised Trust Deed dated 27 Oct 2014.pdf')} target="_blank"> Registration Certificate </a></li>
                          <li><a href={require('../../assets/pdf/Hariyali 80G Certificate.pdf')} target="_blank">80 G Certificate </a></li>
                          {/* <li><a href={require('../../assets/pdf/Hariyali80GCertificate.pdf')} target="_blank" download="Hariyali80GCertificate.pdf">80 G Certificate </a></li> */}
                          <li><a href={require('../../assets/pdf/PAN - Hariyali.pdf')} target="_blank">PAN CARD </a></li>
                        </ul>
                    </li>
                   
                  </ul>
                </div>
                <div className="col-12 col-md-6 col-lg-4 footer-div">
                <div className="footer-divheading">Contact Us </div>
                  <address>
                  <h5 className="mb-0">Mahindra Foundation</h5>
                  <p>3rd Floor, Cecil Court
                    Mahakavi Bhushan Marg
                    Near Regal Cinema, Colaba 
                    Mumbai, Maharashtra -400001
                    </p>
                  <a href="tel:93224 56789"><i className="bi bi-phone"></i> 93224 56789</a><br/>
                  <a href="tel:022 22021031"><i className="bi bi-telephone-fill"></i> 022 22021031</a> <br/>
                  <a href="mailto:support@hariyali.org.in"><i className="bi bi-envelope-fill"></i> support@hariyali.org.in</a>
                  </address>
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
