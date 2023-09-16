import React, { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DonationService } from "../../../../services/donationService/donation.service";
import { BANK_TRANSFER, CHEQUE, stateOptions } from "../../../constants/constants";
import { useParams, useNavigate } from "react-router-dom";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import Loader from "../../../common/loader/Loader";
import PaymentDetails from "../../../common/PaymentDetails";
// nyn
function OfflineDonationPay() {
  const navigate = useNavigate();
  const id = useParams().id;
  const initialPackageData = [
    {
      packageId: null,
      packageName: "",
      bouquetPrice: "",
      noOfBouquets: "",
      amount: "",
    },
    {
      packageId: null,
      packageName: "",
      bouquetPrice: "",
      noOfBouquets: "",
      amount: "",
    },
  ];

  const [packageData, setPackageData] = useState(initialPackageData);

  const initialUserData = {
    user: {
      emailId: "",
      donorId: "",
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
          paymentInfoId: "",
          paymentMode: "",
          bankName: "",
          chqORddNo: "",
          chqORddDate: "",
          paymentDate: "",
          amount: "",
          donation: "",
          remark: "",
          paymentTrackingId: "",
          bankPaymentRefNo: "",
          cardName: "",
          currency: "",
          paymentStatus: "",
          orderId: "",
          accountId: "",
          receiptDate: "",
          receivedAmount: "",
          bankCharge: "",
          documentNumber: "",
          bankAddress: "",
          depositNumber: "",
          depositDate: "",
          receiptNumber: "",
          realizationDate: "",
          creditCardNumber: "",
          cardExpiry: "",
          cardHolderName: "",
          chequeNumber: "",
          chequeDate: "",
          demandDraftNumber: "",
          demandDraftDate: "",
          totalAmount: "",
        },
        {
          paymentInfoId: "",
          paymentMode: "",
          bankName: "",
          chqORddNo: "",
          chqORddDate: "",
          paymentDate: "",
          amount: "",
          donation: "",
          remark: "",
          paymentTrackingId: "",
          bankPaymentRefNo: "",
          cardName: "",
          currency: "",
          paymentStatus: "",
          orderId: "",
          accountId: "",
          receiptDate: "",
          receivedAmount: "",
          bankCharge: "",
          documentNumber: "",
          bankAddress: "",
          depositNumber: "",
          depositDate: "",
          receiptNumber: "",
          realizationDate: "",
          creditCardNumber: "",
          cardExpiry: "",
          cardHolderName: "",
          chequeNumber: "",
          chequeDate: "",
          demandDraftNumber: "",
          demandDraftDate: "",
          totalAmount: "",
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
  const [loading, setLoading] = useState(false);

  const handleChangeNumberOfBouquets = (e, row, rowIndex) => {
    let { name, value } = e.target;
    console.log({ name, value, rowIndex }, row);
    let userPackageData = packageData;
    userPackageData[rowIndex][name] = value;

    const totalCost = row.bouquetPrice * row.noOfBouquets;
    userPackageData[rowIndex]["amount"] = totalCost;
    setPackageData(userPackageData);
    calculateOverallTotal();
    console.log(userPackageData);
  };
  const calculateOverallTotal = () => {
    const totalAmountOfPackage = packageData.reduce(
      (accumulator, packageItem) => {
        return (
          accumulator + packageItem.bouquetPrice * packageItem.noOfBouquets
        );
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
  };

  const handleRecipentAddressChange = (name, value, index) => {
    const updatedRecipient = { ...recipient };
    updatedRecipient.address[index] = {
      ...updatedRecipient.address[index],
      [name]: value,
    };
    setRecipient(updatedRecipient);
  };

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
      setLoading(true);
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
              noOfBouquets: packageItem.noOfBouquets,
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
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log(recipient);
  // console.log(donationData.recipient[0]);

  const [errors, setErrors] = useState({});

  // test
  const validate = () => {
    const errors = {};

    // Payment validation
    // Validate payment info
    if (donationData && donationData[0]?.paymentInfo) {
      for (let i = 0; i < donationData[0].paymentInfo.length; i++) {
        
        const payment = donationData[0].paymentInfo[i];

        if (!payment.paymentMode) {
          errors.push({
            field: "donationData[0].paymentInfo[" + i + "].paymentMode",
            message: "Payment Mode is required",
          });
        }
        if (!payment.paymentDate) {
          errors.push({
            field: "donationData[0].paymentInfo[" + i + "].paymentDate",
            message: "Payment Date is required",
          });
        }
        if (!payment.amount) {
          errors.push({
            field: "donationData[0].paymentInfo[" + i + "].amount",
            message: "Amount is required",
          });
        }
        if (!payment.totalAmount) {
          errors.push({
            field: "donationData[0].paymentInfo[" + i + "].totalAmount",
            message: "Total Amount is required",
          });
        }
        if (!payment.paymentStatus) {
          errors.push({
            field: "donationData[0].paymentInfo[" + i + "].paymentStatus",
            message: "Payment Status is required",
          });
        }
        if (!payment.receiptDate) {
          errors.push({
            field: "donationData[0].paymentInfo[" + i + "].receiptDate",
            message: "Receipt Date is required",
          });
        }

        if (!payment.accountId || payment.accountId.trim() === "") {
          errors.push({
            field: "donationData[0].paymentInfo[" + i + "].accountId",
            message: "Bank Account is required",
          });
        }
        if (
          donationData[0]?.paymentInfo[i].paymentMode === BANK_TRANSFER ||
          donationData[0]?.paymentInfo[i].paymentMode === CHEQUE
        ) {
          if (!payment.receivedAmount) {
            errors.push({
              field: "donationData[0].paymentInfo[" + i + "].receivedAmount",
              message: "Received Date is required",
            });
          }
        }
      }
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
      } else if (!/^[6-9]\d{9}$/.test(recipient.mobileNo)) {
        errors.mobileNo =
          "Invalid mobile number, mobile no contain only 10 digits.";
      }

      if (!recipient.address[0].street1) {
        errors.street1 = "Street 1 is required";
      }
      if (!recipient.address[0].street2) {
        errors.street2 = "Street 2 is required";
      }
      if (!recipient.address[0].street3) {
        errors.street3 = "Street 2 is required";
      }
      if (!recipient.address[0].state) {
        errors.street1 = "Street 1 is required";
      }
      if (!recipient.address[0].city) {
        errors.city = "City 1 is required";
      }
      if (!recipient.address[0].postalCode) {
        errors.postalCode = "Postal code is required";
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
      } else {
        updatedDonationData.recipient = [];
        updatedDonationData.recipient = [
          ...updatedDonationData.recipient,
          recipient,
        ];
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
        setLoading(true);
        // Make the API call
        const response = await DonationService.updateDonation(updatedFormData);
        console.log(response);
        // Process the API response as needed
        if (response?.status) {
          toast.success(response?.message);
          setLoading(false);
        } else {
          toast.error(response?.message);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        // Handle any errors from the API call
      }
    } else {
      // Handle validation errors here, e.g., show error messages to the user
      console.log("Validation Errors:", validationErrors);
    }
  };

  const handleBack = () => {
    navigate(`/DonarView/${userData.emailId}`);
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
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
                    {donationData.donationType.toUpperCase() !==
                      "SELF-DONATE" && (
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
                              onChange={(e) =>
                                handleDonationChange(
                                  "donationEvent",
                                  e.target.value
                                )
                              }
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
                      <table>
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
                                  name="noOfBouquets"
                                  value={item.noOfBouquets}
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
                  {donationData.donationType.toUpperCase() !==
                    "SELF-DONATE" && (
                    <>
                      <div className="actionheadingdiv">
                        DETAILS OF RECIPIENT
                      </div>
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
                                    handleRecipentAddressChange(
                                      "street1",
                                      e.target.value,
                                      0
                                    )
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
                                    handleRecipentAddressChange(
                                      "street2",
                                      e.target.value,
                                      0
                                    )
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
                                    handleRecipentAddressChange(
                                      "street3",
                                      e.target.value,
                                      0
                                    )
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
                                    handleRecipentAddressChange(
                                      "country",
                                      e.target.value,
                                      0
                                    )
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
                                    handleRecipentAddressChange(
                                      "state",
                                      e.target.value,
                                      0
                                    )
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
                                    handleRecipentAddressChange(
                                      "city",
                                      e.target.value,
                                      0
                                    )
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
                                    handleRecipentAddressChange(
                                      "postalCode",
                                      e.target.value,
                                      0
                                    )
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
                                    handleRecipientChange(
                                      "mobileNo",
                                      e.target.value
                                    )
                                  }
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
                              <div className="col-4 ">Email ID</div>
                              <div className="col-8  p0">
                                <input
                                  className="form-control-inside"
                                  placeholder="Email ID"
                                  type="text"
                                  name="emailId"
                                  value={recipient.emailId}
                                  onChange={(e) =>
                                    handleRecipientChange(
                                      "emailId",
                                      e.target.value
                                    )
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

                  <div className="actionheadingdiv">
                    Mode of Payment
                    <div
                      className="float-right addminicon"
                      onClick={addpaymenticon}
                    >
                      <FaPlusSquare />
                    </div>
                  </div>
                  <PaymentDetails
                    donations={donationData}
                    errors={errors}
                    handlePaymentInfoChange={handlePaymentInfoChange}
                    index={0}
                    setLoading={setLoading}
                  />

                  <button
                    type="submit"
                    className="mt20 mr10 webform-button--submit"
                    onClick={(e) => updateDonation(e)}
                  >
                    Update
                  </button>

                  <button
                    className="mt20 mr10 webform-button--cancel"
                    onClick={handleBack}
                  >
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
