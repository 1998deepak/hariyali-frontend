import React from "react";
import { stateOptions } from "../constants/constants";

const RecipientDetails = ({
  recipient,
  handleRecipentChange,
  errors,
  handleRecipentAddressChange,
}) => {
  return (
    <>
      <div className="actionheadingdiv">DETAILS OF RECIPIENT</div>
      <div className="col-12 pr15 mt20">
        <div>
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="row select-label">
                <div className="col-12 col-lg-4 ">
                  First Name <span className="red-text">*</span>
                </div>
                <div className="col-12 col-lg-8 p0">
                  <input
                    className="form-control-inside"
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    value={recipient[0].firstName}
                    onChange={(e) => handleRecipentChange(e, 0)}
                  />
                  {errors.map((error, index) => {
                    if (error.field === "recipient[0].firstName") {
                      return (
                        <div key={index} className="error-message red-text">
                          {error.message}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row select-label">
                <div className="col-12 col-lg-4 ">
                  Last Name <span className="red-text">*</span>
                </div>
                <div className="col-12 col-lg-8 p0">
                  <input
                    className="form-control-inside"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    value={recipient[0].lastName}
                    onChange={(e) => handleRecipentChange(e, 0)}
                  />
                  {errors.map((error, index) => {
                    if (error.field === "recipient[0].lastName") {
                      return (
                        <div key={index} className="error-message red-text">
                          {error.message}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row select-label">
                <div className="col-12 col-lg-4 ">
                  Mobile No.
                  <span className="red-text">*</span>
                </div>
                <div className="col-12 col-lg-8 p0">
                  <input
                    className="form-control-inside"
                    name="mobileNo"
                    placeholder="Mobile No."
                    type="text"
                    value={recipient[0].mobileNo}
                    onChange={(e) => handleRecipentChange(e, 0)}
                  />
                  {errors.map((error, index) => {
                    if (error.field === "recipient[0].mobileNo") {
                      return (
                        <div key={index} className="error-message red-text">
                          {error.message}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row select-label">
                <div className="col-12 col-lg-4 ">
                  Email Id <span className="red-text">*</span>
                </div>
                <div className="col-12 col-lg-8 p0">
                  <input
                    className="form-control-inside"
                    name="emailId"
                    placeholder="Email Id"
                    type="text"
                    value={recipient[0].emailId}
                    onChange={(e) => handleRecipentChange(e, 0)}
                  />
                  {errors.map((error, index) => {
                    if (error.field === "recipient[0].emailId") {
                      return (
                        <div key={index} className="error-message red-text">
                          {error.message}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="row select-label">
                <div className="col-12 col-lg-4 "> Street 1 <span className="red-text">*</span></div>
                <div className="col-12 col-lg-8 p0">
                  <input
                    className="form-control-inside"
                    name="street1"
                    placeholder=" Street 1"
                    type="text"
                    value={recipient[0].address[0].street1}
                    onChange={(e) => handleRecipentAddressChange(e, 0)}
                  />
                  {errors.map((error, index) => {
                    if (error.field === "recipient[0].address[0].street1") {
                      return (
                        <div key={index} className="error-message red-text">
                          {error.message}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="row select-label">
                <div className="col-12 col-lg-4 "> Street 2</div>
                <div className="col-12 col-lg-8 p0">
                  <input
                    className="form-control-inside"
                    name="street2"
                    placeholder="Street 2"
                    type="text"
                    value={recipient[0].address[0].street2}
                    onChange={(e) => handleRecipentAddressChange(e, 0)}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row select-label">
                <div className="col-12 col-lg-4 "> Street 3</div>
                <div className="col-12 col-lg-8 p0">
                  <input
                    className="form-control-inside"
                    name="street3"
                    placeholder="Street 3"
                    type="text"
                    value={recipient[0].address[0].street3}
                    onChange={(e) => handleRecipentAddressChange(e, 0)}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row select-label">
                <div className="col-12 col-lg-4 ">
                  Country<span className="red-text">*</span>
                </div>
                <div className="col-12 col-lg-8 p0">
                  <input
                    className="form-control-inside"
                    name="country"
                    placeholder="Country"
                    type="text"
                    value={recipient[0].address[0].country}
                    onChange={(e) => handleRecipentAddressChange(e, 0)}
                  />
                  {errors.map((error, index) => {
                    if (error.field === "recipient[0].address[0].country") {
                      return (
                        <div key={index} className="error-message red-text">
                          {error.message}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row select-label">
                <div className="col-12 col-lg-4 ">
                  State<span className="red-text">*</span>
                </div>
                <div className="col-12 col-lg-8 p0">
                  <select
                    className=" form-control-inside form-select"
                    name="state"
                    value={recipient[0].address[0].state}
                    onChange={(e) => handleRecipentAddressChange(e, 0)}
                  >
                    <option disabled selected value="">
                      Select State
                    </option>
                    {stateOptions.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.map((error, index) => {
                    if (error.field === "recipient[0].address[0].state") {
                      return (
                        <div key={index} className="error-message red-text">
                          {error.message}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row select-label">
                <div className="col-12 col-lg-4 ">City</div>
                <div className="col-12 col-lg-8 p0">
                  <input
                    className="form-control-inside"
                    name="city"
                    placeholder="City"
                    type="text"
                    value={recipient[0].address[0].city}
                    onChange={(e) => handleRecipentAddressChange(e, 0)}
                  />
                  {errors.map((error, index) => {
                    if (error.field === "recipient[0].address[0].city") {
                      return (
                        <div key={index} className="error-message red-text">
                          {error.message}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row select-label">
                <div className="col-12 col-lg-4 ">Postal Code</div>
                <div className="col-12 col-lg-8 p0">
                  <input
                    className="form-control-inside"
                    name="postalCode"
                    placeholder="Postal Code"
                    type="text"
                    value={recipient[0].address[0].postalCode}
                    onChange={(e) => handleRecipentAddressChange(e, 0)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipientDetails;
