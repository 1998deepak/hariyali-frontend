import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DonationService } from "../../../../services/donationService/donation.service";
import { useParams, useNavigate } from "react-router-dom";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { stateOptions } from "../../../constants/constants";
import Loader from "../../../common/loader/Loader";

function UserSpecificDonationView() {

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
      emailId: '',
      donorId: '',
    },
  };
  const intialDonations = [
    {
      donationcode:"",
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
  
  useEffect(() => {
    if (id) {
      getDonationById(id);
    }
  }, [id]);

  const getDonationById = async (id) => {
    try {
      setLoading(true);
      const response = await DonationService.getDonationById(id);
      if (response?.data) {
        const data = JSON.parse(response.data);
        setUserData(data.user);
        const donations = data.user.donations[0];
      console.log(donations);
        const updatedDonationData = { ...intialDonations[0], ...donations };
        setDonationData(updatedDonationData);
        if (
          donations.donationType === "Gift-Donate" &&
          donations.recipient &&
          donations.recipient.length > 0
        ) {
          const recipientData = donations.recipient[0];

          if (recipientData.address && recipientData.address.length > 0) {
            const address = recipientData.address[0];
            const updatedRecipientData = {
              ...recipientData,
              ...(address.length > 0 ? { address: address[0] } : {}),
            };
            setRecipient(updatedRecipientData);
          }
        }

        const userPackage = donations.userPackage; // Assuming it's an array of objects

        if (userPackage && userPackage.length > 0) {
          const updatedPackageData = userPackage.map((packageItem) => {
            return {
              packageId: packageItem.packageId,
              packageName: packageItem.packageName,
              bouquetPrice: packageItem.bouquetPrice,
              noOfBouquets: packageItem.noOfBouquets,
              amount: packageItem.amount,
            };
          });

          setPackageData(updatedPackageData);
        } else {
          setPackageData([]); // Set an empty array if userPackage is null or empty
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
console.log(donationData);
  const handleBack = () => {
    navigate(`/UserDonation/${userData.emailId}`);
  };


  return (
    <>
      <ToastContainer />
      {loading && <Loader/>}
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
                        <div className="col-4 ">Donation Code</div>
                        <div className="col-8 p0">
                          <input
                            className="form-control-inside"
                            type="text"
                            name="donationCode"
                            value={donationData.donationCode}
                            placeholder="Donation Code"
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
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  <div className="actionheadingdiv">
                    Donation Plan
                  </div>
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
                                  className="form-control-inside"
                                  name="noOfBouquets"
                                  value={item.noOfBouquets}
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
                            
                          </tr>
                        </tbody>
                      </table>
                      
                      <div className="overalltotal">
                        Overall Total: {donationData.totalAmount}
                      </div>

                    </div>
                  )}

                  <div className="clear"/>
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
                                  name="street1"
                                  type="text"
                                  value={recipient.address[0]?.street1 || ""}
                                  disabled
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
                                  name="street2"
                                  type="text"
                                  value={recipient.address[0].street2}
                                  disabled
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
                                  name="street3"
                                  type="text"
                                  value={recipient.address[0].street3}
                                  disabled
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
                                  name="country"
                                  type="text"
                                  value={recipient.address[0].country}
                                  disabled
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
                                  value={recipient.address[0].state}
                                  disabled
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
                                  name="city"
                                  value={recipient.address[0].city}
                                  
                                  disabled
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
                                  name="postalCode"
                                  type="text"
                                  value={recipient.address[0].postalCode}
                                 
                                  disabled
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
                                  disabled
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
                                  name="emailId"
                                  value={recipient.emailId}
                                  disabled
                                />
                               
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </>
                  )}
                  <hr />

                  <div className="actionheadingdiv">Mode of Payment
                    </div>
                  {
                    donationData.paymentInfo.map((payment)=>{
                      return (<>
                      <div className="col-12 pr15 mt10 mb-2r">
                      <div className="row">
                        <div className="col-6">
                          <div className="row select-label">
                            <div className="col-4 "> Select Mode</div>
                            <div className="col-8 p0">
                              <select
                                name="paymentMode"
                                className=" form-control-inside form-select"
                                value={payment.paymentMode || ""}
                               disabled
                                required
                              >
                                <option disabled selected value="">Donar Type</option>
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
                                value={payment.bankName || ""}
                                disabled
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
                                value={payment.chqORddNo || ""}
                                disabled
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
                                value={payment.chqORddDate || ""}
                                disabled
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
                                value={payment.paymentDate || ""}
                                disabled
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
                                value={payment.amount || ""}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr/>
                    </>)
                    })
                  }
                  </div>
                  <button className="mt20 mr10 webform-button--cancel" onClick={handleBack}>
                    Back
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSpecificDonationView;
