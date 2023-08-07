import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
// program
import Contactimg from "../../../assets/img/slider/colleagues-working.jpg";
import fb from "../../../assets/img/social/fb.svg";
import downslide from "../../../assets/img/slider/downslide.jpg";
function ContactUs() {

  return (
    <>
      {/* body */}
      <div className="pt100">
        {/* <img src={Contactimg} alt="planting" className="imgwidth100" /> */}
        <div >
          <Container>
            <div className="section-header mt-5">
              <div className="pt30">
              <div className="contact-form-wrap-h5  ">
              Send us a message
              </div>
              <div className="contact-p">
                Please provide your most valuable information, so we can help you better!          </div>
              <form className="" >
                <div className="" >
                <Row>
                  <div className="col-lg-6 col-12">
                    <div className="homeinput-div">
                      <input className="form-control form-text required" type="text" name="name" value="" placeholder="Name" required="required" />
                    </div>
                    <div className="homeinput-div">
                      <input className="form-control form-text required" type="email" name="email" value="" placeholder="Email Id" required="required" />
                    </div></div>
                    <div className="col-lg-6 col-12">
                    <div className="homeinput-div">
                      <label for="edit-query" className="form-label">Query</label>
                      <textarea className="form-control form-textarea required" rows="2" cols="60" maxlength="2500" placeholder="Write you query here...." required="required" aria-required="true"></textarea>
                    </div></div>
                    </Row>
                </div>
                <button className="homesubmit-div" type="submit" value="Submit" >Submit </button>
              </form>
            </div></div>
          </Container>
          
        
        <div className="project-bg ">
        <Container>
          <Row className="justify-content-between ptb50">
          <div className="contact-heading">SOCIAL MEDIA CHANNELS
        </div>
            <div className="col-lg-2 col-12 mb-lg-0 mb-3 discover-block">
              <div className="positin-relative " >
                <div className="discoverImg"><img src={fb} alt="FB" /> Facebook</div>
              </div>
            </div>
            </Row></Container></div>
        </div>

      </div>

      {/* body */}
    </>
  );
}

export default ContactUs;
