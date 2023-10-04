import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tab, Tabs, Modal, Button } from "react-bootstrap";
import { UserService } from "../../../../services/userService/user.service";
import Loader from "../../../common/loader/Loader";
import { SUCCESS } from "../../../constants/constants";
import { DonationService } from "../../../../services/donationService/donation.service";
import RecipientDetails from "../../../common/RecipientDetails";
import PackageDetails from "../../../common/PackageDetails";
import DonationHeader from "./DonationHeader";
import Card from "react-bootstrap/Card";
import { BsEmojiSmile, BsEmojiFrown } from "react-icons/bs";

function NewOnlineDonation() {
  const [donationType, setDonationType] = useState("Self-Donate");

  const initialPackageData = [
    {
      packageName: "",
      bouquetPrice: "",
      noOfBouquets: "",
      amount: "",
    }
  ];

  const initialUserData = {
    user: {
      firstName: "",
      lastName: "",
      mobileNo: "",
      emailId: "",
      donarType: "",
      prefix: "",
      organisation: "",
      isTaxBenefit: false,
      panCard: "",
      activityType: "",
      address: [],
      donations: [],
    },
  };

  const intialDonations = [
    {
      donationType: donationType,
      donationMode: "online",
      donationEvent: "",
      totalAmount: 0,
      generalDonation: null,
      userPackage: [],
      recipient: [],
    },
  ];

  const initialRecipientData = [
    {
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

  const [packageData, setPackageData] = useState(initialPackageData);
  const [userData, setUserData] = useState(initialUserData);
  const [donations, setDonations] = useState(intialDonations);
  const [recipient, setRecipient] = useState(initialRecipientData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { email } = UserService.userDetails();
  const [gatewayConfiguration, setGatewayConfiguration] = useState(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState("");
  const [packageMessage, setPackageMessage] = useState("");
  const handleDonationModalClose = () => setShowDonationModal(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const getCountryList = async () => {
    setLoading(true);
    const response = await DonationService.getAllCountries();
    if (response?.status === 200) {
      // let data = response.data.map((item)=> ({ label: item, value: item }))
      setCountries(response.data);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };
  
  const getStatesByCountry = async (countryId) => {
    setLoading(true);
    const response = await DonationService.getAllStatesByCountry(countryId);
    console.log("get states", response.data );
    if (response?.status === 200) {
        setStates(response.data);
        setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };
  //calling api
  useEffect(() => {
    if (email) {
      getdetailsByEmailId(email);
    }
    getCountryList();
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId");
    if (orderId) {
      localStorage.setItem("userOrderId", orderId);
      let newLocation = window.location.href.substring(0, window.location.href.indexOf("?orderId"));
      window.location.replace(newLocation);


    } else {
      const orderIdStr = localStorage.getItem("userOrderId");
      if (orderIdStr) {
        localStorage.removeItem("userOrderId")
        getPaymentInformation(orderIdStr);
      }
    }
  }, [email]);

  const getPaymentInformation = async (paymentId) => {
    setLoading(true);
    const response = await DonationService.getPaymentInformation(paymentId);
    if (response?.status === "Success") {
      console.log(response);
      setPaymentStatus(response?.data?.paymentStatus);
      if (response?.data?.paymentStatus == "Success") {
        let message =
          "Thank you for your donation. <b>" +
          response?.data?.bankPaymentRefNo +
          "</b> is the transaction ID for your reference. The team will revert in 3-5 business working days.";
        console.log(message);
        setTransactionMessage(message);
        setShowDonationModal(true);
      } else {
        let message =
          "Something went wrong, please try again.";
        console.log(message);
        setTransactionMessage(message);
        setShowDonationModal(true);
      }
      setLoading(false);
    } else {
      let message =
      "Something went wrong, please try again.";
      console.log(message);
      setTransactionMessage(message);
      setShowDonationModal(true);
      setLoading(false);
    }
  };

  const getdetailsByEmailId = async (email) => {
    setLoading(true);
    let response = await DonationService.getDetailsByEmailIdOrDonorId(email);
    console.log("API Response:", response);

    if (response?.status === "Success") {
      const { data } = response;
      const { address = [], ...userDataWithoutAddress } = data;

      setUserData((prevUserData) => {
        return {
          ...prevUserData,
          user: {
            ...prevUserData.user,
            ...userDataWithoutAddress,
          },
        };
      });
      setLoading(false);
    } else if (response?.statusCode === 409) {
      toast.error(response?.message);
      setLoading(false);
    } else {
      console.log(response);
      toast.error("Invalid Email Id ! Please Try Again");
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const validate = () => {
    const validationErrors = [];

    if (!packageData[0].noOfBouquets) {
      validationErrors.push({
        field: "package.noOfBouquets",
        message: "Number of sapling required",
      });
    }

    // Validate recipient (only for "Gift Donate" donation type)
    if (donationType === "Gift-Donate") {
      console.log(donations[0].donationEvent);
      if (!donations[0]?.donationEvent) {
        validationErrors.push({
          field: "donations.donationEvent",
          message: "Donation Event is required",
        });
      }
      if (!donations[0]?.giftContent) {
        validationErrors.push({
          field: "donations.giftContent",
          message: "Message for the giftee is required",
        });
        if(document.getElementById("giftContent")){
          document.getElementById("giftContent").focus();
        }
      }
      for (let i = 0; i < recipient.length; i++) {
        const rec = recipient[i];

        if (!rec?.firstName) {
          validationErrors.push({
            field: "recipient[" + i + "].firstName",
            message: "First Name is required",
          });
        } else if (/\d/.test(rec.firstName)) {
          validationErrors.push({
            field: "recipient[" + i + "].firstName",
            message: "First Name should only contain alphabets",
          });
        }
        if (!rec?.lastName) {
          validationErrors.push({
            field: "recipient[" + i + "].lastName",
            message: "Last Name is required",
          });
        } else if (/\d/.test(rec.lastName)) {
          validationErrors.push({
            field: "recipient[" + i + "].lastName",
            message: "Last Name should only contain alphabets",
          });
        }

        if (!rec?.emailId) {
          validationErrors.push({
            field: "recipient[" + i + "].emailId",
            message: "Email ID is required",
          });
        } else if (
          !/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(
            rec.emailId
          )
        ) {
          validationErrors.push({
            field: "recipient[" + i + "].emailId",
            message: "Invalid Email ID",
          });
        }
        // if (!rec?.mobileNo) {
        //   validationErrors.push({
        //     field: "recipient[" + i + "].mobileNo",
        //     message: "Mobile Number is required",
        //   });
        // } else if (!/^(?!.*[a-zA-Z])\d{10}$/.test(rec.mobileNo)) {
        //   validationErrors.push({
        //     field: "recipient[" + i + "].mobileNo",
        //     message:
        //       "Mobile Number must contain exactly 10 digits and no alphabetic characters",
        //   });
        // }

        // if (!rec?.address[0]?.street1) {
        //   validationErrors.push({
        //     field: "recipient[" + i + "].address[0].street1",
        //     message: "Recipient Street is required",
        //   });
        // }
        // if (!rec?.address[0]?.country) {
        //   validationErrors.push({
        //     field: "recipient[" + i + "].address[0].country",
        //     message: "Recipient Country is required",
        //   });
        // }
        // if (!rec?.address[0]?.state) {
        //   validationErrors.push({
        //     field: "recipient[" + i + "].address[0].state",
        //     message: "Recipient State is required",
        //   });
        // }
        // if (rec?.address[0]?.country === "INDIA") {
        //   if (!rec?.address[0]?.postalCode) {
        //     validationErrors.push({
        //       field: "recipient[" + i + "].address[0].postalCode",
        //       message: "Postal Code is required",
        //     });
        //   } else if (!/^\d{6}$/.test(rec?.address[0]?.postalCode)) {
        //     validationErrors.push({
        //       field: "recipient[" + i + "].address[0].postalCode",
        //       message: "Invalid Postal Code",
        //     });
        //   }
        // } else {
        //   if (rec?.address[0]?.postalCode) {
        //     validationErrors.push({
        //       field: "recipient[" + i + "].address[0].postalCode",
        //       message: "Postal Code is required",
        //     });
        //   } else if (!/^\d{5}$/.test(rec?.address[0]?.postalCode)) {
        //     validationErrors.push({
        //       field: "recipient[" + i + "].address[0].postalCode",
        //       message: "Invalid Postal Code",
        //     });
        //   }
        // }
      }
    }
    console.log(validationErrors);
    const errorMessages = validationErrors.map(
      (error) => `${error.field}: ${error.message}`
    );
    const errorMessageString = errorMessages.join("\n");
    console.log(errorMessageString);
    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const clearForm = (e) => {
    e.preventDefault();
    let packages = [...packageData];
    packages.map((item) => ({
      ...item,
      noOfBouquets: 1,
      amount: item.bouquetPrice,
    }));
    calculateOverallTotal(packages);
    setPackageData(packages);
    setDonations(intialDonations);
    setRecipient(initialRecipientData);
    setUserData(initialUserData);
  };

  const handleTabSelect = (eventKey) => {
    setDonationType(eventKey);
    setDonations(intialDonations);
    setRecipient(initialRecipientData);
    setUserData(initialUserData);
    let packages = [...packageData];
    packages.map((item) => ({
      ...item,
      noOfBouquets: 1,
      amount: item.bouquetPrice,
    }));
    calculateOverallTotal(packages);
    setPackageData(packages);
    setPackageMessage("");
    setErrors([])
  };

  const calculateOverallTotal = (packageData) => {

    console.log(packageData);
    let totalAmountOfPackage = 0;
    packageData.map(data => {
      totalAmountOfPackage += data.amount;
    });
    const updatedDonations = [...donations];
    updatedDonations[0]["totalAmount"] = totalAmountOfPackage;
    setDonations(updatedDonations);
  };

  //Handle Donations
  const handleDonationChange = (e, index) => {
    console.log(e);
    const { name, value } = e.target;
    const updatedDonations = [...donations];
    if (name === "generalDonation") {
      let gnrlDonation = parseInt(value);
      updatedDonations[index][name] = gnrlDonation > 0 ? gnrlDonation : null;
      updatedDonations[0]["totalAmount"] = null;
    }else{
      updatedDonations[index][name] = value;
    }
    console.log(updatedDonations);
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
    let data = null;
    if (name === "country") {
      data = countries.find((item) => item.countryName === value);
    }
    const updatedAddress = [...recipient];
    console.log(updatedAddress);
    updatedAddress[index].address[index][name] = value;
    console.log(updatedAddress[index]);
    console.log(updatedAddress);
    setRecipient(updatedAddress);

    if (data) {
      updatedAddress[index].address[index]["state"] = "";
      getStatesByCountry(data.countryCode);
  }
    return updatedAddress;
  };

  //Donation for Self Donate
  const createDonation = async (e, userData) => {
    e.preventDefault();
    if (validate()) {
      const updatedDonations = [...donations];
      console.log(donationType);
      const filteredPackages = packageData.filter(
        (pkg) => pkg.noOfBouquets > 0
      );
      updatedDonations[0].userPackage = filteredPackages;
      const formData = {
        emailId: email,
        donorId: userData?.user?.donorId, 
        donations: updatedDonations.map((donation) => {
          const donationData = {
            ...donation,
          };
          donationData.donationType = donationType;
          if (donationType === "Self-Donate") {
            donationData.recipient = []; // Exclude recipient data
          } else if (donationType === "Gift-Donate") {
            donationData.recipient = recipient;
          }
          return donationData;
        }),
      };

      if (filteredPackages?.length == 0 || filteredPackages[0].amount == 0) {
        setPackageMessage("Please select number of sapling");
      } else {

        setLoading(true);

        const response = await DonationService.AddNewDonation(formData);

        if (response?.status === SUCCESS) {

          toast.success(response?.message);
          setGatewayConfiguration(response);
          setTimeout(() => {
            document.getElementById("gatewayForm").submit();
          }, 1000);
          clearForm(e);
          setLoading(false);
        } else {
          toast.error(response?.message);
          setLoading(false);
        }
      }
    }
  };


  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <Tabs
        defaultActiveKey="Donate"
        id="uncontrolled-tab-example"
        className="newexti-tab"
      >
        <Tab eventKey="Donate" title="Donate">
          <div className="bggray">
            <div className="col-12 admin-maindiv">
              <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
                <div className="col-12 contact-form-wrap">
                  <Tabs
                    defaultActiveKey="Self-Donate"
                    id="uncontrolled-tab-example"
                    className="mb-3 selftGift-tab "
                    activeKey={donationType}
                    onSelect={handleTabSelect}
                  >
                    <Tab eventKey="Self-Donate" title="Plant A Tree">
                      <form className="form-div contact-form-wrap">
                        <DonationHeader
                          donations={donations}
                          userData={userData}
                          handleDonationChange={handleDonationChange}
                          errors={errors}
                        />
                        <PackageDetails
                          packageData={packageData}
                          setPackageData={setPackageData}
                          setLoading={setLoading}
                          initialPackageData={initialPackageData}
                          donations={donations}
                          calculateOverallTotal={calculateOverallTotal}
                          errors={errors}
                        />
                        <div className="clear" />
                        <hr />
                        {packageMessage != '' && 
                          <div className="red-text">{packageMessage}</div>
                        }
                        <button
                          className="mt20 mr10 webform-button--submit"
                          onClick={(e) => createDonation(e, userData)}
                        >
                          Proceed to pay
                        </button>
                      </form>
                    </Tab>
                    <Tab
                      eventKey="Gift-Donate"
                      title="Gift A Tree"
                    >
                      {/* <h5>Gift a tree</h5> */}
                      <form className="form-div contact-form-wrap">
                        <DonationHeader
                          donations={donations}
                          userData={userData}
                          handleDonationChange={handleDonationChange}
                          errors={errors}
                          isOccasion
                        />

                        <PackageDetails
                          packageData={packageData}
                          setPackageData={setPackageData}
                          setLoading={setLoading}
                          initialPackageData={initialPackageData}
                          donations={donations}
                          calculateOverallTotal={calculateOverallTotal}
                          errors={errors}
                        />
                        <div className="clear" />
                        <hr />
                        {packageMessage != '' && 
                          <div className="red-text">{packageMessage}</div>
                        }
                        <RecipientDetails
                          errors={errors}
                          recipient={recipient}
                          handleRecipentChange={handleRecipentChange}
                          handleRecipentAddressChange={
                            handleRecipentAddressChange
                          }
                          states={states}
                          countries={countries}
                        />
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--submit"
                          onClick={(e) => createDonation(e, userData)}
                        >
                          Proceed to pay
                        </button>
                      </form>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
      {gatewayConfiguration != null && (
        <form
          method="post"
          name="redirect"
          id="gatewayForm"
          action={gatewayConfiguration.gatewayURL}
        >
          <input
            type="hidden"
            id="encRequest"
            name="encRequest"
            value={gatewayConfiguration.encRequest}
          />
          <input
            type="hidden"
            name="access_code"
            id="access_code"
            value={gatewayConfiguration.accessCode}
          />
        </form>
      )}

      <Modal
        className="transaction-modal"
        show={showDonationModal}
        onHide={handleDonationModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <Card>
                <Card.Body>
                  <div className="card-icon">
                    {paymentStatus == 'Success'? 
                    <BsEmojiSmile />
                    :
                    <BsEmojiFrown/>
                    }
                  </div>
                  <Card.Text
                    dangerouslySetInnerHTML={{ __html: transactionMessage }}
                  ></Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDonationModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewOnlineDonation;
