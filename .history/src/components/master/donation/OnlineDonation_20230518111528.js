import React from "react";
import { useState } from "react";
import Captcha from "../user/Captcha";
import { Container, Row, Tab, Tabs } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
import { DonationService } from "../../../services/donationService/donation.service";
import { SUCCESS } from "../../constants/constants";

function OnlineDonation() {
  const [verified, setVerified] = useState(false);
  const [packageData, setPackageData] = useState([
    {
      plan: "Arakuaaa",
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
  const [isTaxBenifit, setIsTaxBenifit] = useState(false);
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
          isTaxBenifit,
          panCard,
          address: [address],
          donations: [
            {
              donationType,
              donationMode,
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

  const totalAmountOfPackage = packageData.reduce(
    (amt, item) => amt + item.amount,
    0
  );

  const myValue1 = "Gift a Plant";
  const myValue2 = "Gift a Plant";
  const myValue3 = "Gift a Plant";

  const handleClick = (value) => {
    setDonationType(value);
    setDonationEvent("test");
    setDonationMode("test");
    console.log("Clicked with value:", value);
  };
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
    setPackageData([
      {
        plan: "Arakuaaa",
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
    setIsTaxBenifit(false);
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
        setDonarType(response.data.donarType);

        setTimeout(() => {
          // navigate("/ModelView");
        }, 2000);
      }
      // Call your function here or perform any desired actions
    };
  
    // const getByProductId = async (Id) => {
    //   const response = await ProductService.getProductById(Id);
    //   if (response?.status === SUCCESS) {
    //     setData(response.result);
    //     setFile(imageConvertion(response.result.productImage));
    //   } else {
    //     toast.error(response?.message);
    //   }
    // };
   
  return (
    <>
      <ToastContainer />
      {/* slider */}
      <div className="">
        <div className="slider-onheader">Planting Hope with us</div>
        <img src={Donateslid} alt="Donate" className="Donateslidimg" />
      </div>
      {/* slide info */}

      <div className="section bggray">
        {/* form */}
        <Container className="pt30">
          <Row className="justify-content-between bgwite border1 padding30 contact-form-wrap">
            <h5>THANKS FOR YOUR INTEREST IN HARIYALI</h5>
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
                    India, education is the only medium to grow, learn, play and
                    realise their full potential. Project Nanhi Kali works not
                    only to ensure that girls get access to quality education,
                    but also enables them to complete 10 years of schooling with
                    dignity.
                    <br />
                    <br />
                    With my contribution, I can give a girl(s) the opportunity
                    to rewrite her future. She will be provided with 360-degree
                    support which will include daily academic support and a
                    school-supplies kit in a conducive girl-friendly ecosystem
                    around them.
                    <br />
                    <br />
                    From every donation, only 5% of the funds are retained by
                    the charity for administrative, marketing and fund raising
                    costs; the remaining 95% is utilised exclusively towards our
                    project expenses.
                  </p>
                  <form
                    // onSubmit={userAdd}
                    className="form-div contact-form-wrap"
                  >
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
                          }

                          }
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
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
                                type="text"
                                name="mobileNo"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                placeholder="Mobile No."
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
                            </div>{" "}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Organisation</div>
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Last Name</div>
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">PAN card</div>
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
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
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
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
                    <div className="col-6 mt20">
                      <Captcha verified={false} setVerified={() => { }} id="captcha1" />
                    </div>
                    <hr />
                    <div className="col-12 mt20 select-label">
                      <input
                        type="checkbox"
                        name="Condition"
                        value="Condition"
                        className="checkboxinput"
                      />{" "}
                      Agree to the Terms And Condition
                    </div>
                    <button
                      type="submit"
                      className="mt20 mr10 webform-button--submit"
                      onClick={userAdd}
                    >
                      Donate
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
                  <div className="pageheadingdiv mb30">Gift a Plant</div>
                  <p>
                    For millions of economically disadvantaged girls across
                    India, education is the only medium to grow, learn, play and
                    realise their full potential. Project Nanhi Kali works not
                    only to ensure that girls get access to quality education,
                    but also enables them to complete 10 years of schooling with
                    dignity.
                    <br />
                    <br />
                    With my contribution, I can give a girl(s) the opportunity
                    to rewrite her future. She will be provided with 360-degree
                    support which will include daily academic support and a
                    school-supplies kit in a conducive girl-friendly ecosystem
                    around them.
                    <br />
                    <br />
                    From every donation, only 5% of the funds are retained by
                    the charity for administrative, marketing and fund raising
                    costs; the remaining 95% is utilised exclusively towards our
                    project expenses.
                  </p>
                  <form
                    onSubmit={userAdd}
                    className="form-div contact-form-wrap"
                  >
                    <div className="col-6 mt20">
                      <div className="row select-label">
                        <div className="col-4 ">Occasion</div>
                        <div className="col-6">
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
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
                                type="text"
                                name="emailID"
                                placeholder="Email ID"
                                value={emailId}
                                onChange={handleEmailChange}
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
                                type="text"
                                name="mobileNo"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                placeholder="Mobile No."
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
                            </div>{" "}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Organisation</div>
                            <div className="col-8  p0">
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
                                value={recipientPrefix}
                                onChange={(e) => setRecipientPrefix(e.target.value)}>
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
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Last Name</div>
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">PAN card</div>
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
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
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
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
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
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
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
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
                            <div className="col-4 ">State</div>
                            <div className="col-8  p0">
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
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
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
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
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
                            <div className="col-4 ">Mobile No.</div>
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
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
                            <div className="col-4 ">Email ID</div>
                            <div className="col-8  p0">
                              <input
                                className="form-control-inside"
                                placeholder="Email ID"
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
                    <div className="col-6 mt20">
                      <Captcha verified={false} setVerified={() => { }} id="captcha2" />
                    </div>
                    <hr />
                    <div className="col-12 mt20 select-label">
                      <input
                        type="checkbox"
                        name="Condition"
                        value="Condition"
                        className="checkboxinput"
                      />{" "}
                      Agree to the Terms And Condition
                    </div>
                    <button
                      type="submit"
                      className="mt20 mr10 webform-button--submit"
                      onClick={userAdd}
                    >
                      Donate
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
                      onClick={clearForm}>
                      Clear
                    </button>
                  </form>
                </Tab>
              </Tabs>
            </div>
          </Row>
        </Container>
      </div>

      {/* body */}
    </>
  );
}

export default OnlineDonation;
