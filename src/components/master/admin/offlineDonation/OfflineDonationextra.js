import React from "react";
import { useState } from "react";
import Captcha from "../user/Captcha";
import { Container, Row, Tab, Tabs } from "react-bootstrap";

import Donateslid from "../../../assets/img/slider/Donateslid.jpg";

function OfflineDonation() {
  const [verified, setVerified] = useState(false);
  const [formData, setFormData] = useState({
    user: {
      firstName: "",
      lastName: "",
      mobileNo: "",
      emailID: "",
      donarType: "",
      Prefix: "",
      organisation: "",
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
  });

  const [data, setData] = useState([
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

  const handleNoBouquetChange = (index, value) => {
    if (value < 0) {
      value = 0;
    }
    const newData = [...data];
    newData[index].noBouquet = value;
    newData[index].amount =
      newData[index].priceBouquet * value + newData[index].maintenance;
    setData(newData);
  };

  const totalAmount = data.reduce((amt, item) => amt + item.amount, 0);
  // submit

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default form submission behavior

    // handle form submission logic here
    console.log(formData);
  };

  const handleChange = (event) => {
    // update form data when user inputs values
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      user: {
        ...prevFormData.user,
        [name]: value,
      },
    }));
  };

  return (
    <>
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
                    onSubmit={handleSubmit}
                    className="form-div contact-form-wrap"
                  >
                    {/* <hr />
                    <div className="col-12 pr15 mt20">
                      <div className="row">
                        <div className="col-12">
                          <div className="row select-label">
                            <div className="col-4 ">I want to opt</div>
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
                    </div> */}
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
                          {data.map((item, index) => {
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
                            <input
                              className="col-8 form-control-inside"
                              type="text"
                              name="emailID"
                              placeholder="Email ID"
                              value={formData.user.emailID}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Mobile No.</div>
                            <input
                              className="col-8 form-control-inside"
                              type="text"
                              name="mobileNo"
                              value={formData.user.mobileNo}
                              onChange={handleChange}
                              placeholder="Mobile No."
                            />
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
                            {/* <input
                              className="col-8 form-control-inside"
                              name="donarType"
                              placeholder="Donor Type"
                              type="text"
                              value={formData.user.donarType}
                              onChange={handleChange}
                            /> */}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Organisation</div>
                            <input
                              className="col-8 form-control-inside"
                              name="organisation"
                              placeholder="Organisation"
                              type="text"
                              value={formData.user.organisation}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Prefix</div>
                            <input
                              className="col-8 form-control-inside"
                              name="Prefix"
                              placeholder="Prefix"
                              value={formData.user.Prefix}
                              type="text"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">First Name</div>
                            <input
                              className="col-8 form-control-inside"
                              type="text"
                              name="firstName"
                              value={formData.user.firstName}
                              onChange={handleChange}
                              placeholder="First Name"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Last Name</div>
                            <input
                              className="col-8 form-control-inside"
                              type="text"
                              name="lastName"
                              value={formData.user.lastName}
                              onChange={handleChange}
                              placeholder="Last Name"
                            />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">PAN card</div>
                            <input
                              className="col-8 form-control-inside"
                              placeholder="PAN card No."
                              type="text"
                            />
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
                            <input
                              className="col-8 form-control-inside"
                              name="street1"
                              placeholder=" Street 1"
                              type="text"
                              value={
                                formData?.user?.address?.[0]?.street1 ?? ""
                              }
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        street1: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Street 2</div>
                            <input
                              className="col-8 form-control-inside"
                              name="street2"
                              placeholder="Street 2"
                              type="text"
                              value={
                                formData?.user?.address?.[0]?.street2 ?? ""
                              }
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        street2: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Street 3</div>
                            <input
                              className="col-8 form-control-inside"
                              name="street3"
                              placeholder="Street 3"
                              type="text"
                              value={formData?.user?.address[0]?.street3 ?? ""}
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        street3: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Country</div>
                            <input
                              className="col-8 form-control-inside"
                              name="country"
                              placeholder="Country"
                              type="text"
                              value={formData?.user?.address[0]?.country ?? ""}
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        country: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">State</div>
                            <input
                              className="col-8 form-control-inside"
                              name="state"
                              placeholder="State"
                              type="text"
                              value={formData?.user?.address?.[0]?.state ?? ""}
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        state: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">City</div>
                            <input
                              className="col-8 form-control-inside"
                              name="city"
                              placeholder="City"
                              type="text"
                              value={formData?.user?.address?.[0]?.city ?? ""}
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        city: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Postal Code</div>
                            <input
                              className="col-8 form-control-inside"
                              name="postalCode"
                              placeholder="Postal Code"
                              type="text"
                              value={
                                formData?.user?.address?.[0]?.postalCode ?? ""
                              }
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        postalCode: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <hr />
                    <div className="actionheadingdiv">
                      Tax Benefit u/s 80G of the Income Tax Act,1961
                    </div>
                    <div className="col-12 pr15 mt20">
                      <div className="row">
                        <div className="col-12">
                          <div className="row select-label">
                            <div className="col-4 ">
                              {" "}
                              Do you want to avail Tax Benefit?{" "}
                            </div>
                            <div className="col-8 p0">
                              <input
                                type="radio"
                                name="yesNo"
                                value="yes"
                                className="radioinput"
                              />
                              <label className="radiospan" checked>
                                Yes
                              </label>
                              <input
                                type="radio"
                                name="yesNo"
                                value="no"
                                className="radioinput"
                              />
                              <label className="radiospan">No</label>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </div> */}
                    <hr />
                    <div className="col-6 mt20">
                      <Captcha
                        verified={verified}
                        setVerified={setVerified}
                      ></Captcha>
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
                    >
                      Donate
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
                    // onSubmit={handleSubmit}
                    className="form-div contact-form-wrap"
                  >
                    <div className="col-6 mt20">
                      <div className="row select-label">
                        <div className="col-4 ">Occasion</div>
                        {/* <input
                          placeholder=" General Donation"
                          className="col-4 form-control-inside"
                          type="text"
                        /> */}
                        <div className="col-6">
                          <select className=" form-control-inside form-select">
                            <option selected>Occasion</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
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
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => {
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
                            <td className="text-right" colSpan="3">
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
                            <input
                              className="col-8 form-control-inside"
                              type="text"
                              name="emailID"
                              value={formData.user.emailID}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Mobile No.</div>
                            <input
                              className="col-8 form-control-inside"
                              type="text"
                              name="mobileNo"
                              value={formData.user.mobileNo}
                              onChange={handleChange}
                            />
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
                            {/* <input
                              className="col-8 form-control-inside"
                              name="donarType"
                              placeholder="Donor Type"
                              type="text"
                              value={formData.user.donarType}
                              onChange={handleChange}
                            /> */}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Organisation</div>
                            <input
                              className="col-8 form-control-inside"
                              name="organisation"
                              placeholder="Organisation"
                              type="text"
                              value={formData.user.organisation}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Prefix</div>
                            <input
                              className="col-8 form-control-inside"
                              name="Prefix"
                              placeholder="Prefix"
                              value={formData.user.Prefix}
                              type="text"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">First Name</div>
                            <input
                              className="col-8 form-control-inside"
                              type="text"
                              name="firstName"
                              value={formData.user.firstName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Last Name</div>
                            <input
                              className="col-8 form-control-inside"
                              type="text"
                              name="lastName"
                              value={formData.user.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">PAN card</div>
                            <input
                              className="col-8 form-control-inside"
                              placeholder="PAN card No."
                              type="text"
                            />
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
                            <input
                              className="col-8 form-control-inside"
                              name="street1"
                              placeholder=" Street 1"
                              type="text"
                              value={
                                formData?.user?.address?.[0]?.street1 ?? ""
                              }
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        street1: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Street 2</div>
                            <input
                              className="col-8 form-control-inside"
                              name="street2"
                              placeholder="Street 2"
                              type="text"
                              value={
                                formData?.user?.address?.[0]?.street2 ?? ""
                              }
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        street2: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Street 3</div>
                            <input
                              className="col-8 form-control-inside"
                              name="street3"
                              placeholder="Street 3"
                              type="text"
                              value={formData?.user?.address[0]?.street3 ?? ""}
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        street3: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Country</div>
                            <input
                              className="col-8 form-control-inside"
                              name="country"
                              placeholder="Country"
                              type="text"
                              value={formData?.user?.address[0]?.country ?? ""}
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        country: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">State</div>
                            <input
                              className="col-8 form-control-inside"
                              name="state"
                              placeholder="State"
                              type="text"
                              value={formData?.user?.address?.[0]?.state ?? ""}
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        state: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">City</div>
                            <input
                              className="col-8 form-control-inside"
                              name="city"
                              placeholder="City"
                              type="text"
                              value={formData?.user?.address?.[0]?.city ?? ""}
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        city: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Postal Code</div>
                            <input
                              className="col-8 form-control-inside"
                              name="postalCode"
                              placeholder="Postal Code"
                              type="text"
                              value={
                                formData?.user?.address?.[0]?.postalCode ?? ""
                              }
                              onChange={(event) => {
                                const { value } = event.target;
                                setFormData((prevFormData) => ({
                                  ...prevFormData,
                                  user: {
                                    ...prevFormData.user,
                                    address: [
                                      {
                                        ...prevFormData.user.address[0],
                                        postalCode: value,
                                      },
                                      ...prevFormData.user.address.slice(1),
                                    ],
                                  },
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="actionheadingdiv">Details of Recipient</div>
                    <div className="col-12 pr15 mt20">
                      <div className="row">
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Street 1</div>
                            <input
                              placeholder=" Street 1"
                              className="col-8 form-control-inside"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Street 2</div>
                            <input
                              placeholder="Street 2"
                              className="col-8 form-control-inside"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Street 3</div>
                            <input
                              placeholder="Street 3"
                              className="col-8 form-control-inside"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Country</div>
                            <input
                              placeholder="Country"
                              className="col-8 form-control-inside"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">State</div>
                            <input
                              placeholder="State"
                              className="col-8 form-control-inside"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">City</div>
                            <input
                              placeholder="City"
                              className="col-8 form-control-inside"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Postal Code</div>
                            <input
                              placeholder="Postal Code"
                              className="col-8 form-control-inside"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Mobile No.</div>
                            <input
                              placeholder="Mobile No."
                              className="col-8 form-control-inside"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 ">Email ID</div>
                            <input
                              placeholder="Email ID"
                              className="col-8 form-control-inside"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="col-6 mt20">
                      <Captcha
                        verified={verified}
                        setVerified={setVerified}
                      ></Captcha>
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
                      className="mt20 webform-button--submit button button--primary js-form-submit form-submit"
                    >
                      Donate
                    </button>
                    <button
                      type="submit"
                      className="mt20 webform-button--submit button button--primary js-form-submit form-submit"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="mt20 webform-button--submit button button--primary js-form-submit form-submit"
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

      {/* body */}
    </>
  );
}

export default OfflineDonation;
