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
    GETDONORIDBYEMAILID:'/getUserDonarId/',
    GETBYEXISTINGEMAILID: "/getExistingUser/",
    GETALLPACKAGE: "/getAllPackages",

    // GET USER DETAILS BY DONOR ID
    GETUSERDETAILSBYDONORID: "/getUserDetailsByDonorId/",
    GETUSERDETAILSBYDONORIDOREMAILID: "/getUserPersonalDetailsbyEmailOrDonorId",
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
    GETALLUSERIDLIST: "/getAllUserId",

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
    GET_ALL_ACTIVE_BANKS:"/bank/findAllActiveBank",
    GET_USER_DONATIONS:"/getUserDonations",

    //Plantation service
    PLANTATION_YEARS:"/plantation/years",
    PLANTATION_SEASONS:"/plantation/seasons",
    PLANTATION_DISTRICTS:"/plantation/districts",
    PLANTATION_CITIES:"/plantation/cities",
    PLANTATION_UPLOAD:"/plantation/upload",
    PLANTATION_FINDALLBYFILTER:"/plantation/findAllByFilter",
    PLANTATION_EXPORTREPORT:"/plantation/exportReport",
    PLANTATION_DOWNLOADTEMPLATE:"/plantation/downloadTemplate",

    //commitment service
    COMMITMENT_FINDALLBYFILTER:"/commitment/findByFilter",

    //Form 10 BE
    FORM10B_UPLOAD : "/uploadZipFile"
};