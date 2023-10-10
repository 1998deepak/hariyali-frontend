import React from "react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SUCCESS } from "../../../constants/constants";
import { DonationService } from "../../../../services/donationService/donation.service";
import { useParams, Link } from "react-router-dom";
import Loader from "../../../common/loader/Loader";

function OfflineDonationEdit() {
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
  const [userData, setUserData] = useState(initialUserData);

  const [addressData, setAddressData] = useState(initialAddress);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const id = useParams().id;
  const [data, setData] = useState([]);
  const [emailData, setEmailData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // getUser Details
  const getUserDetails = async (id) => {
    try {
      console.log(id);
      setLoading(true);
      const response = await DonationService.getUserDetails(id);
      console.log(id);
      console.log(response?.data?.donorId);

      if (response?.data) {
        console.log(response.data.address);
        console.log(response.data);
        // const addressData = response.data.address[0];
        setUserData(response.data);
        setAddressData(response.data.address);

        setEmailData(response.data.emailId);
        getStatesByCountry(response.data.address.country);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(userData);
  console.log(emailData);
  useEffect(() => {
    console.log(id);
    if (id) {
      getUserDetails(id);
    }
    getCountryList();
  }, [id]);

  useEffect(() => {
    if (countries.length>0) {
      let country = countries.find((item) => item.countryName === addressData[0].country);
      getStatesByCountry(country.countryCode)  
    }
  }, [addressData[0].country && countries]);

  const [errors, setErrors] = useState({});

  const validateFields = (userData, addressData) => {
    const errors = {};
    // console.log(addressData && addressData.length > 0 ? addressData[0].city : null);
    console.log(userData);

    // Validate emailId
    if (!userData.emailId) {
      errors.emailId = "Email ID is required";
    } else if (
      !/^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\.([a-zA-Z]{2,5})$/.test(
        userData.emailId
      )
    ) {
      errors.emailId = "Enter a Valid Email Address";
    }

    // Validate mobileNo
    if (!userData.mobileNo) {
      errors.mobileNo = "Mobile No. is required";
    } else if (!/^[0-9]{10}$/.test(userData.mobileNo)) {
      errors.mobileNo = "Mobile No. must contain only digits";
    }

    // Validate donarType
    if (!userData.donarType || userData.donarType === "Donor Type") {
      errors.donarType = "Please select a Donor Type";
    }
    console.log(userData.donarType);

    if (!userData.organisation) {
      errors.organisation = "Please Enter a organisation";
    }

    if (!userData.prefix) {
      errors.organisation = "Please select a prefix";
    }

    if (!userData.firstName) {
      errors.firstName = "First Name is required";
    } else if (!/^[A-Za-z]+$/.test(userData.firstName)) {
      errors.firstName = "First Name is invalid";
    }

    if (!userData.lastName) {
      errors.lastName = "Last Name is required";
    } else if (!/^[A-Za-z]+$/.test(userData.lastName)) {
      errors.lastName = "Last Name is invalid";
    }

    // Add validation for other fields here
    console.log(errors.donarType);

    // validation for address field
    if (addressData && addressData.length > 0) {
      const firstAddress = addressData[0];
      console.log(firstAddress);

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
      if (!firstAddress.city) {
        errors.city = "City is required";
      }
      if (firstAddress.country === "INDIA") {
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
  console.log(errors.city);

  console.log(errors);

  // Update user Data
  const updateUser = async (e, emailID, userData, addressData) => {
    try {
      e.preventDefault();
      console.log(addressData[0].street1);
      // Perform validation for userData
      const userErrors = validateFields(userData);
      console.log(userErrors);
      // Perform validation for addressData
      const addressErrors = validateFields(userData, addressData || []);
      console.log(addressErrors);
      // Merge the validation errors for both userData and addressData
      const errors = { ...userErrors, ...addressErrors };
      console.log(errors);
      // Check if there are any validation errors
      if (Object.keys(errors).length > 0) {
        // Handle validation errors, e.g., display error messages
        console.log(errors);
        return;
      }
      console.log(emailID);
      console.log(userData);

      const formData = {
        formData: {
          user: userData,
        },
      };

      console.log(formData);
      formData.formData.user.address = addressData;
      console.log(formData);

      Object.keys(data).forEach((key) => {
        if (key !== "address") {
          formData.formData.user[key] = data[key];
        }
      });

      setLoading(true);
      const response = await DonationService.updateUser(
        emailID,
        formData.formData.user
      );
      console.log(response);

      if (response?.status === "Success") {
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
      console.log(updatedAddress[index]);
      return updatedAddress;
    });
    if (data) {
      addressData[0].state = "";
      getStatesByCountry(data.countryCode);
    }
  };

  const getStatesByCountry = async (countryId) => {
    setLoading(true);
    const response = await DonationService.getAllStatesByCountry(countryId);
    console.log("get states", response.data);
    if (response?.status === 200) {
      setLoading(false);
      if (response?.data.length > 0) {
        setStates(response.data);
      } else {
        setStates([]);
      }
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  // handle Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...userData };
    console.log(updatedFormData);
    const keys = name.split(".");
    console.log(keys);
    let currentField = updatedFormData;
    for (let i = 0; i < keys.length - 1; i++) {
      currentField = currentField[keys[i]];
    }
    console.log(currentField);
    currentField[keys[keys.length - 1]] = value;
    console.log(updatedFormData);
    setUserData(updatedFormData);
  };
  console.log(data.address);

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <div className="bggray">
        <div className="col-12 admin-maindiv">
          <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
            <h5>OFFLINE DONATION UPDATE</h5>
            <div className="col-12 pr0 contact-form-wrap">
              {" "}
              <div className="row">
                <form className="form-div contact-form-wrap">
                  <div className="col-12 pr15 mt20">
                    <div className="row">
                      <div className="col-6">
                        <div className="row select-label">
                          <div className="col-4 "> Donor ID</div>
                          <div className="col-8 p0">
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
                      <div className="col-6">
                        <div className="row select-label">
                          <div className="col-4 ">
                            {" "}
                            Email ID <span className="red-text">*</span>
                          </div>
                          <div className="col-8 p0">
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
                      <div className="col-6">
                        <div className="row select-label">
                          <div className="col-4 ">
                            Mobile No. <span className="red-text">*</span>
                          </div>
                          <div className="col-8 p0">
                            <input
                              className="form-control-inside form-control"
                              type="text"
                              name="mobileNo"
                              placeholder="Mobile No."
                              maxLength={10}
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
                      <div className="col-6">
                        <div className="row select-label">
                          <div className="col-4 ">
                            {" "}
                            Donor Type <span className="red-text">*</span>
                          </div>
                          <div className="col-8 p0">
                            <select
                              className=" form-control-inside form-select"
                              name="donarType"
                              value={userData.donarType}
                              onChange={handleChange}
                              disabled
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
                      <div className="col-6">
                        <div className="row select-label">
                          <div className="col-4 "> Organisation</div>
                          <div className="col-8 p0">
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
                      <div className="col-6">
                        <div className="row select-label">
                          <div className="col-4 ">Prefix</div>
                          <div className="col-8 p0">
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
                      <div className="col-6">
                        <div className="row select-label">
                          <div className="col-4 ">
                            First Name <span className="red-text">*</span>
                          </div>
                          <div className="col-8 p0">
                            <input
                              className="form-control-inside form-control"
                              type="text"
                              name="firstName"
                              placeholder="First Name"
                              value={userData.firstName}
                              onChange={handleChange}
                            />
                            {errors.firstName && (
                              <div className="error-message red-text">
                                {errors.firstName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row select-label">
                          <div className="col-4 ">
                            Last Name <span className="red-text">*</span>
                          </div>
                          <div className="col-8 p0">
                            <input
                              className="form-control-inside form-control"
                              type="text"
                              name="lastName"
                              placeholder="Last Name"
                              value={userData.lastName}
                              onChange={handleChange}
                            />
                            {errors.lastName && (
                              <div className="error-message red-text">
                                {errors.lastName}
                              </div>
                            )}
                          </div>
                        </div>{" "}
                      </div>

                      <div className="col-6">
                        <div className="row select-label">
                          <div className="col-4 ">PAN card</div>
                          <div className="col-8 p0">
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
                    </div>
                  </div>
                  <hr />
                  <div className="actionheadingdiv">Address</div>
                  <div className="col-12 pr15 mt20">
                    {addressData.map((addr, index) => {
                      return (
                        <div key={index} className="row">
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 ">
                                {" "}
                                Street 1 <span className="red-text">*</span>
                              </div>
                              <div className="col-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="street1"
                                  placeholder=" Street 1"
                                  type="text"
                                  value={addr.street1}
                                  onChange={(event) =>
                                    handleAddressChange(event, index)
                                  }
                                  disabled
                                />
                                {errors.street1 && (
                                  <div className="error-message red-text">
                                    {errors.street1}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 "> Street 2</div>
                              <div className="col-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="street2"
                                  placeholder="Street 2"
                                  type="text"
                                  value={addr.street2}
                                  onChange={(event) =>
                                    handleAddressChange(event, index)
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 "> Street 3</div>
                              <div className="col-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="street3"
                                  placeholder="Street 3"
                                  type="text"
                                  value={addr.street3}
                                  onChange={(event) =>
                                    handleAddressChange(event, index)
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 ">
                                Country <span className="red-text">*</span>
                              </div>
                              <div className="col-8 p0">
                                {/* <input
                                  className="form-control-inside form-control"
                                  name="country"
                                  placeholder="Country"
                                  type="text"
                                  value={addr.country}
                                  onChange={(event) => handleAddressChange(event, index)}
                                /> */}
                                <select
                                  className=" form-control-inside form-select"
                                  name="country"
                                  id="country"
                                  value={addr.country}
                                  onChange={(event) =>
                                    handleAddressChange(event, index)
                                  }
                                  disabled
                                >
                                  <option disabled selected value="">
                                    Select Country
                                  </option>
                                  {countries.map((country) => {
                                    return (
                                      <option value={country.countryName}>
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
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 ">
                                State <span className="red-text">*</span>
                              </div>
                              <div className="col-8 p0">
                                {states.length > 0 ? (
                                  <select
                                    className=" form-control-inside form-select form-control"
                                    id="state"
                                    name="state"
                                    value={addr.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, index)
                                    }
                                    disabled
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
                                ) : (
                                  <input
                                    className="form-control-inside form-control"
                                    name="state"
                                    placeholder="State"
                                    type="text"
                                    value={addr.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, index)
                                    }
                                    disabled
                                  />
                                )}
                                {errors.state && (
                                  <div className="error-message red-text">
                                    {errors.state}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 ">
                                City <span className="red-text">*</span>
                              </div>
                              <div className="col-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="city"
                                  placeholder="City"
                                  type="text"
                                  value={addr.city}
                                  onChange={(event) =>
                                    handleAddressChange(event, index)
                                  }
                                  disabled
                                />
                                {errors.city && (
                                  <div className="error-message red-text">
                                    {errors.city}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 ">
                                Postal Code <span className="red-text">*</span>
                              </div>
                              <div className="col-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="postalCode"
                                  placeholder="Postal Code"
                                  type="text"
                                  maxLength={
                                    addr.country === "INDIA" ? "6" : "5"
                                  }
                                  value={addr.postalCode}
                                  onChange={(event) =>
                                    handleAddressChange(event, index)
                                  }
                                  disabled
                                />
                                {errors.postalCode && (
                                  <div className="error-message red-text">
                                    {errors.postalCode}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="submit"
                    className="mt20 mr10 webform-button--submit"
                    onClick={(e) =>
                      updateUser(e, emailData, userData, addressData)
                    }
                  >
                    Update
                  </button>
                  {/* <button
                    type="submit"
                    className="mt20 mr10 webform-button--cancel "
                    
                  >
                    
                    Back
                  </button> */}
                  <div className="col-auto">
                    <Link to="/donarCreation">
                      <button className="mt20 mr10 webform-button--cancel">
                        Back
                      </button>
                    </Link>
                  </div>

                  {/* <button
                    type="submit"
                    className="mt20 mr10 webform-button--cancel "
                  // onClick={clearForm}
                  >
                    Clear
                  </button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default OfflineDonationEdit;
