export const URLS = {
    // login
    LOGIN: '/loginOtp',
    LOGOUT: '/logout',
    SENDMAILFORGETPASSWORD: '/forgetPassword',
    FORGETPASSWORD:'/forgetPassword/',
    VERIFYOTP: '/verify-otp/',
    VERIFYFORGETOTP:'/verifyForgotOtp',
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

    //  Donor
    GETALLUSERDONATION: "/getAlluser",
    GETALLDONATIONOFUSER: "/getAllDonationOfUser",
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
    FORM10B_UPLOAD : "/uploadZipFile",

    //contries and states api
    GETALLCOUNTRY:'/getAllCountry',
    GETSTATESBYCOUNTRY:'/getAllStateByCountryId',
    GETALLCITIZENSHIP:'/getAllCitizensip',

    //for change password
    CHANGEE_PASSWORD:"/changePassword",
    SET_NEW_PASSWORD:"/setUserNewPassword",
    RESEND_OTP:"/reSendOtp",

    APPROVE_USER_DONATION: "/approveUserDonation",

    YEAR1REPORT : "plantation/sendPlantationYear1Report",
    YEAR2REPORT : "plantation/sendPlantationYear2Report",
    
    //get user documents
    GET_USER_DOCUMENTS : "/getUserDocuments",
    DoWNLOAD_USER_DOCUMENT : "/downloadUserDocument",
    DoWNLOAD_DONATION_REPORT : "/exportDonationReport",
};