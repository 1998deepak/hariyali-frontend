import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tab, Tabs } from "react-bootstrap";
import { UserService } from "../../../../services/userService/user.service";
import Loader from "../../../common/loader/Loader";
import { SUCCESS } from "../../../constants/constants";
import { DonationService } from "../../../../services/donationService/donation.service";
import RecipientDetails from "../../../common/RecipientDetails";
import PackageDetails from "../../../common/PackageDetails";
import DonationHeader from "./DonationHeader";

function NewOnlineDonation() {
  const [donationType, setDonationType] = useState("Self-Donate");

  const initialPackageData = [
    {
      packageName: "",
      bouquetPrice: 450,
      noOfBouquets: 1,
      amount: 450,
    },
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

  //calling api
  useEffect(() => {
    if (email) {
      getdetailsByEmailId(email);
    }
  }, [email]);

  const getdetailsByEmailId = async (email) => {
    setLoading(true);
    let response = await DonationService.getUserDetails(email);
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

    // Validate recipient (only for "Gift Donate" donation type)
    if (donationType === "Gift-Donate") {
      console.log(donations[0].donationEvent);
      if (!donations[0]?.donationEvent) {
        validationErrors.push({
          field: "donations.donationEvent",
          message: "Donation Event is required",
        });
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
        if (!rec?.mobileNo) {
          validationErrors.push({
            field: "recipient[" + i + "].mobileNo",
            message: "Mobile Number is required",
          });
        } else if (!/^(?!.*[a-zA-Z])\d{10}$/.test(rec.mobileNo)) {
          validationErrors.push({
            field: "recipient[" + i + "].mobileNo",
            message:
              "Mobile Number must contain exactly 10 digits and no alphabetic characters",
          });
        }

        if (!rec?.address[0]?.street1) {
          validationErrors.push({
            field: "recipient[" + i + "].address[0].street1",
            message: "Recipient Street is required",
          });
        }
        if (!rec?.address[0]?.country) {
          validationErrors.push({
            field: "recipient[" + i + "].address[0].country",
            message: "Recipient Country is required",
          });
        }
        if (!rec?.address[0]?.state) {
          validationErrors.push({
            field: "recipient[" + i + "].address[0].state",
            message: "Recipient State is required",
          });
        }
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
  };

  const calculateOverallTotal = (row) => {
    console.log(row)
    const totalCost = 450 * parseInt(row[0].noOfBouquets);
    console.log(row[0].noOfBouquets);
    console.log(totalCost);
    const updatedDonations = [...donations];
    updatedDonations[0]["totalAmount"] = totalCost;
    console.log(updatedDonations);
    setDonations(updatedDonations);
  };

  //Handle Donations
  const handleDonationChange = (e, index) => {
    console.log(e);
    const { name, value } = e.target;
    const updatedDonations = [...donations];
    if (name === "donationEvent") {
      console.log(name);
      updatedDonations[index][name] = value;
    }
    if (name === "generalDonation") {
      let gnrlDonation = parseInt(value);
      updatedDonations[index][name] = gnrlDonation > 0 ? gnrlDonation : null;
      updatedDonations[0]["totalAmount"] = null;
    }
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
    const updatedAddress = [...recipient];
    console.log(updatedAddress);
    updatedAddress[index].address[index][name] = value;
    console.log(updatedAddress[index]);
    console.log(updatedAddress);
    setRecipient(updatedAddress);
    return updatedAddress;
  };

  //Donation for Self Donate
  const createDonation = async (e, userData) => {
    e.preventDefault();
    if (validate()) {
      const updatedDonations = [...donations];
      const filteredPackages = packageData.filter(
        (pkg) => pkg.noOfBouquets > 0
      );
      updatedDonations[0].userPackage = filteredPackages;
      const formData = {
        emailId: userData?.user?.emailId,
        donorId: userData?.user?.donorId,
        donations: updatedDonations.map((donation) => {
          const donationData = {
            ...donation,
          };
          if (donation.donationType === "Self-Donate") {
            donationData.recipient = []; // Exclude recipient data
          } else if (donation.donationType === "Gift-Donate") {
            donationData.recipient = recipient;
          }
          return donationData;
        }),
      };

      setLoading(true);
      const response = await DonationService.AddNewDonation(formData);
      console.log(response);
      if (response?.status === SUCCESS) {
        console.log("Create Donation: " + JSON.stringify(response));
        toast.success(response?.message);
        clearForm(e);
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
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
                    <Tab eventKey="Self-Donate" title="Plant a tree">
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
                        />
                        <div className="clear" />
                        <hr />

                        <button
                          className="mt20 mr10 webform-button--submit"
                          onClick={(e) => createDonation(e, userData)}
                        >
                          Create Donate
                        </button>
                        <button
                          className="mt20 mr10 webform-button--cancel "
                          onClick={(e) => clearForm(e)}
                        >
                          Cancel
                        </button>
                        <button
                          className="mt20 mr10 webform-button--cancel "
                          onClick={(e) => clearForm(e)}
                        >
                          Clear
                        </button>
                      </form>
                    </Tab>
                    <Tab
                      eventKey="Gift-Donate"
                      title="Gift a tree"
                      //  onClick={(eventKey) => handleTabSelect()}
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
                        />
                        <div className="clear" />
                        <hr />
                        <RecipientDetails
                          errors={errors}
                          recipient={recipient}
                          handleRecipentChange={handleRecipentChange}
                          handleRecipentAddressChange={
                            handleRecipentAddressChange
                          }
                        />
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--submit"
                          onClick={(e) => createDonation(e, userData)}
                        >
                          Create Donate
                        </button>
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--cancel "
                          onClick={(e) => clearForm(e)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--cancel "
                          onClick={(e) => clearForm(e)}
                        >
                          Clear
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
    </>
  );
}

export default NewOnlineDonation;
