import React from "react";
import {Container, Row } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import logo from "../../assets/img/logotrans.png";

const Header = () => {

  return (
    <>
      <div className="footerbg">
        <Container>
          <Row className="justify-content-between ptb50">
            <div className="col-4 small-center">
              <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />  
              </div>              
              <div className="footersocial-div row mb-3">
                <div className="col-2 ">
                  <div className="footersocial">
                    <FaFacebookF />
                  </div>
                </div>
                <div className="col-2 ">
                  <div className="footersocial">
                    <FaTwitter />
                  </div>
                </div>
                <div className="col-2 ">
                  <div className="footersocial">
                    <FaInstagramSquare />
                  </div>
                </div>
                <div className="col-2 ">
                  <div className="footersocial">
                    <FaWhatsapp />
                  </div>
                </div>
                <div className="col-2 ">
                  <div className="footersocial">
                    <FaYoutube />
                  </div>
                </div>
              </div>
              <h5>Contact us at: </h5>
              <a href="tel:+91 987 8765 111"><i className="bi bi-telephone-fill"></i>+91 987 8765 111</a> <br/>
              <i className="bi bi-clock"></i> 10.00am to 7.00pm IST <br/>(Monday to
          Saturday)
            </div>
            <div className="col-12 col-md-6 col-lg-7 footerlinks">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4 footer-div small-non">
                  <div className="footer-divheading">Company</div>
                  <ul>
                    <li>
                      <a href=""><i class="bi bi-flower3"></i> About Us</a>
                    </li>
                    <li>
                    <a href=""><i class="bi bi-flower3"></i> What we do</a></li>
                    <li><a href=""><i class="bi bi-flower3"></i> Why Support Us</a></li>
                    <li><a href=""><i class="bi bi-flower3"></i> Ways to Associate</a></li>
                    <li><a href=""><i class="bi bi-flower3"></i> FootPrint</a></li>                    
                    <li><a href=""><i class="bi bi-flower3"></i> Contact Us</a></li>
                  </ul>
                </div>
                <div className="col-12 col-md-6 col-lg-4 footer-div">
                  <div className="footer-divheading">About Us</div>
                  <ul>
                    <li><a href="">Mission & Vision</a></li>
                    <li><a href="">Our Journey</a></li>
                    <li><a href="">Our Team</a></li>
                    <li><a href="">Our Achievements </a></li>
                    <li><a href="">Volunteer with us</a></li>
                  </ul>
                </div>
                <div className="col-12 col-md-6 col-lg-4 footer-div">
                  <div className="footer-divheading">Resources</div>
                  <ul>
                    <li><a href="">Careers</a></li>
                    <li><a href="">FAQs</a></li>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Terms & Conditions</a></li>
                    <li><a href="">Volunteer</a></li>
                    <li><a href="">Register as Farmer Beneficiary</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </Row>
        </Container>
        <div className="copyright">
          Copyrights © 2023 Hariyali.com | All rights reserved
        </div>
      </div>
    </>
  );
};

export default Header;
