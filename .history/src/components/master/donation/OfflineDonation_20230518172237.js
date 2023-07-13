import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Tab, Tabs } from "react-bootstrap";

import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
import { DonationService } from "../../../services/donationService/donation.service";
import { SUCCESS } from "../../constants/constants";

function OfflineDonation() {
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
  const [generalDonation, setGeneralDonation] = useState(null);
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
      // setPageData(response?.result);
      // setData(response?.result?.productEntities);
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
    const response = await DonationService.getDetailsByEmailId(emailId);
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
      console.log(response.data.address[0].street3);
      setAddress((prevAddress) => ({
        ...prevAddress,
        street1: response.data.address[0].street1,
        street2: response.data.address[0].street2,
        street3: response.data.address[0].street3,
        country: response.data.address[0].country,
        state: response.data.address[0].state,
        city: response.data.address[0].city,
        postalCode: response.data.address[0].postalCode,
      }));
      console.log("Hiiiiiiiii");
      // console.log(response.data.donations[0]);
      setRecipientFirstName(response.data.donations[0].recipient[0].firstName);
      setRecipientLastName(response.data.donations[0].recipient[0].lastName);
      setRecipientEmailId(response.data.donations[0].recipient[0].emailId);
      setRecipientMobileNo(response.data.donations[0].recipient[0].mobileNo);
      setRecipientAddress((prevAddress) => ({
        ...prevAddress,
        street1: response.data.donations[0].recipient[0].address[0].street1,
        street2: response.data.donations[0].recipient[0].address[0].street2,
        street3: response.data.donations[0].recipient[0].address[0].street3,
        country: response.data.donations[0].recipient[0].address[0].country,
        state: response.data.donations[0].recipient[0].address[0].state,
        city: response.data.donations[0].recipient[0].address[0].city,
        postalCode: response.data.donations[0].recipient[0].address[0].postalCode,
      }));
      console.log("Hiiiii");
      console.log(response);
      console.log("Hiiiii");


      setDonarType(response.data.donarType);

      setTimeout(() => {
        // navigate("/ModelView");
      }, 2000);
    } else if (response?.statusCode === 409) {
      toast.error(response?.message);
    }
    // Call your function here or perform any desired actions
  };
const [activeTab, setActiveTab] = useState("selfDonate");
  const [tabValue, setTabValue] = useState("");

  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
    console.log(eventKey); // Log the value of tabValue

  };

  const handleTabValueChange = (event) => {
    setTabValue(event.target.value);
    console.log(event.target.value); // Log the value of tabValue

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
      <Tabs
        defaultActiveKey="NewDonor"
        id="uncontrolled-tab-example"
        className="newexti-tab"
      >
        <Tab eventKey="NewDonor" title="New Donor">
          <div className="section bggray">
            {/* <Container>
              <Row className="justify-content-between postionindex">
                <div className="interested-in-contact">
                  <div class="section-header text-center">
                    <h6 class="mb-5">
                      <em>
                        Whether you’re a investor, dealer, Business professional
                        or an investor, you can find the best way to contact us
                        from the list below.
                      </em>
                    </h6>
                    <h2 class="heading font-regular">I am interested In</h2>
                  </div>
                </div>
              </Row>
            </Container> */}
            {/* form */}

            <Container className="pt30">
              <Row className="justify-content-between bgwite border1 padding30 contact-form-wrap">
                {/* <h5>THANKS FOR YOUR INTEREST IN HARIYALI</h5> */}
                {/* <p>
                  Please provide your UserName and password, so we can help you
                  better!
                </p> */}

                <div className="col-12">
                  <Tabs
                    defaultActiveKey="selfDonate"
                    id="uncontrolled-tab-example"
                    className="mb-3 selftGift-tab "
                  >
                    <Tab eventKey="selfDonate" title="Self Donate">
                      <div className="pageheadingdiv mb30">Self Donate</div>
                      <p>
                        For millions of economically disadvantaged girls across
                        India, education is the only medium to grow, learn, play
                        and realise their full potential. Project Nanhi Kali
                        works not only to ensure that girls get access to
                        quality education, but also enables them to complete 10
                        years of schooling with dignity.
                        <br />
                        <br />
                        With my contribution, I can give a girl(s) the
                        opportunity to rewrite her future. She will be provided
                        with 360-degree support which will include daily
                        academic support and a school-supplies kit in a
                        conducive girl-friendly ecosystem around them.
                        <br />
                        <br />
                        From every donation, only 5% of the funds are retained
                        by the charity for administrative, marketing and fund
                        raising costs; the remaining 95% is utilised exclusively
                        towards our project expenses.
                      </p>
                      <form
                        className="form-div contact-form-wrap"
                      >
                        <hr />
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <label className="col-4 ">I want to opt</label>
                                <div className="col-8 p0">
                                  <input
                                    type="radio"
                                    name="activity"
                                    value="true"
                                    checked={isTaxBenefit === true}
                                    onChange={handleTaxBenefitChange}
                                    className="radioinput"
                                  />
                                  <label className="radiospan" checked>
                                    CSR Activity
                                  </label>
                                  <input
                                    type="radio"
                                    name="activity"
                                    value="false"
                                    checked={isTaxBenefit === false}
                                    onChange={handleTaxBenefitChange}
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
                              type="number"
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
                                <div className="col-4 "> Email ID</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="emailID"
                                    placeholder="Email ID"
                                    value={emailId}
                                    onBlur={handleBlur}
                                    onChange={handleEmailChange}
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
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Donor Type</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select"
                                    value={donarType}
                                    onChange={(e) => setDonarType(e.target.value)}>
                                    <option selected>Donar Type</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Retail">Retail</option>
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
                                    value={organisation}
                                    onChange={(e) =>
                                      setOrganisation(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
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

                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">PAN card</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    placeholder="PAN card No."
                                    type="text"
                                    value={panCard}
                                    onChange={(e) => setPanCard(e.target.value)}
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
                                    value={address.street1}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        street1: e.target.value,
                                      }))
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
                                    value={address.street2}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        street2: e.target.value,
                                      }))
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
                                    value={address.street3}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        street3: e.target.value,
                                      }))
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
                                    value={address.country}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        country: e.target.value,
                                      }))
                                    }
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
                                    value={address.state}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        state: e.target.value,
                                      }))
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
                                    value={address.city}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        city: e.target.value,
                                      }))
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
                                    value={address.postalCode}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        postalCode: e.target.value,
                                      }))
                                    }

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
                                <div className="col-4 "> Bank Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="BankName"
                                    placeholder="Bank Name"
                                    type="text"
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
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
                                    value={chqORddNo}
                                    onChange={(e) => setChqORddNo(e.target.value)}
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
                                    value={chqORddDate}
                                    onChange={(e) => setChqORddDate(e.target.value)}
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
                                    type="number"
                                    value={paymentAmount}
                                    onChange={(e) =>
                                      {
                                        if (e.target.value < 0) {
                                          e.target.value = 0;
  
                                        } setPaymentAmount(e.target.value)
                                      }}
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
                    <Tab eventKey="giftaPlant" title="Gift a Plant">
                      <div className="pageheadingdiv mb30">GIFT A PLANT</div>
                      <p>
                        For millions of economically disadvantaged girls across
                        India, education is the only medium to grow, learn, play
                        and realise their full potential. Project Nanhi Kali
                        works not only to ensure that girls get access to
                        quality education, but also enables them to complete 10
                        years of schooling with dignity.
                        <br />
                        <br />
                        With my contribution, I can give a girl(s) the
                        opportunity to rewrite her future. She will be provided
                        with 360-degree support which will include daily
                        academic support and a school-supplies kit in a
                        conducive girl-friendly ecosystem around them.
                        <br />
                        <br />
                        From every donation, only 5% of the funds are retained
                        by the charity for administrative, marketing and fund
                        raising costs; the remaining 95% is utilised exclusively
                        towards our project expenses.
                      </p>
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
                                    value={donationEvent}
                                    onChange={(e) => setDonationEvent(e.target.value)}>
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
                        <hr />
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <label className="col-4 ">I want to opt</label>
                                <div className="col-8 p0">
                                  <input
                                    type="radio"
                                    name="activity"
                                    value="true"
                                    checked={isTaxBenefit === true}
                                    onChange={handleTaxBenefitChange}
                                    className="radioinput"
                                  />
                                  <label className="radiospan" checked>
                                    CSR Activity
                                  </label>
                                  <input
                                    type="radio"
                                    name="activity"
                                    value="false"
                                    checked={isTaxBenefit === false}
                                    onChange={handleTaxBenefitChange}
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
                              type="number"
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
                                <div className="col-4 "> Email ID</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="emailID"
                                    placeholder="Email ID"
                                    value={emailId}
                                    onBlur={handleBlur}
                                    onChange={handleEmailChange}
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
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Donor Type</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select"
                                    value={donarType}
                                    onChange={(e) => setDonarType(e.target.value)}>
                                    <option selected>Donar Type</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Retail">Retail</option>
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
                                    value={organisation}
                                    onChange={(e) =>
                                      setOrganisation(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
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

                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">PAN card</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    placeholder="PAN card No."
                                    type="text"
                                    value={panCard}
                                    onChange={(e) => setPanCard(e.target.value)}
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
                                    value={address.street1}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        street1: e.target.value,
                                      }))
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
                                    value={address.street2}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        street2: e.target.value,
                                      }))
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
                                    value={address.street3}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        street3: e.target.value,
                                      }))
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
                                    value={address.country}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        country: e.target.value,
                                      }))
                                    }
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
                                    value={address.state}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        state: e.target.value,
                                      }))
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
                                    value={address.city}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        city: e.target.value,
                                      }))
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
                                    value={address.postalCode}
                                    onChange={(e) =>
                                      setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        postalCode: e.target.value,
                                      }))
                                    }
                                  />
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
                                    value={recipientAddress.street1}
                                    onChange={(e) =>
                                      setRecipientAddress((prevAddress) => ({
                                        ...prevAddress,
                                        street1: e.target.value,
                                      }))
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
                                    value={recipientAddress.street2}
                                    onChange={(e) =>
                                      setRecipientAddress((prevAddress) => ({
                                        ...prevAddress,
                                        street2: e.target.value,
                                      }))
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
                                    value={recipientAddress.street3}
                                    onChange={(e) =>
                                      setRecipientAddress((prevAddress) => ({
                                        ...prevAddress,
                                        street3: e.target.value,
                                      }))
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
                                    value={recipientAddress.country}
                                    onChange={(e) =>
                                      setRecipientAddress((prevAddress) => ({
                                        ...prevAddress,
                                        country: e.target.value,
                                      }))
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
                                    value={recipientAddress.state}
                                    onChange={(e) =>
                                      setRecipientAddress((prevAddress) => ({
                                        ...prevAddress,
                                        state: e.target.value,
                                      }))
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
                                    value={recipientAddress.city}
                                    onChange={(e) =>
                                      setRecipientAddress((prevAddress) => ({
                                        ...prevAddress,
                                        city: e.target.value,
                                      }))
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
                                    value={recipientAddress.postalCode}
                                    onChange={(e) =>
                                      setRecipientAddress((prevAddress) => ({
                                        ...prevAddress,
                                        postalCode: e.target.value,
                                      }))
                                    }
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
                                    value={recipientFirstName}
                                    onChange={(e) =>
                                      setRecipientFirstName(e.target.value)
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
                                    name="LastName"
                                    placeholder="Last Name"
                                    type="text"
                                    value={recipientLastName}
                                    onChange={(e) =>
                                      setRecipientLastName(e.target.value)
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
                                    name="Mobile No."
                                    placeholder="Mobile No."
                                    type="text"
                                    value={recipientMobileNo}
                                    onChange={(e) =>
                                      setRecipientMobileNo(e.target.value)
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
                                    name="Emailid"
                                    placeholder="Email Id"
                                    type="text"
                                    value={recipientEmailId}
                                    onChange={(e) =>
                                      setRecipientEmailId(e.target.value)
                                    }
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
                                <div className="col-4 "> Bank Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="BankName"
                                    placeholder="Bank Name"
                                    type="text"
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
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
                                    value={chqORddNo}
                                    onChange={(e) => setChqORddNo(e.target.value)}
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
                                    value={chqORddDate}
                                    onChange={(e) => setChqORddDate(e.target.value)}
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
                                    type="number"
                                    value={paymentAmount}
                                    onChange={(e) => {
                                      if (e.target.value < 0) {
                                        e.target.value = 0;

                                      } setPaymentAmount(e.target.value)
                                    }}
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
              </Row>
            </Container>
          </div>
        </Tab>
        <Tab eventKey="ExistingDonor" title="Existing Donor">
          <div className="section bggray">

            {/* form */}
            <Container className="pt30">
              <Row className="justify-content-between bgwite border1 padding30 contact-form-wrap">
                {/* <h5>THANKS FOR YOUR INTEREST IN HARIYALI</h5>
                <p>
                  Please provide your UserName and password, so we can help you
                  better!
                </p> */}

                <div className="col-12">
                  {/* <Tabs
                    defaultActiveKey="selfDonate"
                    id="uncontrolled-tab-example"
                    className="mb-3 selftGift-tab "
                  >
                    <Tab eventKey="selfDonate" title="Self Donate">
                      <div className="pageheadingdiv mb30">Self Donate</div>
                      <p>
                        For millions of economically disadvantaged girls across
                        India, education is the only medium to grow, learn, play
                        and realise their full potential. Project Nanhi Kali
                        works not only to ensure that girls get access to
                        quality education, but also enables them to complete 10
                        years of schooling with dignity.
                        <br />
                        <br />
                        With my contribution, I can give a girl(s) the
                        opportunity to rewrite her future. She will be provided
                        with 360-degree support which will include daily
                        academic support and a school-supplies kit in a
                        conducive girl-friendly ecosystem around them.
                        <br />
                        <br />
                        From every donation, only 5% of the funds are retained
                        by the charity for administrative, marketing and fund
                        raising costs; the remaining 95% is utilised exclusively
                        towards our project expenses.
                      </p>
                      <form
                        className="form-div contact-form-wrap"
                      >
                        <div className="col-12 mt20">
                          <div className="row ">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Donar ID</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="Donarid"
                                    placeholder="Donar ID"
                                  />
                                </div>
                              </div>
                            </div></div></div>
                        <hr />
                        <div className="col-12 pr15 mt20">
                          <div className="row">
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
                                    <option selected>Donar Type</option>
                                    <option value="0">Corporate</option>
                                    <option value="1">Retail</option>
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
                                    type="text" />
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
                                  <select
                                    className=" form-control-inside form-select"
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
                      </form>
                    </Tab>
                    <Tab eventKey="giftaPlant" title="Gift a Plant">
                      <div className="pageheadingdiv mb30">Gift a Plant</div>
                      <p>
                        For millions of economically disadvantaged girls across
                        India, education is the only medium to grow, learn, play
                        and realise their full potential. Project Nanhi Kali
                        works not only to ensure that girls get access to
                        quality education, but also enables them to complete 10
                        years of schooling with dignity.
                        <br />
                        <br />
                        With my contribution, I can give a girl(s) the
                        opportunity to rewrite her future. She will be provided
                        with 360-degree support which will include daily
                        academic support and a school-supplies kit in a
                        conducive girl-friendly ecosystem around them.
                        <br />
                        <br />
                        From every donation, only 5% of the funds are retained
                        by the charity for administrative, marketing and fund
                        raising costs; the remaining 95% is utilised exclusively
                        towards our project expenses.
                      </p>
                      <form
                        className="form-div contact-form-wrap"
                      >
                        <div className="col-12 mt20">
                          <div className="row ">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Donar ID</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="Donarid"
                                    placeholder="Donar ID"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Occasion</div>
                                <div className="col-8 p0">
                                  <select className=" form-control-inside form-select"
                                    value={donationEvent}
                                    onChange={(e) => setDonationEvent(e.target.value)}>
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
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="col-12 pr15 mt20">
                          <div className="row">
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
                                    <option selected>Donar Type</option>
                                    <option value="0">Corporate</option>
                                    <option value="1">Retail</option>
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
                                    type="text" />
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
                                  <select
                                    className=" form-control-inside form-select"
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
                                  <select
                                    className=" form-control-inside form-select"
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
                      </form>
                    </Tab>
                  </Tabs> */}
                </div>
              </Row>
            </Container>
          </div>
        </Tab>
      </Tabs>

      {/* body */}
    </>
  );
}

export default OfflineDonation;
