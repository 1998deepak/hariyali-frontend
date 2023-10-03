import React from "react";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import Captcha from "../user/Captcha";
import { ContactUsService } from "../../../services/ContactUsService/contactUs.service";
import { toast, ToastContainer } from "react-toastify";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaEnvira } from "react-icons/fa";
function ContactUs() {
  const initialUserData = {
    contactName: "",
    contactEmail: "",
    contactSubject: "",
    massage: "",
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

  const setCaptchaFlag = async (flag) => {
    setCaptchaVerfied(flag);
  };

  const validate = () => {
    const validationErrors = [];
    console.log("Working!! : " + contactData.contactName);

    if (!captchaVerfied) {
      validationErrors.push({
        field: "captchaError",
        message: "Captcha not verified",
      });
    }
    // Validate user data fields
    if (!contactData?.contactName) {
      validationErrors.push({
        field: "contactData.contactName",
        message: "Contact Name is required",
      });
    } else if (!/^[a-zA-Z]+$/.test(contactData.contactName)) {
      validationErrors.push({
        field: "contactData.contactName",
        message: "Contact Name should only contain alphabets",
      });
    }

    if (!contactData?.contactSubject) {
      validationErrors.push({
        field: "contactData.contactSubject",
        message: "Subject is required",
      });
    } else if (!/^[a-zA-Z&_]+$/.test(contactData.contactSubject)) {
      validationErrors.push({
        field: "contactData.contactSubject",
        message: "Subject should only contain alphabets",
      });
    }

    if (!contactData?.contactEmail) {
      validationErrors.push({
        field: "contactData.contactEmail",
        message: "Email ID is required",
      });
    } else if (
      !/^[A-Za-z0-9_-]+([.]?[A-Za-z0-9_-]+)*@[A-Za-z0-9_-]+([.]?[A-Za-z0-9_-]+)*([.]{1}[A-Za-z0-9_]{2,3})+$/i.test(contactData.contactEmail)
    ) {
      validationErrors.push({
        field: "contactData.contactEmail",
        message: "Invalid Email ID",
      });
    }

    if (!contactData?.massage) {
      validationErrors.push({
        field: "contactData.massage",
        message: "Massage is required",
      });
    }else if (
      !/^[a-zA-Z]+$/.test(contactData.massage)
    ) {
      validationErrors.push({
        field: "contactData.massage",
        message: "Massage should only contain alphabets",
      });
    }

    console.log(validationErrors);

    const errorMessages = validationErrors.map(
      (error) => `${error.field}: ${error.message}`
    );
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

  const clearForm = (e) => {
    e.preventDefault();
    setContactData(initialUserData);
  };

  const addConntactUsForm = async (e) => {
    e.preventDefault();
    console.log("enter in api");
    const isValid = validate();
    if (isValid) {
      console.log(isValid);
      console.log(contactData);
      const response = await ContactUsService.AddConatct(contactData);
      if (response !== null) {
        console.log("Contact Us Form: " + JSON.stringify(response));
        toast.success("Email Send to Hariyali Team!");
        clearForm(e);
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
        <div className="title">{/* <h1>Conatct Us</h1> */}</div>
      </section>
      <ToastContainer />
      <div className="">
        <div className="">
          <div className="pv-75 pb-0">
            <div className="feature-description pb-0">
              <div className="container">
                <h2 className="sub-title text-center mb-0">Write To Us</h2>
              </div>
            </div>
          </div>
          <div className="">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-4">
                  <address>
                    <h4 className="mb-0 askheading">Mahindra Foundation</h4>
                    <p className="ask-p">
                      3rd Floor, Cecil Court Mahakavi Bhushan Marg Near Regal
                      Cinema, Colaba Mumbai, Maharashtra - 400001
                    </p>
                    <a href="tel:022 22021031" className="ask-p">
                      <i className="bi bi-telephone-fill"></i> 022 22021031
                    </a>
                    <br />
                    <a href="mailto:support@hariyali.org.in" className="ask-p">
                      <i className="bi bi-envelope-fill"></i>{" "}
                      support@hariyali.org.in
                    </a>
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
                        <div className="homeinput-div col-12 col-lg-6 col-12 field-wrapper">
                          <label className="form-label">
                          Name <span className="red-text">*</span>
                          </label>
                          <input
                            className="form-control form-text required"
                            type="text"
                            name="contactName"
                            placeholder="Contact name"
                            required="required"
                            value={contactData.contactName}
                            onChange={handleValueChange}
                          />
                          {errors.map((error, index) => {
                            if (error.field === "contactData.contactName") {
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
                        <div className="homeinput-div col-12 col-lg-6 col-12 field-wrapper">
                          <label className="form-label"> Email Id <span className="red-text">*</span></label>
                          <input
                            className="form-control form-text required"
                            type="email"
                            placeholder="Contact e-mail"
                            required="required"
                            name="contactEmail"
                            value={contactData.contactEmail}
                            onChange={handleValueChange}
                          />
                          {errors.map((error, index) => {
                            if (error.field === "contactData.contactEmail") {
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
                        <div className="homeinput-div col-12 col-lg-12 col-12 field-wrapper">
                          <label className="form-label">Subject <span className="red-text">*</span></label>
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
                            if (error.field === "contactData.contactSubject") {
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
                        <div className="homeinput-div col-12 col-lg-12 col-12 field-wrapper">
                          <label className="form-label">Message <span className="red-text">*</span></label>
                          <textarea
                            className="form-control form-textarea required"
                            rows="4"
                            cols="60"
                            maxlength="2500"
                            placeholder="Message"
                            required="required"
                            aria-required="true"
                            name="massage"
                            value={contactData.massage}
                            onChange={handleValueChange}
                          ></textarea>
                          {errors.map((error, index) => {
                            if (error.field === "contactData.massage") {
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
                        <div className="homeinput-div col-12 col-lg-12 col-12">
                          <Captcha
                            verified={false}
                              setVerified={(flag) => {
                                setCaptchaFlag(flag);
                              }}
                              id="captcha1"
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
              <div className="my-5">
                <h2 className="sub-title text-center mb-0">FAQ</h2>
                <div className="my-5">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        <FaEnvira className="greencolor" />
                        Are there any tax benefits for donating to Project Hariyali?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        In India, yes, all contributions are deductible under Section 80 G of the Income Tax Act.
                        <br />Once you make your donation, we will send you a receipt which also serves as your 80G certificate.
                        Form 10BE is uploaded next financial year on your account at the Hariyali website.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography> <FaEnvira className="greencolor" />What is the purpose of a login ID & password?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        All donors receive a system generated login ID and password through email. With your login details, you can access your account to see the number of trees planted by you over a period and other details.
                        <br /><br />
                        In case of changes in personal details, we encourage you to log in and make changes to your profile. You can also notify us by e-mail, and we will update our records accordingly.

                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography> <FaEnvira className="greencolor" />
                        How does the donation amount utilised?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>From every donation, only 10% of the funds are retained by the charity for administrative, marketing, and fund-raising costs; the remaining 90% is utilised exclusively towards our project expenses.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography> <FaEnvira className="greencolor" />
                        How long do trees take to reach maturity?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Every tree species we offer is different, in terms of how long it takes to reach maturity, it can range from 5 years to 10 years.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography> <FaEnvira className="greencolor" />
                        If there is a problem with the net banking or credit card donation process, whom do you contact?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>You can mail to <a href="mailto:support@hariyali.org.in">support@hariyali.org.in</a>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography> <FaEnvira className="greencolor" />
                        How safe is my personal information with Project Hariyali?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>We do not use personal details for any other purpose than sending correspondences related to the donation. We have our Privacy policy available on the website.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography> <FaEnvira className="greencolor" />
                        Is it safe to give my credit card details online?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>The Project Hariyali website partners with CC Avenues because it adheres to high security measures. CC Avenue is committed to ensuring that details shared by user, especially sensitive information like credit card details, etc remain protected. For further information, please visit www.ccavenues.com
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography> <FaEnvira className="greencolor" />
                        Can I choose to support Project Hariyali in a specific area/region?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        We do not give choices in area/region and selection of species for plantation.  We urge donors to contribute towards Project Hariyali irrespective of these conditions.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography> <FaEnvira className="greencolor" />
                        How can I pay by cheque?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>

                        In India, Cheque or Demand Draft can be drawn in favour of "Project Hariyali". These can be sent at the following address.
                        <br /><br />
                        Mahindra Foundation<br />
                        3rd Floor, Cecil Court<br />
                        Mahakavi Bhushan Marg<br />
                        Near Regal Cinema, Colaba<br />
                        Mumbai, Maharashtra - 400001<br />
                        <br />
                        For all other nationals/residents, online donations can be made at www.hariyali.org.in through the Online Payment Gateway.

                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography> <FaEnvira className="greencolor" />
                        What will I receive after donating to Project Hariyali?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>

                        After donating to Project Hariyali, you will receive the following.
                        <br /><br />
                        a.	A welcome letter along with the login details<br />
                        b.	Thank you letter with a Certificate<br />
                        c.	Receipt of the donation within 7 working days<br />
                        d.	Plantation report <br />
                        e.	Follow up reports for two years
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
            <div className="contact-description-other">
              {" "}
              <section className="bg-green">
                {" "}
                <div className="container ">
                  <div className="pv-75">
                    {/* <iframe
                      width="100%"
                      height="500px"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.180251338984!2d72.83045697599867!3d18.923414056743518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1daffffffff%3A0x10104990a52ce0ed!2sKc%20Mahindra%20Education%20Trust!5e0!3m2!1sen!2sin!4v1692557952647!5m2!1sen!2sin"
                    ></iframe> */}
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3774.1598122210316!2d72.8323002!3d18.9243191!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c16a8e4a01%3A0x35f31deca5a594f0!2sCecil%20Court%2C%20Regal%20Cinema%2C%20Colaba%20Causeway%2C%20Apollo%20Bandar%2C%20Colaba%2C%20Mumbai%2C%20Maharashtra%20400001!5e0!3m2!1sen!2sin!4v1696094959670!5m2!1sen!2sin" 
                    width="100%" height="450"></iframe>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default ContactUs;
