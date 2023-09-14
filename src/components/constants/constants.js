const TOKEN = "token";
const SUCCESS = "Success"
const ROLEAUTHORITY ={
  admin:"Admin",
  user:"User"
}


const USER_DETAILS = "user";

const ROUTE = {
    LOGIN: "/login",
    Dashboard: "/dashboard",
  };

  // State options
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

  export const BANK_TRANSFER = "Bank Transfer";
  export const CREDIT_CARD = "Credit Card";
  export const CHEQUE = "Cheque";
  export const DEMAND_DRAFT = "Demand Draft";
  export const ONLINE = "Online";

  const PAYMENT_MODES = [
    {label:BANK_TRANSFER,value:BANK_TRANSFER},
    {label:CREDIT_CARD,value:CREDIT_CARD},
    {label:CHEQUE,value:CHEQUE},
    {label:DEMAND_DRAFT,value:DEMAND_DRAFT},
    {label:ONLINE,value:ONLINE},
  ];

  export const PAYMENT_STATUS = [
    {label:"Success",Value:"Success"},
    {label:"Failure",Value:"Failure"}
  ]

  export { USER_DETAILS, ROUTE , TOKEN , SUCCESS,ROLEAUTHORITY,stateOptions,PAYMENT_MODES };