import React from "react";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import CaptchaContact from "../user/CaptchaContact";
import { ContactUsService } from "../../../services/ContactUsService/contactUs.service";

function ContactUs() {
  const initialUserData = {
    contactName: "",
    contactEmail: "",
    contactSubject: "",
    massage:""
  };

  const [contactData, setContactData] = useState(initialUserData);

  

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    let data = { ...contactData };
    console.log(data[name]);
    data[name] = value;
    setContactData(data);
  };

  const addConntactUsForm = async (e) => {
    e.preventDefault();
    console.log(contactData);
    const response = await ContactUsService.AddConatct(contactData);
    if (response !== null) {
      console.log("Contact Us Form: "+JSON.stringify(response));
    } else {
      //toast.error(response?.message);
      console.log("Error Massage");
    }
  };

  return (
    <>
      {/* body */}
      <div className="pt100">
        <div className="section bggray">
          <Container className="pt30">
            <Row className="justify-content-between  padding30tb contact-form-wrap">
              <div className="section-header">
                <div className="otherbotmborder">
                  <div className="otherpages-heading">Contact Us</div>
                </div>
                <Row className="justify-content-between  padding30tb contact-form-wrap">
                  <div className=" col-lg-2"></div>
                  <div className="pt30 col-lg-8 ">
                    <div className="contactpages-subheading text-center">
                      {" "}
                      Send us a message
                    </div>
                    <form className="">
                      <div className="">
                        <Row>
                          <div className="homeinput-div col-lg-6 col-12">
                            <input
                              className="form-control form-text required"
                              type="text"
                              name="contactName"
                              placeholder="Your name*"
                              required="required"
                              value={contactData.contactName}
                              onChange={handleValueChange}
                            />
                          </div>
                          <div className="homeinput-div col-lg-6 col-12">
                            <input
                              className="form-control form-text required"
                              type="email"
                              placeholder="Your e-mail*"
                              required="required"
                              name="contactEmail"
                              value={contactData.contactEmail}
                              onChange={handleValueChange}
                            />
                          </div>
                          <div className="homeinput-div col-lg-12 col-12">
                            <input
                              className="form-control form-text required"
                              type="subject"
                              placeholder="Subject"
                              required="required"
                              name="contactSubject"
                              value={contactData.contactSubject}
                              onChange={handleValueChange}
                            />
                          </div>
                          <div className="homeinput-div col-lg-12 col-12">
                            <textarea
                              className="form-control form-textarea required"
                              rows="4"
                              cols="60"
                              maxlength="2500"
                              placeholder="Message*"
                              required="required"
                              aria-required="true"
                              name="massage"
                              value={contactData.massage}
                              onChange={handleValueChange}
                            ></textarea>
                          </div>
                          <div className="homeinput-div col-lg-12 col-12">
                            <CaptchaContact
                              verified={false}
                              setVerified={() => {}}
                              id="captcha2"
                            />
                          </div>
                        </Row>
                      </div>
                      <div className=" text-center">
                        <button
                          className="homesubmit-div"
                          type="submit"
                          value="Submit"
                          onClick={addConntactUsForm}
                        >
                          Send a Message
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className=" col-lg-2"></div>
                </Row>
              </div>
            </Row>
          </Container>
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default ContactUs;
