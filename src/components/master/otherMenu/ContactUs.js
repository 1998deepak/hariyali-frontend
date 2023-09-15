import React from "react";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
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
  const [captchaVerfied, setCaptchaVerfied] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const setCaptchaFlag = async (flag) =>{
    setCaptchaVerfied(flag);
  }

  const validate = () => {
    const validationErrors = [];
    console.log("Working!! : "+contactData.contactName)
    if(!captchaVerfied){
      validationErrors.push({
        field: "captchaError",
        message: "Captcha not verified",
      });
    }
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
      <section className="banner banner-contact">
        <div className="title">
          {/* <h1>Conatct Us</h1> */}
        </div>          
      </section>
      <ToastContainer/>
      <div className="">
        <div className="">
        <div className="pv-75 pb-0">
            <div className="feature-description pb-0"><div className="container">
              <h2 className="sub-title text-center mb-0">Ask Us</h2>
            </div></div>
          </div>
          <div className="">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-4">
                  <address>
                  <h4 className="mb-0 askheading">Mahindra Foundation</h4>
                  <p className="ask-p">3rd Floor, Cecil Court Mahakavi Bhushan Marg Near Regal Cinema, Colaba Mumbai, Maharashtra - 400001</p>
                  <a href="tel:93224 56789"  className="ask-p"><i className="bi bi-phone"></i> 93224 56789</a><br/>
                  <a href="tel:022 22021031"  className="ask-p"><i className="bi bi-telephone-fill"></i> 022 22021031</a><br/>
                  <a href="mailto:support@hariyali.org.in" className="ask-p"><i className="bi bi-envelope-fill"></i> support@hariyali.org.in</a>
                  </address>
                </div>
                <div className="col-12 col-md-8">
                  <div className="">
                    {" "}
                    <h4 className="askheading">Send us a message</h4>
                  </div>
                  <form className="contact-form-wrap">
                    <div className="">
                      <Row>
                        <div className="homeinput-div col-lg-6 col-12 field-wrapper">
                          <label className="form-label">Name</label>
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
                        <div className="homeinput-div col-lg-6 col-12 field-wrapper">
                        <label className="form-label">Email Id</label>
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
                        <div className="homeinput-div col-lg-12 col-12 field-wrapper">
                        <label className="form-label">Subject</label>
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
                        <div className="homeinput-div col-lg-12 col-12 field-wrapper">
                        <label className="form-label">Message</label>
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
                            setVerified={() => setCaptchaFlag(true)}
                            id="captcha2"
                          />
                          {errors.map((error, index) => {
                                if (error.field === "captchaError") {
                                  return (
                                    <div
                                      key={index}
                                      className="error-message red-text"
                                    >
                                      {error.message}
                                    </div>
                                  );
                                }
                                return null;
                              })}
                        </div>
                      </Row>
                    </div>
                    <div className=" text-center">
                      <button
                        className="homesubmit-div btn btn-primary"
                        type="submit"
                        value="Submit"
                        onClick={addConntactUsForm}
                      >
                        Send a Message
                      </button>
                    </div>
                  </form>
                </div>
              </div> 
            </div><div className="contact-description-other"> <section className="bg-green"> <div className="container ">
              <div className="pv-75">
              <iframe width="100%" height="500px" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.180251338984!2d72.83045697599867!3d18.923414056743518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1daffffffff%3A0x10104990a52ce0ed!2sKc%20Mahindra%20Education%20Trust!5e0!3m2!1sen!2sin!4v1692557952647!5m2!1sen!2sin" 
              ></iframe></div>
              </div></section></div>
            {/* <Row className="justify-content-between  padding30tb contact-form-wrap">
              <div className=" col-lg-2"></div>
              <div className="pt30 col-lg-8 ">
                
              </div>
              <div className=" col-lg-2"></div>
            </Row> */}
        </div></div>
      </div>
      {/* body */}
    </>
  );
}

export default ContactUs;
