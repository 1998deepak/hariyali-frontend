import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DonationService } from "../../../../services/donationService/donation.service";
import { useParams, useNavigate } from "react-router-dom";
import { stateOptions } from "../../../constants/constants";
import Loader from "../../../common/loader/Loader";
import PaymentDetails from "../../../common/PaymentDetails";
import PackageDetails from "../../../common/PackageDetails";
import OnlinePaymentDetails from "../../../common/OnlinePaymentDetails";

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
      emailId: "",
      donorId: "",
    },
  };
  const intialDonations = [
    {
      donationcode: "",
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

  const handlePaymentInfoChange = (e, payIndex) => {}

  const getDonationById = async (id) => {
    try {
      setLoading(true);
      const response = await DonationService.getDonationById(id);
      if (response?.data) {
        const data = JSON.parse(response.data);
        console.log(data);
        setUserData(data.user);
        const donations = data.user.donations[0];
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
            console.log(updatedRecipientData);
            setRecipient(updatedRecipientData);
          }
        }

        const userPackage = donations.userPackage; // Assuming it's an array of objects

        if (userPackage && userPackage.length > 0) {
          const updatedPackageData = userPackage.map((packageItem) => {
            return {
              packageId: packageItem.packageId,
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

  console.log(userData);

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      {/* slide info */}
      <div className="bggray">
        <div className="col-sm-12 admin-maindiv">
          <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
            <h5>Plan and Donation</h5>
            <div className="col-sm-12 pr0 contact-form-wrap">
              {" "}
              <div className="row">
                <form className="form-div contact-form-wrap">
                  <div className="row">
                    <div className="col-sm-12 col-sm-lg-6">
                      <div className="row select-label">
                        <div className="col-sm-12 col-sm-lg-4"> Donor ID</div>
                        <div className="col-sm-12 col-sm-lg-8p0">
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
                    <div className="col-sm-12 col-sm-lg-6">
                      <div className="row select-label">
                        <div className="col-sm-12 col-sm-lg-4">Donation Code</div>
                        <div className="col-sm-12 col-sm-lg-8p0">
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
                    {donationData.donationType.toLowerCase() !==
                      "self-donate" && (
                      <div className="col-sm-12 col-sm-lg-6">
                        <div className="row select-label">
                          <div className="col-sm-4">Occasion</div>
                          <div className="col-sm-12 col-sm-lg-8p0">
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

                    <PackageDetails
                      packageData={packageData}
                      setPackageData={setPackageData}
                      setLoading={setLoading}
                      initialPackageData={initialPackageData}
                      donations={Array.of(donationData)}
                      disabled = {true}
                    />

                    <div className="clear" />
                    <hr />
                    {donationData.donationType.toLowerCase() !==
                      "self-donate" && (
                      <>
                        <div className="actionheadingdiv">
                          DETAILS OF RECIPIENT
                        </div>
                        <div className="col-sm-12 pr15 mt20">
                          <div className="row">
                            <div className="col-sm-12 col-sm-lg-6">
                              <div className="row select-label">
                                <div className="col-sm-12 col-sm-lg-4"> Street 1</div>
                                <div className="col-sm-12 col-sm-lg-8 p0">
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
                            <div className="col-sm-12 col-sm-lg-6">
                              <div className="row select-label">
                                <div className="col-sm-12 col-sm-lg-4"> Street 2</div>
                                <div className="col-sm-12 col-sm-lg-8 p0">
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
                            <div className="col-sm-12 col-sm-lg-6">
                              <div className="row select-label">
                                <div className="col-sm-12 col-sm-lg-4"> Street 3</div>
                                <div className="col-sm-12 col-sm-lg-8 p0">
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
                            <div className="col-sm-12 col-sm-lg-6">
                              <div className="row select-label">
                                <div className="col-sm-12 col-sm-lg-4">Country</div>
                                <div className="col-sm-12 col-sm-lg-8 p0">
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
                            <div className="col-sm-12 col-sm-lg-6">
                              <div className="row select-label">
                                <div className="col-sm-12 col-sm-lg-4">State</div>
                                <div className="col-sm-12 col-sm-lg-8 p0">
                                  <input
                                    type="text"
                                    className=" form-control-inside form-select"
                                    value={recipient.address[0].state}
                                    disabled
                                    placeholder="state"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12 col-sm-lg-6">
                              <div className="row select-label">
                                <div className="col-sm-12 col-sm-lg-4">City</div>
                                <div className="col-sm-12 col-sm-lg-8 p0">
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
                            <div className="col-sm-12 col-sm-lg-6">
                              <div className="row select-label">
                                <div className="col-sm-12 col-sm-lg-4">Postal Code</div>
                                <div className="col-sm-12 col-sm-lg-8 p0">
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
                            <div className="col-sm-12 col-sm-lg-6">
                              <div className="row select-label">
                                <div className="col-sm-12 col-sm-lg-4">Mobile No.</div>
                                <div className="col-sm-12 col-sm-lg-8 p0">
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
                            <div className="col-sm-12 col-sm-lg-6">
                              <div className="row select-label">
                                <div className="col-sm-12 col-sm-lg-4">Email ID</div>
                                <div className="col-sm-12 col-sm-lg-8 p0">
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

                    <div className="actionheadingdiv">Mode of Payment</div>

                    { donationData.donationMode == 'online' && 
                    
                    <OnlinePaymentDetails
                      donations={donationData}
                      index={0}
                      setLoading={setLoading}
                    />
                  } 
                  {donationData.donationMode != 'online' && 
                    <PaymentDetails
                      donations={new Array(donationData)}
                      index={0}
                      setLoading={setLoading}
                      isDisabled
                    />
                  }
                    {/* {donationData.paymentInfo.map((payment) => {
                      return (
                        <>
                          <PaymentDetails
                            donations={Array.of(donationData)}
                            setLoading={setLoading}
                            index={0}
                            isDisabled
                          />
                          <hr />
                        </>
                      );
                    })} */}
                  </div>
                  <button
                    className="mt20 mr10 webform-button--cancel"
                    onClick={handleBack}
                  >
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
