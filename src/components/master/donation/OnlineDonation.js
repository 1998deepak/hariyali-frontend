import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Container,
  Form,
  Modal,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import Captcha from "../user/Captcha";
import CaptchaGift from "../user/CaptchaGift";
import { DonationService } from "../../../services/donationService/donation.service";
import { INDIA, SUCCESS } from "../../constants/constants";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import TermsConditionsPopup from "../../common/popup/TermsConditionsPopup";
import Loader from "../../common/loader/Loader";
import PrivacyPolicy from "../../common/PrivacyPolicy";
import Card from "react-bootstrap/Card";
import PackageDetails from "../../common/PackageDetails";
import useScrollTop from "../../hooks/useScrollTop";
import PrivacyPolicyPopup from "../../common/popup/PrivacyPolicyPopup";

function OnlineDonation() {
  //scroll Screen to top
  useScrollTop();
  const [donationType, setDonationType] = useState("Self-Donate");
  const [generalDonation, setGeneralDonation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState(null);
  const [gatewayConfiguration, setGatewayConfiguration] = useState(null);
  const [privacyPolicy1, setPrivacyPolicy1] = useState(false);
  const [privacyPolicy2, setPrivacyPolicy2] = useState(false);
  const [informationShare, setInformationShare] = useState(false);

  const [donation, setDonation] = useState("");

  const [validatePopup, setValidatePopup] = useState({});
  const [show, setShow] = useState(false);
  const [showConditons, setShowConditons] = useState(false);
  const [showConditons1, setShowConditons1] = useState(false);
  const [validSelfUser, setValidSelfUser] = useState(false);
  const [validGiftUser, setValidGiftUser] = useState(false);

  const [totalAmount, setTotalAmount] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseConditions = () => setShowConditons(false);
  const handleShowConditions1 = () => setShowConditons1(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState("");
  const location = useLocation();
  const meconnectId = location.search.split("?meconnectId=")[1];
  console.log(location.search.split("?meconnectId=")[1]);

  //   const handleDecodeClick = () => {
  //     const decodedSource = atob(source);
  //     const decodedMeConnect = atob(meconnectId)
  //     setdecodedString(decodedSource);
  // }

  const [hasAadharCard, setHasAadharCard] = useState(true);

  const handleRadioChange = (event) => {
    setHasAadharCard(event.target.value === "yes");
  };

  //   const handleDecodeClick = () => {
  //     const decodedSource = atob(source);
  //     const decodedMeConnect = atob(meconnectId)
  //     setdecodedString(decodedSource);
  // }

  const handleShowConditions = (e) => {
    e.preventDefault();
    setShowConditons(true);
  };

  const handleCloseConditions1 = (e) => {
    e.preventDefault();
    setShowConditons1(true);
  };

  const initialPackageData = [
    {
      packageName: "",
      bouquetPrice: 450,
      noOfBouquets: 1,
      amount: 450,
    },
  ];
  const [packageData, setPackageData] = useState(initialPackageData);
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
      passport: "",
      addharCard: "",
      activityType: null,
      meconnectId: meconnectId,
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
      donationMode: "online",
      donationEvent: "",
      totalAmount: 0,
      generalDonation: null,
      giftContent:"",
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

  const [address, setAddress] = useState(initialAddress);

  const [donations, setDonations] = useState(intialDonations);

  const [recipient, setRecipient] = useState(initialRecipientData);

  const [userEmail, setUserEmail] = useState(null);
  const [giftUserEmail, setGiftUserEmail] = useState(null);

  const [otp, setOtp] = useState(null);

  const [captchaVerfied, setCaptchaVerfied] = useState(false);
  const [message, setMessage] = useState("");
  const [privacyPolicymessage, setPrivacyPolicymessage] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [citizenships, setCitizenships] = useState([]);

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
      if(response?.data.length === 0){
        console.log(response?.data.length)
        if(document.getElementById("state2")){
        document.getElementById("state2").style.display = "block";
        } if(document.getElementById("state3")){
          document.getElementById("state3").style.display = "none";
        }
        setStates(response.data);
        setLoading(false);
      }else{
        if(document.getElementById("state2")){
          document.getElementById("state2").style.display = "none";
          } if(document.getElementById("state3")){
            document.getElementById("state3").style.display = "block";
          }
        setStates(response.data);
        setLoading(false);
      }
      // let data = response.data.map((item)=> ({ label: item, value: item }))
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };
  const getAllCitizenship = async () => {
    setLoading(true);
    const response = await DonationService.getAllCitizenship();
    if (response?.status === 200) {
      console.log(response.data);
      // let data = response.data.map((item)=> ({ label: item, value: item }))
      setCitizenships(response.data);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountryList();
    getAllCitizenship();
  }, []);

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

  const validate = (pan) => {
    const validationErrors = [];
    console.log(recipient[0]?.firstName, recipient[0].lastName, recipient[0]?.emailId);
    // Validate donationType
    if (!donationType) {
      validationErrors.push({
        field: "donationType",
        message: "Donation Type is required",
      });
    }

    if (!captchaVerfied) {
      validationErrors.push({
        field: "captchaError",
        message: "Captcha not verified",
      });
    }

    // Validate user data fields
    if (!userData?.user?.firstName) {
      validationErrors.push({
        field: "userData.user.firstName",
        message: "First Name is required",
      });
      if(document.getElementById("firstName")){
        document.getElementById("firstName").focus();
      }
    } else if (/\d/.test(userData.user.firstName)) {
      validationErrors.push({
        field: "userData.user.firstName",
        message: "First Name should only contain alphabets",
      });
        if(document.getElementById("firstName")){
          document.getElementById("firstName").focus();
        }
    }

    if (!userData?.user?.lastName) {
      validationErrors.push({
        field: "userData.user.lastName",
        message: "Last Name is required",
      });
      document.getElementById("lastName").focus();
    } else if (/\d/.test(userData.user.lastName)) {
      validationErrors.push({
        field: "userData.user.lastName",
        message: "Last Name should only contain alphabets",
      });
      if(document.getElementById("lastName")){
      document.getElementById("lastName").focus();}
    }


    if (userData?.user?.citizenship?.toUpperCase() === INDIA || address[0]?.country.toUpperCase() ===
    INDIA) {
    if (!userData?.user?.mobileNo) {
      validationErrors.push({
        field: "userData.user.mobileNo",
        message: "Mobile Number is required",
      });
      document.getElementById("mobileNo").focus();
    } else if (!/^(?!.*[a-zA-Z])\d{10}$/.test(userData.user.mobileNo)) {
      validationErrors.push({
        field: "userData.user.mobileNo",
        message:
          "Mobile Number must contain exactly 10 digits and no alphabetic characters",
      });
      if(document.getElementById("mobileNo")){
      document.getElementById("mobileNo").focus();
    }
    }
  }else{
    if (!userData?.user?.mobileNo) {
      validationErrors.push({
        field: "userData.user.mobileNo",
        message: "Mobile Number is required",
      });
      document.getElementById("mobileNo").focus();
    } else if (!/^(?!.*[a-zA-Z])\d{11}$/.test(userData.user.mobileNo)) {
      validationErrors.push({
        field: "userData.user.mobileNo",
        message:
          "Mobile Number must contain exactly 11 digits and no alphabetic characters",
      });
      if(document.getElementById("mobileNo")){
      document.getElementById("mobileNo").focus();
    }
    }
  }

    if (!userData?.user?.donarType) {
      validationErrors.push({
        field: "userData.user.donarType",
        message: "Donor Type is required",
      });
    }
    if (
      userData?.user?.donarType.toLocaleLowerCase() === "corporate" && !userData?.user?.organisation) {
      validationErrors.push({
        field: "userData.user.organisation",
        message: "Organisation is required",
      });
      if(document.getElementById("organisation")){
        document.getElementById("organisation").focus();
      }
    }
    if (userData?.user?.citizenship.toUpperCase() === INDIA || address[0]?.country.toUpperCase() ===
    INDIA ) {
      if (hasAadharCard === true) {
        if (!userData?.user?.panCard) {
          if(userData?.user?.donarType === "Corporate"){
            validationErrors.push({
            field: "userData.user.panCard",
            message: "TAN Number is Invalid",
          });
          if(document.getElementById("panCard")){
            document.getElementById("panCard").focus();
          }}else{
            validationErrors.push({
              field: "userData.user.panCard",
              message: "PAN Card Number is Invalid",
            });
            if(document.getElementById("panCard")){
              document.getElementById("panCard").focus();
            }
          }
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(userData?.user?.panCard)) {
          if(userData?.user?.donarType === "Corporate"){
            validationErrors.push({
            field: "userData.user.panCard",
            message: "TAN Number is Invalid",
          });
          if(document.getElementById("panCard")){
            document.getElementById("panCard").focus();
          }}else{
            validationErrors.push({
              field: "userData.user.panCard",
              message: "PAN Card Number is Invalid",
            });
            if(document.getElementById("panCard")){
              document.getElementById("panCard").focus();
            }
          }
        } if(/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(userData?.user?.panCard) === true && userData?.user?.donarType === "Corporate"){
          console.log(userData?.user?.panCard.trim().charAt(3));
          if(userData?.user?.panCard.trim().charAt(3) === "H" || userData?.user?.panCard.trim().charAt(3) === "P"){
            console.log("working!!")
            validationErrors.push({
              field: "userData.user.panCard",
              message: "TAN Number is Invalid",
            });
            if(document.getElementById("panCard")){
              document.getElementById("panCard").focus();
            }
        }
      }
       if(/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(userData?.user?.panCard) === true && userData?.user?.donarType === "Individual"){
        console.log(userData?.user?.panCard.trim().charAt(3));
        if(userData?.user?.panCard.trim().charAt(3) !== "H" && userData?.user?.panCard.trim().charAt(3) !== "P"){
          console.log("working!!")
          validationErrors.push({
            field: "userData.user.panCard",
            message: "PAN Card Number is Invalid",
          });
          if(document.getElementById("panCard")){
            document.getElementById("panCard").focus();
          }
      }
    }} else {
        if (
          !(/^\d{12}$/.test(userData.user.addharCard))) {
          validationErrors.push({
            field: "userData.user.addharCard",
            message:
              "ADDHAR Number must contain exactly 12 digits and no alphabetic characters",
          });
          if(document.getElementById("addharCard")){
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
        if(document.getElementById("passport")){
          document.getElementById("passport").focus();
        } 
      }
      // else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(userData?.user?.passport)) {
      //   validationErrors.push({
      //     field: "userData.user.passport",
      //     message: "Passport No is Invalid",
      //   });
      //   document.getElementById("passport").focus();
      // }
    }

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
        if(document.getElementById("street1")){
          document.getElementById("street1").focus();
        }
      }
      if (!addr?.country) {
        validationErrors.push({
          field: "address[" + i + "].country",
          message: "Country is required",
        });
        if(document.getElementById("country")){
          document.getElementById("country").focus();
        }
      }
      if (!addr?.state) {
        validationErrors.push({
          field: "address[" + i + "].state",
          message: "State is required",
        });
        if(document.getElementById("state")){
          document.getElementById("state").focus();
        }
      }
      if (!addr?.city) {
        validationErrors.push({
          field: "address[" + i + "].city",
          message: "City is required",
        });
        if(document.getElementById("city")){
          document.getElementById("city").focus();
        }        
      }
      if (!addr?.postalCode) {
        validationErrors.push({
          field: "address[" + i + "].postalCode",
          message: "postalCode is required",
        });
        if(document.getElementById("postalCode")){
          document.getElementById("postalCode").focus();
        }
      } else if (!/^\d{6}$/.test(addr?.postalCode)) {
        validationErrors.push({
          field: "address[" + i + "].postalCode",
          message: "Invalid Postal Code",
        });
        if(document.getElementById("postalCode")){
          document.getElementById("postalCode").focus();
        }
        
      }
    }

    // Validate recipient (only for "Gift Donate" donation type)
    console.log(donationType);
    if (donationType === "gift-donate") {
      console.log(donations[0].donationEvent);
      if (!donations[0]?.donationEvent) {
        validationErrors.push({
          field: "donations.donationEvent",
          message: "Donation Event is required",
        });
        if(document.getElementById("donationEvent")){
          document.getElementById("donationEvent").focus();
        }
      }
      console.log(donations[0]?.giftContent);
      if (!donations[0]?.giftContent) {
        validationErrors.push({
          field: "donations.giftContent",
          message: "Message for the giftee is required",
        });
        if(document.getElementById("giftContent")){
          document.getElementById("giftContent").focus();
        }
      }
      console.log(recipient[0]?.firstName);
      if (!recipient[0]?.firstName) {
        validationErrors.push({
          field: "recipient[0].firstName",
          message: "First Name is required",
        });
        if(document.getElementById("recFirstName")){
          document.getElementById("recFirstName").focus();
        }
      } else if (/\d/.test(recipient[0].firstName)) {
        validationErrors.push({
          field: "recipient[0].firstName",
          message: "First Name should only contain alphabets",
        });
        if(document.getElementById("recFirstName")){
          document.getElementById("recFirstName").focus();
        } 
      }
      if (!recipient[0].lastName) {
        validationErrors.push({
          field: "recipient[0].lastName",
          message: "Last Name is required",
        });
        if(document.getElementById("recLastName")){
          document.getElementById("recLastName").focus();
        }
      } else if (/\d/.test(recipient[0].lastName)) {
        validationErrors.push({
          field: "recipient[0].lastName",
          message: "Last Name should only contain alphabets",
        });
        if(document.getElementById("recLastName")){
          document.getElementById("recLastName").focus();
        }
        
      }

      if (!recipient[0]?.emailId) {
        validationErrors.push({
          field: "recipient[0].emailId",
          message: "Email ID is required",
        });
        if(document.getElementById("recEmailId")){
          document.getElementById("recEmailId").focus();
        }
      } else if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(recipient[0].emailId)) {
        validationErrors.push({
          field: "recipient[0].emailId",
          message: "Invalid Email ID",
        });
        if(document.getElementById("recEmailId")){
          document.getElementById("recEmailId").focus();
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

  {
    errors.length > 0 && (
      <p>
        {errors.map((error) => `${error.field}: ${error.message}`).join(", ")}
      </p>
    );
  }
  const handleDonationModalClose = () => setShowDonationModal(false);

  const resetErrors = async () => {
    setErrors([]);
    setPackageData((current) => {
      return current.map((item) => {
        return { ...item, noOfBouquets: "", amount: "" };
      });
    });

    setAddress(initialAddress);
    // setDonationType("");
    setDonations(intialDonations);
    setRecipient(initialRecipientData);
    setUserData(initialUserData);
    setInformationShare("yes");
    setPrivacyPolicy1(false);
    setPrivacyPolicy2(false);
    setUserEmail("");
    setGiftUserEmail("");
    setIsDivOpenGift(false);
    setIsDivOpen(false);
    setMessage("");
  };

  const setCaptchaFlag = async (flag) => {
    setCaptchaVerfied(flag);
  };
  const navigate = useNavigate();
  const userAdd = async (e, donationType) => {
    e.preventDefault();
    setDonationType(donationType == "self" ? "self-donate" : "gift-donate");
    const isValid = validate();
    console.log("isValid:", isValid);
    if (!privacyPolicy1 || !privacyPolicy2) {
      setPrivacyPolicymessage("Please Accept Privacy Policy");
    } else if (isValid) {
      setPrivacyPolicymessage("");
      let updatedUserPackage = [];
      packageData.map((item) => {
        if (item.noOfBouquets && item.amount) {
          updatedUserPackage.push(item);
        }
      });
      console.log(updatedUserPackage);
      const user = userData?.user;
      user.campaignConsent = informationShare;
      user.dataConsent = privacyPolicy2;
      if (donations[0].paymentInfo) {
        let paymentArray = { ...donations[0] };

        paymentArray.paymentInfo = [];
        if (hasValues(donations[0].paymentInfo[0])) {
          paymentArray.paymentInfo[0] = donations[0].paymentInfo[0];
        }

        if (hasValues(donations[0].paymentInfo[1])) {
          paymentArray.paymentInfo[1] = donations[0].paymentInfo[1];
        }

        console.log(paymentArray);

        user.donations[0] = paymentArray;
        console.log(user.donations[0]);
      }

      console.log(user);
      //setting Donation event

      user.donations[0].donationType =
        donationType == "self" ? "self-donate" : "gift-donate";

      user.emailId = donationType == "self" ? userEmail : giftUserEmail;

      //Setting Address array
      console.log(address.length);

      // if (!formData.formData.user.address) {
      //   formData.formData.user.address = initialAddress.slice();
      // }
      console.log(donationType);

      if (hasValues(address[0])) {
        user.address[0] = address[0];
      }
      console.log(user.address);
      console.log(hasValues(address[1]));
      if (hasValues(address[1])) {
        user.address[1] = address[1];
      }

      //Setting user Package array

      if (
        !user.donations[0].generalDonation ||
        user.donations[0].generalDonation < 0
      ) {
        user.donations[0].userPackage = updatedUserPackage;
      } else {
        user.donations[0].userPackage = [];
      }
      console.log(user);

      //setting recipent data
      if (donationType == "gift") {
        console.log(recipient);
        console.log("Reci");
        user.donations[0].recipient = recipient;
      } else {
        console.log(recipient);
        console.log("Not present");
        user.donations[0].recipient = [];
      }

      // Send the form data as JSON
      
      // console.log(JSON.stringify(user));
      // console.log(
      //   "Donation: " + JSON.stringify(user.donations[0])
      // );

      if(user.donations[0].totalAmount == 0){
        
        user.donations[0].totalAmount = user.donations[0].userPackage[0].amount;
        
      }
      setNewEmail(user.emailId);

      console.log(user);
      const response = await DonationService.AddOnlineuser(user);
      console.log(response);
      if (response?.status === SUCCESS) {
        toast.success(response?.message);
        setGatewayConfiguration(response);
        setTimeout(() => {
          document.getElementById("gatewayForm").submit();
        }, 1000);
      } else if (response?.status === "OTHERTHANINDIA") {
        setTotalAmount(response.data.donations[0].totalAmount);
        navigate(response.gatewayURL, {
          state:
            response.data.donations[0].totalAmount +
            "," +
            response.data.donations[0].createdBy,
        });
        clearForm(e);
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId");
    if (orderId) {
      getPaymentInformation(orderId);
    }
    //getAllPackages();
  }, []);

  const getPaymentInformation = async (paymentId) => {
    setLoading(true);
    const response = await DonationService.getPaymentInformation(paymentId);
    if (response?.status === "Success") {
      console.log(response);
      if (response?.data?.paymentStatus == "Success") {
        let message =
          "Thank you for your donation. <b>" +
          response?.data?.bankPaymentRefNo +
          "</b> is the transaction ID for your reference. The team will revert in 3-5 business working days.";
        console.log(message);
        setTransactionMessage(message);
        setShowDonationModal(true);
      } else {
        toast.error(response?.data?.remark);
      }
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  // const getAllPackages = async () => {
  //   setLoading(true);
  //   const response = await DonationService.getAllPackages();
  //   if (response?.status === "Success") {
  //     console.log(response);
  //     let packageData = [...initialPackageData];
  //     console.log(packageData);

  //     const parsedData = JSON.parse(response.data);

  //     let data = parsedData.map((item) => ({
  //       bouquetPrice: item.bouquet_price,
  //       noOfBouquets: 1,
  //       amount: item.bouquet_price,
  //     }));
  //     setPackageData(data);
  //     calculateOverallTotal(data);
  //     setLoading(false);
  //   } else {
  //     toast.error(response?.message);
  //     setLoading(false);
  //   }
  // };

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
    setPackageData((current) => {
      return current.map((item) => {
        return { ...item, noOfBouquets: "", amount: "" };
      });
    });

    setAddress(initialAddress);
    // setDonationType("");
    setDonations(intialDonations);
    setRecipient(initialRecipientData);
    setUserData(initialUserData);
  };
  const handleTabSelect = (eventKey) => {
    // eventKey.preventDefault();
    console.log(eventKey);
    setDonationType(eventKey);
    setPackageData((current) => {
      return current.map((item) => {
        return { ...item, noOfBouquets: "", amount: "" };
      });
    });

    setAddress(initialAddress);
    // setDonationType("");
    setDonations(intialDonations);
    setRecipient(initialRecipientData);
    setUserData(initialUserData);
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
    console.log(currentField);
    if (
      name == "user.panCard" ||
      name == "user.firstName" ||
      name == "user.lastName"
    ) {
      currentField[keys[keys.length - 1]] = value.toUpperCase();
    } else {
      currentField[keys[keys.length - 1]] = value;
    }
    setUserData(updatedFormData);
  };
  //Handle address change
  const handleAddressChange = (event, index) => {
    const { name, value } = event.target;
    console.log(index);
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
      getStatesByCountry(data.countryCode);
  }
  };
  //Handle Donations
  const handleDonationChange = (e, index) => {
    console.log(e);
    const { name, value } = e.target;
    const updatedDonations = [...donations];
    // if (name === "donationEvent") {
      console.log(name);
      // if (value === 'other') {
      //   setShowOtherInput(true);
      // } else {
      //   setShowOtherInput(false);
      // }
      updatedDonations[index][name] = value;
      console.log(updatedDonations);
    // }
    if (name === "generalDonation") {
      let gnrlDonation = parseInt(value);
      console.log(gnrlDonation);
      updatedDonations[index][name] = gnrlDonation > 0 ? gnrlDonation : null;
      console.log(updatedDonations[index]);
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
      getStatesByCountry(data.countryCode);
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
  // hide show forgot link
  const addaddressicon = () => {
    if (document.getElementById("addaddressDiv")) {
      if (document.getElementById("addaddressDiv").style.display === "none") {
        document.getElementById("addaddressDiv").style.display = "block";
      } else {
        document.getElementById("addaddressDiv").style.display = "block";
      }
    }
  };
  const minaddressDiv = () => {
    if (document.getElementById("addaddressDiv")) {
      if (document.getElementById("addaddressDiv").style.display === "block") {
        document.getElementById("addaddressDiv").style.display = "none";
      }
    }
  };
  const addpaymenticon = () => {
    console.log("Hiiiiiii");
    if (document.getElementById("addpaymentDiv")) {
      if (document.getElementById("addpaymentDiv").style.display === "none") {
        document.getElementById("addpaymentDiv").style.display = "block";
      } else {
        document.getElementById("addpaymentDiv").style.display = "block";
      }
    }
  };
  const minpaymentDiv = () => {
    if (document.getElementById("addpaymentDiv")) {
      if (document.getElementById("addpaymentDiv").style.display === "block") {
        document.getElementById("addpaymentDiv").style.display = "none";
      }
    }
  };

  const addgiftpaymenticon = () => {
    if (document.getElementById("addgiftpaymentDiv")) {
      if (
        document.getElementById("addgiftpaymentDiv").style.display === "none"
      ) {
        document.getElementById("addgiftpaymentDiv").style.display = "block";
      } else {
        document.getElementById("addgiftpaymentDiv").style.display = "block";
      }
    }
  };
  const mingiftpaymentDiv = () => {
    if (document.getElementById("addgiftpaymentDiv")) {
      if (
        document.getElementById("addgiftpaymentDiv").style.display === "block"
      ) {
        document.getElementById("addgiftpaymentDiv").style.display = "none";
      }
    }
  };

  const [emailError, setMailError] = useState("");

  const handleBlur = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let error = "";
    if (!value) {
      error = "Email ID is required";
      //validationErrors.push({ field: "userData.user.emailId", message: "Email ID is required" });
    } else if (
      !/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(value)
    ) {
      error = "Invalid Email ID";
      //validationErrors.push({ field: "userData.user.emailId", message: "Invalid Email ID" });
    }
    if (error) {
      setMailError(error);
    } else {
      getUserInfo(value, name);
      setMailError("");
    }
  };

  const getUserInfo = async (emailId, type) => {
    setLoading(true);
    let response = await DonationService.getDetailsByEmailId(emailId);
    console.log(response);
    setMessage("");
    if (response?.status === "Success") {
      toast.success(response?.message);
      if (response.data.address) {
        let addr = [...initialAddress];
        if (response.data.address[0]) {
          if (hasValues(response.data.address[0])) {
            addr[0] = response.data.address[0];
          }
        }
        if (response.data.address[1]) {
          if (hasValues(response.data.address[1])) {
            addr[1] = response.data.address[1];
          }
        }
      }

      const formData = {
        formData: {
          user: response?.data,
        },
      };
      if (response.data.donations) {
        if (response.data.donations[0].userPackage) {
          setPackageData(formData.formData.user.donations[0].userPackage);
        }
        setDonations(response.data.donations);
      }
      setUserData(formData.formData);
      clearState();
      setDonation(type);
      if (type === "self") {
        setValidSelfUser(true);
      } else {
        setValidGiftUser(true);
      }
      setLoading(false);
    } else if (
      response?.statusCode === 409 ||
      response?.status == "INTERNAL_SERVER_ERROR"
    ) {
      if (response?.message.indexOf("click here")) {
        setMessage(
          response?.message?.replace(
            "click here",
            '<a href="/Login">click here</a>'
          )
        );
      } else {
        toast.error(response?.message);
      }
      setIsDivOpen(false);
      setIsDivOpenGift(false);
      setLoading(false);
    } else {
      if (type === "self") {
        setValidSelfUser(false);
        setIsDivOpen(true);
      } else {
        setValidGiftUser(false);
        setIsDivOpenGift(true);
      }
      setLoading(false);
    }
  };

  const sendOtp = async (emailId) => {
    console.log(emailId);
    setLoading(true);
    let response = await DonationService.sendOtp(emailId);
    if (response?.status === "Success") {
      toast.success(response?.message);
      handleShow();
    }
    setLoading(false);
  };

  const verifyOtp = async (event, email, otp) => {
    event.preventDefault();
    event.stopPropagation();
    let validate = {};
    if (!otp) {
      validate.otp = "OTP is Required";
    }

    if (Object.entries(validate).length > 0) {
      setValidatePopup(validate);
      return;
    }
    setLoading(true);
    let response = await DonationService.verifiyOtp(email, otp);
    if (response?.status === "Success") {
      toast.success("User Verified Successfully");
      if (donation === "self") {
        setIsDivOpen(true);
      } else {
        setIsDivOpenGift(true);
      }
      clearState();
      handleClose();
      setLoading(false);
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isCSR, setIsCSR] = useState(false);
  const [isVisibleGift, setIsVisibleGift] = useState(false);
  const [isCSRGift, setIsCSRGift] = useState(false);
  const [isDivOpen, setIsDivOpen] = useState(false);
  const [isDivOpenGift, setIsDivOpenGift] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
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
    }
    console.log(currentField);
    currentField[keys[keys.length - 1]] = value;
    console.log(updatedFormData);
    setUserData(updatedFormData);
    if (value === "Corporate") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const changeActiveHandler = (e) => {
    if (e.target.value === "csr") {
      setIsCSR(true);
    } else {
      setIsCSR(false);
    }
  };
  const changeHandlerGift = (e) => {
    const { name, value } = e.target;
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
    }
    console.log(currentField);
    currentField[keys[keys.length - 1]] = value;
    console.log(updatedFormData);
    setUserData(updatedFormData);
    if (value === "Corporate") {
      setIsVisibleGift(true);
    } else {
      setIsVisibleGift(false);
    }
  };
  const changeActiveHandlerGift = (e) => {
    if (e.target.value === "csr") {
      setIsCSRGift(true);
    } else {
      setIsCSRGift(false);
    }
  };

  //enter key login
  const onChangeUserEmail = (event) => {
    const { value } = event.target;
    setUserEmail(value.toUpperCase());
  };

  const onChangeGiftUserEmail = (event) => {
    const { value } = event.target;
    setGiftUserEmail(value.toUpperCase());
  };

  const clearState = () => {
    setOtp("");
  };

  function validateInput(value) {
    const hasDecimalAfterDigits =
      value.includes(".") && value.split(".")[1].length > 0;
    const errorMessage = hasDecimalAfterDigits
      ? "Decimal points are not allowed after digits."
      : "";

    return { hasError: hasDecimalAfterDigits, errorMessage };
  }
  // const [errors1, setErrors1] = useState(
  //   Array(packageData.length).fill({ hasError: false, errorMessage: "" })
  // );

  // const [showOtherInput, setShowOtherInput] = useState(false);

  console.log(donations);

  const [inputValue, setInputValue] = useState('');
  const maxLength = 150;

  const handleChangeTextarea = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      setInputValue(inputValue);
    }
  };

  return (
    <>
      <ToastContainer />
      {/* slider */}
      {loading && <Loader />}
      {/* <div className="pt100"></div> */}
      <div className="section bggray ">
        {/* form */}
        <Container className="pt30">
          <Row className="contact-form-wrap donation-wrapper">
            {/* <div className="otherpages-heading">Online Donation</div> */}
            {/* <div className="col-4 left-img"><img src={DonationImg} alt="donation image" class="box-img"/></div> */}
            <div className="main-content">
              <Tabs
                defaultActiveKey="selfDonate"
                id="uncontrolled-tab-example"
                className="selftGift-tab online-donation-tabs"
                onSelect={() => resetErrors()}
              >
                <Tab
                  eventKey="selfDonate"
                  title="Plant a tree"
                  className="donation-tab"
                >
                  {/* <div className="pageheadingdiv mb10">Self Donor</div> */}
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="select-label">
                        {/* <div className="col-4 "> Donor Type</div> */}
                        <div className="col-12 p0 field-wrapper">
                          <label for="donorName" class="form-label">
                            Donor Type <span className="red-text">*</span>
                          </label>
                          <select
                            className=" form-control-inside form-select"
                            id="donarType"
                            name="user.donarType"
                            value={userData?.user?.donarType}
                            // onChange={handleChange}
                            onChange={changeHandler}
                          >
                            <option disabled selected value="">
                              Donor Type
                            </option>
                            <option value="Individual">Individual</option>
                            <option value="Corporate">Corporate</option>
                          </select>
                          {errors.map((error, index) => {
                            if (error.field === "userData.user.donarType") {
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
                  </div>
                  <div>
                    <div className="row">
                    {userData?.user?.donarType === "Corporate" ? (
                      <div className="col-12 col-md-6">
                        <div className="select-label">
                          {/* <div className="col-4 "> Select Your Citizenship</div> */}
                          <div className="col-12 p0 field-wrapper">
                                    <label class="form-label">
                                      Select Your Country{" "}
                                      <span className="red-text">*</span>
                                    </label>
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
                                      if (
                                        error.field === "address[0].country"
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
                      </div>):(<div className="col-12 col-md-6">
                        <div className="select-label">
                          {/* <div className="col-4 "> Select Your Citizenship</div> */}
                          <div className="col-12 p0 field-wrapper">
                            <label for="citizenship" class="form-label">
                              Select Your Citizenship{" "}
                              <span className="red-text">*</span>
                            </label>
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
                                  <option value={citizenship.citizenshipName}>
                                    {citizenship.citizenshipName}
                                  </option>
                                );
                              })}
                            </select>
                            {errors.map((error, index) => {
                              if (error.field === "userData.user.citizenship") {
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
                      </div>)}
                      <div className="col-12 col-md-6">
                        <div className="select-label">
                          {/* <div className="col-4 "> Email ID</div> */}
                          <div className="col-12 p0 field-wrapper">
                            {userData?.user?.donarType === "Corporate" ? (
                              <label for="emailId" class="form-label top-18">
                                Email ID - Point of Contact{" "}
                                <span className="red-text">*</span>
                              </label>
                            ) : (
                              <label for="emailId" class="form-label top-18">
                                Email ID of Donor{" "} <span className="red-text">*</span>
                              </label>
                            )}
                            <input
                              type="text"
                              placeholder="Enter Email Id"
                              name="self"
                              id="emailId"
                              value={userEmail}
                              onChange={onChangeUserEmail}
                              className="form-control"
                              // onKeyPress={handleKeyPress}
                              onBlur={(event) => handleBlur(event)}
                            />
                            {emailError ? (
                              <div className="error-message red-text">
                                {emailError}
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                      {message == "" &&
                      <div className="col-12 padding-top-10">
                        <Button
                          className="float-right"
                          variant="success"
                          disabled={!validSelfUser}
                          onClick={() => sendOtp(userEmail)}
                        >
                          Proceed
                        </Button>
                      </div>
                      }
                    </div>{" "}
                    <div className="padding-top-10" dangerouslySetInnerHTML={{ __html: message }}></div>
                    {userData?.user?.donarType === "Corporate" ? (
                      <div>For CSR related enquiries please reach us at <a href="">support@hariyali.org.in</a> | 022 22021031</div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <br/>
                  <div>
                    {isDivOpen && (
                      <div>
                        <form className="form-div contact-form-wrap">
                          <PackageDetails
                            packageData={packageData}
                            setPackageData={setPackageData}
                            setLoading={setLoading}
                            initialPackageData={initialPackageData}
                            donations={donations}
                            calculateOverallTotal={calculateOverallTotal}
                          />
                          <div className="clear"></div>
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
                          <div className="col-12 pr15">
                            <div className="row">
                              {userData?.user?.donarType.toLocaleLowerCase() ===
                              "corporate" ? (
                                <>
                                  <div className="col-12 col-md-6">
                                    <div className="select-label">
                                      {/* <div className="col-4 "> Organisation</div> */}
                                      <div className="col-12 p0 field-wrapper">
                                        <label
                                          for="organisation"
                                          class="form-label top-27"
                                        >
                                          Organisation{" "}
                                          <span className="red-text">*</span>
                                        </label>
                                        <input
                                          className="form-control-inside form-control"
                                          name="user.organisation"
                                          id="organisation"
                                          placeholder="Organisation"
                                          type="text"
                                          value={userData?.user?.organisation}
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
                                  <div className="col-12 col-md-6">
                                    <div className="select-label">
                                      {/* <div className="col-4 ">Mobile No.</div> */}
                                      <div className="col-12 p0 field-wrapper">
                                        <label
                                          for="mobileNo"
                                          class="form-label top-27"
                                        >
                                          Mobile Number{" "}
                                          <span className="red-text">*</span>
                                        </label>
                                        <input
                                          className="form-control-inside form-control"
                                          type="text"
                                          id="mobileNo"
                                          name="user.mobileNo"
                                          placeholder="Mobile Number"
                                          value={userData?.user?.mobileNo}
                                          onChange={handleChange}
                                        />
                                        {errors.map((error, index) => {
                                          if (
                                            error.field ===
                                            "userData.user.mobileNo"
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
                              ) : (
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    {/* <div className="col-4 ">Mobile No.</div> */}
                                    <div className="col-12 p0 field-wrapper">
                                      <label
                                        for="mobileNo"
                                        class="form-label top-27"
                                      >
                                        Mobile Number{" "}
                                        <span className="red-text">*</span>
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
                                        type="text"
                                        id="mobileNo"
                                        name="user.mobileNo"
                                        placeholder="Mobile Number"
                                        value={userData?.user?.mobileNo}
                                        onChange={handleChange}
                                      />
                                      {errors.map((error, index) => {
                                        if (
                                          error.field ===
                                          "userData.user.mobileNo"
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
                              {userData?.user?.donarType === "Corporate" ? (
                                <></>
                              ) : (
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    {/* <div className="col-4 ">Prefix</div> */}
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        Prefix{" "}
                                      </label>

                                      <select
                                        className=" form-control-inside form-select form-control"
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
                                        <option value="Ms.">Miss.</option>
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
                              )}
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  {/* <div className="col-4 ">First Name</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label
                                      for="firstName"
                                      class="form-label top-27"
                                    >
                                      First Name{" "}
                                      <span className="red-text">*</span>
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
                                      type="text"
                                      id="firstName"
                                      name="user.firstName"
                                      placeholder="First Name"
                                      value={userData?.user?.firstName}
                                      onChange={handleChange}
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field ===
                                        "userData.user.firstName"
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
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  {/* <div className="col-4 ">Last Name</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label
                                      for="lastName"
                                      class="form-label top-27"
                                    >
                                      Last Name{" "}
                                      <span className="red-text">*</span>
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
                                      type="text"
                                      name="user.lastName"
                                      id="lastName"
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
                              INDIA || address[0]?.country.toUpperCase() ===
                              INDIA ? (
                                <>
                                  {userData?.user?.donarType ===
                                  "Individual" ? (
                                    <div className="col-12 col-md-6 mt-5">
                                      <div className="select-label">
                                        <div className="col-12 p0 field-wrapper">
                                            <label>
                                              Do you have a PAN Card?
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
                                  ) : (
                                    <></>
                                  )}

                                  {hasAadharCard ? (
                                    <div className="col-12 col-md-6">
                                      <div className="select-label">
                                        {/* <div className="col-4 ">PAN card</div> */}
                                        <div className="col-12 p0 field-wrapper">
                                          {userData?.user?.donarType ===
                                          "Corporate" ? (
                                            <>
                                            <label
                                              for="panCard"
                                              class="form-label top-27"
                                            >
                                              TAN Number{" "}
                                              <span className="red-text">
                                                *
                                              </span>
                                            </label>
                                            </>
                                            
                                          ) : (
                                            <>
                                            <label
                                              for="panCard"
                                              class="form-label top-27"
                                            >
                                              PAN Card{" "}
                                              <span className="red-text">
                                                *
                                              </span>
                                            </label>
                                         
                                            </>
                                          )}
                                          <input
                                            className="form-control-inside form-control"
                                            name="user.panCard"
                                            id="panCard"
                                            placeholder={userData?.user?.donarType === "Corporate"?"TAN number":"PAN card number"}
                                            type="text"
                                            value={userData?.user?.panCard}
                                            onChange={handleChange}
                                            />
                                          <small className="text-muted">
                                            Disclaimer: Please ensure that you
                                            have entered the correct PAN details
                                            to avoid non-deduction u/s 80G of
                                            the Income Tax Act,1961
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
                                      className="col-12 col-md-6"
                                    >
                                      <div className="select-label">
                                        {/* <div className="col-4 ">PAN card</div> */}
                                        <div className="col-12 p0 field-wrapper">
                                          <label
                                            for="addharCard"
                                            class="form-label top-27"
                                          >
                                            AADHAAR Card{" "}
                                            <span className="red-text">*</span>
                                          </label>
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
                                  <div className="col-12 col-md-6">
                                    <div className="select-label">
                                      {/* <div className="col-4 ">PAN card</div> */}
                                      <div className="col-12 p0 field-wrapper">
                                        <label className="form-label">
                                          Passport{" "}
                                          <span className="red-text">*</span>
                                        </label>
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
                          <br/>
                          {userData?.user?.donarType === "Corporate" ? (
                            <div className="">
                            ORGANISATION ADDRESS
                            </div>
                          ) : (
                            <div className="">ADDRESS</div>
                          )}
                          <div className="col-12 pr15">
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  {/* <div className="col-4 "> Street 1</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      Street 1{" "}
                                      <span className="red-text">*</span>
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
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
                                      if (
                                        error.field === "address[0].street1"
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
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  {/* <div className="col-4 "> Street 2</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      Street 2
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
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
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  {/* <div className="col-4 "> Street 3</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      Street 3
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
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
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  {/* <div className="col-4 ">State</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      Country{" "}
                                      <span className="red-text">*</span>
                                    </label>
                                    <select
                                      className=" form-control-inside form-select form-control"
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
                                      if (
                                        error.field === "address[0].country"
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
                              <div id="state3" className="col-12 col-md-6" style={{display:"block"}}>
                                <div className="select-label">
                                  {/* <div className="col-4 ">State</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      State <span className="red-text">*</span>
                                    </label>
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
                              {/* {userData?.user?.citizenship === "India" ? (
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label class="form-label top-27">
                                        State{" "}
                                        <span className="red-text">*</span>
                                      </label>
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
                                        {stateOptions.map((state) => (
                                          <option key={state} value={state}>
                                            {state}
                                          </option>
                                        ))}
                                      </select>
                                      {errors.map((error, index) => {
                                        if (
                                          error.field === "address[0].state"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label class="form-label top-27">
                                        State
                                      </label>
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
                                        if (
                                          error.field === "address[0].state"
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
                              )} */}
                              <div id="state2" className="col-12 col-md-6" style={{display:"none"}}>
                                <div className="select-label">
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      State <span className="red-text">*</span>
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
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
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      City <span className="red-text">*</span>
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
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
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  {/* <div className="col-4 ">Postal Code</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      Postal Code{" "}
                                      <span className="red-text">*</span>
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
                                      name="postalCode"
                                      id="postalCode"
                                      maxLength={6}
                                      placeholder="Postal Code"
                                      type="text"
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
                            <div className="col-12 pr15">
                              <div className="row">
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    {/* <div className="col-4 "> Street 1</div> */}
                                    <div className="col-12 p0 field-wrapper">
                                      <label class="form-label top-27">
                                        Street 1
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    {/* <div className="col-4 "> Street 2</div> */}
                                    <div className="col-12 p0 field-wrapper">
                                      <label class="form-label top-27">
                                        Street 2
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    {/* <div className="col-4 "> Street 3</div> */}
                                    <div className="col-12 p0 field-wrapper">
                                      <label class="form-label top-27">
                                        Street 3
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    {/* <div className="col-4 ">Country</div> */}
                                    <div className="col-12 p0 field-wrapper">
                                      <label class="form-label top-27">
                                        Country
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
                                        name="country"
                                        placeholder="Country"
                                        type="text"
                                        value={address[1].country}
                                        onChange={(event) =>
                                          handleAddressChange(event, 1)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    {/* <div className="col-4 ">State</div> */}
                                    <div className="col-12 p0 field-wrapper">
                                      <label class="form-label top-27">
                                        State
                                      </label>
                                      <select
                                        className=" form-control-inside form-select  form-control"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    {/* <div className="col-4 ">City</div> */}
                                    <div className="col-12 p0 field-wrapper">
                                      <label class="form-label top-27">
                                        City
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    {/* <div className="col-4 ">Postal Code</div> */}
                                    <div className="col-12 p0 field-wrapper">
                                      <label class="form-label top-27">
                                        Postal Code
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
                                        name="postalCode"
                                        placeholder="Postal Code"
                                        type="text"
                                        value={address[1]?.postalCode}
                                        onChange={(event) =>
                                          handleAddressChange(event, 1)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <hr />
                          </div>

                          <div className="col-12 col-md-6 mt20">
                            <Captcha
                              verified={false}
                              setVerified={(flag) => {
                                setCaptchaFlag(flag);
                              }}
                              id="captcha1"
                            />
                          </div>
                          {errors.map((error, index) => {
                            if (error.field === "captchaError") {
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
                          <hr />
                          <PrivacyPolicy
                            informationShare={informationShare}
                            setInformationShare={setInformationShare}
                            privacyPolicy1={privacyPolicy1}
                            privacyPolicy2={privacyPolicy2}
                            setPrivacyPolicy1={setPrivacyPolicy1}
                            setPrivacyPolicy2={setPrivacyPolicy2}
                            handleShowConditions={handleShowConditions}
                            handleCloseConditions1 ={handleCloseConditions1}
                            privacyPolicymessage={privacyPolicymessage}
                          />

                          <button
                            type="submit"
                            className="mt20 mr10 webform-button--submit"
                            onClick={(e) => userAdd(e, "self")}
                          >
                            Proceed to pay
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
                    )}
                  </div>
                </Tab>
                <Tab
                  eventKey="giftaPlant"
                  title="Gift a tree"
                  className="donation-tab"
                >
                  {/* <div className="pageheadingdiv mb10">Gift a Plant</div> */}

                  <form
                    // onSubmit={userAdd}
                    className="form-div contact-form-wrap"
                  >
                    <div className="col-12 ">
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className=" select-label">
                            {/* <div className="col-4 "> Donor Type</div> */}
                            <div className="col-12 p0 field-wrapper">
                              <label className="form-label top-27">
                                Donor Type <span className="red-text">*</span>
                              </label>
                              <select
                                className=" form-control-inside form-select"
                                name="user.donarType"
                                value={userData?.user?.donarType}
                                // onChange={handleChange}
                                onChange={changeHandlerGift}
                              >
                                <option disabled selected value="">
                                  Donor Type
                                </option>
                                <option value="Individual">Individual</option>
                                <option value="Corporate">Corporate</option>
                              </select>
                              {errors.map((error, index) => {
                                if (error.field === "userData.user.donarType") {
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
                        <div className="col-12 col-md-6">
                          <div className="select-label">
                            {/* <div className="col-4 "> Email ID</div> */}
                            <div className="col-12 p0 field-wrapper">
                              {userData?.user?.donarType === "Corporate" ? (
                                <label for="emailId" class="form-label top-18">
                                  Email ID - Point Of Contact{" "}
                                  <span className="red-text">*</span>
                                </label>
                              ) : (
                                <label for="emailId" class="form-label top-18">
                                  Email ID of Donor / Gifter {" "}<span className="red-text">*</span>
                                </label>
                              )}
                              <input
                                type="text"
                                name="gift"
                                value={giftUserEmail}
                                id="emailId"
                                onChange={onChangeGiftUserEmail}
                                placeholder="Enter Email Id"
                                className="form-control"
                                // onKeyPress={handleKeyPress}
                                onBlur={handleBlur}
                              />
                              {emailError ? (
                                <div className="error-message red-text">
                                  {emailError}
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className=" select-label">
                            {/* <div className="col-4 "> Select Your Citizenship</div> */}
                            {userData?.user?.donarType === "Corporate" ? (
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label">
                                      Select Your Country{" "}
                                      <span className="red-text">*</span>
                                    </label>
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
                                      if (
                                        error.field === "address[0].country"
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
                                ):(
                              <div className="col-12 p0 field-wrapper">
                              <label className="form-label">
                                Select Your Citizenship{" "}
                                <span className="red-text">*</span>
                              </label>
                              <select
                                className=" form-control-inside form-select"
                                name="user.citizenship"
                                value={userData?.user?.citizenship}
                                onChange={handleChange}
                              >
                                <option disabled selected value="">
                                  Select Citizenship
                                </option>
                                {citizenships.map((citizenship) => {
                                  return (
                                    <option value={citizenship.citizenshipName}>
                                      {citizenship.citizenshipName}
                                    </option>
                                  );
                                })}
                              </select>
                              {errors.map((error, index) => {
                              if (error.field === "userData.user.citizenship") {
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
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className=" select-label">
                            {/* <div className="col-4 ">Occasion</div> */}
                            <div className="col-12 p0 field-wrapper">
                              <label className="form-label">
                                Occasion <span className="red-text">*</span>
                              </label>
                              <select
                                className=" form-control-inside form-select"
                                name="donationEvent"
                                id="donationEvent"
                                value={donations[0].donationEvent}
                                onChange={(e) => handleDonationChange(e, 0)}
                              >
                                <option disabled selected value="">
                                  Select Occasion
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

                                {/* <input type="text" className="form-control" /> */}
                              </select>

                              {errors.map((error, index) => {
                                if (error.field === "donations.donationEvent") {
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
                        <div className="col-12 col-md-6">
                          <div className=" select-label">
                            {/* <div className="col-4 ">Occasion</div> */}
                            <div className="col-12 p0 field-wrapper">
                              <label className="form-label">
                                Message for the Giftee {" "}
                                <span className="red-text">*</span>
                              </label>
                              <textarea
                                className="form-control"
                                placeholder="Message for the Giftee"
                                name="giftContent"
                                id="giftContent"
                                value={donations[0].giftContent}
                                onChange={(e) => {handleChangeTextarea(e);handleDonationChange(e, 0)}}
                                maxLength={maxLength}
                              ></textarea>
                              <p>
                                {inputValue.length}/{maxLength} Characters
                              </p>
                              {errors.map((error, index) => {
                                if (error.field === "donations.giftContent") {
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
                        {message == "" &&
                          <div className="col-12 padding-top-10">
                            <span className="actionheadingdiv"><b>Proceed to Gift and provide Gifter & Giftee details</b></span>

                            <Button
                              className="float-right"
                              variant="success"
                              disabled={!validGiftUser}
                              onClick={() => sendOtp(giftUserEmail)}
                            >
                              Proceed
                            </Button>
                          </div>
                        }
                      </div>{" "}
                      <div dangerouslySetInnerHTML={{ __html: message }}></div>
                    </div>
                    {isDivOpenGift && (
                      <div>
                        <form className="form-div contact-form-wrap">
                          <PackageDetails
                            packageData={packageData}
                            setPackageData={setPackageData}
                            setLoading={setLoading}
                            initialPackageData={initialPackageData}
                            donations={donations}
                            calculateOverallTotal={calculateOverallTotal}
                          />
                          <div className="clear"></div>
                          <hr />
                          {userData?.user?.donarType === "Corporate" ? (
                            <div className="actionheadingdiv">
                              DETAILS OF POINT OF CONTACT / GIFTER
                            </div>
                          ) : (
                            <div className="actionheadingdiv">
                              DETAILS OF DONOR / GIFTER
                            </div>
                          )}
                          <div className="col-12 pr15 mt20">
                            <div className="row">
                              {userData?.user?.donarType === "Corporate" ? (
                                <>
                                  <div className="col-12 col-md-6">
                                    <div className="select-label">
                                      {/* <div className="col-4 "> Organisation</div> */}
                                      <div className="col-12 p0 field-wrapper">
                                        <label className="form-label">
                                          Organisation{" "}
                                          <span className="red-text">*</span>
                                        </label>
                                        <input
                                          className="form-control-inside form-control"
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
                                  <div className="col-12 col-md-6">
                                    <div className="select-label">
                                      {/* <div className="col-4 ">Mobile No.</div> */}
                                      <div className="col-12 p0 field-wrapper">
                                        <label className="form-label">
                                          Mobile Number
                                          <span className="red-text">*</span>
                                        </label>
                                        <input
                                          className="form-control-inside form-control"
                                          type="text"
                                          id="mobileNo"
                                          name="user.mobileNo"
                                          placeholder="Mobile Number"
                                          value={userData.user.mobileNo}
                                          onChange={handleChange}
                                        />
                                        {errors.map((error, index) => {
                                          if (
                                            error.field ===
                                            "userData.user.mobileNo"
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
                              ) : (
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    {/* <div className="col-4 ">Mobile No.</div> */}
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        Mobile Number
                                        <span className="red-text">*</span>
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
                                        type="text"
                                        id="mobileNo"
                                        name="user.mobileNo"
                                        placeholder="Mobile Number"
                                        value={userData.user.mobileNo}
                                        onChange={handleChange}
                                      />
                                      {errors.map((error, index) => {
                                        if (
                                          error.field ===
                                          "userData.user.mobileNo"
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
                              {userData?.user?.donarType === "Corporate" ? (
                                <></>
                              ) : (
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    {/* <div className="col-4 ">Prefix</div> */}
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        Prefix{" "}
                                      </label>

                                      <select
                                        className=" form-control-inside form-select"
                                        name="user.prefix"
                                        id="prefix"
                                        value={userData.user.prefix}
                                        onChange={handleChange}
                                      >
                                        <option disabled selected value="">
                                          Prefix
                                        </option>
                                        <option value="Mr.">Mr.</option>
                                        <option value="Mrs.">Mrs.</option>
                                        <option value="Ms.">Ms.</option>
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
                              )}
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  {/* <div className="col-4 ">First Name</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label className="form-label">
                                      First Name{" "}
                                      <span className="red-text">*</span>
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
                                      type="text"
                                      id="firstName"
                                      name="user.firstName"
                                      placeholder="First Name"
                                      value={userData.user.firstName}
                                      onChange={handleChange}
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field ===
                                        "userData.user.firstName"
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
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  {/* <div className="col-4 ">Last Name</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label className="form-label">
                                      Last Name{" "}
                                      <span className="red-text">*</span>
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
                                      type="text"
                                      id="lastName"
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
                              INDIA || address[0]?.country.toUpperCase() ===
                              INDIA ? (
                                <>
                                  {userData?.user?.donarType ===
                                  "Individual" ? (
                                    <div className="col-12 col-md-6 mt-5">
                                      <div className="select-label">
                                        <div className="col-12 p0 field-wrapper">
                                            <label>
                                              Do you have a PAN Card?
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
                                  ) : (
                                    <></>
                                  )}

                                  {hasAadharCard ? (
                                    <div className="col-12 col-md-6">
                                      <div className="select-label">
                                        {/* <div className="col-4 ">PAN card</div> */}
                                        <div className="col-12 p0 field-wrapper">
                                          {userData?.user?.donarType ===
                                          "Corporate" ? (
                                            <>
                                            <label
                                              for="panCard"
                                              class="form-label top-27"
                                            >
                                              TAN Number{" "}
                                              <span className="red-text">
                                                *
                                              </span>
                                            </label>
                                            
                                            </>
                                          ) : (
                                            <>
                                            <label
                                              for="panCard"
                                              class="form-label top-27"
                                            >
                                              PAN Card{" "}
                                              <span className="red-text">
                                                *
                                              </span>
                                            </label>
                                            
                                            </>
                                          )}
                                          <input
                                            className="form-control-inside form-control"
                                            name="user.panCard"
                                            id="panCard"
                                            placeholder={userData?.user?.donarType === "Corporate"?"TAN number":"PAN card number"}
                                            type="text"
                                            value={userData?.user?.panCard}
                                            onChange={handleChange}
                                          />
                                          <small className="text-muted">
                                            Disclaimer: Please ensure that you
                                            have entered the correct PAN details
                                            to avoid non-deduction u/s 80G of
                                            the Income Tax Act,1961
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
                                      className="col-12 col-md-6"
                                    >
                                      <div className="select-label">
                                        {/* <div className="col-4 ">PAN card</div> */}
                                        <div className="col-12 p0 field-wrapper">
                                          <label
                                            for="addharCard"
                                            class="form-label top-27"
                                          >
                                            AADHAAR Card{" "}
                                            <span className="red-text">*</span>
                                          </label>
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
                                  <div className="col-12 col-md-6">
                                    <div className="select-label">
                                      {/* <div className="col-4 ">PAN card</div> */}
                                      <div className="col-12 p0 field-wrapper">
                                        <label className="form-label">
                                          Passport{" "}
                                          <span className="red-text">*</span>
                                        </label>
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
                          <br />
                          {userData?.user?.donarType === "Corporate" ? (
                            <div className="">
                              ORGANISATION ADDRESS
                            </div>
                          ) : (
                            <div className="">ADDRESS</div>
                          )}
                          <div className="col-12 pr15">
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  {/* <div className="col-4 "> Street 1</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label className="form-label">
                                      Street 1{" "}
                                      <span className="red-text">*</span>
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
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
                                      if (
                                        error.field === "address[0].street1"
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
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  {/* <div className="col-4 "> Street 2</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label className="form-label">
                                      Street 2
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
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
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  <div className="col-12 p0 field-wrapper">
                                    <label className="form-label">
                                      Street 3
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
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
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  {/* <div className="col-4 ">State</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      Country{" "}
                                      <span className="red-text">*</span>
                                    </label>
                                    <select
                                      className=" form-control-inside form-select form-control"
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
                                      if (
                                        error.field === "address[0].country"
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
                              <div id="state3" className="col-12 col-md-6" style={{display:"block"}}>
                                <div className="select-label">
                                  {/* <div className="col-4 ">State</div> */}
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      State <span className="red-text">*</span>
                                    </label>
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
                              {/* {userData?.user?.citizenship === "India" ? (
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label class="form-label top-27">
                                        State{" "}
                                        <span className="red-text">*</span>
                                      </label>
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
                                        if (
                                          error.field === "address[0].state"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label class="form-label top-27">
                                        State
                                      </label>
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
                                        if (
                                          error.field === "address[0].state"
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
                              )} */}
                              <div id="state2" className="col-12 col-md-6" style={{display:"none"}}>
                                <div className="select-label">
                                  <div className="col-12 p0 field-wrapper">
                                    <label class="form-label top-27">
                                      State <span className="red-text">*</span>
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
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
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  <div className="col-12 p0 field-wrapper">
                                    <label className="form-label">
                                      City <span className="red-text">*</span>
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
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
                              <div className="col-12 col-md-6">
                                <div className="select-label">
                                  <div className="col-12 p0 field-wrapper">
                                    <label className="form-label">
                                      Postal Code{" "}
                                      <span className="red-text">*</span>
                                    </label>
                                    <input
                                      className="form-control-inside form-control"
                                      id="postalCode"
                                      name="postalCode"
                                      type="text"
                                      maxLength={6}
                                      placeholder="Postal Code"
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
                            DETIALS OF GIFTEE / RECEIPIENT
                          </div>
                          <div className="col-12 pr15">
                            <div>
                              <div className="row">
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        First Name{" "}
                                        <span className="red-text">*</span>
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
                                        name="firstName"
                                        id="recFirstName"
                                        placeholder="First Name"
                                        type="text"
                                        value={recipient[0].firstName}
                                        onChange={(e) =>
                                          handleRecipentChange(e, 0)
                                        }
                                      />
                                      {errors.map((error, index) => {
                                        if (
                                          error.field ===
                                          "recipient[0].firstName"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        Last Name{" "}
                                        <span className="red-text">*</span>
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
                                        name="lastName"
                                        id="recLastName"
                                        placeholder="Last Name"
                                        type="text"
                                        value={recipient[0].lastName}
                                        onChange={(e) =>
                                          handleRecipentChange(e, 0)
                                        }
                                      />
                                      {errors.map((error, index) => {
                                        if (
                                          error.field ===
                                          "recipient[0].lastName"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        Mobile Number
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
                                        id="recMobileNo"
                                        name="mobileNo"
                                        placeholder="Mobile Number"
                                        type="text"
                                        value={recipient[0].mobileNo}
                                        onChange={(e) =>
                                          handleRecipentChange(e, 0)
                                        }
                                      />
                                      {errors.map((error, index) => {
                                        if (
                                          error.field ===
                                          "recipient[0].mobileNo"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        Email Id{" "}
                                        <span className="red-text">*</span>
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
                                        name="emailId"
                                        id="recEmailId"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        Street 1{" "}
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
                                        id="recStreet1"
                                        name="street1"
                                        placeholder=" Street 1"
                                        type="text"
                                        value={recipient[0].address[0].street1}
                                        onChange={(e) =>
                                          handleRecipentAddressChange(e, 0)
                                        }
                                      />
                                      {errors.map((error, index) => {
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
                                      })}
                                    </div>
                                  </div>
                                </div>

                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        Street 2
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        Street 3
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        Country
                                      </label>
                                      <select
                                        className=" form-control-inside form-select form-control"
                                        name="country"
                                        id="recCountry"
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
                                      {errors.map((error, index) => {
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
                                      })}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    {/* <div className="col-4 ">Statesss</div> */}
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        State
                                      </label>
                                      <select
                                        className=" form-control-inside form-select form-control"
                                        name="state"
                                        id="recState"
                                        value={recipient[0].address[0].state}
                                        onChange={(e) =>
                                          handleRecipentAddressChange(e, 0)
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
                                      })}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">City</label>
                                      <input
                                        className="form-control-inside form-control"
                                        name="city"
                                        id="recCity"
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
                                <div className="col-12 col-md-6">
                                  <div className="select-label">
                                    <div className="col-12 p0 field-wrapper">
                                      <label className="form-label">
                                        Postal Code
                                      </label>
                                      <input
                                        className="form-control-inside form-control"
                                        name="postalCode"
                                        placeholder="Postal Code"
                                        type="text"
                                        value={
                                          recipient[0].address[0].postalCode
                                        }
                                        onChange={(e) =>
                                          handleRecipentAddressChange(e, 0)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr />
                        <div className="col-12 col-md-6 mt20">
                          <CaptchaGift
                            verified={false}
                            setVerified={(flag) => setCaptchaFlag(flag)}
                            id="captcha2"
                          />
                          {errors.map((error, index) => {
                            if (error.field === "captchaError") {
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
                          {validatePopup.captcha ? (
                            <div className="error-message red-text">
                              {validatePopup.captcha}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                          <hr />
                          <PrivacyPolicy
                            informationShare={informationShare}
                            setInformationShare={setInformationShare}
                            privacyPolicy1={privacyPolicy1}
                            privacyPolicy2={privacyPolicy2}
                            setPrivacyPolicy1={setPrivacyPolicy1}
                            setPrivacyPolicy2={setPrivacyPolicy2}
                            handleShowConditions={handleShowConditions}
                            handleCloseConditions1={handleCloseConditions1}
                            privacyPolicymessage={privacyPolicymessage}
                          />
                          <button
                            type="submit"
                            className="mt20 mr10 webform-button--submit"
                            onClick={(e) => userAdd(e, "gift")}
                          >
                            Proceed to pay
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
                          {/* <button className="fab-button">
                          Preview
                        </button> */}
                        </form>
                      </div>
                    )}
                  </form>
                </Tab>
              </Tabs>
            </div>
          </Row>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header style={{ backgroundColor: "#23aa4a" }} closeButton>
              <Modal.Title>OTP Verification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="validate.ControlInput1">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    value={donation === "self" ? userEmail : giftUserEmail}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="validate.ControlInput2">
                  <Form.Label>OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    maxLength={6}
                    required
                  />
                  {validatePopup.otp ? (
                    <div className="error-message red-text">
                      {validatePopup.otp}
                    </div>
                  ) : (
                    <></>
                  )}
                  <Form.Text className="text-muted">
                    Check Email for OTP if not found click on{" "}
                    <Button
                      className="resend-otp-btn"
                      onClick={() =>
                        sendOtp(donation === "self" ? userEmail : giftUserEmail)
                      }
                    >
                      RESEND OTP
                    </Button>
                  </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleClose}>
                Close
              </Button>
              <Button
                type="submit"
                variant="success"
                onClick={(event) =>
                  verifyOtp(
                    event,
                    donation === "self" ? userEmail : giftUserEmail,
                    otp
                  )
                }
              >
                Verify OTP
              </Button>
            </Modal.Footer>
          </Modal>

          <TermsConditionsPopup
            showConditons={showConditons}
            handleCloseConditions={handleCloseConditions}
          />
          <PrivacyPolicyPopup
            showConditons1={showConditons1}
            handleCloseConditions1={handleShowConditions1}
          />
        </Container>
      </div>
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
                    <BsEmojiSmile />
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

export default OnlineDonation;
