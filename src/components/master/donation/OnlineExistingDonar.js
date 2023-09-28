import React from 'react'
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DonationService } from "../../../services/donationService/donation.service";
import { SUCCESS } from "../../constants/constants";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import Captcha from "../user/Captcha";
import CaptchaGift from "../user/CaptchaGift";
import { Container, Row, Tab, Tabs } from "react-bootstrap";
import { UserService } from '../../../services/userService/user.service';
import Loader from '../../common/loader/Loader';

export default function OnlineExistingDonar() {

    const [donationType, setDonationType] = useState("Self-Donate");
    const [loading, setLoading] = useState(false);
    const [donation, setDonation] = useState("");
  
    const [validatePopup, setValidatePopup] = useState({});
    const [show, setShow] = useState(false);
    
  
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

    const intialDonationsOnline = [
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

  
    const [recipient, setRecipient] = useState(initialRecipientData);
  
    const [userEmail, setUserEmail] = useState(null);
    const [giftUserEmail, setGiftUserEmail] = useState(null);
    const [donations, setDonations] = useState(intialDonationsOnline);
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
        validationErrors.push({ field: "donationType", message: "Donation Type is required" });
      }
  
      // Validate user data fields
      if (!userData?.user?.firstName) {
        validationErrors.push({ field: "userData.user.firstName", message: "First Name is required" });
      } else if (/\d/.test(userData.user.firstName)) {
        validationErrors.push({ field: "userData.user.firstName", message: "First Name should only contain alphabets" });
      }
  
      if (!userData?.user?.lastName) {
        validationErrors.push({ field: "userData.user.lastName", message: "Last Name is required" });
      } else if (/\d/.test(userData.user.lastName)) {
        validationErrors.push({ field: "userData.user.lastName", message: "Last Name should only contain alphabets" });
      }
  
      if (!userData?.user?.mobileNo) {
        validationErrors.push({ field: "userData.user.mobileNo", message: "Mobile Number is required" });
      } else if (!/^(?!.*[a-zA-Z])\d{10}$/.test(userData.user.mobileNo)) {
        validationErrors.push({ field: "userData.user.mobileNo", message: "Mobile Number must contain exactly 10 digits and no alphabetic characters" });
      }
  
      // if (!userData?.user?.emailId) {
      //   validationErrors.push({ field: "userData.user.emailId", message: "Email ID is required" });
      // } 
      // else if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(userData.user.emailId)) {
      //   validationErrors.push({ field: "userData.user.emailId", message: "Invalid Email ID" });
      // }
  
      if (!userData?.user?.donarType) {
        validationErrors.push({ field: "userData.user.donarType", message: "Donor Type is required" });
      }
      if (!userData?.user?.prefix) {
        validationErrors.push({ field: "userData.user.prefix", message: "Prefix is required" });
      }
      if (userData?.user?.donarType.toLocaleLowerCase() === "corporate" && !userData?.user?.organisation) {
        validationErrors.push({ field: "userData.user.organisation", message: "Organisation is required" });
      }
      if (!userData?.user?.panCard) {
        validationErrors.push({ field: "userData.user.panCard", message: "PAN card is required" });
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
          validationErrors.push({ field: "address[" + i + "].street1", message: "Street is required" });
        }
        if (!addr?.country) {
          validationErrors.push({ field: "address[" + i + "].country", message: "Country is required" });
        }
        if (!addr?.state) {
          validationErrors.push({ field: "address[" + i + "].state", message: "State is required" });
        }
        if (!addr?.city) {
          validationErrors.push({ field: "address[" + i + "].city", message: "City is required" });
        }
      }
  
      // Validate recipient (only for "Gift Donate" donation type)
      console.log(donationType);
      if (donationType === "Gift-Donate") {
  
        console.log(donations[0].donationEvent);
        if (!donations[0]?.donationEvent) {
          validationErrors.push({ field: "donations.donationEvent", message: "Donation Event is required" });
        }
  
  
  
        for (let i = 0; i < recipient.length; i++) {
          const rec = recipient[i];
  
          if (!rec?.firstName) {
            validationErrors.push({ field: "recipient[" + i + "].firstName", message: "First Name is required" });
          } else if (/\d/.test(rec.firstName)) {
            validationErrors.push({ field: "recipient[" + i + "].firstName", message: "First Name should only contain alphabets" });
          }
          if (!rec?.lastName) {
            validationErrors.push({ field: "recipient[" + i + "].lastName", message: "Last Name is required" });
          } else if (/\d/.test(rec.lastName)) {
            validationErrors.push({ field: "recipient[" + i + "].lastName", message: "Last Name should only contain alphabets" });
          }
  
          if (!rec?.emailId) {
            validationErrors.push({ field: "recipient[" + i + "].emailId", message: "Email ID is required" });
          } else if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(rec.emailId)) {
            validationErrors.push({ field: "recipient[" + i + "].emailId", message: "Invalid Email ID" });
          }
          if (!rec?.mobileNo) {
            validationErrors.push({ field: "recipient[" + i + "].mobileNo", message: "Mobile Number is required" });
          } else if (!/^(?!.*[a-zA-Z])\d{10}$/.test(rec.mobileNo)) {
            validationErrors.push({ field: "recipient[" + i + "].mobileNo", message: "Mobile Number must contain exactly 10 digits and no alphabetic characters" });
          }
  
          if (!rec?.address[0]?.street1) {
            validationErrors.push({ field: "recipient[" + i + "].address[0].street1", message: "Recipient Street is required" });
          }
          if (!rec?.address[0]?.country) {
            validationErrors.push({ field: "recipient[" + i + "].address[0].country", message: "Recipient Country is required" });
          }
          if (!rec?.address[0]?.state) {
            validationErrors.push({ field: "recipient[" + i + "].address[0].state", message: "Recipient State is required" });
          }
        }
      }
  
      console.log(validationErrors);
  
  
      const errorMessages = validationErrors.map(error => `${error.field}: ${error.message}`);
      const errorMessageString = errorMessages.join("\n");
  
      console.log(errorMessageString);
  
      setErrors(validationErrors);
  
      return validationErrors.length === 0;
    };
  
  
    {
      errors.length > 0 && (
        <p>{errors.map(error => `${error.field}: ${error.message}`).join(', ')}</p>
      )
    }


      const handleDonarIdBlur = async (e) => {
        e.preventDefault();
        const donorId = e.target.value;
        setLoading(true)
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
          setLoading(false)
        } else if (response?.statusCode === 409) {
          toast.error(response?.message);
          setLoading(false)
        }else{
          console.log(response);
          toast.error(response?.message);
          setLoading(false)
        }
      };
  
  
  
    const createDonation = async (e) => {
        e.preventDefault();
    
        const isValid = validate();
        console.log("isValid:", isValid);
    
    
        //if (isValid) {
        const updatedDonations = [...donations];
        const filteredPackages = packageData.filter((pkg) => pkg.noOfBouquets > 0);
        console.log(filteredPackages);
        updatedDonations[0].userPackage = filteredPackages;
    
          const formData = {
            formData: {
              user: {
                emailId: userData?.user?.emailId,
                donorId: userData?.user?.donorId,
                donations: updatedDonations.map((donation) => {
                  const donationData = {
                    ...donation,
                    //paymentInfo: donation.paymentInfo.slice(0, 1), // Keep only the first payment info record
                  };
                  console.log(donation.donationType);
                  if (donation.donationType === "Self-Donate") {
                    donationData.recipient = []; // Exclude recipient data
                  } else if (donation.donationType === "Gift-Donate") {
                    donationData.recipient = recipient;
                  }
    
                  return donationData;
                }),
              },
            },
          };
          console.log(userData);
    
          setLoading(true)
        const response = await DonationService.AddNewDonation(formData);
        console.log(response);
        if (response?.status === SUCCESS) {
          console.log("Create Donation: "+JSON.stringify(response))
          toast.success(response?.message);
          clearForm(e);
          setLoading(false)
        } else {
          toast.error(response?.message);
          setLoading(false)
        }
      
        console.log(donations);
        console.log(formData);
        console.log(updatedDonations);
        console.log();
      //}
      console.log("Not Working !")
      };
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('orderId');
      if (orderId) {
        getPaymentInformation(orderId);
      }
      getAllPackages();
    }, []);

    useEffect(() => {
        const {email} = UserService.userDetails();
        if(email){
            console.log(email);
            getUserInfo(email,"self")
            setUserEmail(email);
        }
    }, [])
    
  
    const getPaymentInformation = async (paymentId) => {
      setLoading(true)
      const response = await DonationService.getPaymentInformation(paymentId);
      if (response?.status === 'Success') {
        console.log(response);
  
        if (response?.data?.paymentStatus == 'Success') {
          toast.success("Donation payment successful, payment reference no " + response?.data?.bankPaymentRefNo);
          setLoading(false)
        } else {
          toast.error(response?.data?.remark);
          setLoading(false)
        }
      } else {
        toast.error(response?.message);
        setLoading(false)
      }
    }
  
    const getAllPackages = async () => {
      setLoading(true)
      const response = await DonationService.getAllPackages();
      if (response?.status === 'Success') {
        console.log(response);
        let packageData = [...initialPackageData];
        console.log(packageData);
  
        const parsedData = JSON.parse(response.data);
  
        let data = parsedData.map((item) => ({ packageName: item.package_name, bouquetPrice: item.bouquet_price, noOfBouquets: 0, amount: 0 }))
        console.log(data)
        setPackageData(data);
        setLoading(false)
      } else {
        toast.error(response?.message);
        setLoading(false)
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
  
      const totalCost =
        (row.bouquetPrice) * row.noOfBouquets;
      userPackageData[rowIndex]["amount"] = totalCost;
      setPackageData(userPackageData);
      calculateOverallTotal();
      console.log(userPackageData);
    };
  
    const calculateOverallTotal = () => {
      const totalAmountOfPackage = packageData.reduce(
        (accumulator, packageItem, index) => {
          return (
            accumulator +
            (packageItem.bouquetPrice) *
            packageItem.noOfBouquets
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
        if (document.getElementById("addgiftpaymentDiv").style.display === "none") {
          document.getElementById("addgiftpaymentDiv").style.display = "block";
        } else {
          document.getElementById("addgiftpaymentDiv").style.display = "block";
        }
      }
    };
    const mingiftpaymentDiv = () => {
      if (document.getElementById("addgiftpaymentDiv")) {
        if (document.getElementById("addgiftpaymentDiv").style.display === "block") {
          document.getElementById("addgiftpaymentDiv").style.display = "none";
        }
      }
    };
  
    const handleBlur = async (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      if (value) {
        getUserInfo(value, name);
      }
  
    };
  
    const getUserInfo = async (email, type) => {
      setLoading(true)
      let response = await DonationService.getExistingDetailsByEmailId(email);
      console.log(JSON.stringify(response))
      if (response?.status === "Success") {
        console.log(response.data.emailId);
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
        setPackageData(formData.formData.user.donations[0].userPackage);
        setDonations(response.data.donations)
        setUserData(formData.formData);
        clearState();
        setDonation(type)
        // if (type === "self") {
        //   setValidSelfUser(true);
        // } else {
        //   setValidGiftUser(true);
        // }
        setLoading(false)
      } else if (response?.statusCode === 409) {
        toast.error(response?.message);
        setLoading(false)
      } else {
        // if (type === "self") {
        //   setValidSelfUser(false);
        //   //setIsDivOpen(true);
        // } else {
        //   //setValidGiftUser(false);
        //   //setIsDivOpenGift(true);
        // }
        setLoading(false)
      }
    }
  
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
      if (e.target.value === 'Corporate') {
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
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    const changeActiveHandler = (e) => {
      if (e.target.value === 'csr') {
        setIsCSR(true);
      } else {
        setIsCSR(false);
      }
    };
    const changeHandlerGift = (e) => {
      if (e.target.value === 'Corporate') {
        setIsVisibleGift(true);
      } else {
        setIsVisibleGift(false);
      }
    };
    const changeActiveHandlerGift = (e) => {
      if (e.target.value === 'csr') {
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
    }

  return (
    <>
      <ToastContainer />
      {/* slider */}
      {loading && <Loader/>}
      <div className="pt100"></div>
      <div className="section bggray ">
        {/* form */}
        <Container className="pt30">
          <Row className="justify-content-between  padding30tb contact-form-wrap">
            <div className="otherpages-heading">Existing Online Donation</div>
            <div className="col-12">
              <Tabs
                defaultActiveKey="selfDonate"
                id="uncontrolled-tab-example"
                className="mb-3 selftGift-tab "
              >
                <Tab eventKey="selfDonate" title="Self Donor">
                  <div className="pageheadingdiv mb10">Existing Self Donor</div>
                  <div className="row">
                    <div className="col-6">
                      <div className="select-label">
                        <div className="col-4 ">Existing Donor Type</div>
                        {/* <div className="col-8 p0">
                          <select
                            className=" form-control-inside form-select"
                            name="user.donarType"
                            value={userData?.user?.donarType}
                            // onChange={handleChange}
                            onChange={changeHandler}
                          >
                            <option disabled selected value="">Donor Type</option>
                            <option value="Corporate" >Corporate</option>
                            <option value="Individual">Individual</option>
                          </select>
                          {errors.map((error, index) => {
                            if (error.field === 'userData.user.donarType') {
                              return <div key={index} className="error-message red-text">{error.message}</div>;
                            }
                            return null;
                          })}
                        </div> */}
                      </div> </div></div>
                  {isVisible ? (
                    <div className="row">
                      <div className="col-6 mb10"><div className="select-label">
                        <div className="col-4 ">I want to opt</div>
                        <div className="col-8 p0">
                          <select
                            className=" form-control-inside form-select"
                            name="user.donarType"
                            // value={userData?.user?.donarType}
                            // onChange={handleChange}
                            onChange={changeActiveHandler}
                          >
                            <option disabled selected value="">Select Activity</option>
                            <option value="csr" >CSR Activity</option>
                            <option value="noncsr">NON-CSR Activity</option>
                          </select>
                          {errors.map((error, index) => {
                            if (error.field === 'userData.user.donarType') {
                              return <div key={index} className="error-message red-text">{error.message}</div>;
                            }
                            return null;
                          })}
                        </div></div></div></div>
                  ) : null}
                  {isCSR ? (
                    <div className=" mb10"> <p>
                      For CSR related enquireis please reach us at Gangar Sunny GANGAR.SUNNY@mahindra.com 93224 56789
                    </p></div>
                  ) : null}
                  <div>
                    <div className="row">
                      <div className="col-6">
                        <div className="select-label">
                          <div className="col-4 "> Email ID</div>
                          <div className="col-8 p0">
                            <input
                              type="text"
                              placeholder="Enter Email ID"
                              name="self"
                              className='form-control'
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
                    </div> </div>
                  <div>
                     <div>
                      <form className="form-div contact-form-wrap">
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
                        <div className="actionheadingdiv">Personal Details</div>
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
                                    disabled
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.mobileNo') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                    disabled
                                  />

                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.organisation red-text') {
                                      return <div key={index} className="error-message">{error.message}</div>;
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
                                    disabled
                                  >
                                    <option disabled selected value="">Prefix</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.prefix') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                    disabled
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.firstName') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                    disabled
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.lastName') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                    disabled
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.panCard') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                    disabled
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'address[0].street1') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                    disabled
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
                                    disabled
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
                                    disabled
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'address[0].country') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                    disabled
                                  >
                                    <option disabled selected value="">Select State</option>
                                    {stateOptions.map((state) => (
                                      <option key={state} value={state}>
                                        {state}
                                      </option>
                                    ))}
                                  </select>
                                  {errors.map((error, index) => {
                                    if (error.field === 'address[0].state') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                    disabled
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'address[0].city') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                          <div className="actionheadingdiv" >
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
                                      disabled
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
                                      disabled
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
                                      disabled
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
                                      disabled
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
                                      disabled
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
                                      disabled
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
                            setVerified={() => { }}
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
                          onClick={createDonation}
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
                      </form></div>
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
                                <option disabled selected value="">Occasion</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Anniversary">
                                  Anniversary
                                </option>
                                <option value="Achievement">
                                  Achievement
                                </option>
                                <option value="Festival">Festival</option>
                                <option value="Memorial Tribute">
                                  Memorial Tribute
                                </option>
                                <option value="other">Others: </option><input type="text" className="form-control"/>
                              </select>
                              {/* <div id="otherOption">
                                <label for="otherText">Enter other option:</label>
                                <input type="text" id="otherText"/>
                              </div> */}
                              {errors.map((error, index) => {
                                if (error.field === 'donations.donationEvent') {
                                  return <div key={index} className="error-message red-text">{error.message}</div>;
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        </div>
                     </div>
                      {isVisibleGift ? (
                        <div className="row">
                          <div className="col-6 mb10"><div className="select-label">
                            <div className="col-4 ">I want to opt</div>
                            <div className="col-8 p0">
                              <select
                                className=" form-control-inside form-select"
                                name="user.donarType"
                                // value={userData?.user?.donarType}
                                // onChange={handleChange}
                                onChange={changeActiveHandlerGift}
                              >
                                <option disabled selected value="">Select Activity</option>
                                <option value="csr" >CSR Activity</option>
                                <option value="noncsr">NON-CSR Activity</option>
                              </select>
                              {errors.map((error, index) => {
                                if (error.field === 'userData.user.donarType') {
                                  return <div key={index} className="error-message red-text">{error.message}</div>;
                                }
                                return null;
                              })}
                            </div></div></div></div>
                      ) : null}
                      {isCSRGift ? (
                        <div className=" mb10"> <p>
                          For CSR related enquireis please reach us at Gangar Sunny GANGAR.SUNNY@mahindra.com 93224 56789
                        </p></div>
                      ) : null}


                    </div>
                    <div>
                      <div className="row">
                        <div className="col-6">
                          <div className="select-label">
                            <div className="col-4 "> Email ID</div>
                            <div className="col-8 p0">
                              <input
                                type="text"
                                name="gift"
                                value={userData?.user?.emailId}
                                onChange={onChangeGiftUserEmail}
                                placeholder="Enter Email Id"
                                className="form-control"
                                // onKeyPress={handleKeyPress}
                                onBlur={handleBlur}
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
                      </div> </div>
                        <div>
                      <div className="mt20">
                        <table>
                          <thead>
                            <tr>
                              <th>Planting Season</th>
                              <th>Cost per Sapling</th>
                              {/* <th>Maintenance Cost</th> */}
                              <th className="w200">No. Sapling</th>
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
                                  disabled
                                />
                                {errors.map((error, index) => {
                                  if (error.field === 'userData.user.mobileNo') {
                                    return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                  disabled
                                />
                                {errors.map((error, index) => {
                                  if (error.field === 'userData.user.organisation') {
                                    return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                  disabled
                                >
                                  <option disabled selected value="">Prefix</option>
                                  <option value="Mr.">Mr.</option>
                                  <option value="Mrs.">Mrs.</option>
                                  <option value="Ms.">Ms.</option>
                                </select>
                                {errors.map((error, index) => {
                                  if (error.field === 'userData.user.prefix') {
                                    return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                  disabled
                                />
                                {errors.map((error, index) => {
                                  if (error.field === 'userData.user.firstName') {
                                    return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                  disabled
                                />
                                {errors.map((error, index) => {
                                  if (error.field === 'userData.user.lastName') {
                                    return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                  disabled
                                />
                                {errors.map((error, index) => {
                                  if (error.field === 'userData.user.panCard') {
                                    return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                  disabled
                                />
                                {errors.map((error, index) => {
                                  if (error.field === 'address[0].street1') {
                                    return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                  disabled
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
                                  disabled
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
                                  disabled
                                />
                                {errors.map((error, index) => {
                                  if (error.field === 'address[0].country') {
                                    return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                  disabled
                                >
                                  <option disabled selected value="">Select State</option>
                                  {stateOptions.map((state) => (
                                    <option key={state} value={state}>
                                      {state}
                                    </option>
                                  ))}
                                </select>
                                {errors.map((error, index) => {
                                  if (error.field === 'address[0].state') {
                                    return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                  disabled
                                />
                                {errors.map((error, index) => {
                                  if (error.field === 'address[0].city') {
                                    return <div key={index} className="error-message red-text">{error.message}</div>;
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
                      <div className="actionheadingdiv">
                        DETAILS OF RECIPIENT
                      </div>
                      <div className="col-12 pr15 mt20">
                        <div>

                          <div className="row">
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">
                                  {" "}
                                  Street 1
                                </div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
                                    name="street1"
                                    placeholder=" Street 1"
                                    type="text"
                                    value={recipient[0].address[0].street1}
                                    onChange={(e) =>
                                      handleRecipentAddressChange(
                                        e,
                                        0
                                      )
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'recipient[0].address[0].street1') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">
                                  {" "}
                                  Street 2
                                </div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
                                    name="street2"
                                    placeholder="Street 2"
                                    type="text"
                                    value={recipient[0].address[0].street2}
                                    onChange={(e) =>
                                      handleRecipentAddressChange(
                                        e,
                                        0
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">
                                  {" "}
                                  Street 3
                                </div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
                                    name="street3"
                                    placeholder="Street 3"
                                    type="text"
                                    value={recipient[0].address[0].street3}
                                    onChange={(e) =>
                                      handleRecipentAddressChange(
                                        e,
                                        0
                                      )
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
                                      handleRecipentAddressChange(
                                        e,
                                        0
                                      )
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'recipient[0].address[0].country') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                      handleRecipentAddressChange(
                                        e,
                                        0
                                      )
                                    }
                                  >
                                    <option disabled selected value="">
                                      Select State
                                    </option>
                                    {stateOptions.map((state) => (
                                      <option
                                        key={state}
                                        value={state}
                                      >
                                        {state}
                                      </option>
                                    ))}
                                  </select>
                                  {errors.map((error, index) => {
                                    if (error.field === 'recipient[0].address[0].state') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                      handleRecipentAddressChange(
                                        e,
                                        0
                                      )
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'recipient[0].address[0].city') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="select-label">
                                <div className="col-4 ">
                                  Postal Code
                                </div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside form-control"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    type="text"
                                    value={recipient[0].address[0].postalCode}
                                    onChange={(e) =>
                                      handleRecipentAddressChange(
                                        e,
                                        0
                                      )
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
                                    if (error.field === 'recipient[0].firstName') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                    if (error.field === 'recipient[0].lastName') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                    if (error.field === 'recipient[0].mobileNo') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                                    if (error.field === 'recipient[0].emailId') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
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
                          setVerified={() => { }}
                          id="captcha2"
                        />
                        {
                    validatePopup.captcha ?
                      <div className="error-message red-text">{validatePopup.captcha}</div> : <></>
                  }
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
                        onClick={createDonation}
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
                      </button></div>
                  </form>
                </Tab>
              </Tabs>
            </div>
          </Row>
        </Container>
      </div>
    </>
  )
}
