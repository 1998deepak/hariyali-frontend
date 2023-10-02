import React from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function FSCRAccount() {
  return (
    <>
      <Container className="py-5">
        <div
          id="forgotDiv"
          className="row  justify-content-between contact-form-wrap login-wrapper align-items-center mt-1 mb-1"
        >
          <Card>
            <Card.Body>
              <p>
                As per the new guidelines, issued by the Indian Government, a
                foreign citizen can make the payment only through a bank
                transfer to the FCRA account using SWIFT Transaction mode.
              </p>
              <br />{" "}
              <p>
                As a citizen of India you can make the payment of Rs.2000
                through bank transfer using the SWIFT Transaction mode as given
                below.
              </p>
              <br />{" "}
              <p>
                Account Name : <b>Naandi Foundation Bank</b>
              </p>
              <br />
              <p>
                A/c No : <b>40145230849</b>
              </p>
              <br />
              <p>
                Bank Name : <b>State Bank of India, New Delhi Main</b>
              </p>
              <p>
                Branch Branch Code : <b>00691</b>
              </p>{" "}
              <br />
              <p>
                RTGS/IFSC Code : <b>SBIN0000691</b>
              </p>
              <br />
              <p>
                {" "}
                SWIFT :<b>SBININBB104</b>{" "}
              </p>
              <br />
              <p>
                Type of Account : <b>FCRA Savings Account</b>
              </p>
              <br />
              <p>
                {" "}
                Please note, the FCRA account only allows donations from an
                overseas account in foreign currency and hence in the case of
                NRI (Non-Resident Indian), payment from NRE/NRO accounts will
                not be permitted.
              </p>
              <br />{" "}
              <p>
                Once you have made the payment, kindly share your transaction
                details (Bank transaction number, bank name, date of payment,
                amount transacted) to <a href="mailto:support@hariyali.org.in">support@hariyali.org.in</a>
              </p>
              <Link to="/" className="btn btn-success" type="button">
                Ok
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
