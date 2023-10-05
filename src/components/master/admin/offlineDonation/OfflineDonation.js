import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Modal, Tab, Tabs } from "react-bootstrap";
import { DonationService } from "../../../../services/donationService/donation.service";
import {
  BANK_TRANSFER,
  CHEQUE,
  PAYMENT_MODES,
  SUCCESS,
  stateOptions,
} from "../../../constants/constants";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import SearchWithSuggestions from "../../../common/searchComponent/SearchWithSuggestions";
import Loader from "../../../common/loader/Loader";
import PaymentDetails from "../../../common/PaymentDetails";
import PackageDetails from "../../../common/PackageDetails";
import { INDIA } from "../../../constants/constants";

function OfflineDonation() {
  const [donationType, setDonationType] = useState("Self-Donate");
  const [donationType1, setDonationType1] = useState("Gift-Donate");
  const [showDonationModal, setShowDonationModal] = useState(false);

  const [hasAadharCard, setHasAadharCard] = useState(true);
  const [hasPassport, setHasPassport] = useState(true);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [receipientStates, setReceipientStates] = useState([]);
  const [stateFlag, setStateFlag] = useState(true);
  const [receipientStateflag, setReceipientStateflag] = useState(true);
  const [citizenships, setCitizenships] = useState([]);
  const [activeTab, setActiveTab] = useState("NewDonor"); // Set the initial active tab

  const [inputValue, setInputValue] = useState("");
  const maxLength = 150;
  const handleChangeTextarea = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      setInputValue(inputValue);
    }
  };

  const handleTabChange = (newTabKey) => {
    console.log(newTabKey);
    setActiveTab(newTabKey);
    let initDonation = {...intialDonations};
    initDonation.paymentInfo = [];
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
    setAddress(initialAddress);
    setInputValue("");
    setErrors([])
  };

  const handleDonationModalClose = () => setShowDonationModal(false);

  const handleRadioChange = (event) => {
    setHasAadharCard(event.target.value === "yes");
  };

  const handleforeignValueChange = (event) => {
    setHasPassport(event.target.value === "yes");
  };

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
      citizenship: "",
      isTaxBenefit: false,
      panCard: "",
      activityType: "",
      address: [],
      donations: [],
    },
  };

  const initialAddress = [
    {
      street1: "",
      street2: "",
      street3: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
    },
    {
      street1: "",
      street2: "",
      street3: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
    },
  ];
  const intialDonations = [
    {
      donationType: donationType,
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
          chqORddDate: null,
          paymentDate: null,
          amount: "",
          donation: "",
          createdDate: null,
          createdBy: "",
          modifiedDate: "",
          modifiedBy: "",
          remark: "",
          isDeleted: "",
          paymentTrackingId: "",
          bankPaymentRefNo: "",
          cardName: "",
          currency: "",
          paymentStatus: "",
          orderId: "",
          accountId: "",
          receiptDate: null,
          receivedAmount: "",
          bankCharge: "",
          documentNumber: null,
          bankAddress: null,
          depositNumber: null,
          depositDate: null,
          receiptNumber: null,
          realizationDate: null,
          creditCardNumber: "",
          cardExpiry: "",
          cardHolderName: "",
          chequeNumber: "",
          chequeDate: null,
          demandDraftNumber: "",
          demandDraftDate: null,
          totalAmount: "",
        }
      ],
    },
  ];
  const intialDonationsGift = [
    {
      donationType: donationType1,
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
          chqORddDate: null,
          paymentDate: null,
          amount: "",
          donation: "",
          createdDate: null,
          createdBy: "",
          modifiedDate: "",
          modifiedBy: "",
          remark: "",
          isDeleted: "",
          paymentTrackingId: "",
          bankPaymentRefNo: "",
          cardName: "",
          currency: "",
          paymentStatus: "",
          orderId: "",
          accountId: "",
          receiptDate: null,
          receivedAmount: "",
          bankCharge: "",
          documentNumber: null,
          bankAddress: null,
          depositNumber: null,
          depositDate: null,
          receiptNumber: null,
          realizationDate: null,
          creditCardNumber: "",
          cardExpiry: "",
          cardHolderName: "",
          chequeNumber: "",
          chequeDate: null,
          demandDraftNumber: "",
          demandDraftDate: null,
          totalAmount: "",
        }
      ],
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

  const [address, setAddress] = useState(initialAddress);

  const [donations, setDonations] = useState(intialDonations);

  const [donationsGift, setDonationsGift] = useState(intialDonationsGift);

  const [recipient, setRecipient] = useState(initialRecipientData);

  const [userIdList, setUserIdList] = useState([]);

  const [loading, setLoading] = useState(false);

  function hasValues(obj) {
    for (let key in obj) {
      console.log(obj.hasOwnProperty(key));
      console.log();
      if (obj.hasOwnProperty(key) && obj[key]) {
        return true;
      }
    }
    return false;
  }

  const [errors, setErrors] = useState([]);

  const validate = () => {
    const validationErrors = [];

    if (!packageData[0].noOfBouquets || !packageData[0].amount) {
      validationErrors.push({
        field: "package.noOfBouquets",
        message: "Number of sapling required",
      });
    }

    // Validate donationType
    if (!donationType) {
      validationErrors.push({
        field: "donationType",
        message: "Donation Type is required",
      });
    }

    // Validate user data fields
    if (!userData?.user?.firstName) {
      validationErrors.push({
        field: "userData.user.firstName",
        message: "First Name is required",
      });
      document.getElementById("firstName").focus();
    } else if (/\d/.test(userData.user.firstName)) {
      validationErrors.push({
        field: "userData.user.firstName",
        message: "First Name should only contain alphabets",
      });
      if (document.getElementById("firstName")) {
        document.getElementById("firstName").focus();
      }
    }

    if (!userData?.user?.lastName) {
      validationErrors.push({
        field: "userData.user.lastName",
        message: "Last Name is required",
      });
      if (document.getElementById("lastName")) {
        document.getElementById("lastName").focus();
      }
    } else if (/\d/.test(userData.user.lastName)) {
      validationErrors.push({
        field: "userData.user.lastName",
        message: "Last Name should only contain alphabets",
      });
      if (document.getElementById("lastName")) {
        document.getElementById("lastName").focus();
      }
    }

    if (!userData?.user?.citizenship) {
      validationErrors.push({
        field: "userData.user.citizenship",
        message: "Citizenship is required",
      });
      document.getElementById("citizenship").focus();
    } 

    if (
      userData?.user?.citizenship?.toUpperCase() === INDIA
    ) {
      if (hasAadharCard === true) {
        if (!userData?.user?.panCard) {
          validationErrors.push({
            field: "userData.user.panCard",
            message: "PAN Card is required",
          });
          if (document.getElementById("panCard")) {
            document.getElementById("panCard").focus();
          }
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(userData?.user?.panCard)) {
          validationErrors.push({
            field: "userData.user.panCard",
            message: "PAN Card is Invalid",
          });
          if (document.getElementById("panCard")) {
            document.getElementById("panCard").focus();
          }
        }
        if (
          /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(userData?.user?.panCard) === true &&
          userData?.user?.donarType === "Corporate"
        ) {
          if (
            userData?.user?.panCard.trim().charAt(3) === "H" ||
            userData?.user?.panCard.trim().charAt(3) === "P"
          ) {
            validationErrors.push({
              field: "userData.user.panCard",
              message: "PAN Card is Invalid",
            });
            if (document.getElementById("panCard")) {
              document.getElementById("panCard").focus();
            }
          }
        }
        if (
          /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(userData?.user?.panCard) === true &&
          userData?.user?.donarType === "Individual"
        ) {
          if (
            userData?.user?.panCard.trim().charAt(3) !== "H" &&
            userData?.user?.panCard.trim().charAt(3) !== "P"
          ) {
            validationErrors.push({
              field: "userData.user.panCard",
              message: "PAN Card is Invalid",
            });
            if (document.getElementById("panCard")) {
              document.getElementById("panCard").focus();
            }
          }
        }
      } else {
        if (!/^\d{12}$/.test(userData.user.addharCard)) {
          validationErrors.push({
            field: "userData.user.addharCard",
            message:
              "ADDHAR Number must contain exactly 12 digits and no alphabetic characters",
          });
          if (document.getElementById("addharCard")) {
            document.getElementById("addharCard").focus();
          }
        }
      }
    } else {
      if (!userData?.user?.passport) {
        validationErrors.push({
          field: "userData.user.passport",
          message: "Passport is required",
        });
        if (document.getElementById("passport")) {
          document.getElementById("passport").focus();
        }
      }
    }

    if (!userData?.user?.mobileNo) {
      validationErrors.push({
        field: "userData.user.mobileNo",
        message: "Mobile Number is required",
      });
      if (document.getElementById("mobileNo")) {
        document.getElementById("mobileNo").focus();
      }
    } else if (!/^(?!.*[a-zA-Z])\d{10}$/.test(userData.user.mobileNo)) {
      validationErrors.push({
        field: "userData.user.mobileNo",
        message:
          "Mobile Number must contain exactly 10 digits and no alphabetic characters",
      });
      if (document.getElementById("mobileNo")) {
        document.getElementById("mobileNo").focus();
      }
    }
    const emailRegex =
      /^[A-Za-z0-9_-]+([.]?[A-Za-z0-9_-]+)*@[A-Za-z0-9_-]+([.]?[A-Za-z0-9_-]+)*([.]{1}[A-Za-z0-9_]{2,3})+$/i;
    if (!userData?.user?.emailId) {
      validationErrors.push({
        field: "userData.user.emailId",
        message: "Email ID is required",
      });
      if (document.getElementById("emailId")) {
        document.getElementById("emailId").focus();
      }
    } else if (!emailRegex.test(userData.user.emailId)) {
      validationErrors.push({
        field: "userData.user.emailId",
        message: "Invalid Email ID",
      });
      if (document.getElementById("emailId")) {
        document.getElementById("emailId").focus();
      }
    }

    if (!userData?.user?.donarType) {
      validationErrors.push({
        field: "userData.user.donarType",
        message: "Donor Type is required",
      });
    }
    if (!userData?.user?.prefix) {
      validationErrors.push({
        field: "userData.user.prefix",
        message: "Prefix is required",
      });
      if (document.getElementById("prefix")) {
        document.getElementById("prefix").focus();
      }
    }
    if (
      userData?.user?.donarType.toLocaleLowerCase() === "corporate" &&
      !userData?.user?.organisation
    ) {
      validationErrors.push({
        field: "userData.user.organisation",
        message: "Organisation is required",
      });
    }
    if (
      userData?.user?.donarType.toLocaleLowerCase() === "corporate" &&
      userData?.user?.activityType === null
    ) {
      validationErrors.push({
        field: "userData.user.activityType",
        message: "Activity Type is required",
      });
    }

    // Validate payment info
    // if (donations && donations[0]?.paymentInfo) {
      for (let i = 0; i < donations[0].paymentInfo.length; i++) {
        console.log(i);
        if (i === 1) {
          // Skip validation for paymentInfo[1]
          continue;
        }
        const payment = donations[0].paymentInfo[i];

        if (!payment.paymentMode) {
          validationErrors.push({
            field: "donations[0].paymentInfo[" + i + "].paymentMode",
            message: "Payment Mode is required",
          });
        }
        if (!payment.paymentDate) {
          validationErrors.push({
            field: "donations[0].paymentInfo[" + i + "].paymentDate",
            message: "Payment Date is required",
          });
        }
        if (!payment.amount) {
          validationErrors.push({
            field: "donations[0].paymentInfo[" + i + "].amount",
            message: "Amount is required",
          });
        }

        if (!payment.paymentStatus) {
          validationErrors.push({
            field: "donations[0].paymentInfo[" + i + "].paymentStatus",
            message: "Payment Status is required",
          });
        }
        if (!payment.receiptDate) {
          validationErrors.push({
            field: "donations[0].paymentInfo[" + i + "].receiptDate",
            message: "Receipt Date is required",
          });
        }

        if (!payment.accountId || payment.accountId.trim() === "") {
          validationErrors.push({
            field: "donations[0].paymentInfo[" + i + "].accountId",
            message: "Bank Account is required",
          });
        }
        if (
          donations[0]?.paymentInfo[i].paymentMode === BANK_TRANSFER ||
          donations[0]?.paymentInfo[i].paymentMode === CHEQUE
        ) {
          if (!payment.receivedAmount) {
            validationErrors.push({
              field: "donations[0].paymentInfo[" + i + "].receivedAmount",
              message: "Received Date is required",
            });
          }
        }
      }
    // }

    // Validate addresses
    for (let i = 0; i < address.length; i++) {
      if (i === 1) {
        // Skip validation for address[1]
        continue;
      }
      const addr = address[i];

      console.log(address);
      console.log(addr);
      console.log(address[i]);
      if (!addr?.street1) {
        validationErrors.push({
          field: "address[" + i + "].street1",
          message: "Street is required",
        });
        if (document.getElementById("street1")) {
          document.getElementById("street1").focus();
        }
      }
      if (!addr?.country) {
        validationErrors.push({
          field: "address[" + i + "].country",
          message: "Country is required",
        });
        if (document.getElementById("country")) {
          document.getElementById("country").focus();
        }
      } else if (/\d/.test(userData.user.lastName)) {
        validationErrors.push({
          field: "address[" + i + "].country",
          message: "Country should only contain alphabets",
        });
        if (document.getElementById("country")) {
          document.getElementById("country").focus();
        }
      }
      if (!addr?.state) {
        validationErrors.push({
          field: "address[" + i + "].state",
          message: "State is required",
        });
        if (document.getElementById("state")) {
          document.getElementById("state").focus();
        }
      }

      if (!addr?.city) {
        validationErrors.push({
          field: "address[" + i + "].city",
          message: "City is required",
        });
        if (document.getElementById("city")) {
          document.getElementById("city").focus();
        }
      } else if (/\d/.test(addr?.city)) {
        validationErrors.push({
          field: "address[" + i + "].city",
          message: "City should only contain alphabets",
        });
        if (document.getElementById("city")) {
          document.getElementById("city").focus();
        }
      }

      if (addr?.country === "INDIA") {
        if (!addr?.postalCode) {
          validationErrors.push({
            field: "address[" + i + "].postalCode",
            message: "postalCode is required",
          });
          document.getElementById("postalCode").focus();
        } else if (!/^\d{6}$/.test(addr?.postalCode)) {
          validationErrors.push({
            field: "address[" + i + "].postalCode",
            message: "Invalid Postal Code",
          });
          document.getElementById("postalCode").focus();
        }
      } else {
        if (!addr?.postalCode) {
          validationErrors.push({
            field: "address[" + i + "].postalCode",
            message: "postalCode is required",
          });
          document.getElementById("postalCode").focus();
        } else if (!/^\d{5}$/.test(addr?.postalCode)) {
          validationErrors.push({
            field: "address[" + i + "].postalCode",
            message: "Invalid Postal Code",
          });
          document.getElementById("postalCode").focus();
        }
      }
    }

    // Validate recipient (only for "Gift Donate" donation type)
    console.log(donationType);
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
        const emailRegex =
          /^[A-Za-z0-9_-]+([.]?[A-Za-z0-9_-]+)*@[A-Za-z0-9_-]+([.]?[A-Za-z0-9_-]+)*([.]{1}[A-Za-z0-9_]{2,3})+$/i;
        if (!rec?.emailId) {
          validationErrors.push({
            field: "recipient[" + i + "].emailId",
            message: "Email ID is required",
          });
        } else if (!emailRegex.test(rec.emailId)) {
          validationErrors.push({
            field: "recipient[" + i + "].emailId",
            message: "Invalid Email ID",
          });
        }

        if (rec?.mobileNo && !/^(?!.*[a-zA-Z])\d{10}$/.test(rec.mobileNo)) {
          validationErrors.push({
            field: "recipient[" + i + "].mobileNo",
            message:
              "Mobile Number must contain exactly 10 digits and no alphabetic characters",
          });
        }
        if (rec?.address[0]?.postalCode) {
          if (rec?.address[0]?.country === "INDIA"){
              if(!/^\d{6}$/.test(rec?.address[0]?.postalCode)){
            validationErrors.push({
              field: "recipient[" + i + "].address[0].postalCode",
              message: "Invalid Postal Code",
            });
          }
        }else{
          if(!/^\d{5}$/.test(rec?.address[0]?.postalCode)){
            validationErrors.push({
              field: "recipient[" + i + "].address[0].postalCode",
              message: "Invalid Postal Code",
            });
          }
        }
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

    // if (validationErrors.length>0) {
    //   validationErrors.forEach((errors)=>{
    //     if (document.getElementById(`${errors.field.split('.').pop()}`)) {
    //       document.getElementById(`${errors.field.split('.').pop()}`).focus();
    //       return;
    //     }
    //   })
    // }
    return validationErrors.length === 0;
  };

  {
    errors.length > 0 && (
      <p>
        {errors.map((error) => `${error.field}: ${error.message}`).join(", ")}
      </p>
    );
  }

  const userAdd = async (e) => {
    e.preventDefault();

    const isValid = validate();
    console.log("isValid:", isValid);

    if (isValid) {
      console.log(isValid);
      console.log(donationType);
      let updatedUserPackage = [];
      packageData.map((item) => {
        if (item.noOfBouquets && item.amount) {
          updatedUserPackage.push(item);
        }
      });
      const formData = {
        formData: {
          user: userData?.user,
        },
      };

      let paymentArray = { ...donations[0] };

      console.log(paymentArray.paymentInfo[0]);
      paymentArray.paymentInfo = [];
      if (hasValues(donations[0].paymentInfo[0])) {
        paymentArray.paymentInfo[0] = donations[0].paymentInfo[0];
      }

      console.log(hasValues(donations[0].paymentInfo[1]));
      if (hasValues(donations[0].paymentInfo[1])) {
        paymentArray.paymentInfo[1] = donations[0].paymentInfo[1];
      }

      console.log(paymentArray);

      formData.formData.user.donations[0] = paymentArray;
      console.log(formData.formData.user.donations[0]);
      if (!formData.formData.user.organisation) {
        formData.formData.user.organisation = null;
      }
      console.log(formData);
      //setting Donation event

      formData.formData.user.donations[0].donationType = donationType;

      //Setting Address array
      console.log(address.length);

      // if (!formData.formData.user.address) {
      //   formData.formData.user.address = initialAddress.slice();
      // }
      console.log(formData.formData.user.address);

      if (hasValues(address[0])) {
        formData.formData.user.address[0] = address[0];
      }
      if (hasValues(address[1])) {
        formData.formData.user.address[1] = address[1];
      }

      //Setting user Package array

      if (
        !formData.formData.user.donations[0].generalDonation ||
        formData.formData.user.donations[0].generalDonation < 0
      ) {
        formData.formData.user.donations[0].userPackage = updatedUserPackage;
      } else {
        formData.formData.user.donations[0].userPackage = [];
      }

      //setting recipent data
      if (recipient[0].address[0].state) {
        formData.formData.user.donations[0].recipient = recipient;
      } else {
        formData.formData.user.donations[0].recipient = [];
      }
      setLoading(true);
      const response = await DonationService.Adduser(formData.formData.user);
      console.log(response);
      if (response?.status === SUCCESS) {
        toast.success(response?.message);
        clearForm(e);
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    }
  };

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
  const getStatesByCountry = async (countryId, type) => {
    setLoading(true);
    const response = await DonationService.getAllStatesByCountry(countryId);
    if (response?.status === 200) {
      setLoading(false);
      if (response?.data.length > 0) {
       
        if (type != 'Address') {
          setReceipientStates(response.data);
          setReceipientStateflag(true);       
        } else {
          setStates(response.data);
          setStateFlag(true);       
        }
      } else {
        if (type != 'Address') {
          setReceipientStateflag(false);
          setReceipientStates([]);
        } else {
          setStateFlag(false);  
          setStates([]); 
        }
      }
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };
  const getAllCitizenship = async () => {
    setLoading(true);
    const response = await DonationService.getAllCitizenship();
    if (response?.status === 200) {
      // let data = response.data.map((item)=> ({ label: item, value: item }))
      setCitizenships(response.data);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserIdList();
    getAllCitizenship();
    getCountryList();
  }, []);

  const getUserIdList = async () => {
    setLoading(true);
    const response = await DonationService.getAllUserId();
    if (response?.status === 200) {
      // let data = response.data.map((item)=> ({ label: item, value: item }))
      setUserIdList(response.data);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
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
    setAddress(initialAddress);
    let initDonation = {...intialDonations};
    initDonation.paymentInfo = [];
    setDonations(intialDonations);
    setRecipient(initialRecipientData);
    setUserData(initialUserData);
    setInputValue("");
  };
  const handleTabSelect = (eventKey) => {
    console.log(eventKey);
    setDonationType(eventKey);
    let initDonation = {...intialDonations};
    initDonation.paymentInfo = [];
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
    setAddress(initialAddress);
    setInputValue("");
    setErrors([]);
  };

  const handleChangeNumberOfBouquets = (e, row, rowIndex) => {
    let { name, value } = e.target;
    console.log({ name, value, rowIndex }, row);
    let userPackageData = packageData;
    userPackageData[rowIndex][name] = value;

    const totalCost = row.bouquetPrice * row.noOfBouquets;
    userPackageData[rowIndex]["amount"] = totalCost;
    setPackageData(userPackageData);
    calculateOverallTotal(packageData);
    console.log(userPackageData);
  };

  const calculateOverallTotal = (row) => {
    console.log(row);
    const totalCost = 450 * parseInt(row[0].noOfBouquets);
    console.log(row[0].noOfBouquets);
    console.log(totalCost);
    const updatedDonations = [...donations];
    updatedDonations[0]["totalAmount"] = totalCost;
    console.log(updatedDonations);
    setDonations(updatedDonations);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...userData };
    console.log(updatedFormData);
    const keys = name.split(".");
    console.log(keys);
    let currentField = updatedFormData;
    for (let i = 0; i < keys.length - 1; i++) {
      currentField = currentField[keys[i]];
    }
    if (name === "user.donarType" && value === "Corporate") {
      setHasAadharCard(true);
      setHasPassport(false);
    }
    console.log(currentField);
    if (
      name == "user.panCard" ||
      name == "user.firstName" ||
      name == "user.lastName"
    ) {
      currentField[keys[keys.length - 1]] = value.toUpperCase();
    } else if (name == "user.emailId") {
      currentField[keys[keys.length - 1]] = value.toLowerCase();
    } else {
      currentField[keys[keys.length - 1]] = value;
    }
    setUserData(updatedFormData);
  };
  //Handle address change
  const handleAddressChange = (event, index) => {
    let { name, value } = event.target;
    console.log(index, name, value);
    let data = null;
    if (name === "country") {
      data = countries.find((item) => item.countryName === value);
    }
    setAddress((prevAddress) => {
      const updatedAddress = [...prevAddress];
      updatedAddress[index] = {
        ...updatedAddress[index],
        [name]: value,
      };
      if (data) {
        updatedAddress[index] = {
          ...updatedAddress[index],
          ["state"]: "",
        };
      }
      console.log(updatedAddress[index]);
      return updatedAddress;
    });
    if (data) {
      
      getStatesByCountry(data.countryCode, 'Address');
      
    }
  };
  //Handle Donations
  const handleDonationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDonations = [...donations];
    if (name === "generalDonation") {
      let gnrlDonation = parseInt(value);
      updatedDonations[index][name] = gnrlDonation > 0 ? gnrlDonation : null;
      console.log(updatedDonations[index]);
      updatedDonations[0]["totalAmount"] = null;
    }else{
      updatedDonations[index][name] = value;
      console.log(updatedDonations[index]);
    }
    setDonations(updatedDonations);
  };


  const handleRecipentChange = (event, index) => {
    let { name, value } = event.target;
    console.log(name);
    if (name === "emailId") {
      value = value.toLowerCase();
    }
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
      getStatesByCountry(data.countryCode, 'Receipient');
    }
    return updatedAddress;
  };
  const handlePaymentInfoChange = (e, donationIndex, payIndex) => {
    let { name, value } = e.target;
    if (value < 0) {
      value = 0;
    }
    const updatedDonations = [...donations];
    console.log(updatedDonations);
    updatedDonations[donationIndex].paymentInfo[payIndex][name] = value;
    console.log(updatedDonations);
    setDonations(updatedDonations);
  };

  const handlePaymentInfoChangeGift = (e, donationIndex, payIndex) => {
    let { name, value } = e.target;
    if (value < 0) {
      value = 0;
    }
    const updatedDonations = [...donationsGift];
    console.log(updatedDonations);
    console.log(
      "Offline Donation: " +
        updatedDonations[donationIndex].paymentInfo[payIndex][name]
    );
    updatedDonations[donationIndex].paymentInfo[payIndex][name] = value;
    console.log(updatedDonations);
    setDonations(updatedDonations);
  };

  const minaddressDiv = () => {
    if (document.getElementById("addaddressDiv")) {
      if (document.getElementById("addaddressDiv").style.display === "block") {
        document.getElementById("addaddressDiv").style.display = "none";
      }
    }
  };

  // get Detail by email id
  const handleBlur = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const emailId = e.target.value;
    if (emailId.length > 2) {
      const emailRegex =
        /^[A-Za-z0-9_-]+([.]?[A-Za-z0-9_-]+)*@[A-Za-z0-9_-]+([.]?[A-Za-z0-9_-]+)*([.]{1}[A-Za-z0-9_]{2,3})+$/i;
      if (!emailRegex.test(emailId)) {
        toast.error("Invalid Mail Id");
        return;
      }
      setLoading(true);
      let response = await DonationService.getDetailsByEmailId(emailId);
      console.log(response);
      if (response?.statusCode === 409 || response?.status == "NOT_FOUND") {
        setLoading(false);
      } else {
        setShowDonationModal(true);
        setLoading(false);
      }
    }
    // Call your function here or perform any desired actions
  };

  // get Detail by Donor ID
  const handleDonarIdBlur = async (e) => {
    e.preventDefault();
    const donorId = e.target.value;
    setLoading(true);
    let response = await DonationService.getDetailsByDonorId(donorId);
    console.log("API Response:", response);

    if (response?.status === "Success") {
      toast.success(response?.message);
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

      setAddress(address);
      setLoading(false);
    } else if (response?.statusCode === 409) {
      toast.error(response?.message);
      setLoading(false);
    } else {
      console.log(response);
      toast.error(response?.message);
      setLoading(false);
    }
  };

  // get Detail by Donor ID
  const handleSearchId = async (donorId) => {
    setLoading(true);
    let response = await DonationService.getDetailsByEmailIdOrDonorId(donorId);
    console.log("API Response:", response);

    if (response?.status === "Success") {
      toast.success(response?.message);
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
      setStates([{stateName:data.address[0].state}]);
      setAddress(address);
      setLoading(false);
    } else if (response?.statusCode === 409) {
      toast.error(response?.message);
      setLoading(false);
    } else {
      console.log(response);
      toast.error("Invalid Donor Id ! Please Try Again");
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const validateExisting = () => {
    const validationErrors = [];

    if (!packageData[0].noOfBouquets || !packageData[0].amount) {
      validationErrors.push({
        field: "package.noOfBouquets",
        message: "Number of sapling required",
      });
    }

    // Validate donationType
    if (!donationType) {
      validationErrors.push({
        field: "donationType",
        message: "Donation Type is required",
      });
    }

    // Validate user data fields

    if (!userData?.user?.emailId) {
      validationErrors.push({
        field: "existingUser",
        message: "Select Existing User",
      });
    }

    // Validate payment info
    // if (donations && donations[0]?.paymentInfo) {
      for (let i = 0; i < donations[0].paymentInfo.length; i++) {
        console.log(i);
        if (i === 1) {
          // Skip validation for paymentInfo[1]
          continue;
        }
        const payment = donations[0].paymentInfo[i];

        if (!payment.paymentMode) {
          validationErrors.push({
            field: "donations[0].paymentInfo[" + i + "].paymentMode",
            message: "Payment Mode is required",
          });
        }
        if (!payment.paymentDate) {
          validationErrors.push({
            field: "donations[0].paymentInfo[" + i + "].paymentDate",
            message: "Payment Date is required",
          });
        }
        if (!payment.amount) {
          validationErrors.push({
            field: "donations[0].paymentInfo[" + i + "].amount",
            message: "Amount is required",
          });
        }

        if (!payment.paymentStatus) {
          validationErrors.push({
            field: "donations[0].paymentInfo[" + i + "].paymentStatus",
            message: "Payment Status is required",
          });
        }
        if (!payment.receiptDate) {
          validationErrors.push({
            field: "donations[0].paymentInfo[" + i + "].receiptDate",
            message: "Receipt Date is required",
          });
        }

        if (!payment.accountId || payment.accountId.trim() === "") {
          validationErrors.push({
            field: "donations[0].paymentInfo[" + i + "].accountId",
            message: "Bank Account is required",
          });
        }
        if (
          donations[0]?.paymentInfo[i].paymentMode === BANK_TRANSFER ||
          donations[0]?.paymentInfo[i].paymentMode === CHEQUE
        ) {
          if (!payment.receivedAmount) {
            validationErrors.push({
              field: "donations[0].paymentInfo[" + i + "].receivedAmount",
              message: "Received Date is required",
            });
          }
        }
      }
    // }

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
        const emailRegex =
          /^[A-Za-z0-9_-]+([.]?[A-Za-z0-9_-]+)*@[A-Za-z0-9_-]+([.]?[A-Za-z0-9_-]+)*([.]{1}[A-Za-z0-9_]{2,3})+$/i;
        if (!rec?.emailId) {
          validationErrors.push({
            field: "recipient[" + i + "].emailId",
            message: "Email ID is required",
          });
        } else if (!emailRegex.test(rec.emailId)) {
          validationErrors.push({
            field: "recipient[" + i + "].emailId",
            message: "Invalid Email ID",
          });
        }

        if (rec?.mobileNo && !/^(?!.*[a-zA-Z])\d{10}$/.test(rec.mobileNo)) {
          validationErrors.push({
            field: "recipient[" + i + "].mobileNo",
            message:
              "Mobile Number must contain exactly 10 digits and no alphabetic characters",
          });
        }
        if (rec?.address[0]?.postalCode) {
          if (rec?.address[0]?.country === "INDIA"){
              if(!/^\d{6}$/.test(rec?.address[0]?.postalCode)){
            validationErrors.push({
              field: "recipient[" + i + "].address[0].postalCode",
              message: "Invalid Postal Code",
            });
          }
        }else{
          if(!/^\d{5}$/.test(rec?.address[0]?.postalCode)){
            validationErrors.push({
              field: "recipient[" + i + "].address[0].postalCode",
              message: "Invalid Postal Code",
            });
          }
        }
      }
      }
    }

    const errorMessages = validationErrors.map(
      (error) => `${error.field}: ${error.message}`
    );
    const errorMessageString = errorMessages.join("\n");

    console.log(errorMessageString);

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const createDonationGift = async (e, userData) => {
    e.preventDefault();
    console.log(donations);
    const isValid = validateExisting();
      console.log("isValid:", isValid);
      if(!isValid){
        return;
      }
    const updatedDonations = [...donations];
    const filteredPackages = packageData.filter((pkg) => pkg.noOfBouquets > 0);
    console.log(updatedDonations);
    // Create the formData object
    const formData = {
      emailId: userData?.user?.emailId,
      donorId: userData?.user?.donorId,

      donations: updatedDonations.map((donation) => {
        const donationData = {
          ...donation,
          paymentInfo: donation.paymentInfo.slice(0, 1),
        };
        console.log(donation);
        if (donation.donationType === "Self-Donate") {
          donationData.recipient = [];
        } else if (donation.donationType === "Gift-Donate") {
          console.log(donation);
          donationData.donationEvent = donation.donationEvent;
          donationData.recipient = recipient;
        }
        console.log(updatedDonations);
        console.log(donationData);
        return donationData;
      }),
    };

    // Set the 'donations' property in formData
    // formData.donations = updatedDonations;

    setLoading(true);
    const response = await DonationService.AddNewDonation(formData);
    if (response?.status === SUCCESS) {
      toast.success(response?.message);
      clearForm(e);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }

    console.log(donations);
    console.log(formData);
    console.log(updatedDonations);
  };

  //Donation for Self Donate
  const createDonation = async (e, userData) => {
    e.preventDefault();

      const isValid = validateExisting();
      console.log("isValid:", isValid);

    if (isValid) {
    const updatedDonations = [...donations];
    const filteredPackages = packageData.filter((pkg) => pkg.noOfBouquets > 0);
    console.log(filteredPackages);
    updatedDonations[0].userPackage = filteredPackages;

    const formData = {
      emailId: userData?.user?.emailId,
      donorId: userData?.user?.donorId,
      donations: updatedDonations.map((donation) => {
        const donationData = {
          ...donation,
          paymentInfo: donation.paymentInfo.slice(0, 1), // Keep only the first payment info record
        };
        console.log(donation.donationType);
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

    console.log(donations);
    console.log(formData);
    console.log(updatedDonations);
    console.log();
    }
    console.log("Not Working !");
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <Tabs
        defaultActiveKey="NewDonor"
        id="uncontrolled-tab-example"
        className="newexti-tab"
        activeKey={activeTab}
        onSelect={(eventKey) => handleTabChange(eventKey)}
      >
        <Tab eventKey="NewDonor" title="New Donor">
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
                        {userData?.user?.donarType === "Corporate" ? (
                          <div className="actionheadingdiv">
                            DETAILS OF POINT OF CONTACT
                          </div>
                        ) : (
                          <div className="actionheadingdiv">
                            DETAILS OF DONOR
                          </div>
                        )}
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Email ID <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    id="emailId"
                                    name="user.emailId"
                                    placeholder="Email ID"
                                    value={userData?.user?.emailId}
                                    onBlur={(e) => handleBlur(e)}
                                    onChange={handleChange}
                                    required
                                  />
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.emailId"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Mobile Number
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    id="mobileNo"
                                    maxLength={10}
                                    name="user.mobileNo"
                                    placeholder="Mobile Number"
                                    value={userData?.user?.mobileNo}
                                    onChange={handleChange}
                                  />
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.mobileNo"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Donor Type <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.donarType"
                                    id="donarType"
                                    value={userData?.user?.donarType}
                                    onChange={handleChange}
                                  >
                                    <option disabled selected value="">
                                      Donor Type
                                    </option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Individual">
                                      Individual
                                    </option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.donarType"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Citizenship{" "}
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.citizenship"
                                    id="citizenship"
                                    value={userData?.user?.citizenship}
                                    onChange={handleChange}
                                  >
                                    <option disabled selected value="">
                                      Select Citizenship
                                    </option>
                                    {citizenships.map((citizenship) => {
                                      return (
                                        <option
                                          value={citizenship.citizenshipName}
                                        >
                                          {citizenship.citizenshipName}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {errors.map((error, index) => {
                                    if (
                                      error.field ===
                                      "userData.user.citizenship"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            {userData?.user?.donarType?.toLowerCase() ===
                            "corporate" ? (
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Organisation{" "}
                                    <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="user.organisation"
                                      placeholder="Organisation"
                                      type="text"
                                      value={userData?.user?.organisation}
                                      onChange={handleChange}
                                    />

                                    {errors.map((error, index) => {
                                      if (
                                        error.field ===
                                        "userData.user.organisation red-text"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}

                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Prefix <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.prefix"
                                    id="prefix"
                                    value={userData?.user?.prefix}
                                    onChange={handleChange}
                                  >
                                    <option disabled selected value="">
                                      Prefix
                                    </option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Miss.">Miss.</option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.prefix"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  First Name <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    id="firstName"
                                    name="user.firstName"
                                    placeholder="First Name"
                                    value={userData?.user?.firstName}
                                    onChange={handleChange}
                                  />
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.firstName"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Last Name <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    id="lastName"
                                    name="user.lastName"
                                    placeholder="Last Name"
                                    value={userData?.user?.lastName}
                                    onChange={handleChange}
                                  />
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.lastName"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>{" "}
                            </div>
                            {userData?.user?.citizenship?.toUpperCase() ===
                            INDIA ? (
                              <>
                                {userData?.user?.donarType === "Individual" ? (
                                  <div className="col-12 col-lg-6">
                                    <div className="select-label">
                                      <div className="col-12 p0 field-wrapper">
                                        <div>
                                          <label>Do you have a PAN Card?</label>
                                          <div className="radio-buttons">
                                            <label>
                                              <input
                                                type="radio"
                                                name="aadharRadio"
                                                value="yes"
                                                checked={hasAadharCard}
                                                onChange={handleRadioChange}
                                              />{" "}
                                              Yes
                                            </label>{" "}
                                            <label>
                                              <input
                                                type="radio"
                                                name="aadharRadio"
                                                value="no"
                                                checked={!hasAadharCard}
                                                onChange={handleRadioChange}
                                              />{" "}
                                              No
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <></>
                                )}

                                {hasAadharCard ? (
                                  <div className="col-12 col-lg-6">
                                    <div className="select-label">
                                      <div className="col-12 col-lg-4 click">
                                        PAN Card{" "}
                                        <span className="red-text">*</span>
                                      </div>
                                      <div className="col-12 col-lg-8 p0 ">
                                        <input
                                          className="form-control-inside form-control"
                                          name="user.panCard"
                                          id="panCard"
                                          maxLength={10}
                                          placeholder="PAN Card"
                                          type="text"
                                          value={userData?.user?.panCard}
                                          onChange={handleChange}
                                        />
                                        <small className="text-muted">
                                          Disclaimer: Please ensure that you
                                          have entered the correct PAN details
                                          to avoid non-deduction u/s 80G of the
                                          Income Tax Act,1961
                                        </small>
                                        {errors.map((error, index) => {
                                          if (
                                            error.field ===
                                            "userData.user.panCard"
                                          ) {
                                            return (
                                              <div
                                                key={index}
                                                className="error-message red-text"
                                              >
                                                {error.message}
                                              </div>
                                            );
                                          }
                                          return null;
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    id="addharId"
                                    className="col-12 col-lg-6"
                                  >
                                    <div className="row select-label">
                                      <div className="col-12 col-lg-4">
                                        AADHAAR Card{" "}
                                        <span className="red-text">*</span>
                                      </div>
                                      <div className="col-12 col-lg-8 p0 ">
                                        <input
                                          className="form-control-inside form-control"
                                          name="user.addharCard"
                                          id="addharCard"
                                          placeholder="AADHAAR Card Number"
                                          type="text"
                                          maxLength={12}
                                          value={userData?.user?.addharCard}
                                          onChange={handleChange}
                                        />
                                        {errors.map((error, index) => {
                                          if (
                                            error.field ===
                                            "userData.user.addharCard"
                                          ) {
                                            return (
                                              <div
                                                key={index}
                                                className="error-message red-text"
                                              >
                                                {error.message}
                                              </div>
                                            );
                                          }
                                          return null;
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <div className="col-12 col-lg-6">
                                  <div className="row select-label">
                                    <div className="col-12 col-lg-4 clicks">
                                      Passport{" "}
                                      <span className="red-text">*</span>
                                    </div>
                                    <div className="col-12 col-lg-8 p0">
                                      <input
                                        className="form-control-inside form-control"
                                        name="user.passport"
                                        id="passport"
                                        placeholder="Enter the passport"
                                        type="text"
                                        value={userData.user.passport}
                                        onChange={handleChange}
                                      />
                                      <small className="text-muted">
                                        Disclaimer: Passport copy is mandatory
                                        requirement to verify current
                                        citizenship of Indian citizen residing
                                        in foreign countries and foreign
                                        citizens residing in India
                                      </small>
                                      {errors.map((error, index) => {
                                        if (
                                          error.field ===
                                          "userData.user.passport"
                                        ) {
                                          return (
                                            <div
                                              key={index}
                                              className="error-message red-text"
                                            >
                                              {error.message}
                                            </div>
                                          );
                                        }
                                        return null;
                                      })}
                                    </div>
                                  </div>
                                </div>
                                {/* {
                                  userData?.user?.donarType === "Individual"? 
                                  <div className="col-12 col-lg-6 ">
                                    <div className="row">
                                      <div className="col-12 col-lg-4">
                                        Do you have an Passport?
                                      </div>
                                      <div className="radio-buttons col-8">
                                        <label>
                                          <input
                                            type="radio"
                                            name="aadharRadio"
                                            value="yes"
                                            checked={hasPassport}
                                            onChange={handleforeignValueChange}
                                          />{' '}
                                          Yes
                                        </label>{" "}
                                        <label>
                                          <input
                                            type="radio"
                                            name="aadharRadio"
                                            value="no"
                                            checked={!hasPassport}
                                            onChange={handleforeignValueChange}
                                          />{' '}
                                          No
                                        </label>
                                      </div>
                                      </div>
                                  </div>
                                  :<></>
                                }
                                
                                  {
                                    hasPassport ?(
                                      <div className="col-12 col-lg-6">
                                    <div className="row select-label">
                                    <div className="col-12 col-lg-4 clicks">Passport{" "} <span className="red-text">*</span></div>
                                      <div className="col-12 col-lg-8 p0">
                                        <input
                                          className="form-control-inside form-control"
                                          name="user.passport"
                                          id="passport"
                                          placeholder="Enter the passport"
                                          type="text"
                                          value={userData.user.passport}
                                          onChange={handleChange}
                                        />
                                        <small className="text-muted">
                                          Disclaimer: Passport copy is mandatory
                                          requirement to verify current
                                          citizenship of Indian citizen residing
                                          in foreign countries and foreign
                                          citizens residing in India
                                        </small>
                                        {errors.map((error, index) => {
                                          if (
                                            error.field ===
                                            "userData.user.passport"
                                          ) {
                                            return (
                                              <div
                                                key={index}
                                                className="error-message red-text"
                                              >
                                                {error.message}
                                              </div>
                                            );
                                          }
                                          return null;
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                    )
                                        :
                                        <div className="col-12 col-lg-6">
                                    <div className="row select-label">
                                    <div className="col-12 col-lg-4">Tin Number{" "} <span className="red-text">*</span></div>
                                      <div className="col-12 col-lg-8 p0">
                                        <input
                                          className="form-control-inside form-control"
                                          name="user.tinNumber"
                                          id="tinNumber"
                                          placeholder="Enter the Tin Number"
                                          type="text"
                                          value={userData.user.tinNumber}
                                          onChange={handleChange}
                                        />
                                  
                                        {errors.map((error, index) => {
                                          if (
                                            error.field ===
                                            "userData.user.tinNumber"
                                          ) {
                                            return (
                                              <div
                                                key={index}
                                                className="error-message red-text"
                                              >
                                                {error.message}
                                              </div>
                                            );
                                          }
                                          return null;
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                  } */}
                              </>
                            )}
                          </div>
                        </div>
                        <hr />
                        {userData?.user?.donarType === "Corporate" ? (
                          <div className="actionheadingdiv">
                            Orgnization Address
                          </div>
                        ) : (
                          <div className="actionheadingdiv">Address</div>
                        )}
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Street 1 <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street1"
                                    id="street1"
                                    placeholder=" Street 1"
                                    type="text"
                                    value={address[0]?.street1}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === "address[0].street1") {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Street 2
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street2"
                                    placeholder="Street 2"
                                    type="text"
                                    value={address[0]?.street2}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Street 3
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street3"
                                    placeholder="Street 3"
                                    type="text"
                                    value={address[0]?.street3}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            {/* <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">Country <span className="red-text">*</span></div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="country"
                                    id="country"
                                    placeholder="Country"
                                    type="text"
                                    value={address[0]?.country}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'address[0].country') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div> */}
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Country <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="country"
                                    id="country"
                                    value={address[0]?.country}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  >
                                    <option disabled selected value="">
                                      Select Country
                                    </option>
                                    {countries.map((country) => {
                                      return (
                                        <option value={country.countryName}>
                                          {country.countryName}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {errors.map((error, index) => {
                                    if (error.field === "address[0].country") {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div
                              id="state3"
                              className="col-12 col-lg-6"
                              style={{ display: "block" }}
                            >
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  State <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0 ">
                                  {stateFlag ?
                                  <select
                                    className=" form-control-inside form-select form-control"
                                    name="state"
                                    id="state"
                                    value={address[0]?.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  >
                                    <option disabled selected value="">
                                      Select State
                                    </option>
                                    {states.map((state) => (
                                      <option
                                        key={state}
                                        value={state.stateName}
                                      >
                                        {state.stateName}
                                      </option>
                                    ))}
                                  </select>
                                  :
                                  <input
                                    className="form-control-inside"
                                    name="state"
                                    id="state1"
                                    placeholder="State"
                                    type="text"
                                    value={address[0]?.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  }
                                  {errors.map((error, index) => {
                                    if (error.field === "address[0].state") {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            {/* {address[0]?.country.toUpperCase() === "INDIA" ? (
                              <div className="col-12 col-lg-6">
                                <div className="select-label">
                                  <div className="col-12 col-lg-4 ">
                                    State <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0 ">
                                    <select
                                      className=" form-control-inside form-select form-control"
                                      name="state"
                                      id="state"
                                      value={address[0]?.state}
                                      onChange={(event) =>
                                        handleAddressChange(event, 0)
                                      }
                                    >
                                      <option disabled selected value="">
                                        Select State
                                      </option>
                                      {states.map((state) => (
                                        <option
                                          key={state}
                                          value={state.stateName}
                                        >
                                          {state.stateName}
                                        </option>
                                      ))}
                                    </select>
                                    {errors.map((error, index) => {
                                      if (error.field === "address[0].state") {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="col-12 col-lg-6">
                                <div className="select-label">
                                  <div className="col-12 col-lg-4 ">
                                    State <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      name="state"
                                      id="state"
                                      placeholder="State"
                                      value={address[0]?.state}
                                      onChange={(event) =>
                                        handleAddressChange(event, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (error.field === "address[0].state") {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            )} */}
                            
                          
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  City <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="city"
                                    id="city"
                                    placeholder="City"
                                    type="text"
                                    value={address[0]?.city}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === "address[0].city") {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Postal Code{" "}
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="postalCode"
                                    id="postalCode"
                                    placeholder="Postal Code"
                                    type="text"
                                    maxLength={
                                      address[0]?.country === "INDIA"
                                        ? "6"
                                        : "5"
                                    }
                                    value={address[0]?.postalCode}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === "address[0].postalCode") {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div id="addaddressDiv" className="hide">
                          <div className="actionheadingdiv">
                            Organisation Address
                            <div
                              className="float-right addminicon"
                              onClick={minaddressDiv}
                            >
                              <FaMinusSquare />
                            </div>
                          </div>
                          <div className="col-12 pr15 mt20">
                            <div className="row">
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Street 1
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="street1"
                                      id="street1"
                                      placeholder=" Street 1"
                                      type="text"
                                      value={address[1]?.street1}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Street 2
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="street2"
                                      placeholder="Street 2"
                                      type="text"
                                      value={address[1]?.street2}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Street 3
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="street3"
                                      placeholder="Street 3"
                                      type="text"
                                      value={address[1]?.street3}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">Country <span className="red-text">*</span></div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="country"
                                      id="country"
                                      placeholder="Country"
                                      type="text"
                                      // value={address[1].country}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                  </div>
                                </div>
                              </div> */}
                              <div className="col-12 col-lg-6">
                                <div className="select-label">
                                  {/* <div className="col-12 col-lg-4 ">State</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      Country{" "}
                                      <span className="red-text">*</span>
                                    </label>
                                    <select
                                      className=" form-control-inside form-select form-control"
                                      name="country"
                                      id="country"
                                      value={address[1]?.country}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    >
                                      <option disabled selected value="">
                                        Select Country
                                      </option>
                                      {countries.map((country) => {
                                        return (
                                          <option value={country.countryName}>
                                            {country.countryName}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "address[1].country"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    State<span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">

                                    <select
                                      className=" form-control-inside form-select"
                                      name="state"
                                      id="state"
                                      value={address[1]?.state}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    >
                                      <option value="">Select State</option>
                                      {states.map((state) => (
                                        <option
                                          key={state}
                                          value={state.stateName}
                                        >
                                          {state.stateName}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">City</div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="city"
                                      id="city"
                                      placeholder="City"
                                      type="text"
                                      value={address[1]?.city}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    Postal Code
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="postalCode"
                                      id="postalCode"
                                      placeholder="Postal Code"
                                      type="text"
                                      value={address[1]?.postalCode}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "address[1].postalCode"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                        <div className="actionheadingdiv">Mode of Payment</div>
                        <PaymentDetails
                          donations={donations}
                          errors={errors}
                          setLoading={setLoading}
                          handlePaymentInfoChange={handlePaymentInfoChange}
                          index={0}
                        />
                        <button
                          className="mt20 mr10 webform-button--submit"
                          onClick={userAdd}
                        >
                          New Donation
                        </button>
                      </form>
                    </Tab>
                    <Tab
                      eventKey="Gift-Donate"
                      title="Gift A Tree"
                      //  onClick={(eventKey) => handleTabSelect()}
                    >
                      {/* <h5>Gift a tree</h5> */}
                      <form className="form-div contact-form-wrap">
                        <div className="col-12 mt20">
                          <div className="row ">
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Occasion <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="donationEvent"
                                    value={donations[0].donationEvent}
                                    onChange={(e) => handleDonationChange(e, 0)}
                                  >
                                    <option disabled selected value="">
                                      select occasion
                                    </option>

                                    <option value="Festivals">Festivals</option>
                                    <option value="Special day">
                                      {" "}
                                      Special Day
                                    </option>
                                    <option value="Achievements">
                                      {" "}
                                      Achievements
                                    </option>
                                    <option value="Memorial Tribute">
                                      {" "}
                                      Memorial Tribute
                                    </option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "donations.donationEvent"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 user-giftee-msg">
                                  Message For The Giftee{" "}
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8">
                                  <textarea
                                    className="form-control-inside form-control"
                                    placeholder="Message For The Giftee"
                                    name="giftContent"
                                    id="giftContent"
                                    value={donations[0].giftContent}
                                    onChange={(e) => {
                                      handleChangeTextarea(e);
                                      handleDonationChange(e, 0);
                                    }}
                                    maxLength={maxLength}
                                  ></textarea>
                                  <p>
                                    {inputValue.length}/{maxLength} Characters
                                  </p>
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "donations.giftContent"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

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
                        <div className="col-12 col-lg-6 mt20"></div>
                        <hr />
                        {userData?.user?.donarType === "Corporate" ? (
                          <div className="actionheadingdiv">
                            DETAILS OF POINT OF CONTACT
                          </div>
                        ) : (
                          <div className="actionheadingdiv">
                            DETAILS OF DONOR / GIFTER
                          </div>
                        )}
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Email ID <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.emailId"
                                    id="emailId"
                                    placeholder="Email ID"
                                    value={userData.user.emailId}
                                    // onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.emailId"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Mobile Number
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    maxLength={10}
                                    name="user.mobileNo"
                                    placeholder="Mobile Number"
                                    value={userData.user.mobileNo}
                                    onChange={handleChange}
                                  />
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.mobileNo"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Donor Type <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.donarType"
                                    id="donarType"
                                    value={userData.user.donarType}
                                    onChange={handleChange}
                                  >
                                    <option disabled selected value="">
                                      Donor Type
                                    </option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Individual">
                                      Individual
                                    </option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.donarType"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Citizenship{" "}
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.citizenship"
                                    id="citizenship"
                                    value={userData?.user?.citizenship}
                                    onChange={handleChange}
                                  >
                                    <option disabled selected value="">
                                      Select Citizenship
                                    </option>
                                    {citizenships.map((citizenship) => {
                                      return (
                                        <option
                                          value={citizenship.citizenshipName}
                                        >
                                          {citizenship.citizenshipName}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {errors.map((error, index) => {
                                    if (
                                      error.field ===
                                      "userData.user.citizenship"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            {userData?.user?.donarType?.toLowerCase() ===
                            "corporate" ? (
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Organisation{" "}
                                    <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="user.organisation"
                                      placeholder="Organisation"
                                      type="text"
                                      value={userData.user.organisation}
                                      onChange={handleChange}
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field ===
                                        "userData.user.organisation"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}

                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Prefix <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.prefix"
                                    value={userData.user.prefix}
                                    onChange={handleChange}
                                  >
                                    <option disabled selected value="">
                                      Prefix
                                    </option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Miss.">Miss.</option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.prefix"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  First Name <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.firstName"
                                    placeholder="First Name"
                                    value={userData.user.firstName}
                                    onChange={handleChange}
                                  />
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.firstName"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Last Name <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.lastName"
                                    placeholder="Last Name"
                                    value={userData.user.lastName}
                                    onChange={handleChange}
                                  />
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.lastName"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>{" "}
                            </div>

                            {userData?.user?.citizenship?.toUpperCase() ===
                            INDIA ? (
                              <>
                                {userData?.user?.donarType === "Individual" ? (
                                  <div className="col-12 col-lg-6">
                                    <div className="select-label">
                                      <div className="col-12 p0 field-wrapper">
                                        <div>
                                          <label>
                                            Do you have an PAN Card?
                                          </label>
                                          <div className="radio-buttons">
                                            <label>
                                              <input
                                                type="radio"
                                                name="aadharRadio"
                                                value="yes"
                                                checked={hasAadharCard}
                                                onChange={handleRadioChange}
                                              />{" "}
                                              Yes
                                            </label>{" "}
                                            <label>
                                              <input
                                                type="radio"
                                                name="aadharRadio"
                                                value="no"
                                                checked={!hasAadharCard}
                                                onChange={handleRadioChange}
                                              />{" "}
                                              No
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <></>
                                )}

                                {hasAadharCard ? (
                                  <div className="col-12 col-lg-6">
                                    <div className="select-label">
                                      <div className="col-12 col-lg-4 click">
                                        PAN Card{" "}
                                        <span className="red-text">*</span>
                                      </div>
                                      <div className="col-12 col-lg-8 p0 ">
                                        <input
                                          className="form-control-inside form-control"
                                          name="user.panCard"
                                          id="panCard"
                                          maxLength={10}
                                          placeholder="PAN Card"
                                          type="text"
                                          value={userData?.user?.panCard}
                                          onChange={handleChange}
                                        />
                                        <small className="text-muted">
                                          Disclaimer: Please ensure that you
                                          have entered the correct PAN details
                                          to avoid non-deduction u/s 80G of the
                                          Income Tax Act,1961
                                        </small>
                                        {errors.map((error, index) => {
                                          if (
                                            error.field ===
                                            "userData.user.panCard"
                                          ) {
                                            return (
                                              <div
                                                key={index}
                                                className="error-message red-text"
                                              >
                                                {error.message}
                                              </div>
                                            );
                                          }
                                          return null;
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    id="addharId"
                                    className="col-12 col-lg-6"
                                  >
                                    <div className="row select-label">
                                      <div className="col-12 col-lg-4">
                                        AADHAAR Card{" "}
                                        <span className="red-text">*</span>
                                      </div>
                                      <div className="col-12 col-lg-8 p0 ">
                                        <input
                                          className="form-control-inside form-control"
                                          name="user.addharCard"
                                          id="addharCard"
                                          placeholder="AADHAAR Card Number"
                                          type="text"
                                          maxLength={12}
                                          value={userData?.user?.addharCard}
                                          onChange={handleChange}
                                        />
                                        {errors.map((error, index) => {
                                          if (
                                            error.field ===
                                            "userData.user.addharCard"
                                          ) {
                                            return (
                                              <div
                                                key={index}
                                                className="error-message red-text"
                                              >
                                                {error.message}
                                              </div>
                                            );
                                          }
                                          return null;
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <div className="col-12 col-lg-6">
                                  <div className="row select-label">
                                    <div className="col-12 col-lg-4 clicks">
                                      Passport{" "}
                                      <span className="red-text">*</span>
                                    </div>
                                    <div className="col-12 col-lg-8 p0">
                                      <input
                                        className="form-control-inside form-control"
                                        name="user.passport"
                                        id="passport"
                                        placeholder="Enter the passport"
                                        type="text"
                                        value={userData.user.passport}
                                        onChange={handleChange}
                                      />
                                      <small className="text-muted">
                                        Disclaimer: Passport copy is mandatory
                                        requirement to verify current
                                        citizenship of Indian citizen residing
                                        in foreign countries and foreign
                                        citizens residing in India
                                      </small>
                                      {errors.map((error, index) => {
                                        if (
                                          error.field ===
                                          "userData.user.passport"
                                        ) {
                                          return (
                                            <div
                                              key={index}
                                              className="error-message red-text"
                                            >
                                              {error.message}
                                            </div>
                                          );
                                        }
                                        return null;
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <hr />
                        {userData?.user?.donarType === "Corporate" ? (
                          <div className="actionheadingdiv">
                            Orgnization Address
                          </div>
                        ) : (
                          <div className="actionheadingdiv">Address</div>
                        )}
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Street 1 <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street1"
                                    placeholder=" Street 1"
                                    type="text"
                                    value={address[0]?.street1}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === "address[0].street1") {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Street 2
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street2"
                                    placeholder="Street 2"
                                    type="text"
                                    value={address[0]?.street2}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Street 3
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street3"
                                    placeholder="Street 3"
                                    type="text"
                                    value={address[0]?.street3}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            {/* <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">Country <span className="red-text">*</span></div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="country"
                                    placeholder="Country"
                                    type="text"
                                    value={address[0]?.country}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'address[0].country') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div> */}
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Country <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="country"
                                    id="country"
                                    value={address[0]?.country}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  >
                                    <option disabled selected value="">
                                      Select Country
                                    </option>
                                    {countries.map((country) => {
                                      return (
                                        <option value={country.countryName}>
                                          {country.countryName}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {errors.map((error, index) => {
                                    if (error.field === "address[0].country") {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div
                              id="state4"
                              className="col-12 col-lg-6"
                              style={{ display: "block" }}
                            >
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  State <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0 ">
                                  {stateFlag ? 
                                  <select
                                    className=" form-control-inside form-select form-control"
                                    name="state"
                                    id="state"
                                    value={address[0]?.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  >
                                    <option disabled selected value="">
                                      Select State
                                    </option>
                                    {states.map((state) => (
                                      <option
                                        key={state}
                                        value={state.stateName}
                                      >
                                        {state.stateName}
                                      </option>
                                    ))}
                                  </select>
                                  :
                                  <input
                                    className="form-control-inside"
                                    name="state"
                                    id="state"
                                    placeholder="State"
                                    type="text"
                                    value={address[0]?.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  }
                                  {errors.map((error, index) => {
                                    if (error.field === "address[0].state") {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            {/* {address[0]?.country === "INDIA" ? (
                              <div className="col-12 col-lg-6">
                                <div className="select-label">
                                  <div className="col-12 col-lg-4 ">
                                    State <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0 ">
                                    <select
                                      className=" form-control-inside form-select form-control"
                                      name="state"
                                      id="state"
                                      value={address[0]?.state}
                                      onChange={(event) =>
                                        handleAddressChange(event, 0)
                                      }
                                    >
                                      <option disabled selected value="">
                                        Select State
                                      </option>
                                      {states.map((state) => (
                                        <option
                                          key={state}
                                          value={state.stateName}
                                        >
                                          {state.stateName}
                                        </option>
                                      ))}
                                    </select>
                                    {errors.map((error, index) => {
                                      if (error.field === "address[0].state") {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="col-12 col-lg-6">
                                <div className="select-label">
                                  <div className="col-12 col-lg-4 ">
                                    State <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      name="state"
                                      id="state"
                                      placeholder="State"
                                      value={address[0]?.state}
                                      onChange={(event) =>
                                        handleAddressChange(event, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (error.field === "address[0].state") {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            )} */}
                            {/* <div
                              id="state5"
                              className="col-12 col-lg-6"
                              style={{ display: "none" }}
                            >
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  State <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="state"
                                    id="state1"
                                    placeholder="State"
                                    type="text"
                                    value={address[0]?.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === "address[0].state") {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div> */}
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  City <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="city"
                                    id="city"
                                    placeholder="City"
                                    type="text"
                                    value={address[0]?.city}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === "address[0].city") {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Postal Code{" "}
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    type="text"
                                    maxLength={
                                      address[0]?.country === "INDIA"
                                        ? "6"
                                        : "5"
                                    }
                                    value={address[0]?.postalCode}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "address[0].postalCode"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">
                          DETAILS OF GIFTEE / RECEIPIENT
                        </div>
                        <div className="col-12 pr15 mt20">
                          <div>
                            <div className="row">
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    First Name{" "}
                                    <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="firstName"
                                      placeholder="First Name"
                                      type="text"
                                      value={recipient[0].firstName}
                                      onChange={(e) =>
                                        handleRecipentChange(e, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "recipient[0].firstName"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    Last Name{" "}
                                    <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="lastName"
                                      placeholder="Last Name"
                                      type="text"
                                      value={recipient[0].lastName}
                                      onChange={(e) =>
                                        handleRecipentChange(e, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "recipient[0].lastName"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    Mobile Number
                                    {/* <span className="red-text">*</span> */}
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="mobileNo"
                                      maxLength={10}
                                      placeholder="Mobile Number"
                                      type="text"
                                      value={recipient[0].mobileNo}
                                      onChange={(e) =>
                                        handleRecipentChange(e, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "recipient[0].mobileNo"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    Email Id <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="emailId"
                                      placeholder="Email Id"
                                      type="text"
                                      value={recipient[0].emailId}
                                      onChange={(e) =>
                                        handleRecipentChange(e, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "recipient[0].emailId"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Street 1
                                    {/* <span className="red-text">*</span> */}
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="street1"
                                      placeholder=" Street 1"
                                      type="text"
                                      value={recipient[0].address[0].street1}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    />
                                    {/* {errors.map((error, index) => {
                                      if (
                                        error.field ===
                                        "recipient[0].address[0].street1"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })} */}
                                  </div>
                                </div>
                              </div>

                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Street 2
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="street2"
                                      placeholder="Street 2"
                                      type="text"
                                      value={recipient[0].address[0].street2}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Street 3
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="street3"
                                      placeholder="Street 3"
                                      type="text"
                                      value={recipient[0].address[0].street3}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    Country
                                    {/* <span className="red-text">*</span> */}
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <select
                                      className=" form-control-inside form-select"
                                      name="country"
                                      value={recipient[0].address[0].country}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    >
                                      <option disabled selected value="">
                                        Select Country
                                      </option>
                                      {countries.map((country) => {
                                        return (
                                          <option value={country.countryName}>
                                            {country.countryName}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {/* {errors.map((error, index) => {
                                      if (
                                        error.field ===
                                        "recipient[0].address[0].country"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })} */}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    State
                                    {/* <span className="red-text">*</span> */}
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    {!receipientStateflag ? (
                                      <input
                                        className=" form-control-inside"
                                        name="state"
                                        placeholder="state"
                                        value={recipient[0].address[0].state}
                                        onChange={(e) =>
                                          handleRecipentAddressChange(e, 0)
                                        }
                                      ></input>
                                    ) : (
                                      <select
                                        className=" form-control-inside form-select"
                                        name="state"
                                        value={recipient[0].address[0].state}
                                        onChange={(e) =>
                                          handleRecipentAddressChange(e, 0)
                                        }
                                      >
                                        <option disabled selected value="">
                                          Select State
                                        </option>
                                        {receipientStates.map((state) => (
                                          <option
                                            key={state}
                                            value={state.stateName}
                                          >
                                            {state.stateName}
                                          </option>
                                        ))}
                                      </select>
                                    )}
                                    {/* {errors.map((error, index) => {
                                      if (
                                        error.field ===
                                        "recipient[0].address[0].state"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })} */}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    City 
                                    {/* <span className="red-text">*</span> */}
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="city"
                                      id="city"
                                      placeholder="City"
                                      type="text"
                                      value={recipient[0].address[0].city}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field ===
                                        "recipient[0].address[0].city"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    Postal Code 
                                    {/* <span className="red-text">*</span> */}
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="postalCode"
                                      placeholder="Postal Code"
                                      type="text"
                                      maxLength={
                                        recipient[0].address[0].country ===
                                        "INDIA"
                                          ? "6"
                                          : "5"
                                      }
                                      value={recipient[0].address[0].postalCode}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field ===
                                        "recipient[0].address[0].postalCode"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Mode of Payment</div>
                        <PaymentDetails
                          donations={donations}
                          errors={errors}
                          setLoading={setLoading}
                          handlePaymentInfoChange={handlePaymentInfoChange}
                          index={0}
                        />

                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--submit"
                          onClick={userAdd}
                        >
                          New Donation
                        </button>
                      </form>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="ExistingDonor" title="Existing Donor">
          <div className="bggray">
            <div className="col-12 admin-maindiv">
              <div className=" justify-content-between bgwite borderform1 padding30 all-form-wrap">
                <div className="col-12 contact-form-wrap">
                  <Tabs
                    defaultActiveKey="Self-Donate"
                    id="uncontrolled-tab-example"
                    className="mb-3 selftGift-tab "
                    //  onClick={() => handleTabSelect()}
                    activeKey={donationType}
                    onSelect={handleTabSelect}
                  >
                    <Tab eventKey="Self-Donate" title="Plant A Tree">
                      {/* <h5>Self Planting</h5> */}

                      <form className="form-div contact-form-wrap">
                        <div className="col-12 mt20">
                          <div className="row ">
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Donor ID / Email Id{" "}
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <SearchWithSuggestions
                                    data={userIdList}
                                    onClickSearch={handleSearchId}
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'existingUser') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
                        {userData?.user?.donarType === "Corporate" ? (
                          <div className="actionheadingdiv">
                            DETAILS OF POINT OF CONTACT
                          </div>
                        ) : (
                          <div className="actionheadingdiv">
                            DETAILS OF DONOR
                          </div>
                        )}
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Email ID <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.emailId"
                                    id="emailId"
                                    placeholder="Email ID"
                                    value={userData?.user?.emailId}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={handleChange}
                                    disabled
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.emailId') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Mobile Number
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    maxLength={10}
                                    name="user.mobileNo"
                                    placeholder="Mobile Number"
                                    value={userData?.user?.mobileNo}
                                    onChange={handleChange}
                                    disabled
                                  />

                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Donor Type <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.donarType"
                                    id="donarType"
                                    value={userData?.user?.donarType}
                                    onChange={handleChange}
                                    disabled
                                  >
                                    <option disabled selected value="">
                                      Donor Type
                                    </option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Individual">
                                      Individual
                                    </option>
                                  </select>
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.donarType') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            {userData?.user?.donarType?.toLowerCase() ===
                            "corporate" ? (
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Organisation{" "}
                                    <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="user.organisation"
                                      placeholder="Organisation"
                                      type="text"
                                      value={userData?.user?.organisation}
                                      disabled
                                      onChange={handleChange}
                                    />

                                    {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.organisation red-text') {
                                      return <div key={index} className="error-message">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Prefix <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.prefix"
                                    value={userData?.user?.prefix}
                                    onChange={handleChange}
                                    disabled
                                  >
                                    <option disabled selected value="">
                                      Prefix
                                    </option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Miss.">Miss.</option>
                                  </select>
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.prefix') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  First Name <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.firstName"
                                    placeholder="First Name"
                                    value={userData?.user?.firstName}
                                    onChange={handleChange}
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.firstName') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Last Name <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.lastName"
                                    placeholder="Last Name"
                                    value={userData?.user?.lastName}
                                    onChange={handleChange}
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.lastName') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>{" "}
                            </div>

                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  PAN card <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="user.panCard"
                                    id="panCard"
                                    maxLength={10}
                                    placeholder="PAN Card"
                                    type="text"
                                    value={userData?.user?.panCard}
                                    onChange={handleChange}
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.panCard') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        {userData?.user?.donarType === "Corporate" ? (
                          <div className="actionheadingdiv">
                            Orgnization Address
                          </div>
                        ) : (
                          <div className="actionheadingdiv">Address</div>
                        )}
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Street 1 <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street1"
                                    placeholder=" Street 1"
                                    type="text"
                                    value={address[0]?.street1}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'address[0].street1') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Street 2
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street2"
                                    placeholder="Street 2"
                                    type="text"
                                    value={address[0]?.street2}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Street 3
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street3"
                                    placeholder="Street 3"
                                    type="text"
                                    value={address[0]?.street3}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Country <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="country"
                                    placeholder="Country"
                                    type="text"
                                    value={address[0]?.country}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'address[0].country') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  State <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  {stateFlag ?
                                  <select
                                    className=" form-control-inside form-select"
                                    name="state"
                                    value={address[0]?.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  >
                                    <option disabled selected value="">
                                      Select State
                                    </option>
                                    {states.map((state) => (
                                      <option
                                        key={state}
                                        value={state.stateName}
                                      >
                                        {state.stateName}
                                      </option>
                                    ))}
                                  </select>
                                  :
                                  <input
                                    className="form-control-inside"
                                    name="state"
                                    id="state1"
                                    placeholder="State"
                                    type="text"
                                    value={address[0]?.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  City <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="city"
                                    placeholder="City"
                                    type="text"
                                    value={address[0]?.city}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'address[0].city') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Postal Code{" "}
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    type="text"
                                    maxLength={
                                      address[0]?.country === "INDIA"
                                        ? "6"
                                        : "5"
                                    }
                                    value={address[0]?.postalCode}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div id="addaddressDiv" className="hide">
                          <div className="actionheadingdiv">
                            Permanent Address
                            <div
                              className="float-right addminicon"
                              onClick={minaddressDiv}
                            >
                              <FaMinusSquare />
                            </div>
                          </div>
                          <div className="col-12 pr15 mt20">
                            <div className="row">
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Street 1
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="street1"
                                      placeholder=" Street 1"
                                      type="text"
                                      value={address[1]?.street1}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Street 2
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="street2"
                                      placeholder="Street 2"
                                      type="text"
                                      value={address[1]?.street2}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Street 3
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="street3"
                                      placeholder="Street 3"
                                      type="text"
                                      value={address[1]?.street3}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="select-label">
                                  {/* <div className="col-12 col-lg-4 ">State</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      Country{" "}
                                      <span className="red-text">*</span>
                                    </label>
                                    <select
                                      className=" form-control-inside form-select form-control"
                                      name="country"
                                      id="country"
                                      value={address[1]?.country}
                                      onChange={(event) =>
                                        handleAddressChange(event, 0)
                                      }
                                    >
                                      <option disabled selected value="">
                                        Select Country
                                      </option>
                                      {countries.map((country) => {
                                        return (
                                          <option value={country.countryName}>
                                            {country.countryName}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "address[1].country"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    State <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <select
                                      className=" form-control-inside form-select"
                                      name="state"
                                      value={address[1]?.state}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    >
                                      <option value="">Select State</option>
                                      {states.map((state) => (
                                        <option
                                          key={state}
                                          value={state.stateName}
                                        >
                                          {state.stateName}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">City</div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="city"
                                      placeholder="City"
                                      type="text"
                                      value={address[1]?.city}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    Postal Code
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="postalCode"
                                      placeholder="Postal Code"
                                      type="text"
                                      value={address[1]?.postalCode}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "address[1].postalCode"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                        <div className="actionheadingdiv">Mode of Payment</div>
                        <PaymentDetails
                          donations={donations}
                          errors={errors}
                          setLoading={setLoading}
                          handlePaymentInfoChange={handlePaymentInfoChange}
                          index={0}
                        />

                        <button
                          className="mt20 mr10 webform-button--submit"
                          onClick={(e) => createDonation(e, userData)}
                        >
                          New Donation
                        </button>
                      </form>
                    </Tab>
                    <Tab eventKey="Gift-Donate" title="Gift A Tree">
                      {/* <h5>Gift a tree</h5> */}
                      <form className="form-div contact-form-wrap">
                        <div className="col-12 mt20">
                          <div className="row ">
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Donor ID / Email Id{" "}
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <SearchWithSuggestions
                                    data={userIdList}
                                    onClickSearch={handleSearchId}
                                  />
                                   {errors.map((error, index) => {
                                    if (error.field === 'existingUser') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Occasion <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="donationEvent"
                                    value={donations[0].donationEvent}
                                    onChange={(e) => handleDonationChange(e, 0)}
                                  >
                                    <option disabled selected value="">
                                      Select occasion
                                    </option>

                                    <option value="Festivals">Festivals</option>
                                    <option value="Special day">
                                      {" "}
                                      Special Day
                                    </option>
                                    <option value="Achievements">
                                      {" "}
                                      Achievements
                                    </option>
                                    <option value=" Memorial Tribute">
                                      {" "}
                                      Memorial Tribute
                                    </option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "donations.donationEvent"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 user-giftee-msg">
                                  Message For The Giftee{" "}
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8">
                                  <textarea
                                    className="form-control-inside form-control"
                                    placeholder="Message For The Giftee"
                                    name="giftContent"
                                    id="giftContent"
                                    value={donations[0].giftContent}
                                    onChange={(e) => {
                                      handleChangeTextarea(e);
                                      handleDonationChange(e, 0);
                                    }}
                                    maxLength={maxLength}
                                  ></textarea>
                                  <p>
                                    {inputValue.length}/{maxLength} Characters
                                  </p>
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "donations.giftContent"
                                    ) {
                                      return (
                                        <div
                                          key={index}
                                          className="error-message red-text"
                                        >
                                          {error.message}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

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
                        {userData?.user?.donarType === "Corporate" ? (
                          <div className="actionheadingdiv">
                            DETAILS OF POINT OF CONTACT
                          </div>
                        ) : (
                          <div className="actionheadingdiv">
                            DETAILS OF DONOR
                          </div>
                        )}
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Email ID <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.emailId"
                                    id="emailId"
                                    placeholder="Email ID"
                                    value={userData.user.emailId}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={handleChange}
                                    disabled
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.emailId') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Mobile Number
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    maxLength={10}
                                    name="user.mobileNo"
                                    placeholder="Mobile Number"
                                    value={userData.user.mobileNo}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={handleChange}
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.mobileNo') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Donor Type <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.donarType"
                                    id="donarType"
                                    value={userData.user.donarType}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={handleChange}
                                    disabled
                                  >
                                    <option disabled selected value="">
                                      Donor Type
                                    </option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Individual">
                                      Individual
                                    </option>
                                  </select>
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.DonarType') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            {userData?.user?.donarType?.toLowerCase() ===
                            "corporate" ? (
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Organisation{" "}
                                    <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="user.organisation"
                                      placeholder="Organisation"
                                      type="text"
                                      value={userData.user.organisation}
                                      onChange={handleChange}
                                      onBlur={(e) => handleDonarIdBlur(e)}
                                      disabled
                                    />
                                    {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.organisation') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}

                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Prefix <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.prefix"
                                    value={userData.user.prefix}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={handleChange}
                                    disabled
                                  >
                                    <option disabled selected value="">
                                      Prefix
                                    </option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Miss.">Miss.</option>
                                  </select>
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.prefix') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  First Name <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.firstName"
                                    placeholder="First Name"
                                    value={userData.user.firstName}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={handleChange}
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.firstName') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Last Name <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.lastName"
                                    placeholder="Last Name"
                                    value={userData.user.lastName}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={handleChange}
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.lastName') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>{" "}
                            </div>

                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  PAN card <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="user.panCard"
                                    id="panCard"
                                    maxLength={10}
                                    placeholder="PAN Card"
                                    type="text"
                                    value={userData.user.panCard}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={handleChange}
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.panCard') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        {userData?.user?.donarType === "Corporate" ? (
                          <div className="actionheadingdiv">
                            Orgnization Address
                          </div>
                        ) : (
                          <div className="actionheadingdiv">Address</div>
                        )}
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Street 1 <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street1"
                                    placeholder=" Street 1"
                                    type="text"
                                    value={address[0]?.street1}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'address[0].street1') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Street 2
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street2"
                                    placeholder="Street 2"
                                    type="text"
                                    value={address[0]?.street2}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  {" "}
                                  Street 3
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="street3"
                                    placeholder="Street 3"
                                    type="text"
                                    value={address[0]?.street3}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Country <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="country"
                                    placeholder="Country"
                                    type="text"
                                    value={address[0]?.country}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'address[0].country') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  State <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="state"
                                    value={address[0]?.state}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  >
                                    <option disabled selected value="">
                                      Select State
                                    </option>
                                    {states.map((state) => (
                                      <option
                                        key={state}
                                        value={state.stateName}
                                      >
                                        {state.stateName}
                                      </option>
                                    ))}
                                  </select>
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'address[0].state') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  City <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="city"
                                    placeholder="City"
                                    type="text"
                                    value={address[0]?.city}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'address[0].city') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-6">
                              <div className="row select-label">
                                <div className="col-12 col-lg-4 ">
                                  Postal Code{" "}
                                  <span className="red-text">*</span>
                                </div>
                                <div className="col-12 col-lg-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    type="text"
                                    maxLength={
                                      address[0]?.country === "INDIA"
                                        ? "6"
                                        : "5"
                                    }
                                    value={address[0]?.postalCode}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">
                          DETAILS OF GIFTEE / RECEIPIENT
                        </div>
                        <div className="col-12 pr15 mt20">
                          <div>
                            <div className="row">
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    First Name{" "}
                                    <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="firstName"
                                      placeholder="First Name"
                                      type="text"
                                      value={recipient[0].firstName}
                                      onChange={(e) =>
                                        handleRecipentChange(e, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "recipient[0].firstName"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    Last Name{" "}
                                    <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="lastName"
                                      placeholder="Last Name"
                                      type="text"
                                      value={recipient[0].lastName}
                                      onChange={(e) =>
                                        handleRecipentChange(e, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "recipient[0].lastName"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    Mobile Number
                                    
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="mobileNo"
                                      maxLength={10}
                                      placeholder="Mobile Number"
                                      type="text"
                                      value={recipient[0].mobileNo}
                                      onChange={(e) =>
                                        handleRecipentChange(e, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "recipient[0].mobileNo"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    Email Id <span className="red-text">*</span>
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="emailId"
                                      placeholder="Email Id"
                                      type="text"
                                      value={recipient[0].emailId}
                                      onChange={(e) =>
                                        handleRecipentChange(e, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "recipient[0].emailId"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Street 1
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="street1"
                                      placeholder=" Street 1"
                                      type="text"
                                      value={recipient[0].address[0].street1}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    />
                                    
                                  </div>
                                </div>
                              </div>

                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Street 2
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="street2"
                                      placeholder="Street 2"
                                      type="text"
                                      value={recipient[0].address[0].street2}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    Street 3
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="street3"
                                      placeholder="Street 3"
                                      type="text"
                                      value={recipient[0].address[0].street3}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    Country
                                    {/* <span className="red-text">*</span> */}
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <select
                                      className=" form-control-inside form-select"
                                      name="country"
                                      id="country"
                                      value={recipient[0].address[0].country}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    >
                                      <option disabled selected value="">
                                        Select Country
                                      </option>
                                      {countries.map((country) => {
                                        return (
                                          <option key={country} value={country.countryName}>
                                            {country.countryName}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    State
                                    {/* <span className="red-text">*</span> */}
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    {receipientStateflag ? 
                                    <select
                                      className=" form-control-inside form-select"
                                      name="state"
                                      value={recipient[0].address[0].state}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    >
                                      <option disabled selected value="">
                                        Select State
                                      </option>
                                      {receipientStates.map((state) => (
                                        <option
                                          key={state}
                                          value={state.stateName}
                                        >
                                          {state.stateName}
                                        </option>
                                      ))}
                                    </select>
                                    :
                                    <input
                                    type="text"
                                    className="form-control-inside"
                                    placeholder="State"
                                    name="state"
                                      value={recipient[0].address[0].state}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }/>
                                      }
                                    
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    {" "}
                                    City 
                                    {/* <span className="red-text">*</span> */}
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="city"
                                      id="city"
                                      placeholder="City"
                                      type="text"
                                      value={recipient[0].address[0].city}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field ===
                                        "recipient[0].address[0].city"
                                      ) {
                                        return (
                                          <div
                                            key={index}
                                            className="error-message red-text"
                                          >
                                            {error.message}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="row select-label">
                                  <div className="col-12 col-lg-4 ">
                                    Postal Code 
                                    {/* <span className="red-text">*</span> */}
                                  </div>
                                  <div className="col-12 col-lg-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="postalCode"
                                      placeholder="Postal Code"
                                      type="text"
                                      maxLength={
                                        recipient[0].address[0].country ===
                                        "INDIA"
                                          ? "6"
                                          : "5"
                                      }
                                      value={recipient[0].address[0].postalCode}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    />
                                    {errors.map((error, index) => {
                                        if (
                                          error.field ===
                                          "recipient[0].address[0].postalCode"
                                        ) {
                                          return (
                                            <div
                                              key={index}
                                              className="error-message red-text"
                                            >
                                              {error.message}
                                            </div>
                                          );
                                        }
                                        return null;
                                      })}
                                  </div>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Mode of Payment</div>
                        <PaymentDetails
                          donations={donations}
                          errors={errors}
                          setLoading={setLoading}
                          handlePaymentInfoChange={handlePaymentInfoChange}
                          index={0}
                        />

                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--submit"
                          onClick={(e) => createDonationGift(e, userData)}
                        >
                          New Donation
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
                  <Card.Text>
                    Your Donor Id/Email Id is already exists please continue in
                    Existing Donor flow.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleDonationModalClose();
              handleTabChange("ExistingDonor");
            }}
          >
            Procced to Existing Donation
          </Button>
        </Modal.Footer>
      </Modal>
      {/* body */}
    </>
  );
}

export default OfflineDonation;
