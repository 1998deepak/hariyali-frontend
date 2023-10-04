import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Tab, Tabs } from "react-bootstrap";

import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
import { DonationService } from "../../../../services/donationService/donation.service";
import { SUCCESS } from "../../../constants/constants";

function OfflineDonation() {
  const [donationType, setDonationType] = useState("Self Donate");
  const [generalDonation, setGeneralDonation] = useState(null);
  const initialPackageData = [
    {
      packageName: '',
      bouquetPrice: '',
      noOfBouquets: '',
      maintenanceCost: '',
      amount: '',
    },
    {
      packageName: '',
      bouquetPrice: '',
      noOfBouquets: '',
      maintenanceCost: '',
      amount: '',
    },
    {
      packageName: '',
      bouquetPrice: '',
      noOfBouquets: '',
      maintenanceCost: '',
      amount: '',
    },
    {
      packageName: '',
      bouquetPrice: '',
      noOfBouquets: '',
      maintenanceCost: '',
      amount: '',
    },
  ];

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
      donations: null,
    },
  };
  const initialAddress = [{
    street1: "",
    street2: "",
    street3: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  }];
  const intialDonations = [
    {
      donationType: '',
      donationMode: 'offline',
      donationEvent: '',
      totalAmount: 0,
      generalDonation: null,
      userPackage: [],
      recipient: [],
      paymentInfo: [{
        paymentMode: '',
        bankName: '',
        chqORddNo: '',
        chqORddDate: '',
        paymentDate: '',
        amount: 0,
      }],
    },
  ];
  const initialRecipientData = [
    {
      firstName: '',
      lastName: '',
      mobileNo: '',
      emailID: '',
      address: [
        {
          street1: '',
          street2: '',
          street3: '',
          country: '',
          state: '',
          city: '',
          postalCode: '',
        },
      ],
    },
  ];
  const [packageData, setPackageData] = useState(initialPackageData);

  const [userData, setUserData] = useState(initialUserData);

  const [address, setAddress] = useState(initialAddress);

  const [donations, setDonations] = useState(intialDonations);

  const [recipient, setRecipient] = useState(initialRecipientData);
  const userAdd = async (e) => {
    e.preventDefault();
    console.log(donationType);
    let updatedUserPackage = [];
    packageData.map((item) => {
      if (item.noOfBouquets && item.amount) {
        updatedUserPackage.push(item)
      }
    })
    const formData = {
      formData: {
        user: userData?.user,
      },
    };
    formData.formData.user.donations = donations;

    //setting Donation event
    formData.formData.user.donations[0].donationType = donationType;

    //Setting Address array
    formData.formData.user.address = address;

    //Setting user Package array  

    if (!formData.formData.user.donations[0].generalDonation || formData.formData.user.donations[0].generalDonation < 0) {
      formData.formData.user.donations[0].userPackage = updatedUserPackage;
    } else {
      formData.formData.user.donations[0].userPackage = [];
    }

    //setting recipent data
    formData.formData.user.donations[0].recipient = recipient;

    // Send the form data as JSON
    console.log(formData);
    console.log(JSON.stringify(formData));

    console.log(formData);
    const response = await DonationService.Adduser(formData);
    console.log(response);
    if (response?.status === SUCCESS) {

      toast.success(response?.message);

      setTimeout(() => {
        // navigate("/ModelView");
      }, 2000);
      clearForm(e);

    } else {
      toast.error(response?.message);
    }
  };
  useEffect(() => {
    getAllPackages();

  }, []);
  const getAllPackages = async () => {
    const response = await DonationService.getAllPackages();
    if (response?.status === SUCCESS) {
      console.log(response);
      let packageData = [...initialPackageData];
      console.log(packageData);
      response.data.map((item, index) => {
        packageData[index].packageName = item.packageName;
        packageData[index].bouquetPrice = item.bouquetPrice;
        packageData[index].noOfBouquets = 0;
        packageData[index].maintenanceCost = item.maintenanceCost;
        packageData[index].amount = 0;
      })
      console.log(packageData);
      setPackageData(packageData);

    } else {
      toast.error(response?.message);
    }
  };
  console.log(packageData);

  const stateOptions = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
  ];
  const clearForm = (e) => {
    e.preventDefault();

    setPackageData((current) => {
      return current.map((item) => {
        return { ...item, noOfBouquets: '', amount: '' }
      })
    });
   
    setAddress(initialAddress);
    setDonationType("");
    setGeneralDonation(null);
  };
  const handleTabSelect = (eventKey) => {
    console.log(eventKey);
    setDonationType(eventKey);
  };
  const handleChangeNumberOfBouquets = (e, row, rowIndex) => {
    let { name, value } = e.target;
    console.log({ name, value, rowIndex }, row);
    let userPackageData = packageData;
    userPackageData[rowIndex][name] = value;

    const totalCost = (row.bouquetPrice + row.maintenanceCost) * row.noOfBouquets;
    userPackageData[rowIndex]["amount"] = totalCost;
    setPackageData(userPackageData);
    calculateOverallTotal();
    console.log(userPackageData);
  };

  const calculateOverallTotal = () => {
    const totalAmountOfPackage = packageData.reduce((accumulator, packageItem, index) => {
      return accumulator + (packageItem.bouquetPrice + packageItem.maintenanceCost) * packageItem.noOfBouquets;
    }, 0);
    const updatedDonations = [...donations];
    updatedDonations[0]["totalAmount"] = totalAmountOfPackage;
    setDonations(updatedDonations);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...userData };
    console.log(updatedFormData);
    const keys = name.split('.');
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
  //Handle address change
  const handleAddressChange = (event, index) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => {
      const updatedAddress = [...prevAddress];
      updatedAddress[index] = {
        ...updatedAddress[index],
        [name]: value,
      };
      console.log(updatedAddress[index]);
      return updatedAddress;
    });
  };
  //Handle Donations
  const handleDonationChange = (e, index) => {
    console.log(e);
    const { name, value } = e.target;
    const updatedDonations = [...donations];
    if (name === "donationEvent") {
      console.log(name);
      updatedDonations[index][name] = value;
    }
    if (name === "generalDonation") {
      updatedDonations[index][name] = value > 0 ? value : null;
      updatedDonations[0]["totalAmount"] = null;
    }
    setDonations(updatedDonations);
  };
  const handleRecipentChange = (event, index) => {
    const { name, value } = event.target;
    console.log(name);
    setRecipient((prevAddress) => {
      const updatedAddress = [...prevAddress];
      updatedAddress[index] = {
        ...updatedAddress[index],
        [name]: value,
      };
      console.log(updatedAddress[index]);
      return updatedAddress;
    });
  };
  const handleRecipentAddressChange = (event, index) => {
    const { name, value } = event.target;
      const updatedAddress = [...recipient];
    console.log(updatedAddress);
      updatedAddress[index].address[index][name] = value;
      console.log(updatedAddress[index]);
      console.log(updatedAddress);
      setRecipient(updatedAddress)
      return updatedAddress;
  };
  const handlePaymentInfoChange = (e, donationIndex) => {
    let { name, value } = e.target;
    if (value < 0) {
      value = 0;
    }
    const updatedDonations = [...donations];
    console.log(updatedDonations);
    updatedDonations[donationIndex].paymentInfo[donationIndex][name] = value;
    console.log(updatedDonations);
    setDonations(updatedDonations);

  };
  return (
    <>
      <ToastContainer />
      <Tabs
        // defaultActiveKey="NewDonor"
        id="uncontrolled-tab-example"
        className="newexti-tab"
      >
        <Tab eventKey="NewDonor" title="New Donor">
        <div className="bggray">
        <div className="col-12 admin-maindiv">
          <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
                <div className="col-12 contact-form-wrap">
                  <Tabs
                    // defaultActiveKey="selfDonate"
                    id="uncontrolled-tab-example"
                    className="mb-3 selftGift-tab "
                    onClick={() => handleTabSelect()}
                    // activeKey={donationType} onSelect={handleTabSelect}
                  >
                    <Tab eventKey="Self Donate" title="Self Donate">
                      <h5>Self Planting</h5>

                      <form
                        className="form-div contact-form-wrap"
                      >
                        <div className="actionheadingdiv">
                          Select Your Donation Plan
                        </div>
                        <div className="mt20">
                          <table>
                            <thead>
                              <tr>
                                <th>Package Name</th>
                                <th>Bouquet Price</th>
                                <th>Maintenance Cost</th>
                                <th className="w200">Number of Bouquets</th>
                                <th>Total Cost</th>
                              </tr>
                            </thead>
                            <tbody>
                              {packageData.map((packageItem, index) => {
                                console.log(index);
                                return <tr key={index}>
                                  <td>{packageItem.packageName}</td>
                                  <td>{packageItem.bouquetPrice}</td>
                                  <td>{packageItem.maintenanceCost}</td>
                                  <td>
                                    <input
                                      type="number"
                                      name="noOfBouquets"
                                      value={packageItem.noOfBouquets}
                                      onChange={(event) => {
                                        if (event.target.value < 0) {
                                          event.target.value = 0;
                                        }
                                        handleChangeNumberOfBouquets(event, packageItem, index)
                                      }
                                      }

                                    />
                                  </td>
                                  <td>{packageItem.amount}</td>
                                </tr>
                              })}
                            </tbody>
                          </table>
                          <div className="overalltotal">Overall Total: {donations[0].totalAmount}</div>
                        </div>
                        <div className="col-6 mt20">
                          <div className="row select-label">
                            <div className="col-4 "> General Donation</div>
                            <div className="col-8 p0"><input
                              placeholder=" General Donation"
                              className="form-control-inside"
                              type="number"
                              name="generalDonation"
                              value={generalDonation}
                              onChange={(e) => {
                                if (e.target.value < 0) {
                                  e.target.value = 0;
                                }
                                handleDonationChange(e, 0)
                              }}
                            /></div>
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Personal Details</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Email ID</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.emailId"
                                    placeholder="Email ID"
                                    value={userData.user.emailId}
                                    // onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Mobile No.</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.mobileNo"
                                    placeholder="Mobile No."
                                    value={userData.user.mobileNo}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Donor Type</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select"
                                    name="user.donarType"
                                    value={userData.user.donarType}
                                    onChange={handleChange}>
                                    <option selected>Donor Type</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Individual">Individual</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Organisation</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="user.organisation"
                                    placeholder="Organisation"
                                    type="text"
                                    value={userData.user.organisation}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Prefix</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select"
                                    name="user.prefix"
                                    value={userData.user.prefix}
                                    onChange={handleChange}>
                                    <option selected>Prefix</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">First Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.firstName"
                                    placeholder="First Name"
                                    value={userData.user.firstName}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Last Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.lastName"
                                    placeholder="Last Name"
                                    value={userData.user.lastName}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>{" "}
                            </div>

                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">PAN card</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="user.panCard"
                                    placeholder="PAN card No."
                                    type="text"
                                    value={userData.user.panCard}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <label className="col-4 ">I want to opt</label>
                                <div className="col-8 p0">
                                  <input
                                    type="radio"
                                    name="user.activityType"
                                    value="CSR Activity"
                                    onClick={handleChange}
                                    className="radioinput"
                                  />
                                  <label className="radiospan" checked>
                                    CSR Activity
                                  </label>
                                  <input
                                    type="radio"
                                    name="user.activityType"
                                    value="NON-CSR Activity"
                                    onClick={handleChange}
                                    className="radioinput"
                                  />
                                  <label className="radiospan">
                                    NON-CSR Activity
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Address</div>
                        <div className="col-12 pr15 mt20">
                            {
                              address.map((addr, index) => {
                                return <div key={index}  className="row">
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 "> Street 1</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="street1"
                                          placeholder=" Street 1"
                                          type="text"
                                          value={addr.street1}
                                          onChange={(event) => handleAddressChange(event, index)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 "> Street 2</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="street2"
                                          placeholder="Street 2"
                                          type="text"
                                          value={addr.street2}
                                          onChange={(event) => handleAddressChange(event, index)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 "> Street 3</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="street3"
                                          placeholder="Street 3"
                                          type="text"
                                          value={addr.street3}
                                          onChange={(event) => handleAddressChange(event, index)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 ">Country</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="country"
                                          placeholder="Country"
                                          type="text"
                                          value={addr.country}
                                          onChange={(event) => handleAddressChange(event, index)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 ">State</div>
                                      <div className="col-8 p0">
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
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 ">City</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="city"
                                          placeholder="City"
                                          type="text"
                                          value={addr.city}
                                          onChange={(event) => handleAddressChange(event, index)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 ">Postal Code</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="postalCode"
                                          placeholder="Postal Code"
                                          type="text"
                                          value={addr.postalCode}
                                          onChange={(event) => handleAddressChange(event, index)}

                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              })
                            }

                        </div>
                        <hr />
                        <div className="actionheadingdiv">Mode of Payment</div>
                        <div className="col-12 pr15 mt20">
                            {donations.map((donation, index) => {
                              return <div key={index}  className="row">
                                <div className="col-6">
                                  <div className="row select-label">
                                    <div className="col-4 "> Select Mode</div>
                                    <div className="col-8 p0">
                                      <select name="paymentMode" className=" form-control-inside form-select" value={donation.paymentInfo.paymentMode}
                                        onChange={(event) => handlePaymentInfoChange(event, index)}>
                                        <option selected>Donor Type</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Cash">Cash</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="row select-label">
                                    <div className="col-4 "> Bank Name</div>
                                    <div className="col-8 p0">
                                      <input
                                        className="form-control-inside"
                                        name="bankName"
                                        placeholder="Bank Name"
                                        type="text"
                                        value={donation?.paymentInfo?.bankName}
                                        onChange={(event) => handlePaymentInfoChange(event, index)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="row select-label">
                                    <div className="col-4 "> Chq/DD No.</div>
                                    <div className="col-8 p0">
                                      <input
                                        className="form-control-inside"
                                        name="chqORddNo"
                                        placeholder="Chq/DD No."
                                        type="text"
                                        value={donation?.paymentInfo?.chqORddNo}
                                        onChange={(event) => handlePaymentInfoChange(event, index)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="row select-label">
                                    <div className="col-4 ">Chq/DD Date</div>
                                    <div className="col-8 p0">
                                      <input
                                        className="form-control-inside"
                                        name="chqORddDate"
                                        placeholder="Chq/DD Date"
                                        type="date"
                                        value={donation?.paymentInfo?.chqORddDate}
                                        onChange={(event) => handlePaymentInfoChange(event, index)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="row select-label">
                                    <div className="col-4 ">Payment Date</div>
                                    <div className="col-8 p0">
                                      <input
                                        className="form-control-inside"
                                        name="paymentDate"
                                        placeholder="Payment Date"
                                        type="date"
                                        value={donation?.paymentInfo?.paymentDate}
                                        onChange={(event) => handlePaymentInfoChange(event, index)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="row select-label">
                                    <div className="col-4 ">Amount</div>
                                    <div className="col-8 p0">
                                      <input
                                        className="form-control-inside"
                                        name="amount"
                                        placeholder="Amount"
                                        type="number"
                                        value={donation?.paymentInfo?.amount}
                                        onChange={(event) => {
                                          if (event.target.value < 0) {
                                            event.target.value = 0;
                                          }
                                          handlePaymentInfoChange(event, index)
                                        }
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            })}

                        </div>

                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--submit"
                          onClick={userAdd}
                        >
                          Create Donate
                        </button>
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--cancel "
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--cancel "
                          onClick={clearForm}
                        >
                          Clear
                        </button>
                      </form>
                    </Tab>
                    <Tab
                      eventKey="Gift A Plant"
                      title="Gift a Plant"
                      onClick={() => handleTabSelect("Gift a Plant")}
                    >
                      <h5>Gift a Plant</h5>
                      <form
                        className="form-div contact-form-wrap"
                      >
                        <div className="col-12 mt20">
                          <div className="row ">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Occasion</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select"
                                    name="donationEvent"
                                    value={donations[0].donationEvent}
                                    onChange={(e) => handleDonationChange(e, 0)}>
                                    <option selected>Occasion</option>
                                    <option value="Birthday">Birthday</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Anniversary">Anniversary</option>
                                    <option value="Achievement">Achievement</option>
                                    <option value="Festival">Festival</option>
                                    <option value="Memorial Tribute">Memorial Tribute</option>
                                  </select>
                                </div>
                              </div>
                            </div></div></div>
                        
                        <div className="actionheadingdiv">
                          Select Your Donation Plan
                        </div>
                        <div className="mt20">
                          <table>
                            <thead>
                              <tr>
                                <th>Package Name</th>
                                <th>Bouquet Price</th>
                                <th>Maintenance Cost</th>
                                <th className="w200">Number of Bouquets</th>
                                <th>Total Cost</th>
                              </tr>
                            </thead>
                            <tbody>
                              {packageData.map((packageItem, index) => {
                                console.log(index);
                                return <tr key={index}>
                                  <td>{packageItem.packageName}</td>
                                  <td>{packageItem.bouquetPrice}</td>
                                  <td>{packageItem.maintenanceCost}</td>
                                  <td>
                                    <input
                                      type="number"
                                      name="noOfBouquets"
                                      value={packageItem.noOfBouquets}
                                      onChange={(event) => {
                                        if (event.target.value < 0) {
                                          event.target.value = 0;
                                        }
                                        handleChangeNumberOfBouquets(event, packageItem, index)
                                      }
                                      }

                                    />
                                  </td>
                                  <td>{packageItem.amount}</td>
                                </tr>
                              })}
                            </tbody>
                          </table>
                          <p>Overall Total: {donations[0].totalAmount}</p>
                        </div>
                        <div className="col-6 mt20">
                          <div className="row select-label">
                            <div className="col-4 "> General Donation</div>
                            <input
                              placeholder=" General Donation"
                              className="col-8 form-control-inside"
                              type="number"
                              name="generalDonation"
                              value={generalDonation}
                              onChange={(e) => {
                                if (e.target.value < 0) {
                                  e.target.value = 0;
                                }
                                handleDonationChange(e, 0)
                              }}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Personal Details</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Email ID</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.emailId"
                                    placeholder="Email ID"
                                    value={userData.user.emailId}
                                    // onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Mobile No.</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.mobileNo"
                                    placeholder="Mobile No."
                                    value={userData.user.mobileNo}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Donor Type</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select"
                                    name="user.donarType"
                                    value={userData.user.donarType}
                                    onChange={handleChange}>
                                    <option selected>Donor Type</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Individual">Individual</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Organisation</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="user.organisation"
                                    placeholder="Organisation"
                                    type="text"
                                    value={userData.user.organisation}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Prefix</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select"
                                    name="user.prefix"
                                    value={userData.user.prefix}
                                    onChange={handleChange}>
                                    <option selected>Prefix</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">First Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.firstName"
                                    placeholder="First Name"
                                    value={userData.user.firstName}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Last Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.lastName"
                                    placeholder="Last Name"
                                    value={userData.user.lastName}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>{" "}
                            </div>

                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">PAN card</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="user.panCard"
                                    placeholder="PAN card No."
                                    type="text"
                                    value={userData.user.panCard}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <label className="col-4 ">I want to opt</label>
                                <div className="col-8 p0">
                                  <input
                                    type="radio"
                                    name="user.activityType"
                                    value="CSR Activity"
                                    onClick={handleChange}
                                    className="radioinput"
                                  />
                                  <label className="radiospan" checked>
                                    CSR Activity
                                  </label>
                                  <input
                                    type="radio"
                                    name="user.activityType"
                                    value="NON-CSR Activity"
                                    onClick={handleChange}
                                    className="radioinput"
                                  />
                                  <label className="radiospan">
                                    NON-CSR Activity
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Address</div>
                        <div className="col-12 pr15 mt20">
                            {
                              address.map((addr, index) => {
                                return <div key={index} className="row">
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 "> Street 1</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="street1"
                                          placeholder=" Street 1"
                                          type="text"
                                          value={addr.street1}
                                          onChange={(event) => handleAddressChange(event, index)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 "> Street 2</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="street2"
                                          placeholder="Street 2"
                                          type="text"
                                          value={addr.street2}
                                          onChange={(event) => handleAddressChange(event, index)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 "> Street 3</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="street3"
                                          placeholder="Street 3"
                                          type="text"
                                          value={addr.street3}
                                          onChange={(event) => handleAddressChange(event, index)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 ">Country</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="country"
                                          placeholder="Country"
                                          type="text"
                                          value={addr.country}
                                          onChange={(event) => handleAddressChange(event, index)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 ">State</div>
                                      <div className="col-8 p0">
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
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 ">City</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="city"
                                          placeholder="City"
                                          type="text"
                                          value={addr.city}
                                          onChange={(event) => handleAddressChange(event, index)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 ">Postal Code</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="postalCode"
                                          placeholder="Postal Code"
                                          type="text"
                                          value={addr.postalCode}
                                          onChange={(event) => handleAddressChange(event, index)}

                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              })
                            }
                        </div>
                        <hr />
                        <div className="actionheadingdiv">
                          DETAILS OF RECIPIENT
                        </div>
                        <div className="col-12 pr15 mt20">
                          {
                            recipient.map((recipient, index) => {
                              return <div>
                                {

                                  recipient.address.map((addr, index) => {
                                    return <div className="row">
                                      <div className="col-6">
                                        <div className="row select-label">
                                          <div className="col-4 "> Street 1</div>
                                          <div className="col-8 p0">
                                            <input
                                              className="form-control-inside"
                                              name="street1"
                                              placeholder=" Street 1"
                                              type="text"
                                              value={addr.street1}
                                              onChange={(e) => handleRecipentAddressChange(e, index)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-6">
                                        <div className="row select-label">
                                          <div className="col-4 "> Street 2</div>
                                          <div className="col-8 p0">
                                            <input
                                              className="form-control-inside"
                                              name="street2"
                                              placeholder="Street 2"
                                              type="text"
                                              value={addr.street2}
                                              onChange={(e) => handleRecipentAddressChange(e, index)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-6">
                                        <div className="row select-label">
                                          <div className="col-4 "> Street 3</div>
                                          <div className="col-8 p0">
                                            <input
                                              className="form-control-inside"
                                              name="street3"
                                              placeholder="Street 3"
                                              type="text"
                                              value={addr.street3}
                                              onChange={(e) => handleRecipentAddressChange(e, index)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-6">
                                        <div className="row select-label">
                                          <div className="col-4 ">Country</div>
                                          <div className="col-8 p0">
                                            <input
                                              className="form-control-inside"
                                              name="country"
                                              placeholder="Country"
                                              type="text"
                                              value={addr.country}
                                              onChange={(e) => handleRecipentAddressChange(e, index)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-6">
                                        <div className="row select-label">
                                          <div className="col-4 ">Statesss</div>
                                          <div className="col-8 p0">
                                            <select
                                              className=" form-control-inside form-select"
                                              name="state"
                                              value={addr.state}
                                              onChange={(e) => handleRecipentAddressChange(e, index)
                                              }
                                            >
                                              <option value="">Select State</option>
                                              {stateOptions.map((state) => (
                                                <option key={state} value={state}>
                                                  {state}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-6">
                                        <div className="row select-label">
                                          <div className="col-4 ">City</div>
                                          <div className="col-8 p0">
                                            <input
                                              className="form-control-inside"
                                              name="city"
                                              placeholder="City"
                                              type="text"
                                              value={addr.city}
                                              onChange={(e) => handleRecipentAddressChange(e, index)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-6">
                                        <div className="row select-label">
                                          <div className="col-4 ">Postal Code</div>
                                          <div className="col-8 p0">
                                            <input
                                              className="form-control-inside"
                                              name="postalCode"
                                              placeholder="Postal Code"
                                              type="text"
                                              value={addr.postalCode}
                                              onChange={(e) => handleRecipentAddressChange(e, index)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>

                                    </div>
                                  })
                                }
                                <div className="row">

                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 ">First Name</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="firstName"
                                          placeholder="First Name"
                                          type="text"
                                          value={recipient.firstName}
                                          onChange={(e) => handleRecipentChange(e, index)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 ">Last Name</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="lastName"
                                          placeholder="Last Name"
                                          type="text"
                                          value={recipient.lastName}
                                          onChange={(e) => handleRecipentChange(e, index)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 ">Mobile No.</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="mobileNo"
                                          placeholder="Mobile No."
                                          type="text"
                                          value={recipient.mobileNo}
                                          onChange={(e) => handleRecipentChange(e, index)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row select-label">
                                      <div className="col-4 ">Email Id</div>
                                      <div className="col-8 p0">
                                        <input
                                          className="form-control-inside"
                                          name="emailID"
                                          placeholder="Email Id"
                                          type="text"
                                          value={recipient.emailID}
                                          onChange={(e) => handleRecipentChange(e, index)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div></div>
                            })
                          }

                        </div>
                        <hr />
                        <div className="actionheadingdiv">Mode of Payment</div>
                        <div className="col-12 pr15 mt20">
                            {donations.map((donation, index) => {
                              return <div key={index} className="row">
                                <div className="col-6">
                                  <div className="row select-label">
                                    <div className="col-4 "> Select Mode</div>
                                    <div className="col-8 p0">
                                      <select name="paymentMode" className=" form-control-inside form-select" value={donation.paymentInfo.paymentMode}
                                        onChange={(event) => handlePaymentInfoChange(event, index)}>
                                        <option selected>Donor Type</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Cash">Cash</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="row select-label">
                                    <div className="col-4 "> Bank Name</div>
                                    <div className="col-8 p0">
                                      <input
                                        className="form-control-inside"
                                        name="bankName"
                                        placeholder="Bank Name"
                                        type="text"
                                        value={donation?.paymentInfo?.bankName}
                                        onChange={(event) => handlePaymentInfoChange(event, index)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="row select-label">
                                    <div className="col-4 "> Chq/DD No.</div>
                                    <div className="col-8 p0">
                                      <input
                                        className="form-control-inside"
                                        name="chqORddNo"
                                        placeholder="Chq/DD No."
                                        type="text"
                                        value={donation?.paymentInfo?.chqORddNo}
                                        onChange={(event) => handlePaymentInfoChange(event, index)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="row select-label">
                                    <div className="col-4 ">Chq/DD Date</div>
                                    <div className="col-8 p0">
                                      <input
                                        className="form-control-inside"
                                        name="chqORddDate"
                                        placeholder="Chq/DD Date"
                                        type="date"
                                        value={donation?.paymentInfo?.chqORddDate}
                                        onChange={(event) => handlePaymentInfoChange(event, index)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="row select-label">
                                    <div className="col-4 ">Payment Date</div>
                                    <div className="col-8 p0">
                                      <input
                                        className="form-control-inside"
                                        name="paymentDate"
                                        placeholder="Payment Date"
                                        type="date"
                                        value={donation?.paymentInfo?.paymentDate}
                                        onChange={(event) => handlePaymentInfoChange(event, index)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="row select-label">
                                    <div className="col-4 ">Amount</div>
                                    <div className="col-8 p0">
                                      <input
                                        className="form-control-inside"
                                        name="amount"
                                        placeholder="Amount"
                                        type="number"
                                        value={donation?.paymentInfo?.amount}
                                        onChange={(event) => {
                                          if (event.target.value < 0) {
                                            event.target.value = 0;
                                          }
                                          handlePaymentInfoChange(event, index)
                                        }
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            })}
                        </div>

                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--submit"
                          onClick={userAdd}
                        >
                          Create Donate
                        </button>
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--cancel "
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--cancel "
                          onClick={clearForm}
                        >
                          Clear
                        </button>
                      </form>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="ExistingDonor" title="Existing Donor">
          <div className="bggray">
            {/* form */}
            <div className="col-12 admin-maindiv">
          <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
                <div className="col-12 contact-form-wrap">
                  <Tabs
                    defaultActiveKey="selfDonate"
                    id="uncontrolled-tab-example"
                    className="mb-3 selftGift-tab "
                  >
                    <Tab eventKey="selfDonate" title="Self Donate">
                      <h5>Self Planting</h5>

                      {/* <form className="form-div contact-form-wrap">
                        <div className="col-12 mt20">
                          <div className="row ">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Donor ID</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="Donarid"
                                    placeholder="Donor ID"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="actionheadingdiv">
                          Select Your Donation Plan
                        </div>
                        <div className="mt20">
                          <table className="donatetable">
                            <thead>
                              <tr>
                                <th>Plan</th>
                                <th>Price of Bouquet</th>
                                <th>No. Of Bouquets</th>
                                <th>2 Years Maintenance</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {packageData.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="w28p">{item.plan}</td>
                                    <td className="w18p">
                                      <input
                                        type="number"
                                        className="form-control-inside"
                                        value={item.priceBouquet}
                                        disabled
                                      />
                                    </td>
                                    <td className="w18p">
                                      <input
                                        type="number"
                                        className="form-control-inside"
                                        value={item.noBouquet}
                                      />
                                    </td>
                                    <td className="w18p">
                                      <input
                                        type="number"
                                        className="form-control-inside"
                                        value={item.maintenance}
                                        disabled
                                      />
                                    </td>
                                    <td className="text-right w18p">
                                      <input
                                        type="number"
                                        value={item.amount}
                                        className="form-control-inside"
                                        disabled
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                              <tr>
                                <td className="text-right" colSpan="4">
                                  Total
                                </td>
                                <td className="text-right">
                                  <input
                                    type="number"
                                    className="form-control-inside"
                                    value={totalAmount}
                                    disabled
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-6 mt20">
                          <div className="row select-label">
                            <div className="col-4 "> General Donation</div>
                            <input
                              placeholder=" General Donation"
                              className="col-4 form-control-inside"
                              type="text"
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Personal Details</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Email ID</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="emailID"
                                    placeholder="Email ID"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Mobile No.</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="mobileNo"
                                    placeholder="Mobile No."
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Donor Type</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select">
                                    <option selected>Donor Type</option>
                                    <option value="0">Corporate</option>
                                    <option value="1">Individual</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Organisation</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="organisation"
                                    placeholder="Organisation"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Prefix</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="Prefix"
                                    placeholder="Prefix"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">First Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Last Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                  />
                                </div>
                              </div>{" "}
                            </div>

                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">PAN card</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    placeholder="PAN card No."
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <label className="col-4 ">I want to opt</label>
                                <div className="col-8 p0">
                                  <input
                                    type="radio"
                                    name="activity"
                                    value="CSR"
                                    className="radioinput"
                                  />
                                  <label className="radiospan" checked>
                                    CSR Activity
                                  </label>
                                  <input
                                    type="radio"
                                    name="activity"
                                    value="NONCSR"
                                    className="radioinput"
                                  />
                                  <label className="radiospan">
                                    NON-CSR Activity
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Address</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 1</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street1"
                                    placeholder=" Street 1"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 2</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street2"
                                    placeholder="Street 2"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 3</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street3"
                                    placeholder="Street 3"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Country</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="country"
                                    placeholder="Country"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">State</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select">
                                    <option value="">Select State</option>
                                    {stateOptions.map((state) => (
                                      <option key={state} value={state}>
                                        {state}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">City</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="city"
                                    placeholder="City"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Postal Code</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />

                        <div className="actionheadingdiv">Mode of Payment</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Select Mode</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select">
                                    <option selected>Mode Of Payment</option>
                                    <option value="0">Cheque</option>
                                    <option value="1">Cash</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Bank Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="BankName"
                                    placeholder="Bank Name"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Chq/DD No.</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="ChqDDNo"
                                    placeholder="Chq/DD No."
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Chq/DD Date</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="ChqDDDate"
                                    placeholder="Chq/DD Date"
                                    type="date"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Payment Date</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="PaymentDate"
                                    placeholder="Payment Date"
                                    type="date"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Amount</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="Amount"
                                    placeholder="Amount"
                                    type="date"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--submit"
                        >
                          Create Donate
                        </button>
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--cancel "
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--cancel "
                        >
                          Clear
                        </button>
                      </form> */}
                    </Tab>
                    <Tab eventKey="giftaPlant" title="Gift a Plant">
                      <h5>Gift a Plant</h5>
                      {/* <form className="form-div contact-form-wrap">
                        <div className="col-12 mt20">
                          <div className="row ">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Donor ID</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="Donarid"
                                    placeholder="Donor ID"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Occasion</div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    value={donationEvent}
                                    onChange={(e) =>
                                      setDonationEvent(e.target.value)
                                    }
                                  >
                                    <option selected>Occasion</option>
                                    <option value="Birthday">Birthday</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Anniversary">
                                      Anniversary
                                    </option>
                                    <option value="Achievement">
                                      Achievement
                                    </option>
                                    <option value="Festival">Festival</option>
                                    <option value="Memorial Tribute">
                                      Memorial Tribute
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="actionheadingdiv">
                          Select Your Donation Plan
                        </div>
                        <div className="mt20">
                          <table className="donatetable">
                            <thead>
                              <tr>
                                <th>Plan</th>
                                <th>Price of Bouquet</th>
                                <th>No. Of Bouquets</th>
                                <th>2 Years Maintenance</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {packageData.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="w28p">{item.plan}</td>
                                    <td className="w18p">
                                      <input
                                        type="number"
                                        className="form-control-inside"
                                        value={item.priceBouquet}
                                        disabled
                                      />
                                    </td>
                                    <td className="w18p">
                                      <input
                                        type="number"
                                        className="form-control-inside"
                                        value={item.noBouquet}
                                      />
                                    </td>
                                    <td className="w18p">
                                      <input
                                        type="number"
                                        className="form-control-inside"
                                        value={item.maintenance}
                                        disabled
                                      />
                                    </td>
                                    <td className="text-right w18p">
                                      <input
                                        type="number"
                                        value={item.amount}
                                        className="form-control-inside"
                                        disabled
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                              <tr>
                                <td className="text-right" colSpan="4">
                                  Total
                                </td>
                                <td className="text-right">
                                  <input
                                    type="number"
                                    className="form-control-inside"
                                    value={totalAmount}
                                    disabled
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-6 mt20">
                          <div className="row select-label">
                            <div className="col-4 "> General Donation</div>
                            <input
                              placeholder=" General Donation"
                              className="col-4 form-control-inside"
                              type="text"
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Personal Details</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Email ID</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="emailID"
                                    placeholder="Email ID"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Mobile No.</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="mobileNo"
                                    placeholder="Mobile No."
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Donor Type</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select">
                                    <option selected>Donor Type</option>
                                    <option value="0">Corporate</option>
                                    <option value="1">Individual</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Organisation</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="organisation"
                                    placeholder="Organisation"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Prefix</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="Prefix"
                                    placeholder="Prefix"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">First Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Last Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                  />
                                </div>
                              </div>{" "}
                            </div>

                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">PAN card</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    placeholder="PAN card No."
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Address</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 1</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street1"
                                    placeholder=" Street 1"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 2</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street2"
                                    placeholder="Street 2"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 3</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street3"
                                    placeholder="Street 3"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Country</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="country"
                                    placeholder="Country"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">State</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select">
                                    <option value="">Select State</option>
                                    {stateOptions.map((state) => (
                                      <option key={state} value={state}>
                                        {state}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">City</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="city"
                                    placeholder="City"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Postal Code</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <label className="col-4 ">I want to opt</label>
                                <div className="col-8 p0">
                                  <input
                                    type="radio"
                                    name="activity"
                                    value="CSR"
                                    className="radioinput"
                                  />
                                  <label className="radiospan" checked>
                                    CSR Activity
                                  </label>
                                  <input
                                    type="radio"
                                    name="activity"
                                    value="NONCSR"
                                    className="radioinput"
                                  />
                                  <label className="radiospan">
                                    NON-CSR Activity
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">
                          DETAILS OF RECIPIENT
                        </div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 1</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street1"
                                    placeholder=" Street 1"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 2</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street2"
                                    placeholder="Street 2"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 3</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street3"
                                    placeholder="Street 3"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Country</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="country"
                                    placeholder="Country"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">State</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select">
                                    <option value="">Select State</option>
                                    {stateOptions.map((state) => (
                                      <option key={state} value={state}>
                                        {state}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">City</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="city"
                                    placeholder="City"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Postal Code</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">First Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="FirstName"
                                    placeholder="First Name"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Last Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="LastName"
                                    placeholder="Last Name"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Mobile No.</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="Mobile No."
                                    placeholder="Mobile No."
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Email Id</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="Emailid"
                                    placeholder="Email Id"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Mode of Payment</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Select Mode</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select">
                                    <option selected>Mode Of Payment</option>
                                    <option value="0">Cheque</option>
                                    <option value="1">Cash</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Bank Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="BankName"
                                    placeholder="Bank Name"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Chq/DD No.</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="ChqDDNo"
                                    placeholder="Chq/DD No."
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Chq/DD Date</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="ChqDDDate"
                                    placeholder="Chq/DD Date"
                                    type="date"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Payment Date</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="PaymentDate"
                                    placeholder="Payment Date"
                                    type="date"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Amount</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="Amount"
                                    placeholder="Amount"
                                    type="date"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--submit"
                        >
                          Create Donate
                        </button>
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--cancel "
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--cancel "
                        >
                          Clear
                        </button>
                      </form> */}
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>

      {/* body */}
    </>
  );
}

export default OfflineDonation;
