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
          <Row className="justify-content-between ptb50">
            <div className="col-4 small-center">
              <img src={logo} alt="Logo" className="logo" />
              <div className="footersocial-div row">
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
            </div>
            <div className="col-7 footerlinks">
              <div className="row">
                <div className="col-4 footer-div small-non">
                  <div className="footer-divheading">Company</div>
                  <ul>
                    <li>About Us</li>
                    <li>What we do</li>
                    <li>Why Support Us</li>
                    <li>FootPrint</li>
                    <li>Gallery & Awards</li>
                    <li>Contact Us</li>
                  </ul>
                </div>
                <div className="col-4 footer-div">
                  <div className="footer-divheading">About Us</div>
                  <ul>
                    <li>Mission & Vision</li>
                    <li>Our Journey</li>
                    <li>Our Team</li>
                    <li>Our Achievements </li>
                    <li>Volunteer with us</li>
                  </ul>
                </div>
                <div className="col-4 footer-div">
                  <div className="footer-divheading">Resources</div>
                  <ul>
                    <li>Careers</li>
                    <li>FAQs</li>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                    <li>Volunteer</li>
                    <li>Register as Farmer Beneficiary</li>
                  </ul>
                </div>
              </div>
            </div>
          </Row>
        </Container>
        <div className="copyright">
          Contact us at: +91 987 8765 111 - 10.00am to 7.00pm IST (Monday to
          Saturday)
          <br />
          Copyrights © 2023 Hariyali.com | All rights reserved
        </div>
      </div>
    </>
  );
};

export default Header;
