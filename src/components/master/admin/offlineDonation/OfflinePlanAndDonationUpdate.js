import React, { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Tab, Tabs } from "react-bootstrap";
import numberToWords from 'number-to-words';
import Donateslid from "../../../../assets/img/slider/Donateslid.jpg";
import { DonationService } from "../../../../services/donationService/donation.service";
import { SUCCESS } from "../../../constants/constants";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
// nyn
function OfflineDonationPay() {

  const navigate = useNavigate();




  const id = useParams().id;
  const initialPackageData = [
    {
      packageId: null,
      packageName: "",
      bouquetPrice: "",
      NoOfBouquets: "",
      // maintenanceCost: "",
      amount: "",
    },
    {
      packageId: null,
      packageName: "",
      bouquetPrice: "",
      NoOfBouquets: "",
      // maintenanceCost: "",
      amount: "",
    },
   
  ];

  const [packageData, setPackageData] = useState(initialPackageData);


  const [paymentDate, setPaymentDate] = useState();



  // Function to handle changes in NoOfBouquets
  // const handleNoBouquetChange = (index, value) => {
  //   if (value < 0) {
  //     value = 0;
  //   }
  //   const newData = [...packageData];
  //   newData[index].NoOfBouquets = value;
  //   newData[index].amount =
  //     parseFloat(newData[index].bouquetPrice) * parseFloat(value) + parseFloat(newData[index].maintenanceCost);
  //     console.log(newData);
  //   setPackageData(newData);
  // };
  // console.log(packageData);



  const minpaymentDiv = () => {
    if (document.getElementById("addpaymentDiv")) {
      if (document.getElementById("addpaymentDiv").style.display === "block") {
        document.getElementById("addpaymentDiv").style.display = "none";
      }
    }
  };
  const totalAmountOfPackage = packageData.reduce(
    (total, item) =>
      total +
      parseFloat(item.bouquetPrice) * parseFloat(item.NoOfBouquets) +
      parseFloat(item.maintenanceCost),
    0
  );

  // submit
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






  const initialUserData = {
    user: {
      emailId: '',
      donorId: '',
    },
  };
  const intialDonations = [
    {
      donationType: "",
      donationMode: "offline",
      donationEvent: "",
      totalAmount: 0,
      generalDonation: null,
      userPackage: [],
      recipient: [],
      paymentInfo: [
        {
          paymentMode: "",
          bankname: "",
          chqORddNo: "",
          chqORddDate: "",
          paymentDate: "",
          amount: 0,
        },
        {
          paymentMode: "",
          bankname: "",
          chqORddNo: "",
          chqORddDate: "",
          paymentDate: "",
          amount: 0,
        },
      ],
    },
  ];

  const initialRecipientData = [
    {
      recipientId: null,
      firstName: "",
      lastName: "",
      mobileNo: "",
      emailId: "",
      address: [
        {
          street1: "",
          street2: "",
          street3: "",
          country: "",
          state: "",
          city: "",
          postalCode: "",
        },
      ],
    },
  ];
  const [userData, setUserData] = useState(initialUserData);
  const [donationData, setDonationData] = useState(intialDonations[0]);
  const [recipient, setRecipient] = useState(initialRecipientData[0]);



  const handleChangeNumberOfBouquets = (e, row, rowIndex) => {
    let { name, value } = e.target;
    console.log({ name, value, rowIndex }, row);
    let userPackageData = packageData;
    userPackageData[rowIndex][name] = value;

    const totalCost =
      (row.bouquetPrice) * row.NoOfBouquets;
    userPackageData[rowIndex]["amount"] = totalCost;
    setPackageData(userPackageData);
    calculateOverallTotal();
    console.log(userPackageData);
  };
  const calculateOverallTotal = () => {
    const totalAmountOfPackage = packageData.reduce(
      (accumulator, packageItem) => {
        return accumulator + packageItem.bouquetPrice * packageItem.NoOfBouquets;
      },
      0
    );
    console.log("totalAmountOfPackage:", totalAmountOfPackage);
    if (donationData.length > 0) {
      const updatedDonationData = [
        {
          ...donationData[0],
          totalAmount: totalAmountOfPackage,
        },
        ...donationData.slice(1),
      ];
  
      setDonationData(updatedDonationData);
    }
    // const updatedDonations = [...donationData];
    // updatedDonations[0]["totalAmount"] = totalAmountOfPackage;
    // setDonationData(updatedDonations);
  };
  
  
  console.log(donationData.totalAmount);

  const handleRecipentAddressChange = (name, value, index) => {
    const updatedRecipient = { ...recipient };
    updatedRecipient.address[index] = {
      ...updatedRecipient.address[index],
      [name]: value
    };
    setRecipient(updatedRecipient);
  };


  console.log(recipient);

  const handleRecipientChange = (name, value) => {
    console.log(name, value);
    setRecipient((prevRecipient) => ({
      ...prevRecipient,
      [name]: value,
       // Update the mobileNo property with the new value
    }));
  
  };
  
  console.log(recipient);
console.log(handleRecipientChange);
  const handleDonationChange = (name, value) => {
    setDonationData((prevDonationData) => ({
      ...prevDonationData,
      [name]: value,
    }));
  };
  console.log(donationData);



  const handlePaymentInfoChange = (e, payIndex) => {
    let { name, value } = e.target;
    if (value < 0) {
      value = 0;
    }
    console.log(payIndex);
    const updatedDonations = { ...donationData };
    console.log(updatedDonations);
    if (
      updatedDonations.paymentInfo &&
      Array.isArray(updatedDonations.paymentInfo) &&
      updatedDonations.paymentInfo[payIndex]
    ) {
      updatedDonations.paymentInfo[payIndex][name] = value;
      console.log(updatedDonations);
      setDonationData(updatedDonations);
    }
  };
  const addpaymenticon = () => {
    if (document.getElementById("addpaymentDiv")) {
      if (document.getElementById("addpaymentDiv").style.display === "none") {
        document.getElementById("addpaymentDiv").style.display = "block";
      } else {
        document.getElementById("addpaymentDiv").style.display = "block";
      }
    }
  };
  useEffect(() => {
    console.log(id);
    if (id) {
      getDonationById(id);
    }

  }, [id]);

  const getDonationById = async (id) => {
    try {
      const response = await DonationService.getDonationById(id);
      console.log(response.data);
      if (response?.data) {
        const data = JSON.parse(response.data);
        console.log(data);
        setUserData(data.user);

        console.log(data.user.donorId);
        console.log(data.user.donations[0]);

        const donations = data.user.donations[0];
        const updatedDonationData = { ...intialDonations[0], ...donations };
        setDonationData(updatedDonationData);


        if (
          donations.donationType === "Gift-Donate" &&
          donations.recipient &&
          donations.recipient.length > 0
        ) {
          const recipientData = donations.recipient[0];
          console.log(recipientData);

          if (recipientData.address && recipientData.address.length > 0) {
            const address = recipientData.address[0];
            console.log(address);

            const updatedRecipientData = {
              ...recipientData,
              ...(address.length > 0 ? { address: address[0] } : {}),
            };

            console.log(updatedRecipientData);

            setRecipient(updatedRecipientData);
          }
        }

        // const userPackage=donations.userPackage[0];
        // console.log(userPackage);
        // setPackageData(userPackage);

        const userPackage = donations.userPackage; // Assuming it's an array of objects

        if (userPackage && userPackage.length > 0) {
          const updatedPackageData = userPackage.map((packageItem) => {
            return {
              packageId: packageItem.packageId,
              packageName: packageItem.packageName,
              bouquetPrice: packageItem.bouquetPrice,
              NoOfBouquets: packageItem.NoOfBouquets,
              // maintenanceCost: packageItem.maintenanceCost,
              amount: packageItem.amount,
            };
          });

          setPackageData(updatedPackageData);
        } else {
          setPackageData([]); // Set an empty array if userPackage is null or empty
        }

        // setPackageData(updatedPackageData);



        console.log(packageData);
        console.log(userData);


      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(recipient);
  // console.log(donationData.recipient[0]);


  const [errors, setErrors] = useState({});
  
// test 
const validate = () => {
  const errors = {};

  // Payment validation
  for (let i = 0; i < donationData.paymentInfo.length; i++) {
    const payment = donationData.paymentInfo[i];
    // const paymentErrors = {};

    // Payment mode validation
    if (!payment.paymentMode || payment.paymentMode === "Donor Type") {
      errors.paymentMode = "Payment Mode is required";
    }

    // Other payment validations...
    if (!payment.chqORddDate) {
      errors.chqORddDate = "ChqORddDate is required";
            }
            if (!payment.paymentDate) {
              errors.paymentDate = "Payment Date is required";
            }
            if (!payment.amount) {
              errors.amount = "Amount is required";
            }
            if (!payment.bankname || payment.bankname.trim() === '') {
              errors.bankname = "BankName is required";
            } else if (!/^[A-Za-z]+$/.test(payment.bankname)) {
              errors.bankname = "Bank Name is invalid";
            }
            if (!payment.chqORddNo) {
              errors.chqORddNo = "ChqORddNo is required";
            }
    
    // if (Object.keys(paymentErrors).length > 0) {
    //   errors.push(paymentErrors);
    // }
  }

  if (donationData.donationType == "Gift-Donate") {
    console.log(recipient);
    console.log(recipient.emailId);
           
              if (!recipient.emailId) {
                errors.emailId = "Email Id is required";
              } else if (
                !/^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\.([a-zA-Z]{2,5})$/.test(
                  recipient.emailId
                )
              ) {
                errors.emailId = "Enter a Valid Email Address";
              }
      
              if (!recipient.mobileNo) {
                errors.mobileNo = "Mobile Number is required";
              } 
              else if(!/^[6-9]\d{9}$/.test(recipient.mobileNo))
              {
                errors.mobileNo= "Invalid mobile number, mobile no contain only 10 digits.";
              }
              
              if(!recipient.address[0].street1)
              {
                errors.street1  = "Street 1 is required";
              }
              if(!recipient.address[0].street2)
              {
                errors.street2  = "Street 2 is required";
              }
              if(!recipient.address[0].street3)
              {
                errors.street3  = "Street 2 is required";
              }
              if(!recipient.address[0].state)
              {
                errors.street1  = "Street 1 is required";
              }
              if(!recipient.address[0].city)
              {
                errors.city  = "City 1 is required";
              }
              if(!recipient.address[0].postalCode)
              {
                errors.postalCode  = "Postal code is required";
              }
              
            }
         
  console.log(errors);
  setErrors(errors);
  return errors;
};





const updateDonation = async (e) => {
  e.preventDefault();

  const validationErrors = validate();

  if (Object.entries(validationErrors).length === 0) {
    // Construct the updated form data
    const updatedDonationData = {
      ...donationData,
      userPackage: packageData,
      
    };
      console.log(packageData);
    if (donationData.donationType === "Self-Donate") {
      updatedDonationData.recipient = []; // Set recipient array to empty for self-donate
    }
    else {
       updatedDonationData.recipient=[];
      updatedDonationData.recipient = [...updatedDonationData.recipient,recipient]
    }

    const updatedFormData = {
      formData: {
        user: {
          ...userData,
          donations: [updatedDonationData],
        },
      },
    };

    // setPackageData(packageData); // Set the updated package data to packageData state

    console.log(updatedFormData);

    try {
      // Make the API call
      const response = await DonationService.updateDonation(updatedFormData);
      console.log(response);
      // Process the API response as needed
      if (response?.status) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      // Handle any errors from the API call
    }
  } else {
    // Handle validation errors here, e.g., show error messages to the user
    console.log("Validation Errors:", validationErrors);
  }
};


console.log(donationData);
  console.log(donationData.paymentInfo[0]?.paymentDate);
  // console.log(donationData.recipient[0]?.address[0])


  const handleBack = () => {
    navigate(`/DonarView/${userData.emailId}`);
  };



  console.log(packageData);
  // Function to convert amount to words
  const convertAmountToWords = (amount) => {
    // Check if the amount is a valid number
    if (typeof amount !== 'number' || !isFinite(amount)) {
      return ''; // Return an empty string or an appropriate fallback value
    }

    // Check if the amount is within the supported range
    const MAX_SUPPORTED_AMOUNT = 999999999.99;
    if (amount > MAX_SUPPORTED_AMOUNT) {
      return 'Amount exceeds the supported range.'; // Return an error message or an appropriate fallback value
    }

    const amountInWords = numberToWords.toWords(amount);
    return amountInWords;
  };

 

  return (
    <>
      <ToastContainer />

      {/* slide info */}
      <div className="bggray">
        <div className="col-12 admin-maindiv">
          <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
            <h5>Plan and Donation</h5>
            <div className="col-12 pr0 contact-form-wrap">
              {" "}
              <div className="row">
                <form className="form-div contact-form-wrap">
                  <div className="row">
                    <div className="col-6">
                      <div className="row select-label">
                        <div className="col-4 "> Donor ID</div>
                        <div className="col-8 p0">
                          <input
                            className="form-control-inside"
                            type="text"
                            name="donorId"
                            value={userData.donorId}
                            placeholder="Donor ID"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row select-label">
                        <div className="col-4 ">Donation ID</div>
                        <div className="col-8 p0">
                          <input
                            className="form-control-inside"
                            type="text"
                            name="donationId"
                            value={donationData.donationId}
                            placeholder="Donation ID"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    {donationData.donationType.toUpperCase() !== "SELF-DONATE" && (
                      <div className="col-6">
                        <div className="row select-label">
                          <div className="col-4">Occasion</div>
                          <div className="col-8 p0">
                            <input
                              className="form-control-inside"
                              type="text"
                              name="donationEvent"
                              value={donationData.donationEvent}
                              placeholder="Occasion"
                              onChange={(e) => handleDonationChange("donationEvent", e.target.value)}
                              disabled
                            />
                            {errors.donationEvent && (
                              <div className="error-message red-text">
                                {errors.donationEvent}
                              </div>
                            )}

                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                  <div className="actionheadingdiv">
                    Select Your Donation Plan
                  </div>
                  {/* {packageData && packageData.length > 0 && (
  packageData.some((item) => item.plan || item.priceBouquet || item.noBouquet || item.maintenance || item.amount) ? ( */}

                  {packageData && packageData.length > 0 && (
                    <div className="mt20">
                      <table >
                        <thead>
                          <tr>
                            <th>Plantin Sapling</th>
                            <th>Cost per Sapling</th>
                            <th>No. Sapling</th>
                            {/* <th>2 Years Maintenance</th> */}
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {packageData.map((item, index) => (
                            <tr key={index}>
                              <td className="w28p">{item.packageName}</td>
                              <td className="w18p">
                                <input
                                  type="number"
                                  className="form-control-inside"
                                  value={item.bouquetPrice}
                                  disabled
                                />
                              </td>
                              <td className="w18p">
                                <input
                                  type="number"
                                  name="NoOfBouquets"
                                  value={item.NoOfBouquets}
                                  onChange={(event) => {
                                    if (event.target.value < 0) {
                                      event.target.value = 0;
                                    }
                                    handleChangeNumberOfBouquets(
                                      event,
                                      item,
                                      index
                                    );
                                  }}
                                  disabled
                                />
                              </td>
                              {/* <td className="w18p">
                                <input
                                  type="number"
                                  className="form-control-inside"
                                  value={item.maintenanceCost}
                                  disabled
                                />
                              </td> */}
                              <td className="text-right w18p">
                                <input
                                  type="number"
                                  value={item.amount}
                                  className="form-control-inside"
                                  disabled
                                />
                              </td>
                            </tr>
                          ))}
                          <tr>
                            {/* <td className="text-right" colSpan="4">
                              Total
                            </td>
                            <td className="text-right">
                              <input
                                type="number"
                                className="form-control-inside"
                                value={totalAmountOfPackage}
                                disabled
                              />
                            </td> */}
                          </tr>
                        </tbody>
                      </table>
                      {/* <div className="overalltotal">
  Overall Total: {donationData.length > 0 ? donationData[0].totalAmount : 0}
</div> */}
<div className="overalltotal">
  Overall Total: {donationData.totalAmount}
</div>

                    </div>
                  )}
                  <div className="clear"></div>
                  <hr />
                  {donationData.donationType.toUpperCase() !== "SELF-DONATE" && (
                    <>
                      <div className="actionheadingdiv">DETAILS OF RECIPIENT</div>
                      <div className="col-12 pr15 mt20">
                        <div className="row">
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 "> Street 1</div>
                              <div className="col-8  p0">
                                <input
                                  className="form-control-inside"
                                  placeholder=" Street 1"
                                  name="street1"
                                  type="text"
                                  value={recipient.address[0]?.street1 || ""}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("street1", e.target.value, 0)
                                  }
                                />
                                {errors?.street1 && (
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
                              <div className="col-8  p0">
                                <input
                                  className="form-control-inside"
                                  placeholder="Street 2"
                                  name="street2"
                                  type="text"
                                  value={recipient.address[0].street2}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("street2", e.target.value, 0)
                                  }
                                />
  {errors?.street2 && (
                                  <div className="error-message red-text">
                                    {errors.street2}
                                  </div>
                                )}


                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 "> Street 3</div>
                              <div className="col-8  p0">
                                <input
                                  className="form-control-inside"
                                  placeholder="Street 3"
                                  name="street3"
                                  type="text"
                                  value={recipient.address[0].street3}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("street3", e.target.value, 0)
                                  }
                                />
                                 {errors?.street3 && (
                                  <div className="error-message red-text">
                                    {errors.street3}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 ">Country</div>
                              <div className="col-8  p0">
                                <input
                                  className="form-control-inside"
                                  placeholder="Country"
                                  name="country"
                                  type="text"
                                  value={recipient.address[0].country}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("country", e.target.value, 0)
                                  }
                                />
                                 {errors?.country && (
                                  <div className="error-message red-text">
                                    {errors.country}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 ">State</div>
                              <div className="col-8  p0">
                                <select
                                  className=" form-control-inside form-select"
                                  value={recipient.address[0].state}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("state", e.target.value, 0)
                                  }
                                >
                                  <option value="">Select State</option>
                                  {stateOptions.map((state) => (
                                    <option key={state} value={state}>
                                      {state}
                                    </option>
                                  ))}
                                </select>
                                {errors.length > 0 && errors?.state && (
                                  <div className="error-message red-text">
                                    {errors.state}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 ">City</div>
                              <div className="col-8  p0">
                                <input
                                  className="form-control-inside"
                                  placeholder="City"
                                  type="text"
                                  name="city"
                                  value={recipient.address[0].city}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("city", e.target.value, 0)
                                  }
                                />
                                {errors.length > 0 && errors?.city && (
                                  <div className="error-message red-text">
                                    {errors.city}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 ">Postal Code</div>
                              <div className="col-8  p0">
                                <input
                                  className="form-control-inside"
                                  placeholder="Postal Code"
                                  name="postalCode"
                                  type="text"
                                  value={recipient.address[0].postalCode}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("postalCode", e.target.value, 0)
                                  }
                                />
                                {errors.length > 0 && errors?.postalCode && (
                                  <div className="error-message red-text">
                                    {errors.postalCode}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 ">Mobile No.</div>
                              <div className="col-8  p0">
                                <input
                                  className="form-control-inside"
                                  placeholder="Mobile No."
                                  type="text"
                                  name="mobileNo"
                                  value={recipient.mobileNo}
                                  onChange={(e) =>
                                    handleRecipientChange("mobileNo", e.target.value)
                                  }
                                />
                                {errors.mobileNo && <div className="error-message red-text">{errors.mobileNo}</div>}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row select-label">
                              <div className="col-4 ">Email ID</div>
                              <div className="col-8  p0">
                                <input
                                  className="form-control-inside"
                                  placeholder="Email ID"
                                  type="text"
                                  name="emailId"
                                  value={recipient.emailId}
                                  onChange={(e) =>
                                    handleRecipientChange("emailId", e.target.value)
                                  }
                                />
                                {errors.length > 0 && errors?.emailId && (
                                  <div className="error-message red-text">
                                    {errors.emailId}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </>
                  )}
                  <hr />

                  <div className="actionheadingdiv">Mode of Payment
                    <div
                      className="float-right addminicon"
                      onClick={addpaymenticon}
                    >
                      <FaPlusSquare />
                    </div></div>








                    
                  <div className="col-12 pr15 mt20">
                    <div className="row">
                      <div className="col-6">
                        <div className="row select-label">
                          <div className="col-4 "> Select Mode</div>
                          <div className="col-8 p0">
                            <select
                              name="paymentMode"
                              className=" form-control-inside form-select"
                              value={donationData.paymentInfo[0]?.paymentMode || ""}
                              onChange={(event) =>
                                handlePaymentInfoChange(event, 0)
                              }
                              required
                            >
                              <option disabled selected value="">Select</option>
                              <option value="Cheque">Cheque</option>
                              <option value="Cash">Cash</option>
                            </select>
                            {errors?.paymentMode && <div className="error-message red-text">{errors.paymentMode}</div>}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row select-label">
                          <div className="col-4 "> Bank Name</div>
                          <div className="col-8 p0">
                          <input
        className="form-control-inside"
        name="bankname" 
        placeholder="Bank Name"
        type="text"
        value={donationData.paymentInfo[0]?.bankname || ""} 
        onChange={(event) => handlePaymentInfoChange(event, 0)}
      /> 
      {errors?.bankname && ( 
      <div className="error-message red-text">{errors?.bankname}</div>
    )}
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
                              value={donationData.paymentInfo[0]?.chqORddNo || ""}
                              onChange={(event) =>
                                handlePaymentInfoChange(event, 0)
                              }
                            />
                            {errors?.chqORddNo && <div className="error-message red-text">{errors?.chqORddNo}</div>}
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
                              value={donationData.paymentInfo[0]?.chqORddDate || ""}
                              onChange={(event) =>
                                handlePaymentInfoChange(event, 0)
                              }
                            />
                            {errors?.chqORddDate && <div className="error-message red-text">{errors?.chqORddDate}</div>}
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
                              value={donationData.paymentInfo[0]?.paymentDate || ""}
                              onChange={(event) =>
                                handlePaymentInfoChange(event, 0)
                              }
                            />
                            {errors?.paymentDate && <div className="error-message red-text">{errors?.paymentDate}</div>}
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
                              value={donationData.paymentInfo[0]?.amount || ""}
                              onChange={(event) => {
                                if (event.target.value < 0) {
                                  event.target.value = 0;
                                }
                                handlePaymentInfoChange(event, 0);
                              }}
                            />
                            {errors?.amount && <div className="error-message red-text">{errors?.amount}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>










                  <div id="addpaymentDiv" className="hide">
                    <hr />
                    <div className="actionheadingdiv">Mode of Payment
                      <div
                        className="float-right addminicon"
                        onClick={minpaymentDiv}
                      >
                        <FaMinusSquare />
                      </div></div>
                    <div className="col-12 pr15 mt20">
                      <div className="row">
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Select Mode</div>
                            <div className="col-8 p0">
                              <select
                                name="paymentMode"
                                className=" form-control-inside form-select"
                                value={donationData.paymentInfo[1]?.paymentMode || ""}
                                onChange={(event) =>
                                  handlePaymentInfoChange(event, 1)
                                }
                              >
                                <option selected>Donar Type</option>
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
                                name="bankname"
                                placeholder="Bank Name"
                                type="text"
                                value={donationData.paymentInfo[1]?.bankname || ""}
                                onChange={(event) =>
                                  handlePaymentInfoChange(event, 1)
                                }
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
                                value={donationData.paymentInfo[1]?.chqORddNo || ""}
                                onChange={(event) =>
                                  handlePaymentInfoChange(event, 1)
                                }
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
                                value={donationData.paymentInfo[1]?.chqORddDate || ""}
                                onChange={(event) =>
                                  handlePaymentInfoChange(event, 1)
                                }
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
                                value={donationData.paymentInfo[1]?.paymentDate || ""}
                                onChange={(event) =>
                                  handlePaymentInfoChange(event, 1)
                                }
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
                                value={donationData.paymentInfo[1]?.amount || ""}
                                onChange={(event) => {
                                  if (event.target.value < 0) {
                                    event.target.value = 0;
                                  }
                                  handlePaymentInfoChange(event, 1);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt20 mr10 webform-button--submit"
                    onClick={(e) => updateDonation(e)}
                  >
                    Update
                  </button>

                  <button className="mt20 mr10 webform-button--cancel" onClick={handleBack}>
                    Back
                  </button>

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

export default OfflineDonationPay;
