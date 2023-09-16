import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tab, Tabs } from "react-bootstrap";
import { DonationService } from "../../../../services/donationService/donation.service";
import { BANK_TRANSFER, CHEQUE, PAYMENT_MODES, SUCCESS, stateOptions } from "../../../constants/constants";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import SearchWithSuggestions from "../../../common/searchComponent/SearchWithSuggestions";
import Loader from "../../../common/loader/Loader";
import PaymentDetails from "../../../common/PaymentDetails";

function OfflineDonation() {
  const [donationType, setDonationType] = useState("Self-Donate");
  const [donationType1, setDonationType1] = useState("Gift-Donate");

  const initialPackageData = [
    {
      packageName: "",
      bouquetPrice: "",
      noOfBouquets: "",
      maintenanceCost: "",
      amount: "",
    },
    {
      packageName: "",
      bouquetPrice: "",
      noOfBouquets: "",
      maintenanceCost: "",
      amount: "",
    },
    {
      packageName: "",
      bouquetPrice: "",
      noOfBouquets: "",
      maintenanceCost: "",
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
          paymentInfoId: '',
  paymentMode: '',
  bankName: '',
  chqORddNo: '',
  chqORddDate: '',
  paymentDate: '',
  amount: '',
  donation: '',
  createdDate: '',
  createdBy: '',
  modifiedDate: '',
  modifiedBy: '',
  remark: '',
  isDeleted: '',
  paymentTrackingId: '',
  bankPaymentRefNo: '',
  cardName: '',
  currency: '',
  paymentStatus: '',
  orderId: '',
  accountId: '',
  receiptDate: '',
  receivedAmount: '',
  bankCharge: '',
  documentNumber: '',
  bankAddress: '',
  depositNumber: '',
  depositDate: '',
  receiptNumber: '',
  realizationDate: '',
  creditCardNumber: '',
  cardExpiry: '',
  cardHolderName: '',
  chequeNumber: '',
  chequeDate: '',
  demandDraftNumber: '',
  demandDraftDate: '',
  totalAmount: ''
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

  const [donationsGift, setDonationsGift] = useState(intialDonationsGift);

  const [recipient, setRecipient] = useState(initialRecipientData);

  const [donarIdList, setDonarIdList] = useState([]);

  const [loading, setLoading] = useState(false);

  const [accountList, setAccountList] = useState([]);
  const [bankList, setBankList] = useState([]);

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

    if (!userData?.user?.emailId) {
      validationErrors.push({ field: "userData.user.emailId", message: "Email ID is required" });
    } else if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(userData.user.emailId)) {
      validationErrors.push({ field: "userData.user.emailId", message: "Invalid Email ID" });
    }

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
    if (userData?.user?.donarType.toLocaleLowerCase() === "corporate" && userData?.user?.activityType === null) {
      validationErrors.push({ field: "userData.user.activityType", message: "Activity Type is required" });
    }


    // Validate payment info
    if (donations && donations[0]?.paymentInfo) {
      for (let i = 0; i < donations[0].paymentInfo.length; i++) {
        if (i === 1) {
          // Skip validation for paymentInfo[1]
          continue;
        }
        const payment = donations[0].paymentInfo[i];

        if (!payment.paymentMode) {
          validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].paymentMode", message: "Payment Mode is required" });
        }
        if (!payment.paymentDate) {
          validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].paymentDate", message: "Payment Date is required" });
        }
        if (!payment.amount) {
          validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].amount", message: "Amount is required" });
        }
        if (!payment.totalAmount) {
          validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].totalAmount", message: "Total Amount is required" });
        }
        if (!payment.paymentStatus) {
          validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].paymentStatus", message: "Payment Status is required" });
        }
        if (!payment.receiptDate) {
          validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].receiptDate", message: "Receipt Date is required" });
        }
        
        if (!payment.accountId || payment.accountId.trim() === "") {
          validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].accountId", message: "Bank Account is required" });
        }
        if (donations[0]?.paymentInfo[i].paymentMode === BANK_TRANSFER || donations[0]?.paymentInfo[i].paymentMode === CHEQUE) {
          if (!payment.receivedAmount) {
            validationErrors.push({ field: "donations[0].paymentInfo[" + i + "].receivedAmount", message: "Received Date is required" });
          }
          
        }
      }
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
        validationErrors.push({ field: "address[" + i + "].street1", message: "Street is required" });
      }
      if (!addr?.country) {
        validationErrors.push({ field: "address[" + i + "].country", message: "Country is required" });
      }else if (/\d/.test(userData.user.lastName)) {
        validationErrors.push({ field: "address[" + i + "].country", message: "Country should only contain alphabets" });
      }

      if (!addr?.state) {
        validationErrors.push({ field: "address[" + i + "].state", message: "State is required" });
      }

      if (!addr?.city) {
        validationErrors.push({ field: "address[" + i + "].city", message: "City is required" });
      }else if (/\d/.test(addr?.city)) {
        validationErrors.push({ field: "address[" + i + "].city", message: "City should only contain alphabets" });
      }

       if ((addr?.postalCode).length > 6) {
        validationErrors.push({ field: "address[" + i + "].postalCode", message: "Postal Code should only contain six numbers" });
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
      if(!formData.formData.user.organisation){
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

  useEffect(() => {
    getAllPackages();
    getDonarIdList();
    getAllActiveBankAccounts();
    getAllActiveBanks();
  }, []);
  const getAllPackages = async () => {
    setLoading(true);
    const response = await DonationService.getAllPackages();
    if (response?.status === SUCCESS) {
      console.log(response);
      let packageData = [...initialPackageData];
      console.log(packageData);
      const parsedData = JSON.parse(response.data);

      let data = parsedData.map((item)=>({packageName:item.package_name,bouquetPrice: item.bouquet_price,noOfBouquets:1,amount:item.bouquet_price}))
      
      setPackageData(data);
      calculateOverallTotal(data)
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };
  const getAllActiveBankAccounts = async () => {
    setLoading(true);
    const response = await DonationService.getAllActiveAccount();
    if (response?.status === SUCCESS) {
      setAccountList(response.data);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const getAllActiveBanks = async () => {
    setLoading(true);
    const response = await DonationService.getAllActiveBanks();
    console.log(response);
    if (response?.status === SUCCESS) {
      console.log(response.data);
      setBankList(response.data);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const getDonarIdList = async () => {
    setLoading(true);
    const response = await DonationService.getAllDonarId();
    if (response?.status === 200) {
      // let data = response.data.map((item)=> ({ label: item, value: item }))
      setDonarIdList(response.data);
      setLoading(false);
    } else {
      toast.error(response?.message);
      setLoading(false);
    }
  };

  const clearForm = (e) => {
    e.preventDefault();
    let packages = [...packageData];
    packages.map((item) => ({ ...item, noOfBouquets: 1, amount: item.bouquetPrice }));
    calculateOverallTotal(packages)
    setPackageData(packages);
    setAddress(initialAddress);
    // setDonationType("");
    setDonations(intialDonations);
    setRecipient(initialRecipientData);
    setUserData(initialUserData);
    

  };
  const handleTabSelect = (eventKey) => {
    console.log(eventKey);
    setDonationType(eventKey);
    setDonations(intialDonations);
    setRecipient(initialRecipientData);
    setUserData(initialUserData);
    let packages = [...packageData];
    packages.map((item) => ({ ...item, noOfBouquets: 1, amount: item.bouquetPrice }));
    calculateOverallTotal(packages)
    setPackageData(packages);
    setAddress(initialAddress);
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
    calculateOverallTotal(packageData);
    console.log(userPackageData);
  };

  const calculateOverallTotal = (packageData) => {
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
      console.log(updatedDonations[0].donationEvent);
      console.log(updatedDonations[index]);
      // setDonationsGift(updatedDonations[0])
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
console.log(donationsGift);
  console.log(donations);

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

  const handlePaymentInfoChangeGift = (e, donationIndex, payIndex) => {
    let { name, value } = e.target;
    if (value < 0) {
      value = 0;
    }
    const updatedDonations = [...donationsGift];
    console.log(updatedDonations);
    console.log("Offline Donation: "+updatedDonations[donationIndex].paymentInfo[payIndex][name])
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

  // get Detail by email id
  const handleBlur = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const emailId = e.target.value;
    if(emailId.length > 2){
      setLoading(true);
    let response = await DonationService.getDetailsByEmailId(emailId);
    console.log(response);
    if (response?.status === "Success") {
      toast.success(response?.message);
      console.log(response?.data);
      // console.log(formData.formData.user.address);

      let addr = [...initialAddress];
      if (hasValues(response.data.address[0])) {
        addr[0] = response.data.address[0];
      }
      // console.log(formData.formData.user.address);
      console.log(hasValues(response.data.address[1]));
      if (hasValues(response.data.address[1])) {

        addr[1] = response.data.address[1];
      }
      console.log(addr);
      setAddress(addr);
      // console.log(formData);
      const formData = {
        formData: {
          user: response?.data,
        },
      };
      console.log(response?.data.donations[0].paymentInfo);

      console.log(formData.formData.user.firstName);
      console.log(formData.formData.user.donations[0].userPackage);
      setPackageData(formData.formData.user.donations[0].userPackage);
      setUserData(formData.formData);
      setTimeout(() => {
        // navigate("/ModelView");
      }, 2000);
      setLoading(false);
    } else if (response?.statusCode === 409 || response?.status == "NOT_FOUND" ) {
      //toast.error(response?.message);
      setLoading(false);
    }
  }
    // Call your function here or perform any desired actions
  };


  // get Detail by donar ID
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
    }else{
      console.log(response);
      toast.error(response?.message);
      setLoading(false);
    }
  };

  // get Detail by donar ID
  const handleDonarId = async (donorId) => {
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
    }else{
      console.log(response);
      toast.error("Invalid Donor Id ! Please Try Again");
      toast.error(response?.message);
      setLoading(false);
    }
  };

  //Donation for gift Donate
  // const createDonationGift = async (e, userData) => {
  //   e.preventDefault();

  // //   const isValid = validate();
  // //   console.log("isValid:", isValid);


  //   //if (isValid) {
  //   const updatedDonations = [...donationsGift];
  //   const filteredPackages = packageData.filter((pkg) => pkg.noOfBouquets > 0);
  //   console.log(filteredPackages);
  //   updatedDonations[0].userPackage = filteredPackages;

  //   const formData = {
  //         emailId: userData?.user?.emailId,
  //         donorId: userData?.user?.donorId,
  //         donations: updatedDonations.map((donation) => {
  //           const donationData = {
  //             ...donation,
  //             paymentInfo: donation.paymentInfo.slice(0, 1), // Keep only the first payment info record
  //           };
  //           console.log(donation.donationType);
  //           if (donation.donationType === "Self-Donate") {
  //             donationData.recipient = []; // Exclude recipient data
  //           } else if (donation.donationType === "Gift-Donate") {
  //             donationData.recipient = recipient;
  //           }

  //           return donationData;
  //         }),
  //       }


  //   setLoading(true);
  //   const response = await DonationService.AddNewDonation(formData);
  //   console.log(response);
  //   if (response?.status === SUCCESS) {
  //     console.log("Create Donation: "+JSON.stringify(response))
  //     toast.success(response?.message);
  //     clearForm(e);
  //     setLoading(false);
  //   } else {
  //     toast.error(response?.message);
  //     setLoading(false);
  //   }
  
  //   console.log(donations);
  //   console.log(formData);
  //   console.log(updatedDonations);
  //   console.log();
  // //}
  // console.log("Not Working !")
  // };


  const createDonationGift = async (e, userData) => {
  e.preventDefault();
  console.log(donations);
    const updatedDonations = [...donations];
    const filteredPackages = packageData.filter((pkg) => pkg.noOfBouquets > 0);
    console.log(updatedDonations)
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

  //   const isValid = validate();
  //   console.log("isValid:", isValid);


    //if (isValid) {
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
          }

      setLoading(true);
    const response = await DonationService.AddNewDonation(formData);
    console.log(response);
    if (response?.status === SUCCESS) {
      console.log("Create Donation: "+JSON.stringify(response))
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
  //}
  console.log("Not Working !")
  };


  return (
    <>
      <ToastContainer />
      {loading && <Loader/>}
      <Tabs
        defaultActiveKey="NewDonor"
        id="uncontrolled-tab-example"
        className="newexti-tab"
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
                    activeKey={donationType} onSelect={handleTabSelect}
                  >
                    <Tab eventKey="Self-Donate" title="Plant a tree">
                      <form className="form-div contact-form-wrap">
                        <div className="actionheadingdiv">
                          Select Your Donation Plan
                        </div>
                        <div className="mt20">
                          <table>
                            <thead>
                              <tr>
                                <th>Planning Season</th>
                                <th>Cost per Sapling</th>
                                {/* <th>Maintenance Cost</th> */}
                                <th className="w200">No. of Sapling</th>
                                <th>Total Cost</th>
                              </tr>
                            </thead>
                            <tbody>
                              {packageData.map((packageItem, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{packageItem.packageName}</td>
                                    <td>{packageItem.bouquetPrice}</td>
                                    {/* <td>{packageItem.maintenanceCost}</td> */}
                                    <td>
                                      <input
                                        type="number"
                                        className="form-control-inside"
                                        name="noOfBouquets"
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
                        <div className="clear"/>
                        <hr />
                        <div className="actionheadingdiv">Personal Details</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Email ID <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.emailId"
                                    placeholder="Email ID"
                                    value={userData?.user?.emailId}
                                    onBlur={(e) => handleBlur(e)}
                                    onChange={handleChange}
                                    required
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
                              <div className="row select-label">
                                <div className="col-4 ">Mobile No.<span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.mobileNo"
                                    placeholder="Mobile No."
                                    value={userData?.user?.mobileNo}
                                    onChange={handleChange}
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
                              <div className="row select-label">
                                <div className="col-4 "> Donor Type <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.donarType"
                                    value={userData?.user?.donarType}
                                    onChange={handleChange}
                                  >
                                    <option disabled selected value="">Donor Type</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Individual">Individual</option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.donarType') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            {
                              userData?.user?.donarType.toLowerCase() ===  "corporate" ?
                              <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Organisation <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="user.organisation"
                                    placeholder="Organisation"
                                    type="text"
                                    value={userData?.user?.organisation}
                                    onChange={handleChange}
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
                            :
                            <></>
                            }
                            
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Prefix <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.prefix"
                                    value={userData?.user?.prefix}
                                    onChange={handleChange}
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
                              <div className="row select-label">
                                <div className="col-4 ">First Name <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.firstName"
                                    placeholder="First Name"
                                    value={userData?.user?.firstName}
                                    onChange={handleChange}
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
                              <div className="row select-label">
                                <div className="col-4 ">Last Name <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.lastName"
                                    placeholder="Last Name"
                                    value={userData?.user?.lastName}
                                    onChange={handleChange}
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
                              <div className="row select-label">
                                <div className="col-4 ">PAN card <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="user.panCard"
                                    placeholder="PAN card No."
                                    type="text"
                                    value={userData?.user?.panCard}
                                    onChange={handleChange}
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
                            {
                              userData.user.donarType.toLowerCase() === "corporate" ?
                              <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Type of Corporate <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.donarType"
                                    value={userData?.user?.activityType}
                                    onChange={handleChange}
                                  >
                                    <option disabled selected value="">Select</option>
                                    <option value="Corporate">CSR</option>
                                    <option value="Individual">Non-CSR</option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.donarType') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>:<></>
                            }
                            
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
                              <div className="row select-label">
                                <div className="col-4 "> Street 1 <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                                    if (error.field === 'address[0].street1') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}


                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 2</div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 3</div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Country <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">State <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="state"
                                    value={address[0]?.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
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
                              <div className="row select-label">
                                <div className="col-4 ">City <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="city"
                                    placeholder="City"
                                    type="text"
                                    value={address[0]?.city}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
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
                              <div className="row select-label">
                                <div className="col-4 ">Postal Code <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    type="text"
                                    value={address[0]?.postalCode}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr /><div id="addaddressDiv" className="hide">
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
                                <div className="row select-label">
                                  <div className="col-4 "> Street 1</div>
                                  <div className="col-8 p0">
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
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 "> Street 2</div>
                                  <div className="col-8 p0">
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
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 "> Street 3</div>
                                  <div className="col-8 p0">
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
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">Country <span className="red-text">*</span></div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="country"
                                      placeholder="Country"
                                      type="text"
                                      // value={address[1].country}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">State<span className="red-text">*</span></div>
                                  <div className="col-8 p0">
                                    <select
                                      className=" form-control-inside form-select"
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
                                <div className="row select-label">
                                  <div className="col-4 ">City</div>
                                  <div className="col-8 p0">
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
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">Postal Code</div>
                                  <div className="col-8 p0">
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
                                    if (error.field === 'address[1].postalCode') {
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
                        </div>
                        <div className="actionheadingdiv">Mode of Payment
                          <div
                            className="float-right addminicon"
                            onClick={addpaymenticon}
                          >
                            <FaPlusSquare />
                          </div></div>
                        <PaymentDetails donations={donations} errors={errors} bankList={bankList} handlePaymentInfoChange={handlePaymentInfoChange} index={0}/>
                        <div id="addpaymentDiv" className="hide">
                          <hr />
                          <div className="actionheadingdiv">Mode of Payment
                            <div
                              className="float-right addminicon"
                              onClick={minpaymentDiv}
                            >
                              <FaMinusSquare />
                            </div></div>
                          <div className="col-12 pr15 mt20">
                            <div className="row">
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 "> Select Mode</div>
                                  <div className="col-8 p0">
                                    <select
                                      name="paymentMode"
                                      className=" form-control-inside form-select"
                                      value={donations[0].paymentInfo[1].paymentMode}
                                      onChange={(event) =>
                                        handlePaymentInfoChange(event, 0, 1)
                                      }
                                    >
                                      <option selected>Select</option>
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
                                      value={donations[0]?.paymentInfo[1].bankName}
                                      onChange={(event) =>
                                        handlePaymentInfoChange(event, 0, 1)
                                      }
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
                                      value={donations[0]?.paymentInfo[1].chqORddNo}
                                      onChange={(event) =>
                                        handlePaymentInfoChange(event, 0, 1)
                                      }
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
                                      value={
                                        donations[0]?.paymentInfo[1].chqORddDate
                                      }
                                      onChange={(event) =>
                                        handlePaymentInfoChange(event, 0, 1)
                                      }
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
                                      value={
                                        donations[0]?.paymentInfo[1].paymentDate
                                      }
                                      onChange={(event) =>
                                        handlePaymentInfoChange(event, 0, 1)
                                      }
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
                                      value={donations[0]?.paymentInfo[1].amount}
                                      onChange={(event) => {
                                        if (event.target.value < 0) {
                                          event.target.value = 0;
                                        }
                                        handlePaymentInfoChange(event, 0, 1);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          className="mt20 mr10 webform-button--submit"
                          onClick={userAdd}
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
                        <div className="col-12 mt20">
                          <div className="row ">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Occasion <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="donationEvent"
                                    value={donations[0].donationEvent}
                                    onChange={(e) => handleDonationChange(e, 0)}
                                  >
                                    <option disabled selected value="">select occasion</option>
                                  
                                <option value="Festivals">Festivals</option>
                                <option value="Special day"> Special Day</option>
                                <option value="Achievements"> Achievements</option>
                                <option value=" Memorial Tribute">  Memorial Tribute</option>
                                <option value="Simple Donation"> Simple Donation</option>
                                  </select>
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
                        </div>

                        <div className="actionheadingdiv">
                          Select Your Donation Plan
                        </div>
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
                        <div className="clear"/>
                        <div className="col-6 mt20">
                        </div>
                        <hr />
                        <div className="actionheadingdiv">Personal Details</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Email ID <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.emailId"
                                    placeholder="Email ID"
                                    value={userData.user.emailId}
                                    // onBlur={handleBlur}
                                    onChange={handleChange}
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
                              <div className="row select-label">
                                <div className="col-4 ">Mobile No.<span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.mobileNo"
                                    placeholder="Mobile No."
                                    value={userData.user.mobileNo}
                                    onChange={handleChange}
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
                              <div className="row select-label">
                                <div className="col-4 "> Donor Type <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.donarType"
                                    value={userData.user.donarType}
                                    onChange={handleChange}
                                  >
                                    <option disabled selected value="">Donor Type</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Individual">Individual</option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.DonarType') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            { 
                              userData.user.donarType.toLowerCase() === "corporate" ?
                              <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Organisation <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="user.organisation"
                                    placeholder="Organisation"
                                    type="text"
                                    value={userData.user.organisation}
                                    onChange={handleChange}
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
                            :
                            <></>
                            }
                            
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Prefix <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.prefix"
                                    value={userData.user.prefix}
                                    onChange={handleChange}
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
                              <div className="row select-label">
                                <div className="col-4 ">First Name <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.firstName"
                                    placeholder="First Name"
                                    value={userData.user.firstName}
                                    onChange={handleChange}
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
                              <div className="row select-label">
                                <div className="col-4 ">Last Name <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.lastName"
                                    placeholder="Last Name"
                                    value={userData.user.lastName}
                                    onChange={handleChange}
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
                              <div className="row select-label">
                                <div className="col-4 ">PAN card <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="user.panCard"
                                    placeholder="PAN card No."
                                    type="text"
                                    value={userData.user.panCard}
                                    onChange={handleChange}
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
                            {/* <div className="col-6">
                              <div className="row select-label">
                                <label className="col-4 ">I want to opt</label>
                                <div className="col-8 p0">
                                  <input
                                    type="radio"
                                    name="user.activityType"
                                    value="CSR Activity"
                                    onClick={handleChange}
                                    className="radioinput"
                                  />
                                  <label className="radiospan" checked>
                                    CSR Activity
                                  </label>
                                  <input
                                    type="radio"
                                    name="user.activityType"
                                    value="NON-CSR Activity"
                                    onClick={handleChange}
                                    className="radioinput"
                                  />
                                  <label className="radiospan">
                                    NON-CSR Activity
                                  </label>
                                </div>
                                {errors.map((error, index) => {
                                  if (error.field === 'userData.user.activityType') {
                                    return <div key={index} className="error-message red-text">{error.message}</div>;
                                  }
                                  return null;
                                })}
                              </div>
                            </div> */}
                            {userData.user.donarType.toLowerCase() === "corporate" ?
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Type of Corporate <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.donarType"
                                    value={userData?.user?.activityType}
                                    onChange={handleChange}
                                  >
                                    <option disabled selected value="">Select</option>
                                    <option value="Corporate">CSR</option>
                                    <option value="Individual">Non-CSR</option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.donarType') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            :<></>}
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">
                          Address
                        </div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 1 <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                                    if (error.field === 'address[0].street1') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 2</div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 3</div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Country <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">State <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="state"
                                    value={address[0]?.state}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
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
                              <div className="row select-label">
                                <div className="col-4 ">City <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="city"
                                    placeholder="City"
                                    type="text"
                                    value={address[0]?.city}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
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
                              <div className="row select-label">
                                <div className="col-4 ">Postal Code <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    type="text"
                                    value={address[0]?.postalCode}
                                    onChange={(event) =>
                                      handleAddressChange(event, 0)
                                    }
                                  />
                                  {errors.map((error, index) => {
                                    if (error.field === 'address[0].postalCode') {
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
                          DETAILS OF RECIPIENT
                        </div>
                        <div className="col-12 pr15 mt20">
                          <div>
                          <div className="row">
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">First Name <span className="red-text">*</span></div>
                                  <div className="col-8 p0">
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
                                      if (error.field === 'recipient[0].firstName') {
                                        return <div key={index} className="error-message red-text">{error.message}</div>;
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">Last Name <span className="red-text">*</span></div>
                                  <div className="col-8 p0">
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
                                      if (error.field === 'recipient[0].lastName') {
                                        return <div key={index} className="error-message red-text">{error.message}</div>;
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">Mobile No.<span className="red-text">*</span></div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                                <div className="row select-label">
                                  <div className="col-4 ">Email Id <span className="red-text">*</span></div>
                                  <div className="col-8 p0">
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
                                      if (error.field === 'recipient[0].emailId') {
                                        return <div key={index} className="error-message red-text">{error.message}</div>;
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">
                                    {" "}
                                    Street 1
                                    <span className="red-text">*</span>
                                  </div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                                <div className="row select-label">
                                  <div className="col-4 ">
                                    {" "}
                                    Street 2
                                  </div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                                <div className="row select-label">
                                  <div className="col-4 ">
                                    {" "}
                                    Street 3
                                  </div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                                <div className="row select-label">
                                  <div className="col-4 ">Country <span className="red-text"> *</span></div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                                <div className="row select-label">
                                  <div className="col-4 ">State<span className="red-text">*</span></div>
                                  <div className="col-8 p0">
                                    <select
                                      className=" form-control-inside form-select"
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
                                <div className="row select-label">
                                  <div className="col-4 ">City</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                                <div className="row select-label">
                                  <div className="col-4 ">
                                    Postal Code
                                  </div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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

                           
                          </div>

                        </div>
                        <hr />
                        <div className="actionheadingdiv">Mode of Payment
                          <div
                            className="float-right addminicon"
                            onClick={addgiftpaymenticon}
                          >
                            <FaPlusSquare />
                          </div></div>
                        <PaymentDetails donations={donations} errors={errors} bankList={bankList} handlePaymentInfoChange={handlePaymentInfoChange} index={0}/>
                        <div id="addgiftpaymentDiv" className="hide">
                          <hr />
                          <div className="actionheadingdiv">Mode of Payment
                            <div
                              className="float-right addminicon"
                              onClick={mingiftpaymentDiv}
                            >
                              <FaMinusSquare />
                            </div></div>
                            <PaymentDetails donations={donations} errors={errors} bankList={bankList} handlePaymentInfoChange={handlePaymentInfoChange} index={1}/>
                        </div>
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--submit"
                          onClick={userAdd}
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
                    activeKey={donationType} onSelect={handleTabSelect}
                  >
                    <Tab eventKey="Self-Donate" title="Plant a tree">
                      {/* <h5>Self Planting</h5> */}

                      <form className="form-div contact-form-wrap">
                        <div className="col-12 mt20">
                          <div className="row ">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Donor ID <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <SearchWithSuggestions data={donarIdList} onClickSearch={handleDonarId}/>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="actionheadingdiv">
                          Select Your Donation Plan
                        </div>
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
                        <div className="clear"/>
                        <hr />
                        <div className="actionheadingdiv">Personal Details</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Email ID <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.emailId"
                                    placeholder="Email ID"
                                    value={userData?.user?.emailId}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={handleChange}
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.emailId') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}

                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Mobile No.<span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.mobileNo"
                                    placeholder="Mobile No."
                                    value={userData?.user?.mobileNo}
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Donor Type <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.donarType"
                                    value={userData?.user?.donarType}
                                    onChange={handleChange}
                                    disabled
                                  >
                                    <option disabled selected value="">Donor Type</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Individual">Individual</option>
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
                            {userData.user.donarType.toLowerCase() === "corporate" ?
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Organisation <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                            :<></>}
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Prefix <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
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
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.prefix') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">First Name <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Last Name <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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

                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">PAN card <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="user.panCard"
                                    placeholder="PAN card No."
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
                            {userData.user.donarType.toLowerCase() === "corporate" ?
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Type of Corporate <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.donarType"
                                    value={userData?.user?.activityType}
                                    onChange={handleChange}
                                  >
                                    <option disabled selected value="">Select</option>
                                    <option value="Corporate">CSR</option>
                                    <option value="Individual">Non-CSR</option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.donarType') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            :<></>}
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
                              <div className="row select-label">
                                <div className="col-4 "> Street 1 <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 2</div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 3</div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Country <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">State <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
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
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'address[0].state') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">City <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Postal Code <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
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
                        <hr /><div id="addaddressDiv" className="hide">
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
                                <div className="row select-label">
                                  <div className="col-4 "> Street 1</div>
                                  <div className="col-8 p0">
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
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 "> Street 2</div>
                                  <div className="col-8 p0">
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
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 "> Street 3</div>
                                  <div className="col-8 p0">
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
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">Country</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
                                      name="country"
                                      placeholder="Country"
                                      type="text"
                                      value={address[1]?.country}
                                      onChange={(event) =>
                                        handleAddressChange(event, 1)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">State <span className="red-text">*</span></div>
                                  <div className="col-8 p0">
                                    <select
                                      className=" form-control-inside form-select"
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
                                <div className="row select-label">
                                  <div className="col-4 ">City</div>
                                  <div className="col-8 p0">
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
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">Postal Code</div>
                                  <div className="col-8 p0">
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
                                    if (error.field === 'address[1].postalCode') {
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
                        </div>
                        <div className="actionheadingdiv">Mode of Payment
                          <div
                            className="float-right addminicon"
                            onClick={addpaymenticon}
                          >
                            <FaPlusSquare />
                          </div></div>
                          <PaymentDetails donations={donations} errors={errors} bankList={bankList} handlePaymentInfoChange={handlePaymentInfoChange} index={0}/>
                        <div id="addpaymentDiv" className="hide">
                          <hr />
                          <div className="actionheadingdiv">Mode of Payment
                            <div
                              className="float-right addminicon"
                              onClick={minpaymentDiv}
                            >
                              <FaMinusSquare />
                            </div></div>
                            <PaymentDetails donations={donations} errors={errors} bankList={bankList} handlePaymentInfoChange={handlePaymentInfoChange} index={1}/>
                        </div>
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

                        <div className="col-12 mt20">
                          <div className="row ">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Donor ID <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                <SearchWithSuggestions data={donarIdList} onClickSearch={handleDonarId}/>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Occasion <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="donationEvent"
                                    value={donations[0].donationEvent}
                                    onChange={(e) => handleDonationChange(e, 0)}
                                  >
                                    <option disabled selected value="">Select occasion</option>
                                
                                <option value="Festivals">Festivals</option>
                                <option value="Special day"> Special Day</option>
                                <option value="Achievements"> Achievements</option>
                                <option value=" Memorial Tribute">  Memorial Tribute</option>
                                <option value="Simple Donation"> Simple Donation</option>
                                  </select>
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
                        </div>

                        <div className="actionheadingdiv">
                          Select Your Donation Plan
                        </div>
                        <div className="mt20">
                          <table>
                            <thead>
                              <tr>
                                <th>Planning Season</th>
                                <th>Cost per Sapling</th>
                                {/* <th>Maintenance Cost</th> */}
                                <th className="w200">No. of Sapling</th>
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
                                        className="form-control-inside"
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
                        <div className="clear"/>
                        <hr />
                        <div className="actionheadingdiv">Personal Details</div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Email ID <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.emailId"
                                    placeholder="Email ID"
                                    value={userData.user.emailId}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={handleChange}
                                    disabled
                                  />
                                  {/* {errors.map((error, index) => {
                                    if (error.field === 'userData.user.emailId') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Mobile No.<span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    type="text"
                                    name="user.mobileNo"
                                    placeholder="Mobile No."
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Donor Type <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.donarType"
                                    value={userData.user.donarType}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={handleChange}
                                    disabled
                                  >
                                    <option disabled selected value="">Donor Type</option>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Individual">Individual</option>
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
                            {userData.user.donarType.toLowerCase() === "corporate" ?
                              <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Organisation <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                            :<></>
                          }
                            
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Prefix <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.prefix"
                                    value={userData.user.prefix}
                                    onBlur={(e) => handleDonarIdBlur(e)}
                                    onChange={handleChange}
                                    disabled

                                  >
                                    <option disabled selected value="">Prefix</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">First Name <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Last Name <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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

                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">PAN card <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="user.panCard"
                                    placeholder="PAN card No."
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
                            {userData.user.donarType.toLowerCase() === "corporate" ?
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Type of Corporate <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <select
                                    className=" form-control-inside form-select"
                                    name="user.donarType"
                                    value={userData?.user?.activityType}
                                    onChange={handleChange}
                                  >
                                    <option disabled selected value="">Select</option>
                                    <option value="Corporate">CSR</option>
                                    <option value="Individual">Non-CSR</option>
                                  </select>
                                  {errors.map((error, index) => {
                                    if (error.field === 'userData.user.donarType') {
                                      return <div key={index} className="error-message red-text">{error.message}</div>;
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            </div>
                            :<></>}
                          </div>
                        </div>
                        <hr />
                        <div className="actionheadingdiv">
                          Address
                        </div>
                        <div className="col-12 pr15 mt20">
                          <div className="row">
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 1 <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 2</div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 "> Street 3</div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Country <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">State <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                                    <option disabled selected value="">Select State</option>
                                    {stateOptions.map((state) => (
                                      <option key={state} value={state}>
                                        {state}
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">City <span className="red-text">*</span></div>
                                <div className="col-8 p0">
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
                            <div className="col-6">
                              <div className="row select-label">
                                <div className="col-4 ">Postal Code <span className="red-text">*</span></div>
                                <div className="col-8 p0">
                                  <input
                                    className="form-control-inside"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    type="text"
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
                          DETAILS OF RECIPIENT
                        </div>
                        <div className="col-12 pr15 mt20">
                          <div>

                          <div className="row">
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">First Name <span className="red-text">*</span></div>
                                  <div className="col-8 p0">
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
                                      if (error.field === 'recipient[0].firstName') {
                                        return <div key={index} className="error-message red-text">{error.message}</div>;
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">Last Name <span className="red-text">*</span></div>
                                  <div className="col-8 p0">
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
                                      if (error.field === 'recipient[0].lastName') {
                                        return <div key={index} className="error-message red-text">{error.message}</div>;
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">Mobile No.<span className="red-text">*</span></div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                                <div className="row select-label">
                                  <div className="col-4 ">Email Id <span className="red-text">*</span></div>
                                  <div className="col-8 p0">
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
                                      if (error.field === 'recipient[0].emailId') {
                                        return <div key={index} className="error-message red-text">{error.message}</div>;
                                      }
                                      return null;
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                <div className="row select-label">
                                  <div className="col-4 ">
                                    {" "}
                                    Street 1
                                  </div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                                <div className="row select-label">
                                  <div className="col-4 ">
                                    {" "}
                                    Street 2
                                  </div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                                <div className="row select-label">
                                  <div className="col-4 ">
                                    {" "}
                                    Street 3
                                  </div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                                <div className="row select-label">
                                  <div className="col-4 ">Country<span className="red-text">*</span></div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                                <div className="row select-label">
                                  <div className="col-4 ">State<span className="red-text">*</span></div>
                                  <div className="col-8 p0">
                                    <select
                                      className=" form-control-inside form-select"
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
                                <div className="row select-label">
                                  <div className="col-4 ">City</div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                                <div className="row select-label">
                                  <div className="col-4 ">
                                    Postal Code
                                  </div>
                                  <div className="col-8 p0">
                                    <input
                                      className="form-control-inside"
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
                          </div>

                        </div>
                        <hr />
                        <div className="actionheadingdiv">Mode of Payment
                          <div
                            className="float-right addminicon"
                            onClick={addgiftpaymenticon}
                          >
                            <FaPlusSquare />
                          </div></div>
                          <PaymentDetails donations={donations} errors={errors} bankList={bankList} handlePaymentInfoChange={handlePaymentInfoChange} index={0}/>
                        <div id="addgiftpaymentDiv" className="hide">
                          <hr />
                          <div className="actionheadingdiv">Mode of Payment
                            <div
                              className="float-right addminicon"
                              onClick={mingiftpaymentDiv}
                            >
                              <FaMinusSquare />
                            </div></div>
                            <PaymentDetails donations={donations} errors={errors} bankList={bankList} handlePaymentInfoChange={handlePaymentInfoChange} index={1}/>
                        </div>
                        <button
                          type="submit"
                          className="mt20 mr10 webform-button--submit"
                          onClick={(e) => createDonationGift(e, userData)}
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

      {/* body */}
    </>
  );
}

export default OfflineDonation;
