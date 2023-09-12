export const URLS = {
    // login
    LOGIN: '/loginOtp',
    LOGOUT: '/logout',
    SENDMAILFORGETPASSWORD: '/forgetPassword',
    VERIFYOTP: '/verify-otp/',
    // user
    USERADD: "/userAddOffline",
    USERONLINEADD: "/userAddOnline",
    GETBYEMAILID: "/getuser/",
    GETBYEXISTINGEMAILID: "/getExistingUser/",
    GETALLPACKAGE: "/getAllPackages",

    // GET USER DETAILS BY DONOR ID
    GETUSERDETAILSBYDONORID: "/getUserDetailsByDonorId/",
    ADDNEWDONATIONS: "/newDonation",

    //opt
    SENDOTP: "/sendOtp",
    VERIFYOTPONLINE: "/verify-otp",

    //  Donar
    GETALLUSERDONATION: "/getAlluser",
    GETALLDONATIONOFUSER: "/getAllDonationOfUser/",
    GETDONATIONBYID: "/getDonationById/",
    GETUSERDETAILS: "/getUserDetails/",
    UPDATEUSER: "/updateUser",
    UPDATEDONATIONOFUSER: "/updateDonation",
    GETDONARIDLIST: "/getAllDonarId",

    // Web donor
    GETALLUSERWITHWEBID: "/getAlluserWithWebId",
    APPROVEDONATION: "/approvedDonation",
    GETPAYMENTINFO: "/searchPaymentByPaymentId/",

    //Contact Us Form
    CONTACTUSFORM: "/saveContact",

    //receipts
    GETALLRECEIPTSBYUSER:"/getAllReceiptByUser",
    DOWNLOADRECEIPT:"/receipt/download/",
    GET_ALL_ACTIVE_BANK_ACCOUNT:"/findAllActiveAccount",
    GET_USER_DONATIONS:"/getUserDonations",

    //Upload Excel Plantation
    UPLOADPLANTATIONEXCEL : "/uploadPlantationExcel",
    EXPORTEXCEL : "/excelExportUserPlant"

};