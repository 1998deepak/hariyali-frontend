import React from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import useScrollTop from "../../hooks/useScrollTop";

export default function FSCRAccount() {
  const location = useLocation();
  console.log(location.state)
  const data = location.state.split(",")[0];
  const data1 = location.state.split(",")[1];
  useScrollTop();
  return (
    <>
      <Container>
        <div
          id="forgotDiv"
          className="row  justify-content-between contact-form-wrap login-wrapper align-items-center mt-1 mb-1"
        >
          <Card>
            <Card.Body className="pt-2 pb-2">
              <p className="mb-2">
                As per the new guidelines, issued by the Indian Government, a
                foreign citizen can make the payment only through a bank
                transfer to the FCRA account using SWIFT Transaction mode.
              </p>{" "}
              <p className="mb-2">
                As a citizen of <b>{data1}</b> you can make the payment of 
                <b>Rs.{" "}{data}</b> through bank transfer using the SWIFT Transaction
                mode as given below.
              </p>{" "}
              <div className="desk-div d-flex">
                <table>
                  <tbody>
                    <tr>
                      <td>Account Name :</td>
                      <td>Naandi Foundation Bank</td>
                    </tr>
                    <tr>
                      <td>A/c No :</td>
                      <td>40145230849</td>
                    </tr>
                    <tr>
                      <td>Bank Name :</td>
                      <td>State Bank of India, New Delhi Main Branch</td>
                    </tr>
                    <tr>
                      <td>Branch Code :</td>
                      <td>00691</td>
                    </tr>
                    <tr>
                      <td>RTGS/IFSC Code :</td>
                      <td>SBIN0000691</td>
                    </tr>
                    <tr>
                      <td>SWIFT :</td>
                      <td>SBININBB104</td>
                    </tr>
                    <tr>
                      <td>Type of Account :</td>
                      <td>FCRA Savings Account</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mob-div">
                <div class="row_div">
                  <span>Account Name :</span>
                  <span>Naandi Foundation Bank</span>
                </div>
                <div class="row_div">
                  <span>A/c No :</span>
                  <span>40145230849</span>
                </div>
                <div class="row_div">
                  <span>Bank Name :</span>
                  <span>State Bank of India, New Delhi Main Branch</span>
                </div>
                <div class="row_div">
                  <span>Branch Code :</span>
                  <span>00691</span>
                </div>
                <div class="row_div">
                  <span>RTGS/IFSC Code :</span>
                  <span>SBIN0000691</span>
                </div>
                <div class="row_div">
                  <span>SWIFT :</span>
                  <span>SBININBB104</span>
                </div>
                <div class="row_div">
                  <span>Type of Account :</span>
                  <span>FCRA Savings Account</span>
                </div>
              </div>
              <p className="mb-2">
                {" "}
                Please note, the FCRA account only allows donations from an
                overseas account in foreign currency and hence in the case of
                NRI (Non-Resident Indian), payment from NRE/NRO accounts will
                not be permitted.
              </p>{" "}
              <p className="mb-2">
                Once you have made the payment, kindly share your transaction
                details (Bank transaction number, bank name, date of payment,
                amount transacted) to support@hariyali.org.in.
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
