import React, { useState } from "react";
import { OCCASION_LIST } from "../../../constants/constants";

const DonationHeader = ({
  userData,
  donations,
  handleDonationChange,
  errors,
  isOccasion,
}) => {
  const [inputValue, setInputValue] = useState('');
  const maxLength = 150;
  const handleChangeTextarea = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      setInputValue(inputValue);
    }
  };
  return (
    <div className="col-12 mt20">
      <div className="row ">
        {/* <div className="col-6">
          <div className="row select-label">
            <div className="col-4 ">
              Donor ID <span className="red-text">*</span>
            </div>
            <div className="col-8 p0">
              <input
                className="form-control-inside"
                name="Donor Id"
                placeholder="Donor Id"
                type="text"
                value={userData.user.donorId}
                disabled
              />
            </div>
          </div>
        </div> */}
        {isOccasion ? (
          <div className="col-12 col-lg-6">
            <div className="row select-label">
              <div className="col-12 col-lg-4 ">
                Occasion <span className="red-text">*</span>
              </div>
              <div className="col-12 col-lg-8 p0">
                <select
                  className=" form-control-inside form-select"
                  name="donationEvent"
                  value={donations[0].donationEvent}
                  onChange={(e) => handleDonationChange(e, 0)}
                >
                  <option disabled selected value="">
                    Select occasion
                  </option>
                  {OCCASION_LIST.map((ocacasion) => (
                    <option key={ocacasion.Value} value={ocacasion.value}>
                      {ocacasion.label}
                    </option>
                  ))}
                </select>
                {errors.map((error, index) => {
                  if (error.field === "donations.donationEvent") {
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
            <div className="col-12 col-lg-6">
              <div className=" select-label">
                <div className="col-12 p0 field-wrapper">
                  <label className="form-label">
                    Message For The Giftee <span className="red-text">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Message For The Giftee"
                    name="giftContent"
                    id="giftContent"
                    value={donations[0].giftContent}
                    onChange={(e) => {
                      handleChangeTextarea(e);
                      handleDonationChange(e, 0);
                    }}
                    maxLength={maxLength}
                  ></textarea>
                  <p>
                    {inputValue.length}/{maxLength} Characters
                  </p>
                  {errors.map((error, index) => {
                    if (error.field === "donations.giftContent") {
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DonationHeader;
