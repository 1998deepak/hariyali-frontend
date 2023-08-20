import React from "react";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import CaptchaContact from "../user/CaptchaContact";
import { ContactUsService } from "../../../services/ContactUsService/contactUs.service";
import { toast,ToastContainer } from "react-toastify";

function ContactUs() {
  const initialUserData = {
    contactName: "",
    contactEmail: "",
    contactSubject: "",
    massage:""
  };

  const [contactData, setContactData] = useState(initialUserData);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isAlphbate, setIsAlphbate] = useState(true);
  const [errors, setErrors] = useState([]);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validate = () => {
    const validationErrors = [];
    console.log("Working!! : "+contactData.contactName)
    // Validate user data fields
    if (!contactData?.contactName) {
      validationErrors.push({ field: "contactData.contactName", message: "Contact Name is required" });
    } else if (/\d/.test(contactData.contactName)) {
      validationErrors.push({ field: "contactData.contactName", message: "Contact Name should only contain alphabets" });
    }

    if (!contactData?.contactSubject) {
      validationErrors.push({ field: "contactData.contactSubject", message: "Subject is required" });
    } else if (/\d/.test(contactData.contactSubject)) {
      validationErrors.push({ field: "contactData.contactSubject", message: "Subject should only contain alphabets" });
    }


    if (!contactData?.contactEmail) {
      validationErrors.push({ field: "contactData.contactEmail", message: "Email ID is required" });
    } else if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(contactData.contactEmail)) {
      validationErrors.push({ field: "contactData.contactEmail", message: "Invalid Email ID" });
    }

    if (!contactData?.massage) {
      validationErrors.push({ field: "contactData.massage", message: "Massage is required" });
    }

    console.log(validationErrors);


    const errorMessages = validationErrors.map(error => `${error.field}: ${error.message}`);
    const errorMessageString = errorMessages.join("\n");

    console.log(errorMessageString);

    setErrors(validationErrors);

    return validationErrors.length === 0;

  };


  const handleValueChange = (event) => {
    const { name, value } = event.target;
    let data = { ...contactData };
    console.log(data[name]);
    //setIsValidEmail(validateEmail(data.contactEmail));
    data[name] = value;
    setContactData(data);
  };

  const addConntactUsForm = async (e) => {
    e.preventDefault();
    console.log("enter in api")
    const isValid = validate();
    if(isValid){
      console.log(isValid);
    console.log(contactData);
    const response = await ContactUsService.AddConatct(contactData);
    if (response !== null) {
      console.log("Contact Us Form: "+JSON.stringify(response));
      toast.success("Email Send to Hariyali Team!")
      // setContactData((current) => {
      //   return current.map((item) => {
      //     return { ...item};
      //   });
      // });
    } else {
      //toast.error(response?.message);
      console.log("Error Massage");
    }
  }
  };

  return (
    <>
      {/* body */}
      <ToastContainer/>
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
                            {errors.map((error, index) => {
                              if (error.field === 'contactData.contactName') {
                                return <div key={index} className="error-message red-text">{error.message}</div>;
                              }
                              return null;
                            })}
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
                            {errors.map((error, index) => {
                              if (error.field === 'contactData.contactEmail') {
                                return <div key={index} className="error-message red-text">{error.message}</div>;
                              }
                              return null;
                            })}
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
                            {errors.map((error, index) => {
                              if (error.field === 'contactData.contactSubject') {
                                return <div key={index} className="error-message red-text">{error.message}</div>;
                              }
                              return null;
                            })}
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
                            {errors.map((error, index) => {
                              if (error.field === 'contactData.massage') {
                                return <div key={index} className="error-message red-text">{error.message}</div>;
                              }
                              return null;
                            })}
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
