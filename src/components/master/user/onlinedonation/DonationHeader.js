import React from "react";
import { OCCASION_LIST } from "../../../constants/constants";

const DonationHeader = ({
  userData,
  donations,
  handleDonationChange,
  errors,
  isOccasion,
}) => {
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
          <div className="col-6">
            <div className="row select-label">
              <div className="col-4 ">
                Occasion <span className="red-text">*</span>
              </div>
              <div className="col-8 p0">
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
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DonationHeader;
