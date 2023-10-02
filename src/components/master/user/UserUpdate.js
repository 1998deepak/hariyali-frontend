import React,{ useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DonationService } from "../../../services/donationService/donation.service";
import { SUCCESS, stateOptions } from "../../constants/constants";
import { UserService } from "../../../services/userService/user.service";
import Loader from "../../common/loader/Loader";
import PrivacyPolicy from "../../common/PrivacyPolicy";

function UserUpdate() {

  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [informationShare, setInformationShare] = useState(false);
  const [showConditons, setShowConditons] = useState(false);
  // Initial Data for user
  const initialUserData = {
    user: {
      firstName: '',
      lastName: '',
      mobileNo: '',
      emailId: '',
      donarType: '',
      prefix: '',
      organisation: '',
      isTaxBenefit: false,
      panCard: '',
      activityType: null,
      address: null,
    },
  };

  // Initial data for address
  const initialAddress = [{
    street1: "",
    street2: "",
    street3: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  }];

//states to store data
const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [errors, setErrors] = useState({});
  const [addressData, setAddressData] = useState(initialAddress);
  const { email } = UserService.userDetails();

  // getUser Details
  const getUserDetails = async (id) => {
    try {
      setLoading(true)
      const response = await DonationService.getUserDetails(id);
      if (response?.data) {
        setUserData(response.data);
        setAddressData(response.data.address);
        setInformationShare(response.data.campaignConsent);
        setPrivacyPolicy(response.data.dataConsent)
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //calling api
  useEffect(() => {
    if (email) {
      getUserDetails(email);
    }
  }, [email]);

  //validate form
  const validateFields = (userData,addressData) => {
    const errors = {};
    // Validate emailId
    if (!userData.emailId) {
      errors.emailId = "Email ID is required";
    }
    else if (
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
    if (!userData.donarType || userData.donarType === "Donor Type"){
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
   const addressErrors =  validateFields(userData, addressData||[]);
   // Merge the validation errors for both userData and addressData
   const errors = { ...userErrors,...addressErrors};
   console.log(errors);
    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      // Handle validation errors, e.g., display error messages
      console.log(errors);
      return;
    }
      const formData = {
        formData: {
          user: userData,
        },
      };
  
      formData.formData.user.address = addressData;
      setLoading(true);
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
    setAddressData((prevAddress) => {
      const updatedAddress = [...prevAddress];
      updatedAddress[index] = {
        ...updatedAddress[index],
        [name]: value,
      };
      return updatedAddress;
    });
  };

  // handle Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...userData };
    const keys = name.split('.');
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

  return (
    <>
      <ToastContainer />
      {loading && <Loader/>}
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
                            {errors.emailId && <div className="error-message red-text">{errors.emailId}</div>}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="row select-label">
                          <div className="col-12 col-lg-4">Mobile No.</div>
                          <div className="col-12 col-lg-8 p0">
                            <input
                              className="form-control-inside form-control"
                              type="text"
                              name="mobileNo"
                              placeholder="Mobile No."
                              value={userData.mobileNo}
                              onChange={handleChange}
                            />
                             {errors.mobileNo && <div className="error-message red-text">{errors.mobileNo}</div>}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="row select-label">
                          <div className="col-12 col-lg-4"> Donor Type</div>
                          <div className="col-12 col-lg-8 p0">
                            <select className=" form-control-inside form-select"
                              name="donarType"
                              value={userData.donarType}
                            disabled
                              onChange={handleChange}>
                              <option selected>Donor Type</option>
                              <option value="Corporate">Corporate</option>
                              <option value="Individual">Individual</option>
                            </select>
                            {errors.donarType && <div className="error-message red-text">{errors.donarType}</div>}
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
                            <select className=" form-control-inside form-select"
                              value={userData.prefix}
                              onChange={handleChange}
                              disabled
                              >
                              <option selected>Prefix</option>
                              <option value="Mr.">Mr.</option>
                              <option value="Mrs.">Mrs.</option>
                              <option value="Ms.">Ms.</option>
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
                            {errors.firstName && <div className="error-message red-text">{errors.firstName}</div>}
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
                             {errors.lastName && <div className="error-message red-text">{errors.lastName}</div>}
                          </div>
                        </div>{" "}
                      </div>

                      <div className="col-12 col-lg-6">
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
                    </div>
                  </div>
                  <hr />
                  <div className="actionheadingdiv">Address</div>
                  <div className="col-12 pr15 mt20">
                    {
                      addressData.map((addr, index) => {
                        return <div key={index} className="row">
                          <div className="col-12 col-lg-6">
                            <div className="row select-label">
                              <div className="col-12 col-lg-4"> Street 1</div>
                              <div className="col-12 col-lg-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="street1"
                                  placeholder=" Street 1"
                                  type="text"
                                  value={addr.street1}
                                  onChange={(event) => handleAddressChange(event, index)}
                                />
                                 {errors.street1 && <div className="error-message red-text">{errors.street1}</div>}
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
                                  onChange={(event) => handleAddressChange(event, index)}
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
                                  onChange={(event) => handleAddressChange(event, index)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="row select-label">
                              <div className="col-12 col-lg-4">Country</div>
                              <div className="col-12 col-lg-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="country"
                                  placeholder="Country"
                                  type="text"
                                  value={addr.country}
                                  onChange={(event) => handleAddressChange(event, index)}
                                />
                                 {errors.country && <div className="error-message red-text">{errors.country}</div>}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="row select-label">
                              <div className="col-12 col-lg-4">State</div>
                              <div className="col-12 col-lg-8 p0">
                                <select
                                  className=" form-control-inside form-select"
                                  name="state"
                                  value={addr.state}
                                  onChange={(event) => handleAddressChange(event, index)}
                                >
                                  <option value="">Select State</option>
                                  {stateOptions.map((state) => (
                                    <option key={state} value={state}>
                                      {state}
                                    </option>
                                  ))}
                                </select>
                                {errors.state && <div className="error-message red-text">{errors.state}</div>}
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
                                  onChange={(event) => handleAddressChange(event, index)}
                                />
                                 {errors.city && <div className="error-message red-text">{errors.city}</div>}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="row select-label">
                              <div className="col-12 col-lg-4">Postal Code</div>
                              <div className="col-12 col-lg-8 p0">
                                <input
                                  className="form-control-inside form-control"
                                  name="postalCode"
                                  placeholder="Postal Code"
                                  type="text"
                                  value={addr.postalCode}
                                  onChange={(event) => handleAddressChange(event, index)}

                                />
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
                          isDisabled
                        />
                        </div>
                      })
                    }

                  </div>
                  <button
                    type="submit"
                    className="mt20 mr10 webform-button--submit"
                    onClick={(e) => updateUser(e, email, userData, addressData)}
                  >
                    Update
                  </button>
                </form>
              </div></div></div></div>
      </div>
      {/* body */}

    </>
  );
}

export default UserUpdate;
