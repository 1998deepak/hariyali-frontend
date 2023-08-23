import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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
import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
import { DonationService } from "../../../services/donationService/donation.service";
import { SUCCESS } from "../../constants/constants";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

function OnlineDonation() {
  const [donationType, setDonationType] = useState("Self-Donate");
  const [generalDonation, setGeneralDonation] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [gatewayConfiguration, setGatewayConfiguration] = useState(null);

  const [donation, setDonation] = useState("");

  const [validatePopup, setValidatePopup] = useState({});
  const [show, setShow] = useState(false);
  const [validSelfUser, setValidSelfUser] = useState(false);
  const [validGiftUser, setValidGiftUser] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialPackageData = [
    {
      packageName: "",
      bouquetPrice: "",
      noOfBouquets: "",
      // maintenanceCost: "",
      amount: "",
    },
    {
      packageName: "",
      bouquetPrice: "",
      noOfBouquets: "",
      // maintenanceCost: "",
      amount: "",
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
      activityType: null,
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
  const [packageData, setPackageData] = useState(initialPackageData);

  const [userData, setUserData] = useState(initialUserData);

  const [address, setAddress] = useState(initialAddress);

  const [donations, setDonations] = useState(intialDonations);

  const [recipient, setRecipient] = useState(initialRecipientData);

  const [userEmail, setUserEmail] = useState(null);
  const [giftUserEmail, setGiftUserEmail] = useState(null);

  const [otp, setOtp] = useState(null);

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
    } else if (/\d/.test(userData.user.firstName)) {
      validationErrors.push({
        field: "userData.user.firstName",
        message: "First Name should only contain alphabets",
      });
    }

    if (!userData?.user?.lastName) {
      validationErrors.push({
        field: "userData.user.lastName",
        message: "Last Name is required",
      });
    } else if (/\d/.test(userData.user.lastName)) {
      validationErrors.push({
        field: "userData.user.lastName",
        message: "Last Name should only contain alphabets",
      });
    }

    if (!userData?.user?.mobileNo) {
      validationErrors.push({
        field: "userData.user.mobileNo",
        message: "Mobile Number is required",
      });
    } else if (!/^(?!.*[a-zA-Z])\d{10}$/.test(userData.user.mobileNo)) {
      validationErrors.push({
        field: "userData.user.mobileNo",
        message:
          "Mobile Number must contain exactly 10 digits and no alphabetic characters",
      });
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
    }
    if (!userData?.user?.organisation) {
      validationErrors.push({
        field: "userData.user.organisation",
        message: "Organisation is required",
      });
    }
    if (!userData?.user?.panCard) {
      validationErrors.push({
        field: "userData.user.panCard",
        message: "PAN card is required",
      });
    }
    // if (userData?.user?.activityType === null) {
    //   validationErrors.push({ field: "userData.user.activityType", message: "Activity Type is required" });
    // }

    // // Validate payment info
    // if (donations && donations[0]?.paymentInfo) {
    //   for (let i = 0; i < donations[0].paymentInfo.length; i++) {
    //     if (i === 1) {
    //       // Skip validation for paymentInfo[1]
    //       continue;
    //     }
    //     const payment = donations[0].paymentInfo[i];

    //     if (!payment.paymentMode) {
    //       validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].paymentMode", message: "Payment Mode is required" });
    //     }
    //     if (!payment.chqORddDate) {
    //       validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].chqORddDate", message: "ChqORddDate is required" });
    //     }
    //     if (!payment.paymentDate) {
    //       validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].paymentDate", message: "Payment Date is required" });
    //     }
    //     if (!payment.amount) {
    //       validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].amount", message: "Amount is required" });
    //     }
    //     if (!payment.bankName || payment.bankName.trim() === "") {
    //       validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].bankName", message: "Bank Name is required" });
    //     }
    //     if (!payment.chqORddNo) {
    //       validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].chqORddNo", message: "ChqORddNo is required" });
    //     }
    //   }
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
      }
      if (!addr?.country) {
        validationErrors.push({
          field: "address[" + i + "].country",
          message: "Country is required",
        });
      }
      if (!addr?.state) {
        validationErrors.push({
          field: "address[" + i + "].state",
          message: "State is required",
        });
      }
      if (!addr?.city) {
        validationErrors.push({
          field: "address[" + i + "].city",
          message: "City is required",
        });
      }
      if (!addr?.postalCode) {
        validationErrors.push({
          field: "address[" + i + "].postalCode",
          message: "postalCode is required",
        });
      }
      else if (!/^\d*$/.test(addr?.postalCode)) {
        validationErrors.push({
          field: "address[" + i + "].postalCode",
          message:
            "Invalid Postal Code",
        });
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
      let updatedUserPackage = [];
      packageData.map((item) => {
        if (item.noOfBouquets && item.amount) {
          updatedUserPackage.push(item);
        }
      });
      console.log(updatedUserPackage);
      const formData = {
        formData: {
          user: userData?.user,
        },
      };

      if(donations[0].paymentInfo){

      
      let paymentArray = { ...donations[0] };

      paymentArray.paymentInfo = [];
      if (hasValues(donations[0].paymentInfo[0])) {
        paymentArray.paymentInfo[0] = donations[0].paymentInfo[0];
      }

      if (hasValues(donations[0].paymentInfo[1])) {
        paymentArray.paymentInfo[1] = donations[0].paymentInfo[1];
      }
    
      console.log(paymentArray);

      formData.formData.user.donations[0] = paymentArray;
      console.log(formData.formData.user.donations[0]);
    }

      console.log(formData);
      //setting Donation event

      formData.formData.user.donations[0].donationType = donationType;

      formData.formData.user.emailId = userEmail;

      //Setting Address array
      console.log(address.length);

      // if (!formData.formData.user.address) {
      //   formData.formData.user.address = initialAddress.slice();
      // }
      console.log(formData.formData.user.address);

      if (hasValues(address[0])) {
        formData.formData.user.address[0] = address[0];
      }
      console.log(formData.formData.user.address);
      console.log(hasValues(address[1]));
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
      console.log(formData);

      //setting recipent data
      if (recipient[0].address[0].state) {
        console.log(recipient);
        console.log("Reci");
        formData.formData.user.donations[0].recipient = recipient;
      } else {
        console.log(recipient);
        console.log("Not present");
        formData.formData.user.donations[0].recipient = [];
      }

      // Send the form data as JSON
      console.log(formData);
      console.log(JSON.stringify(formData));
      console.log(
        "Donation: " + JSON.stringify(formData.formData.user.donations[0])
      );

      setNewEmail(formData.formData.user.emailId);

      console.log(formData);
      const response = await DonationService.AddOnlineuser(formData);
      console.log(response);
      if (response?.status === SUCCESS) {
        toast.success(response?.message);
        setGatewayConfiguration(response);
        setTimeout(() => {
          document.getElementById("gatewayForm").submit();
        }, 1000);
        // clearForm(e);
      } else {
        toast.error(response?.message);
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId");
    if (orderId) {
      getPaymentInformation(orderId);
    }
    getAllPackages();
  }, []);

  const getPaymentInformation = async (paymentId) => {
    const response = await DonationService.getPaymentInformation(paymentId);
    if (response?.status === "Success") {
      console.log(response);

      if (response?.data?.paymentStatus == "Success") {
        toast.success(
          "Donation payment successful, payment reference no " +
            response?.data?.bankPaymentRefNo
        );
      } else {
        toast.error(response?.data?.remark);
      }
    } else {
      toast.error(response?.message);
    }
  };

  const getAllPackages = async () => {
    const response = await DonationService.getAllPackages();
    if (response?.status === "Success") {
      console.log(response);
      let packageData = [...initialPackageData];
      console.log(packageData);

      const parsedData = JSON.parse(response.data);

      let data = parsedData.map((item) => ({
        packageName: item.package_name,
        bouquetPrice: item.bouquet_price,
        noOfBouquets: 0,
        amount: 0,
      }));

      setPackageData(data);
    } else {
      toast.error(response?.message);
    }
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
    calculateOverallTotal();
    console.log(userPackageData);
  };

  const calculateOverallTotal = () => {
    const totalAmountOfPackage = packageData.reduce(
      (accumulator, packageItem, index) => {
        return (
          accumulator + packageItem.bouquetPrice * packageItem.noOfBouquets
        );
      },
      0
    );
    const updatedDonations = [...donations];
    updatedDonations[0]["totalAmount"] = totalAmountOfPackage;
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
    currentField[keys[keys.length - 1]] = value;
    console.log(updatedFormData);
    setUserData(updatedFormData);
  };
  //Handle address change
  const handleAddressChange = (event, index) => {
    const { name, value } = event.target;
    console.log(index);
    setAddress((prevAddress) => {
      const updatedAddress = [...prevAddress];
      updatedAddress[index] = {
        ...updatedAddress[index],
        [name]: value,
      };
      console.log(updatedAddress[index]);
      return updatedAddress;
    });
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
    const updatedAddress = [...recipient];
    console.log(updatedAddress);
    updatedAddress[index].address[index][name] = value;
    console.log(updatedAddress[index]);
    console.log(updatedAddress);
    setRecipient(updatedAddress);
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
    console.log("Hiiiiiii");
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
      setMailError('');
    }
  };

  const getUserInfo = async (emailId, type) => {
    let response = await DonationService.getDetailsByEmailId(emailId);
    if (response?.status === "Success") {
      toast.success(response?.message);
      let addr = [...initialAddress];
      if (hasValues(response.data.address[0])) {
        addr[0] = response.data.address[0];
      }
      if (hasValues(response.data.address[1])) {
        addr[1] = response.data.address[1];
      }
      setAddress(addr);
      const formData = {
        formData: {
          user: response?.data,
        },
      };
      console.log(response.data.donations[0]);
      setPackageData(formData.formData.user.donations[0].userPackage);
      setDonations(response.data.donations);
      setUserData(formData.formData);
      clearState();
      setDonation(type);
      if (type === "self") {
        setValidSelfUser(true);
      } else {
        setValidGiftUser(true);
      }
    } else if (response?.statusCode === 409) {
      toast.error(response?.message);
    } else {
      if (type === "self") {
        setValidSelfUser(false);
        setIsDivOpen(true);
      } else {
        setValidGiftUser(false);
        setIsDivOpenGift(true);
      }
    }
  };

  const sendOtp = async (emailId) => {
    console.log(emailId);
    let response = await DonationService.sendOtp(emailId);
    if (response?.status === "Success") {
      toast.success(response?.message);
      handleShow();
    }
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

  const handleInputFocusGift = () => {
    setIsDivOpenGift(true);
  };

  //enter key login
  const handleKeyPress = (event) => {
    const { name, value } = event.target;
    if (event.key === "Enter") {
      if (value) {
        getUserInfo(value, name);
      }
    }
  };

  //enter key login
  const onChangeUserEmail = (event) => {
    const { value } = event.target;
    setUserEmail(value);
  };

  const onChangeGiftUserEmail = (event) => {
    const { value } = event.target;
    setGiftUserEmail(value);
  };

  const clearState = () => {
    setOtp("");
  };

  return (
    <>
      <ToastContainer />
      {/* slider */}

      <div className="pt100"></div>
      <div className="section bggray ">
        {/* form */}
        <Container className="pt30">
          <Row className="justify-content-between  padding30tb contact-form-wrap">
            <div className="otherpages-heading">Online Donation</div>
            <div className="col-12">
              <Tabs
                defaultActiveKey="selfDonate"
                id="uncontrolled-tab-example"
                className="mb-3 selftGift-tab "
              >
                <Tab eventKey="selfDonate" title="Self Donor">
                  <div className="pageheadingdiv mb10">Self Donor</div>
                  <div className="row">
                    <div className="col-6">
                      <div className="select-label">
                        <div className="col-4 "> Donor Type</div>
                        <div className="col-8 p0">
                          <select
                            className=" form-control-inside form-select"
                            name="user.donarType"
                            value={userData?.user?.donarType}
                            // onChange={handleChange}
                            onChange={changeHandler}
                          >
                            <option disabled selected value="">
                              Donor Type
                            </option>
                            <option value="Corporate">Corporate</option>
                            <option value="Retail">Retail</option>
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
                  {isVisible ? (
                    <div className="row">
                      <div className="col-6 mb10">
                        <div className="select-label">
                          <div className="col-4 ">I want to opt</div>
                          <div className="col-8 p0">
                            <select
                              className=" form-control-inside form-select"
                              name="user.donarType"
                              // value={userData?.user?.donarType}
                              // onChange={handleChange}
                              onChange={changeActiveHandler}
                            >
                              <option disabled selected value="">
                                Select Activity
                              </option>
                              <option value="csr">CSR Activity</option>
                              <option value="noncsr">NON-CSR Activity</option>
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
                    </div>
                  ) : null}
                  {isCSR ? (
                    <div className=" mb10">
                      {" "}
                      <p>
                        For CSR related enquireis please reach us at Gangar
                        Sunny GANGAR.SUNNY@mahindra.com 93224 56789
                      </p>
                    </div>
                  ) : null}
                  <div>
                    <div className="row">
                      <div className="col-6">
                        <div className="select-label">
                          <div className="col-4 "> Select Your Citizenship</div>
                          <div className="col-8 p0">
                            <select
                              className=" form-control-inside form-select"
                              name="user.donarType"
                            >
                              <option disabled selected value="">
                                Select Country
                              </option>
                              <option value="France">France</option>
                              <option value="India">India</option>
                              <option value="USA">USA</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="select-label">
                          <div className="col-4 "> Email ID</div>
                          <div className="col-8 p0">
                            <input
                              type="text"
                              placeholder="Enter Email Id"
                              name="self"
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

                      <div className="col-12">
                        <Button
                          className="float-right"
                          variant="success"
                          disabled={!validSelfUser}
                          onClick={() => sendOtp(userEmail)}
                        >
                          Verify User
                        </Button>
                      </div>
                    </div>{" "}
                  </div>
                  <div>
                    {isDivOpen && (
                      <div>
                        <form className="form-div contact-form-wrap">
                          <div className="actionheadingdiv">
                            Select Your Donation Plan
                          </div>
                          <div className="mt20">
                            <table>
                              <thead>
                                <tr>
                                  <th>Planting Season</th>
                                  <th>Cost per Sapling</th>
                                  {/* <th></th> */}
                                  <th className="w200">No. Sapling</th>
                                  <th>Total Cost</th>
                                </tr>
                              </thead>
                              <tbody>
                                {packageData?.map((packageItem, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{packageItem.packageName}</td>
                                      <td>{packageItem.bouquetPrice}</td>
                                      {/* <td>{packageItem.maintenanceCost}</td> */}
                                      <td>
                                        <input
                                          type="number"
                                          name="noOfBouquets"
                                          className="form-control"
                                          value={packageItem.noOfBouquets}
                                          onChange={(event) => {
                                            if (event.target.value < 0) {
                                              event.target.value = 0;
                                            }
                                            handleChangeNumberOfBouquets(
                                              event,
                                              packageItem,
                                              index
                                            );
                                          }}
                                        />
                                      </td>
                                      <td>{packageItem.amount}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                            <div className="overalltotal">
                              Overall Total: {donations[0].totalAmount}
                            </div>
                          </div>
                          <hr />
                          <div className="actionheadingdiv">
                            Personal Details
                          </div>
                          <div className="col-12 pr15 mt20">
                            <div className="row">
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">Mobile No.</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      type="text"
                                      name="user.mobileNo"
                                      placeholder="Mobile No."
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 "> Organisation</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">Prefix</div>
                                  <div className="col-8 p0">
                                    <select
                                      className=" form-control-inside form-select form-control"
                                      name="user.prefix"
                                      value={userData?.user?.prefix}
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">First Name</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      type="text"
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">Last Name</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      type="text"
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

                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">PAN card</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      name="user.panCard"
                                      placeholder="PAN card No."
                                      type="text"
                                      value={userData?.user?.panCard}
                                      onChange={handleChange}
                                    />
                                    {errors.map((error, index) => {
                                      if (
                                        error.field === "userData.user.panCard"
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
                            Address
                            <div
                              className="float-right addminicon"
                              onClick={addaddressicon}
                            >
                              <FaPlusSquare />
                            </div>
                          </div>
                          <div className="col-12 pr15 mt20">
                            <div className="row">
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 "> Street 1</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      name="street1"
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 "> Street 2</div>
                                  <div className="col-8 p0">
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 "> Street 3</div>
                                  <div className="col-8 p0">
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">Country</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      name="country"
                                      placeholder="Country"
                                      type="text"
                                      value={address[0]?.country}
                                      onChange={(event) =>
                                        handleAddressChange(event, 0)
                                      }
                                    />
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">State</div>
                                  <div className="col-8 p0">
                                    <select
                                      className=" form-control-inside form-select form-control"
                                      name="state"
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">City</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      name="city"
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">Postal Code</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      name="postalCode"
                                      maxLength={6}
                                      placeholder="Postal Code"
                                      type="number"
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
                                <div className="col-6">
                                  <div className="select-label">
                                    <div className="col-4 "> Street 1</div>
                                    <div className="col-8 p0">
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
                                <div className="col-6">
                                  <div className="select-label">
                                    <div className="col-4 "> Street 2</div>
                                    <div className="col-8 p0">
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
                                <div className="col-6">
                                  <div className="select-label">
                                    <div className="col-4 "> Street 3</div>
                                    <div className="col-8 p0">
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
                                <div className="col-6">
                                  <div className="select-label">
                                    <div className="col-4 ">Country</div>
                                    <div className="col-8 p0">
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
                                <div className="col-6">
                                  <div className="select-label">
                                    <div className="col-4 ">State</div>
                                    <div className="col-8 p0">
                                      <select
                                        className=" form-control-inside form-select  form-control"
                                        name="state"
                                        value={address[1]?.state}
                                        onChange={(event) =>
                                          handleAddressChange(event, 1)
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
                                  <div className="select-label">
                                    <div className="col-4 ">City</div>
                                    <div className="col-8 p0">
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
                                <div className="col-6">
                                  <div className="select-label">
                                    <div className="col-4 ">Postal Code</div>
                                    <div className="col-8 p0">
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

                          <div className="col-6 mt20">
                            <Captcha
                              verified={false}
                              setVerified={() => {}}
                              id="captcha1"
                            />
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
                      </div>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="giftaPlant" title="Gift a Plant">
                  <div className="pageheadingdiv mb10">Gift a Plant</div>

                  <form
                    // onSubmit={userAdd}
                    className="form-div contact-form-wrap"
                  >
                    <div className="col-12 ">
                      <div className="row">
                        <div className="col-6">
                          <div className=" select-label">
                            <div className="col-4 ">Occasion</div>
                            <div className="col-8 p0">
                              <select
                                className=" form-control-inside form-select"
                                name="donationEvent"
                                value={donations[0].donationEvent}
                                onChange={(e) => handleDonationChange(e, 0)}
                              >
                                <option disabled selected value="">
                                  Occasion
                                </option>
                                <option value="Birthday">Birthday</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Anniversary">Anniversary</option>
                                <option value="Achievement">Achievement</option>
                                <option value="Festival">Festival</option>
                                <option value="Memorial Tribute">
                                  Memorial Tribute
                                </option>
                                <option value="other">Others: </option>
                                <input type="text" className="form-control" />
                              </select>
                              {/* <div id="otherOption">
                                <label for="otherText">Enter other option:</label>
                                <input type="text" id="otherText"/>
                              </div> */}
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
                        <div className="col-6">
                          <div className=" select-label">
                            <div className="col-4 "> Donor Type</div>
                            <div className="col-8 p0">
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
                                <option value="Corporate">Corporate</option>
                                <option value="Retail">Retail</option>
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
                        </div>{" "}
                      </div>
                      {isVisibleGift ? (
                        <div className="row">
                          <div className="col-6 mb10">
                            <div className="select-label">
                              <div className="col-4 ">I want to opt</div>
                              <div className="col-8 p0">
                                <select
                                  className=" form-control-inside form-select"
                                  name="user.donarType"
                                  // value={userData?.user?.donarType}
                                  // onChange={handleChange}
                                  onChange={changeActiveHandlerGift}
                                >
                                  <option disabled selected value="">
                                    Select Activity
                                  </option>
                                  <option value="csr">CSR Activity</option>
                                  <option value="noncsr">
                                    NON-CSR Activity
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
                        </div>
                      ) : null}
                      {isCSRGift ? (
                        <div className=" mb10">
                          {" "}
                          <p>
                            For CSR related enquireis please reach us at Gangar
                            Sunny GANGAR.SUNNY@mahindra.com 93224 56789
                          </p>
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <div className="row">
                        <div className="col-6">
                          <div className=" select-label">
                            <div className="col-4 ">
                              {" "}
                              Select Your Citizenship
                            </div>
                            <div className="col-8 p0">
                              <select
                                className=" form-control-inside form-select"
                                name="user.donarType"
                              >
                                <option disabled selected value="">
                                  Select Country
                                </option>
                                <option value="France">France</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="select-label">
                            <div className="col-4 "> Email ID</div>
                            <div className="col-8 p0">
                              <input
                                type="text"
                                name="gift"
                                value={giftUserEmail}
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
                        <div className="col-12">
                          <Button
                            className="float-right"
                            variant="success"
                            disabled={!validGiftUser}
                            onClick={() => sendOtp(giftUserEmail)}
                          >
                            Verify User
                          </Button>
                        </div>
                      </div>{" "}
                    </div>
                    {isDivOpenGift && (
                      <div>
                        <div className="actionheadingdiv">
                          Select Your Donation Plan
                        </div>
                        <div className="mt20">
                          <table>
                            <thead>
                              <tr>
                                <th>Planting Season</th>
                                <th>Cost per Sampling</th>
                                {/* <th>Maintenance Cost</th> */}
                                <th className="w200">No. Sampling</th>
                                <th>Total Cost</th>
                              </tr>
                            </thead>
                            <tbody>
                              {packageData.map((packageItem, index) => {
                                console.log(index);
                                return (
                                  <tr key={index}>
                                    <td>{packageItem.packageName}</td>
                                    <td>{packageItem.bouquetPrice}</td>
                                    {/* <td>{packageItem.maintenanceCost}</td> */}
                                    <td>
                                      <input
                                        type="number"
                                        name="noOfBouquets"
                                        className="form-control"
                                        value={packageItem.noOfBouquets}
                                        onChange={(event) => {
                                          if (event.target.value < 0) {
                                            event.target.value = 0;
                                          }
                                          handleChangeNumberOfBouquets(
                                            event,
                                            packageItem,
                                            index
                                          );
                                        }}
                                      />
                                    </td>
                                    <td>{packageItem.amount}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <p>Overall Total: {donations[0].totalAmount}</p>
                        </div>
                        <div className="col-6 mt20">
                          {/* <div className="select-label">
                            <div className="col-4 "> General Donation</div>
                            <input
                              placeholder=" General Donation"
                              className="col-8 form-control-inside"
                              type="number"
                              name="generalDonation"
                              value={generalDonation}
                              onChange={(e) => {
                                if (e.target.value < 0) {
                                  e.target.value = 0;
                                }
                                handleDonationChange(e, 0);
                              }}
                            />
                          </div> */}
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Personal Details</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 "> Email ID</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
                                    type="text"
                                    name="user.emailId"
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
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">Mobile No.</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
                                    type="text"
                                    name="user.mobileNo"
                                    placeholder="Mobile No."
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
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 "> Organisation</div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">Prefix</div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">First Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
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
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">Last Name</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
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

                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">PAN card</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
                                    name="user.panCard"
                                    placeholder="PAN card No."
                                    type="text"
                                    value={userData.user.panCard}
                                    onChange={handleChange}
                                  />
                                  {errors.map((error, index) => {
                                    if (
                                      error.field === "userData.user.panCard"
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
                        <div className="actionheadingdiv">Address</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 "> Street 1</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
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
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 "> Street 2</div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 "> Street 3</div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">Country</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
                                    name="country"
                                    placeholder="Country"
                                    type="text"
                                    value={address[0]?.country}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
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
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">State</div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select form-control"
                                    name="state"
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
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">City</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
                                    name="city"
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
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">Postal Code</div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
                                    name="postalCode"
                                    maxLength={6}
                                    placeholder="Postal Code"
                                    type="number"
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
                        <div className="actionheadingdiv">
                          DETAILS OF RECIPIENT
                        </div>
                        <div className="col-12 pr15 mt20">
                          <div>
                            <div className="row">
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 "> Street 1</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
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

                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 "> Street 2</div>
                                  <div className="col-8 p0">
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 "> Street 3</div>
                                  <div className="col-8 p0">
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">Country</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      name="country"
                                      placeholder="Country"
                                      type="text"
                                      value={recipient[0].address[0].country}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    />
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">Statesss</div>
                                  <div className="col-8 p0">
                                    <select
                                      className=" form-control-inside form-select form-control"
                                      name="state"
                                      value={recipient[0].address[0].state}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">City</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      name="city"
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">Postal Code</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      name="postalCode"
                                      placeholder="Postal Code"
                                      type="text"
                                      value={recipient[0].address[0].postalCode}
                                      onChange={(e) =>
                                        handleRecipentAddressChange(e, 0)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">First Name</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">Last Name</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">Mobile No.</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
                                      name="mobileNo"
                                      placeholder="Mobile No."
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
                              <div className="col-6">
                                <div className="select-label">
                                  <div className="col-4 ">Email Id</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside form-control"
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
                          </div>
                        </div>

                        <hr />
                        <div className="col-6 mt20">
                          <CaptchaGift
                            verified={false}
                            setVerified={() => {}}
                            id="captcha2"
                          />
                          {validatePopup.captcha ? (
                            <div className="error-message red-text">
                              {validatePopup.captcha}
                            </div>
                          ) : (
                            <></>
                          )}
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
      {/* body */}
    </>
  );
}

export default OnlineDonation;
