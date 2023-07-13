import React, { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Tab, Tabs } from "react-bootstrap";
import numberToWords from 'number-to-words';
import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
import { DonationService } from "../../../services/donationService/donation.service";
import { SUCCESS } from "../../constants/constants";
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
      maintenanceCost: "",
      amount: "",
    },
    {
      packageId: null,
      packageName: "",
      bouquetPrice: "",
      NoOfBouquets: "",
      maintenanceCost: "",
      amount: "",
    },
    {
      packageId: null,
      packageName: "",
      bouquetPrice: "",
      NoOfBouquets: "",
      maintenanceCost: "",
      amount: "",
    },
    {
      packageId: null,
      packageName: "",
      bouquetPrice: "",
      NoOfBouquets: "",
      maintenanceCost: "",
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
          bankName: "",
          chqORddNo: "",
          chqORddDate: "",
          paymentDate: "",
          amount: 0,
        },
        {
          paymentMode: "",
          bankName: "",
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
      emailID: "",
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
    let userPackageData = [...packageData]; // Clone the packageData array
    userPackageData[rowIndex][name] = value;

    const totalCost = (row.bouquetPrice + row.maintenanceCost) * value;
    userPackageData[rowIndex]["amount"] = totalCost;

    setPackageData(userPackageData, () => {
      calculateOverallTotal();
    });

    console.log(userPackageData);
  };

  console.log(packageData);
  const calculateOverallTotal = () => {
    const totalAmountOfPackage = packageData.reduce((accumulator, packageItem) => {
      return (
        accumulator +
        (packageItem.bouquetPrice + packageItem.maintenanceCost) *
        packageItem.NoOfBouquets
      );
    }, 0);

    setDonationData((prevDonationData) => ({
      ...prevDonationData,
      totalAmount: totalAmountOfPackage,
    }));
  };


  console.log(donationData);

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
          donations.donationType === "gift-Donate" &&
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
              maintenanceCost: packageItem.maintenanceCost,
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

  // useEffect(() => {
  //   validate(); // Call the validate function whenever the dependencies change
  // }, [donationData, recipient]);
  
  // const validate = () => {
  //   const errors = [];

  //   for (let i = 0; i < donationData.paymentInfo.length; i++) {
  //     const payment = donationData.paymentInfo[i];
  //     const paymentErrors = {};

  //     if (!payment.paymentMode || payment.paymentMode === "Donor Type") {
  //       paymentErrors.paymentMode = "Payment Mode is required";
  //     }
  //     if (!payment.chqORddDate) {
  //       paymentErrors.chqORddDate = "ChqORddDate is required";
  //     }
  //     if (!payment.paymentDate) {
  //       paymentErrors.paymentDate = "Payment Date is required";
  //     }
  //     if (!payment.amount) {
  //       paymentErrors.amount = "Amount is required";
  //     }
  //     if (!payment.bankname || payment.bankname.trim() === '') {
  //       paymentErrors.bankname = "BankName is required";
  //     } else if (!/^[A-Za-z]+$/.test(payment.bankname)) {
  //       paymentErrors.bankName = "Bank Name is invalid";
  //     }
  //     if (!payment.chqORddNo) {
  //       paymentErrors.chqORddNo = "ChqORddNo is required";
  //     }
  //     console.log(paymentErrors);
  //     errors.push(paymentErrors);
  //   }

  //   console.log(donationData.donationType);
  //   if (donationData.donationType !== "self-Donate") {

  //     // Donation Event validation
  // if (donationData.donationType !== "self-Donate") {

  //   if (!donationData.donationEvent) {
  //     errors.push({ donationEvent: "Donation Event is required" });
  //   }
  // }
  // console.log(donationData.recipient.length);
  //     for (let i = 0; i < donationData.recipient.length; i++) {
  //       const recipientValidate = recipient;
       
  //       console.log(recipient);
  //       console.log(recipientValidate);
  //       const recipientErrors = {};

  //       if (!recipientValidate.emailID) {
  //         recipientErrors.emailID = "Email Id is required";
  //       }
  //       else if (
  //         !/^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\.([a-zA-Z]{2,5})$/.test(
  //           recipient.emailID
  //         )
  //       ) {
  //         recipientErrors.emailID = "Enter a Valid Email Address";
  //       }
  //       if (!recipientValidate.mobileNo ) {
  //         recipientErrors.mobileNo = "Mobile Number is required";
  //       }
  //       console.log(recipientValidate.mobileNo)
  //       // else if (!/^[0-9]{10}$/.test(recipient.mobileNo)) {
  //       //   recipientErrors.mobileNo = "Mobile No. must contain only 10 digits";
  //       // }
        

  //       if (!recipientValidate.address[0]?.street1) {
  //         recipientErrors.street1 = "Street 1 is required";
  //       }
  //       if (!recipientValidate.address[0]?.country) {
  //         recipientErrors.country = "Country is required";
  //       }
  //       if (!recipientValidate.address[0]?.state) {
  //         recipientErrors.state = "State 1 is required";
  //       }
  //       if (!recipientValidate.address[0]?.city) {
  //         recipientErrors.city = "City is required";
  //       }
  //       console.log(recipientErrors);
  //       // Add other recipient address validations here

  //       if (Object.keys(recipientErrors).length > 0) {
  //         errors.push(recipientErrors);
  //       }
  //     }
  //   }
  
   
  //   console.log(errors);
  //   setErrors(errors);
  //   console.log(errors.length === 0);
  // return errors.length === 0;
  // };



  const validate = () => {
    const validationErrors = [];

    // // Validate donationType
    // if (!donationType) {
    //   validationErrors.push({ field: "donationType", message: "Donation Type is required" });
    // }

    // Validate user data fields
    


    // Validate payment info
    console.log(donationData);
    console.log(donationData.paymentInfo[0]);

    if (donationData && donationData.paymentInfo) {
      for (let i = 0; i < donationData.paymentInfo.length; i++) {
        if (i === 1) {
          // Skip validation for paymentInfo[1]
          continue;
        }
        console.log(donationData.paymentInfo[0]);
        console.log(donationData.paymentInfo[i]);
        const payment = donationData.paymentInfo[i];

        console.log(payment);
        if (!payment.paymentMode) {
          validationErrors.push({ field: "donationData[0].paymentInfo[" + i + "].paymentMode", message: "Payment Mode is required" });
        }
        if (!payment.chqORddDate) {
          validationErrors.push({ field: "donationData[0].paymentInfo[" + i + "].chqORddDate", message: "ChqORddDate is required" });
        }
        if (!payment.paymentDate) {
          validationErrors.push({ field: "donationData[0].paymentInfo[" + i + "].paymentDate", message: "Payment Date is required" });
        }
        if (!payment.amount) {
          validationErrors.push({ field: "donationData[0].paymentInfo[" + i + "].amount", message: "Amount is required" });
        }
        if (!payment.bankName || payment.bankName.trim() === "") {
          validationErrors.push({ field: "donationData[0].paymentInfo[" + i + "].bankName", message: "Bank Name is required" });
        }
        if (!payment.chqORddNo) {
          validationErrors.push({ field: "donationData[0].paymentInfo[" + i + "].chqORddNo", message: "ChqORddNo is required" });
        }
      }
    }
console.log(validationErrors);
  
    if (donationData.donationType === "Gift-Donate") {

      console.log(donationData[0].donationEvent);
      if (!donationData[0]?.donationEvent) {
        validationErrors.push({ field: "donations.donationEvent", message: "Donation Event is required" });
      }



      for (let i = 0; i < recipient.length; i++) {
        const rec = recipient[i];

        if (!rec?.firstName) {
          validationErrors.push({ field: "recipient[" + i + "].firstName", message: "First Name is required" });
        } else if (/\d/.test(rec.firstName)) {
          validationErrors.push({ field: "recipient[" + i + "].firstName", message: "First Name should only contain alphabets" });
        }
        if (!rec?.lastName) {
          validationErrors.push({ field: "recipient[" + i + "].lastName", message: "Last Name is required" });
        } else if (/\d/.test(rec.lastName)) {
          validationErrors.push({ field: "recipient[" + i + "].lastName", message: "Last Name should only contain alphabets" });
        }

        if (!rec?.emailId) {
          validationErrors.push({ field: "recipient[" + i + "].emailId", message: "Email ID is required" });
        } else if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(rec.emailId)) {
          validationErrors.push({ field: "recipient[" + i + "].emailId", message: "Invalid Email ID" });
        }
        if (!rec?.mobileNo) {
          validationErrors.push({ field: "recipient[" + i + "].mobileNo", message: "Mobile Number is required" });
        } else if (!/^(?!.*[a-zA-Z])\d{10}$/.test(rec.mobileNo)) {
          validationErrors.push({ field: "recipient[" + i + "].mobileNo", message: "Mobile Number must contain exactly 10 digits and no alphabetic characters" });
        }

        if (!rec?.address[0]?.street1) {
          validationErrors.push({ field: "recipient[" + i + "].address[0].street1", message: "Recipient Street is required" });
        }
        if (!rec?.address[0]?.country) {
          validationErrors.push({ field: "recipient[" + i + "].address[0].country", message: "Recipient Country is required" });
        }
        if (!rec?.address[0]?.state) {
          validationErrors.push({ field: "recipient[" + i + "].address[0].state", message: "Recipient State is required" });
        }
      }
    }

    console.log(validationErrors);


    const errorMessages = validationErrors.map(error => `${error.field}: ${error.message}`);
    const errorMessageString = errorMessages.join("\n");

    console.log(errorMessageString);

    setErrors(validationErrors);

    return validationErrors.length === 0;
  };
console.log(errors.length === 0);




  // Update Donation data
  const updateDonation = async (e) => {
    e.preventDefault();
  
    const isValid = validate();
  
    let updatedFormData = null;
  
    if (isValid) {
      console.log(isValid);
      // Construct the updated form data
      const updatedRecipientData = {
        ...initialRecipientData[0],
        ...recipient,
      };
  
      const updatedDonationData = {
        ...donationData,
        userPackage: packageData,
        recipient: [updatedRecipientData],
      };
  
      updatedFormData = {
        formData: {
          user: {
            ...userData,
            donations: [updatedDonationData],
          },
        },
      };
    }
  
    setPackageData(packageData); // Set the updated package data to packageData state
  
    console.log(updatedFormData);
  
    if (updatedFormData) {
      try {
        // Make the API call only if the form data is valid
        const response = await DonationService.updateDonation(updatedFormData);
        console.log(response);
        // Process the API response as needed
        if (response?.status === "Data Update Successfully") {
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        console.error(error);
        // Handle any errors from the API call
      }
    }
  };
  
  
  



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
                    {donationData.donationType !== "Self-Donate" && (
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
                                />
                              </td>
                              <td className="w18p">
                                <input
                                  type="number"
                                  className="form-control-inside"
                                  value={item.maintenanceCost}
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
                          ))}
                          <tr>
                            <td className="text-right" colSpan="4">
                              Total
                            </td>
                            <td className="text-right">
                              <input
                                type="number"
                                className="form-control-inside"
                                value={totalAmountOfPackage}
                                disabled
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}


                  {/* ) : null
)} */}



                  {/* <div className="col-6 mt20">
                    <div className="row select-label">
                      <div className="col-4 "> General Donation</div>
                      <input
                        placeholder=" General Donation"
                        className="col-4 form-control-inside"
                        type="text"
                        value={donationData.generalDonation}
                      // onChange={(e) =>
                      //   setGeneralDonation(parseFloat(e.target.value))
                      // }
                      />
                    </div>
                  </div> */}

                  <hr />
                  {donationData.donationType !== "Self-Donate" && (
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
                                  type="text"
                                  value={recipient.address[0]?.street1 || ""}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("street1", e.target.value, 0)
                                  }
                                />
                                {errors.length > 0 && errors[1]?.street1 && (
                                  <div className="error-message red-text">
                                    {errors[1].street1}
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
                                  type="text"
                                  value={recipient.address[0].street2}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("street2", e.target.value, 0)
                                  }
                                />



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
                                  type="text"
                                  value={recipient.address[0].street3}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("street3", e.target.value, 0)
                                  }
                                />
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
                                  type="text"
                                  value={recipient.address[0].country}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("country", e.target.value, 0)
                                  }
                                />
                                {errors.length > 0 && errors[1]?.country && (
                                  <div className="error-message red-text">
                                    {errors[1].country}
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
                                {errors.length > 0 && errors[1]?.state && (
                                  <div className="error-message red-text">
                                    {errors[1].state}
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
                                  value={recipient.address[0].city}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("city", e.target.value, 0)
                                  }
                                />
                                {errors.length > 0 && errors[1]?.city && (
                                  <div className="error-message red-text">
                                    {errors[1].city}
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
                                  type="text"
                                  value={recipient.address[0].postalCode}
                                  onChange={(e) =>
                                    handleRecipentAddressChange("postalCode", e.target.value, 0)
                                  }
                                />
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
                                {errors[1]?.mobileNo && <div className="error-message red-text">{errors[1]?.mobileNo}</div>}
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
                                  name="emailID"
                                  value={recipient.emailID}
                                  onChange={(e) =>
                                    handleRecipientChange("emailID", e.target.value)
                                  }
                                />
                                {errors.length > 0 && errors[1]?.emailID && (
                                  <div className="error-message red-text">
                                    {errors[1].emailID}
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
                              <option disabled selected value="">Donar Type</option>
                              <option value="Cheque">Cheque</option>
                              <option value="Cash">Cash</option>
                            </select>
                            {errors[0]?.paymentMode && <div className="error-message red-text">{errors[0].paymentMode}</div>}
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
                              onChange={(event) =>
                                handlePaymentInfoChange(event, 0)
                              }
                            />
                            {errors[0]?.bankname && <div className="error-message red-text">{errors[0]?.bankname}</div>}
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
                            {errors[0]?.chqORddNo && <div className="error-message red-text">{errors[0]?.chqORddNo}</div>}
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
                            {errors[0]?.chqORddDate && <div className="error-message red-text">{errors[0]?.chqORddDate}</div>}
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
                            {errors[0]?.paymentDate && <div className="error-message red-text">{errors[0]?.paymentDate}</div>}
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
                            {errors[0]?.amount && <div className="error-message red-text">{errors[0]?.amount}</div>}
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
                                name="bankName"
                                placeholder="Bank Name"
                                type="text"
                                value={donationData.paymentInfo[1]?.bankName || ""}
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
