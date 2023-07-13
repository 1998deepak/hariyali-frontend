import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Tab, Tabs } from "react-bootstrap";

import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
<<<<<<< HEAD
import { DonationService } from "../../../services/donationService/donation.service";
=======
import { UserService } from "../../../services/donationService/donation.service";
>>>>>>> f2fda960543b55888fa42072bf4e21b00466b0a7
import { SUCCESS } from "../../constants/constants";

function OfflineDonationPay() {
  const [packageData, setPackageData] = useState([
    {
      plan: "Araku",
      priceBouquet: 22,
      noBouquet: "",
      maintenance: 100,
      amount: "",
    },
    {
      plan: "Solan",
      priceBouquet: 22,
      noBouquet: "",
      maintenance: 100,
      amount: "",
    },
    {
      plan: "Punjab",
      priceBouquet: 22,
      noBouquet: "",
      maintenance: 100,
      amount: "",
    },
    {
      plan: "UP",
      priceBouquet: 22,
      noBouquet: "",
      maintenance: 100,
      amount: "",
    },
  ]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [donarType, setDonarType] = useState("");
  const [prefix, setPrefix] = useState("");
  const [organisation, setOrganisation] = useState("");
  // User Form Data State
  const [isTaxBenefit, setIsTaxBenefit] = useState(false);

  const [panCard, setPanCard] = useState("");
  const [address, setAddress] = useState({
    street1: "",
    street2: "",
    street3: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  });
  const [donationType, setDonationType] = useState("");
  const [activityType, setActivityType] = useState('');
  const [donationMode, setDonationMode] = useState("online");
  const [donationEvent, setDonationEvent] = useState("");
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [generalDonation, setGeneralDonation] = useState('');
  const [packageName, setPackageName] = useState("");
  const [usePackage, setUsePackage] = useState(packageData);
  const [bouquetPrice, setBouquetPrice] = useState(0.0);
  const [noOfBouquets, setNoOfBouquets] = useState(0);
  const [maintenanceCost, setMaintenanceCost] = useState();
  const [amount, setAmount] = useState(0.0);
  const [recipientFirstName, setRecipientFirstName] = useState("");
  const [recipientLastName, setRecipientLastName] = useState("");
  const [recipientMobileNo, setRecipientMobileNo] = useState("");
  const [recipientEmailId, setRecipientEmailId] = useState("");
  const [recipientPrefix, setRecipientPrefix] = useState("");
  const [recipientAddress, setRecipientAddress] = useState({
    street1: "",
    street2: "",
    street3: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  });

  // Payment Info Form Data State
  const [paymentMode, setPaymentMode] = useState('');
  const [bankName, setBankName] = useState('');
  const [chqORddNo, setChqORddNo] = useState('');
  const [chqORddDate, setChqORddDate] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(null);



  const userAdd = async (e) => {
    e.preventDefault();

    let updatedUserPackage = usePackage;
    if (generalDonation > 0) {
      updatedUserPackage = [
        {
          packageName,
          bouquetPrice,
          NoOfBouquets: noOfBouquets,
          maintenanceCost,
          amount,
        },
      ];
    }

    const formData = {
      formData: {
        user: {
          firstName,
          lastName,
          mobileNo,
          emailId,
          donarType,
          prefix,
          organisation,
          isTaxBenefit,
          panCard,
          address: [address],
          donations: [
            {
              donationType,
              donationMode,
              activityType: isTaxBenefit === true ? "CSR-Activity" : "NON-CSR Activity",
              donationEvent,
              totalAmount: generalDonation > 0 ? null : totalAmountOfPackage,
              generalDonation,
              userPackage: generalDonation > 0 ? [] : updatedUserPackage,
              recipient: [
                {
                  firstName: recipientFirstName,
                  lastName: recipientLastName,
                  mobileNo: recipientMobileNo,
                  emailID: recipientEmailId,
                  prefix: recipientPrefix,
                  address: [recipientAddress],
                },
              ],
              paymentInfo: {
                paymentMode,
                bankname: bankName,
                chqORddNo,
                chqORddDate,
                paymentDate,
                amount: paymentAmount
              }
            },
          ],
        },
      },
    };

    // Send the form data as JSON
    console.log(formData);
    console.log(JSON.stringify(formData));

    console.log(formData);
<<<<<<< HEAD
    const response = await DonationService.Adduser(formData);
=======
    const response = await UserService.Adduser(formData);
>>>>>>> f2fda960543b55888fa42072bf4e21b00466b0a7
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

  const handleNoBouquetChange = (index, value) => {
    if (value < 0) {
      value = 0;
    }
    const newData = [...packageData];
    newData[index].noBouquet = value;
    newData[index].amount =
      newData[index].priceBouquet * value + newData[index].maintenance;
    setPackageData(newData);
  };

  const totalAmountOfPackage = packageData.reduce((amt, item) => amt + item.amount, 0);
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

  const handleTaxBenefitChange = (e) => {
    setIsTaxBenefit(e.target.value === 'true');
  };

  const clearForm = (e) => {
    e.preventDefault();
    setPackageData([
      {
        plan: "Araku",
        priceBouquet: 22,
        noBouquet: "",
        maintenance: 100,
        amount: "",
      },
      {
        plan: "Solan",
        priceBouquet: 22,
        noBouquet: "",
        maintenance: 100,
        amount: "",
      },
      {
        plan: "Punjab",
        priceBouquet: 22,
        noBouquet: "",
        maintenance: 100,
        amount: "",
      },
      {
        plan: "UP",
        priceBouquet: 22,
        noBouquet: "",
        maintenance: 100,
        amount: "",
      },
    ]);

    setFirstName("");
    setLastName("");
    setMobileNo("");
    setEmailId("");
    setDonarType("");
    setPrefix("");
    setOrganisation("");
    setIsTaxBenefit(false);
    setPanCard("");
    setAddress({
      street1: "",
      street2: "",
      street3: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
    });
    setDonationType("");
    setDonationMode("online");
    setDonationEvent("");
    setTotalAmount(0.0);
    setGeneralDonation(null);
    setPackageName("");
    setUsePackage(packageData);
    setBouquetPrice(0.0);
    setNoOfBouquets(0);
    setMaintenanceCost();
    setAmount(0.0);
    setRecipientFirstName("");
    setRecipientLastName("");
    setRecipientMobileNo("");
    setRecipientEmailId("");
    setRecipientPrefix("");
    setRecipientAddress({
      street1: "",
      street2: "",
      street3: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
    });

    // Payment Info Form Data State
    setPaymentMode('');
    setBankName('');
    setChqORddNo('');
    setChqORddDate('');
    setPaymentDate('');
    setPaymentAmount("");
  };

  const handleEmailChange = (e) => {
    setEmailId(e.target.value);
  };
  const handleBlur = async () => {
    console.log(emailId);
<<<<<<< HEAD
    const response = await DonationService.getDetailsByEmailId(emailId);
=======
    const response = await UserService.getDetailsByEmailId(emailId);
>>>>>>> f2fda960543b55888fa42072bf4e21b00466b0a7
    console.log('Input field blurredccccccccccccccccccccccc');
    console.log(response);
    if (response?.status === SUCCESS) {
      toast.success(response?.message);
      console.log(response.data);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setIsTaxBenefit(response.data.isTaxBenifit);
      setMobileNo(response.data.mobileNo);
      setOrganisation(response.data.organisation);
      setPanCard(response.data.panCard);
      setPrefix(response.data.prefix);
      



      setDonarType(response.data.donarType);

      setTimeout(() => {
        // navigate("/ModelView");
      }, 2000);
    } else if (response?.statusCode === 409) {
      toast.error(response?.message);
    }
    // Call your function here or perform any desired actions
  };


  return (
    <>
      <ToastContainer />
      {/* slider */}
      <div className="">
        <div className="slider-onheader">PLANTING HOPE WITH US</div>
        <img src={Donateslid} alt="Donate" className="Donateslidimg" />
      </div>
      {/* slide info */}
      <div className="section bggray">
           

            <Container className="pt30">
              <Row className="justify-content-between bgwite border1 padding30 contact-form-wrap">
              <div className="pageheadingdiv mb30">Offline Donation </div>

                <div className="col-12">
                  
                      <form
                        className="form-div contact-form-wrap"
                      >
                        <div className="col-6">
                    <div className="row select-label">
                      <div className="col-4 "> Donar ID</div>
                      <div className="col-8 p0">
                        <input
                          className="form-control-inside"
                          type="text"
                          name="DonarID"
                          placeholder="Donar ID"
                          />
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
                                        onChange={(e) =>
                                          handleNoBouquetChange(
                                            index,
                                            e.target.value
                                          )
                                        }
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
                                    value={totalAmountOfPackage}
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
                              value={generalDonation}
                              onChange={(e) => {
                                if (e.target.value < 0) {
                                  e.target.value = 0;
                                }
                                setGeneralDonation(e.target.value)
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
                                <div className="col-4 ">Prefix</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select"
                                    value={prefix}
                                    onChange={(e) => setPrefix(e.target.value)}>
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
                                    name="firstName"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
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
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                  />
                                </div>
                              </div>{" "}
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
                                  <select className=" form-control-inside form-select" value={paymentMode}
                                    onChange={(e) => setPaymentMode(e.target.value)}>
                                    <option selected>Donar Type</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Cash">Cash</option>
                                  </select>
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
                                    value={paymentDate}
                                    onChange={(e) => setPaymentDate(e.target.value)}
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
                                    type="text"
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Amount in Word</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="AmountWord"
                                    placeholder="Amount in Word"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--submit"
                          onClick={userAdd}
                        >
                          Pay
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
                </div>
              </Row>
            </Container>
          </div>
      {/* body */}
    </>
  );
}

export default OfflineDonationPay;
