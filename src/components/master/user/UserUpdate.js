import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DonationService } from "../../../services/donationService/donation.service";
import { SUCCESS, stateOptions } from "../../constants/constants";
import { UserService } from "../../../services/userService/user.service";
import Loader from "../../common/loader/Loader";
import PrivacyPolicy from "../../common/PrivacyPolicy";
import TermsConditionsPopup from "../../common/popup/TermsConditionsPopup";
import PrivacyPolicyPopup from "../../common/popup/PrivacyPolicyPopup";

function UserUpdate() {
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [informationShare, setInformationShare] = useState(false);
  const [showConditons, setShowConditons] = useState(false);
  // Initial Data for user
  const initialUserData = {
    user: {
      firstName: "",
      lastName: "",
      mobileNo: "",
      emailId: "",
      donarType: "",
      prefix: "",
      organisation: "",
      isTaxBenefit: false,
      panCard: "",
      activityType: null,
      address: null,
    },
  };

  // Initial data for address
  const initialAddress = [
    {
      street1: "",
      street2: "",
      street3: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
    },
  ];

  //states to store data
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [errors, setErrors] = useState({});
  const [addressData, setAddressData] = useState(initialAddress);
  const { email } = UserService.userDetails();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [showConditons1, setShowConditons1] = useState(false);

  const handleCloseConditions = () => setShowConditons(false);
  const handleShowConditions1 = () => setShowConditons1(false);

  // getUser Details
  const getUserDetails = async (id) => {
    try {
      setLoading(true);
      const response = await DonationService.getUserDetails(id);
      console.log(response?.data);
      if (response?.data) {
        if(response?.data.aadharCard){
          document.getElementById("pan").style.display="none";
          document.getElementById("aadhaar").style.display="block";
        }else if(response?.data.panCard){
          document.getElementById("aadhaar").style.display="none";
          document.getElementById("pan").style.display="block";
        }
        setUserData(response.data);
        setAddressData(response.data.address);
        setInformationShare(response.data.campaignConsent);
        setPrivacyPolicy(response.data.dataConsent);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getCountryList = async () => {
    setLoading(true);
    const response = await DonationService.getAllCountries();
    if (response?.status === 200) {
      // let data = response.data.map((item)=> ({ label: item, value: item }))
      setCountries(response.data);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const getStatesByCountry = async (countryId) => {
    setLoading(true);
    const response = await DonationService.getAllStatesByCountry(countryId);
    console.log("get states", response.data);
    if (response?.status === 200) {
      setStates(response.data);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  //calling api
  useEffect(() => {
    if (email) {
      getUserDetails(email);
    }
    getCountryList();
  }, [email]);

  //validate form
  const validateFields = (userData, addressData) => {
    const errors = {};
    // Validate mobileNo
    if (!userData.mobileNo) {
      errors.mobileNo = "Mobile No. is required";
    } else if (!/^[0-9]{10}$/.test(userData.mobileNo)) {
      errors.mobileNo = "Mobile No. must contain only digits";
    }

    // validation for address field
    if (addressData && addressData.length > 0) {
      const firstAddress = addressData[0];
      if (!firstAddress.street1) {
        errors.street1 = "Street 1 is required";
      }
      if (!firstAddress.country) {
        errors.country = "Country is required";
      }
      if (!firstAddress.state) {
        errors.state = "State is required";
      }
      if (!firstAddress.city) {
        errors.city = "City is required";
      }
      if (firstAddress?.country === "INDIA") {
        if (!firstAddress?.postalCode) {
          errors.postalCode = "postalCode is required";
        } else if (!/^\d{6}$/.test(firstAddress?.postalCode)) {
          errors.postalCode = "Invalid Postal Code";
        }
      } else {
        if (!firstAddress?.postalCode) {
          errors.postalCode = "postalCode is required";
        } else if (!/^\d{5}$/.test(firstAddress?.postalCode)) {
          errors.postalCode = "Invalid Postal Code";
        }
      }
    }
    setErrors(errors);
    return errors;
  };

  // Update user Data
  const updateUser = async (e, emailID, userData, addressData) => {
    try {
      e.preventDefault();
      // Perform validation for userData
      const userErrors = validateFields(userData);
      // Perform validation for addressData
      const addressErrors = validateFields(userData, addressData || []);
      // Merge the validation errors for both userData and addressData
      const errors = { ...userErrors, ...addressErrors };
      console.log(errors);
      // Check if there are any validation errors
      if (Object.keys(errors).length > 0) {
        // Handle validation errors, e.g., display error messages
        console.log(errors);
        return;
      }
      const formData = userData;
      formData.address = addressData;
      setLoading(true);
      console.log(formData);
      const response = await DonationService.updateUser(emailID, formData);

      if (response?.status === SUCCESS) {
        toast.success(response?.message);
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } catch (err) {
      if (err?.response?.data) {
        console.log(err.response.data);
      } else {
        console.log(err?.message);
      }
      setLoading(false);
    }
  };

  //Handle address change
  const handleAddressChange = (event, index) => {
    const { name, value } = event.target;
    let data = null;
    if (name === "country") {
      data = countries.find((item) => item.countryName === value);
    }
    setAddressData((prevAddress) => {
      const updatedAddress = [...prevAddress];
      updatedAddress[index] = {
        ...updatedAddress[index],
        [name]: value,
      };
      return updatedAddress;
    });
    if (data) {
      getStatesByCountry(data.countryCode);
    }
  };

  // handle Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...userData };
    const keys = name.split(".");
    let currentField = updatedFormData;
    for (let i = 0; i < keys.length - 1; i++) {
      currentField = currentField[keys[i]];
    }
    currentField[keys[keys.length - 1]] = value;
    setUserData(updatedFormData);
  };

  const handleShowConditions = (e) => {
    e.preventDefault();
    setShowConditons(true);
  };

  const handleCloseConditions1 = (e) => {
    e.preventDefault();
    setShowConditons1(true);
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className="bggray">
        <div className="col-12 admin-maindiv">
          <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
            <h5>Personal Details</h5>
            <div className="col-12 pr0 contact-form-wrap">
              {" "}
              <div className="row">
                <form className="form-div contact-form-wrap">
                  <div className="col-12 pr15 mt20">
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <div className="row select-label">
                          <div className="col-12 col-lg-4"> Donor ID</div>
                          <div className="col-12 col-lg-8 p0">
                            <input
                              className="form-control-inside form-control"
                              type="text"
                              name="DonarID"
                              value={userData.donorId}
                              placeholder="Donor ID"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="actionheadingdiv">Personal Details</div>
                  <div className="col-12 pr15 mt20">
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <div className="row select-label">
                          <div className="col-12 col-lg-4"> Email ID</div>
                          <div className="col-12 col-lg-8 p0">
                            <input
                              className="form-control-inside form-control"
                              type="text"
                              name="emailId"
                              placeholder="Email ID"
                              value={userData.emailId}
                              // onBlur={handleBlur}
                              onChange={handleChange}
                              disabled
                            />
                            {errors.emailId && (
                              <div className="error-message red-text">
                                {errors.emailId}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="row select-label">
                          <div className="col-12 col-lg-4">Mobile Number<span className="red-text">*</span></div>
                          <div className="col-12 col-lg-8 p0">
                            <input
                              className="form-control-inside form-control"
                              type="text"
                              name="mobileNo"
                              maxLength={10}
                              placeholder="Mobile Number"
                              value={userData.mobileNo}
                              onChange={handleChange}
                            />
                            {errors.mobileNo && (
                              <div className="error-message red-text">
                                {errors.mobileNo}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="row select-label">
                          <div className="col-12 col-lg-4"> Donor Type</div>
                          <div className="col-12 col-lg-8 p0">
                            <select
                              className=" form-control-inside form-select"
                              name="donarType"
                              value={userData.donarType}
                              disabled
                              onChange={handleChange}
                            >
                              <option selected>Donor Type</option>
                              <option value="Corporate">Corporate</option>
                              <option value="Individual">Individual</option>
                            </select>
                            {errors.donarType && (
                              <div className="error-message red-text">
                                {errors.donarType}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="row select-label">
                          <div className="col-12 col-lg-4"> Organisation</div>
                          <div className="col-12 col-lg-8 p0">
                            <input
                              className="form-control-inside form-control"
                              name="organisation"
                              placeholder="Organisation"
                              type="text"
                              value={userData.organisation}
                              onChange={handleChange}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="row select-label">
                          <div className="col-12 col-lg-4">Prefix</div>
                          <div className="col-12 col-lg-8 p0">
                            <select
                              className=" form-control-inside form-select"
                              value={userData.prefix}
                              onChange={handleChange}
                              disabled
                            >
                              <option selected>Prefix</option>
                              <option value="Mr.">Mr.</option>
                              <option value="Mrs.">Mrs.</option>
                              <option value="Ms.">Ms.</option>
                              <option value="Miss.">Miss.</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="row select-label">
                          <div className="col-12 col-lg-4">First Name</div>
                          <div className="col-12 col-lg-8 p0">
                            <input
                              className="form-control-inside form-control"
                              type="text"
                              name="firstName"
                              placeholder="First Name"
                              value={userData.firstName}
                              onChange={handleChange}
                              disabled
                            />
                            {errors.firstName && (
                              <div className="error-message red-text">
                                {errors.firstName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="row select-label">
                          <div className="col-12 col-lg-4">Last Name</div>
                          <div className="col-12 col-lg-8 p0">
                            <input
                              className="form-control-inside form-control"
                              type="text"
                              name="lastName"
                              placeholder="Last Name"
                              value={userData.lastName}
                              onChange={handleChange}
                              disabled
                            />
                            {errors.lastName && (
                              <div className="error-message red-text">
                                {errors.lastName}
                              </div>
                            )}
                          </div>
                        </div>{" "}
                      </div>

                      <div id="pan" className="col-12 col-lg-6" style={{display:"block"}}>
                        <div className="row select-label">
                          <div className="col-12 col-lg-4">PAN card</div>
                          <div className="col-12 col-lg-8 p0">
                            <input
                              className="form-control-inside form-control"
                              placeholder="PAN card No."
                              name="panCard"
                              type="text"
                              value={userData.panCard}
                              onChange={handleChange}
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      <div id="aadhaar" className="col-12 col-lg-6" style={{display:"none"}}>
                        <div className="row select-label">
                          <div className="col-12 col-lg-4">AADHAAR Card</div>
                          <div className="col-12 col-lg-8 p0">
                            <input
                              className="form-control-inside form-control"
                              placeholder="AADHAAR Card Number"
                              name="aadharCard"
                              type="text"
                              value={userData.aadharCard}
                              onChange={handleChange}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="actionheadingdiv">Address</div>
                  <div className="col-12 pr15 mt20">
                    {addressData.map((addr, index) => {
                      return (
                        <div key={index} className="row">
                          <div className="col-12 col-lg-6">
                            <div className="row select-label">
                              <div className="col-12 col-lg-4"> Street 1 <span className="red-text">*</span></div>
                              <div className="col-12 col-lg-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="street1"
                                  placeholder=" Street 1"
                                  type="text"
                                  value={addr.street1}
                                  onChange={(event) =>
                                    handleAddressChange(event, index)
                                  }
                                />
                                {errors.street1 && (
                                  <div className="error-message red-text">
                                    {errors.street1}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="row select-label">
                              <div className="col-12 col-lg-4"> Street 2</div>
                              <div className="col-12 col-lg-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="street2"
                                  placeholder="Street 2"
                                  type="text"
                                  value={addr.street2}
                                  onChange={(event) =>
                                    handleAddressChange(event, index)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="row select-label">
                              <div className="col-12 col-lg-4"> Street 3</div>
                              <div className="col-12 col-lg-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="street3"
                                  placeholder="Street 3"
                                  type="text"
                                  value={addr.street3}
                                  onChange={(event) =>
                                    handleAddressChange(event, index)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="row select-label">
                              <div className="col-12 col-lg-4 ">Country<span className="red-text">*</span></div>
                              <div className="col-12 col-lg-8 p0">
                                <select
                                  className="form-control-inside form-select"
                                  name="country"
                                  placeholder="Country"
                                  type="text"
                                  value={addr.country}
                                  onChange={(event) =>
                                    handleAddressChange(event, index)
                                  }
                                >
                                  <option disabled selected value="">
                                    Select Country
                                  </option>
                                  {countries.map((country) => {
                                    return (
                                      <option
                                        key={country}
                                        value={country.countryName}
                                      >
                                        {country.countryName}
                                      </option>
                                    );
                                  })}
                                </select>
                                {errors.country && (
                                  <div className="error-message red-text">
                                    {errors.country}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="row select-label">
                              <div className="col-12 col-lg-4 "> State <span className="red-text">*</span> </div>
                              <div className="col-12 col-lg-8 p0">
                                {states?.length === 0 ? (
                                  <input
                                    type="text"
                                    className=" form-control-inside form-control"
                                    name="state"
                                    value={addr.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, index)
                                    }
                                    placeholder="state"
                                  />
                                ) : (
                                  <select
                                    className="form-control-inside form-select"
                                    name="state"
                                    value={addr.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, index)
                                    }
                                  >
                                    <option disabled selected value="">
                                      Select State
                                    </option>
                                    {states.map((state) => (
                                      <option
                                        key={state}
                                        value={state.stateName}
                                      >
                                        {state.stateName}
                                      </option>
                                    ))}
                                  </select>
                                )}

                                {errors.state && (
                                  <div className="error-message red-text">
                                    {errors.state}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-lg-6">
                            <div className="row select-label">
                              <div className="col-12 col-lg-4">City</div>
                              <div className="col-12 col-lg-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="city"
                                  placeholder="City"
                                  type="text"
                                  value={addr.city}
                                  onChange={(event) =>
                                    handleAddressChange(event, index)
                                  }
                                />
                                {errors.city && (
                                  <div className="error-message red-text">
                                    {errors.city}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="row select-label">
                              <div className="col-12 col-lg-4">Postal Code<span className="red-text">*</span></div>
                              <div className="col-12 col-lg-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="postalCode"
                                  placeholder="Postal Code"
                                  type="text"
                                  value={addr.postalCode}
                                  onChange={(event) =>
                                    handleAddressChange(event, index)
                                  }
                                />
                                {errors.postalCode && (
                                  <div className="error-message red-text">
                                    {errors.postalCode}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <hr />
                          <PrivacyPolicy
                            informationShare={informationShare}
                            setInformationShare={setInformationShare}
                            privacyPolicy={privacyPolicy}
                            setPrivacyPolicy={setPrivacyPolicy}
                            handleShowConditions={handleShowConditions}
                            handleCloseConditions1={handleCloseConditions1}
                            isDisabled
                          />
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="submit"
                    className="mt20 mr10 webform-button--submit"
                    onClick={(e) => updateUser(e, email, userData, addressData)}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TermsConditionsPopup
        showConditons={showConditons}
        handleCloseConditions={handleCloseConditions}
      />
      <PrivacyPolicyPopup
        showConditons1={showConditons1}
        handleCloseConditions1={handleShowConditions1}
      />
      {/* body */}
    </>
  );
}

export default UserUpdate;
