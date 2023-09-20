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
    } else if (/\d/.test(contactData.contactName)) {
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
    } else if (/\d/.test(contactData.contactSubject)) {
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
      !/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(
        contactData.contactEmail
      )
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
                <h2 className="sub-title text-center mb-0">Ask Us</h2>
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
                    <a href="tel:93224 56789" className="ask-p">
                      <i className="bi bi-phone"></i> 93224 56789
                    </a>
                    <br />
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
                        <div className="homeinput-div col-lg-12 col-12">
                          <Captcha
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
              <div className="my-5">
              <h2 className="sub-title text-center mb-0">FAQ</h2>
              <div className="my-5">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography> <FaEnvira className="greencolor"/> How do I see and get info about my tree once I’ve bought it?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      When you buy trees from EcoTree, we add them to your online
                        account. You’ll be able to track their progress and
                        geolocate them using aerial maps and photos of the forest.
                        <br /> You will also have access to a CO2 absorption meter
                        as well as a recovery meter over time. We send all customers
                        a regular email newsletter to help you keep up to date with
                        special offers and information about our forests.
                        <br /> Every year, we send you our detailed annual report
                        for you to learn about the work we’ve done in our forests,
                        our progress as a company and plans for the future. Read our
                        latest annual report now. Finally, most of our forests are
                        open. That means you can come and visit the forest where
                        your trees grow at any time. Just check our list of forests
                        to see if your forest is labelled ‘open to the public’.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography> <FaEnvira className="greencolor"/> How does it work?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    <p>Why do we need to plant trees anyway? 1. Absorb CO2.</p>
                      <ol>
                        <li>Purify the air.</li>
                        <li>Help ensure the preservation of biodiversity.</li>
                        <li>Are a source of raw materials.</li>
                        <li>Create jobs.</li>
                        <li>Aid the renewal of damaged land.</li>
                        <li>Filter water.</li>
                        <li> Have agricultural benefits.</li>
                        <li>Provide resources for medicine. </li>
                      </ol>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography> <FaEnvira className="greencolor"/> Are the trees I buy already planted or will they be planted in the future?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                        At EcoTree, we work in harmony with the seasons and only
                        plant new tree saplings in the winter. This means we need to
                        anticipate demand for our trees ahead of time. So if you are
                        buying a sapling, it might not be planted for a little
                        while. If it’s listed as a mature tree at purchase, then
                        it’s obviously growing away nicely already.
                        <br />
                        If demand for our trees is higher than we expected, we have
                        a pre-sale system set up to ensure that everyone can still
                        buy trees and contribute over the long term to the vital
                        work our planet’s forests do in capturing carbon.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography> <FaEnvira className="greencolor"/> Do I get a certificate or other proof that I own my trees?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                        As a tree owner with EcoTree, you get a certificate of
                        ownership. Our IT Department stores all records of
                        ownership, hosted on servers outside EcoTree.
                        <br />
                        On top of this, we provide proof that we are maintaining a
                        properly accounted register annually to the financial
                        authorities (The AMF - Autorité des Marchés Financiers) in
                        France.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography> <FaEnvira className="greencolor"/> Does the price of my tree include all taxes and fees?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                        Once your trees have been paid for, you will never have to
                        pay more costs or taxes. Your initial payment covers the
                        vital work we do to maintain a vibrant, sustainable forest
                        (such as pruning, thinning and mushroom treatments). It also
                        covers all the costs involved in the notary deeds, property
                        taxes and maps or surveys of the forest where your trees are
                        planted (cadastral fees).
                        <br />
                        Under current French tax law, any capital gain is
                        non-taxable if it relates to the sale of trees worth less
                        than €5,000 after 22 years or more of tree ownership.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography> <FaEnvira className="greencolor"/> How long do trees take to reach maturity?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                        Every tree species we offer is different, in terms of how
                        long it takes to reach maturity, but we’re talking decades
                        for all of them!
                        <br />
                        Not all the trees we offer are new planted saplings. Some
                        have been growing a number of years already.
                        <br />
                        You can see how old a tree is when you buy it and how many
                        years we expect it to grow before we cut it, on the tree’s
                        product information card.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography> <FaEnvira className="greencolor"/> Why is tree ownership good for the planet?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                        Writer George Monbiot and biologist Garret Hardin have
                        highlighted how vital our connection to nature is in its
                        conservation. That’s why we’re going beyond donations.
                        <br />
                        Our tree owners (like you!) have a lifetime of reasons to
                        stay engaged and passionate about protecting forests.
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
                    <iframe
                      width="100%"
                      height="500px"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.180251338984!2d72.83045697599867!3d18.923414056743518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1daffffffff%3A0x10104990a52ce0ed!2sKc%20Mahindra%20Education%20Trust!5e0!3m2!1sen!2sin!4v1692557952647!5m2!1sen!2sin"
                    ></iframe>
                  </div>
                </div>
              </section>
            </div>
            {/* <Row className="justify-content-between  padding30tb contact-form-wrap">
              <div className=" col-lg-2"></div>
              <div className="pt30 col-lg-8 ">
                
              </div>
              <div className=" col-lg-2"></div>
            </Row> */}
          </div>
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default ContactUs;
