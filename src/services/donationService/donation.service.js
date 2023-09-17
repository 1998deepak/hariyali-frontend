import { URLS } from "../../components/constants/urls";
import { APIService } from "../api/api-service";
import { toast } from "react-toastify";
import { EncryptionService } from "../encryption.service";



export const DonationService = {
  Adduser: async (data, config) => {
    console.log(data);
    try {
      const response = await APIService.Instance.post(
        URLS.USERADD,
        data,
        config
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        //   toast.error(err?.message);
        console.log("Hello");
      }
    }
  },

  AddOnlineuser: async (data, config) => {
    console.log(data);
    try {
      const response = await APIService.Instance.post(
        URLS.USERONLINEADD,
        data,
        config
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        console.log("Hello");
      }
    }
  },

  AddOnlineuser: async (data, config) => {
    console.log(data);
    try {
      const response = await APIService.Instance.post(
        URLS.USERONLINEADD,
        data,
        config
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        //   toast.error(err?.message);
        console.log("Hello");
      }
    }
  },

  AddOnlineuser: async (data, config) => {
    console.log(data);
    try {
      const response = await APIService.Instance.post(
        URLS.USERONLINEADD,
        data,
        config
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        //   toast.error(err?.message);
        console.log("Hello");
      }
    }
  },

  getDetailsByEmailId: async (emailId) => {
    console.log(emailId);
    emailId = (await EncryptionService.encrypt(emailId)).toString();
    try {
      const response = await APIService.Instance.get(
        URLS.GETBYEMAILID + emailId
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getDetailsByEmailIdOrDonorId: async (id) => {
    console.log(id);
    id = (await EncryptionService.encrypt(id)).toString();
    try {
      const response = await APIService.Instance.get(
        URLS.GETUSERDETAILSBYDONORIDOREMAILID +"?emailOrDonorId="+ id
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      return error.response.data;
    }
  },


  getDonorIdByEmailId: async (emailId) => {
    console.log(emailId);
    emailId = (await EncryptionService.encrypt(emailId)).toString();
    try {
      const response = await APIService.Instance.get(
        URLS.GETDONORIDBYEMAILID + emailId
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      return error.response.data;
    }
  },

  getExistingDetailsByEmailId: async (emailId) => {
    console.log(emailId);
    const response = await APIService.Instance.get(
      URLS.GETBYEXISTINGEMAILID + emailId
    );
    console.log(response);
    return response?.data;
  },

  getAllPackages: async () => {
    try {
      const response = await APIService.Instance.get(
        URLS.GETALLPACKAGE
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },

  getPaymentInformation: async (paymentId) => {
    try {
      paymentId = (await EncryptionService.encrypt(paymentId)).toString();
      const response = await APIService.Instance.get(
        URLS.GETPAYMENTINFO + paymentId
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },

  getAllUserDonation: async () => {

    try {
      const response = await APIService.Instance.get(
        URLS.GETALLUSERDONATION
      );
      console.log(response);
      return response;

    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return err?.response;
      } else {
        toast.error(err?.message);
      }
    }
  },



  getAllDonationOfUser: async (emailId) => {
    console.log(emailId);
    emailId = (await EncryptionService.encrypt(emailId)).toString();
    const response = await APIService.Instance.get(
      URLS.GETALLDONATIONOFUSER + emailId
    );
    console.log(response);
    return response?.data;

  },

  getDonationById: async (donationId) => {
    donationId = (await EncryptionService.encrypt(donationId)).toString();
    const response = await APIService.Instance.get(
      URLS.GETDONATIONBYID + donationId
    );
    console.log(response);
    return response?.data;

  },

  getUserDetails: async (emailId) => {
    emailId = (await EncryptionService.encrypt(emailId)).toString();
    const response = await APIService.Instance.get(
      URLS.GETUSERDETAILS + emailId
    );
    console.log(response);
    return response?.data;
  },



  updateUser: async (emailId, formData) => {
    console.log(emailId);
    console.log(formData);
    try {
      const response = await APIService.Instance.put(
        URLS.UPDATEUSER + "?emailId=" + emailId, formData
      );
      console.log(response);
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        //   toast.error(err?.message);
        console.log("Hello");
      }
    }
  },

  updateDonation: async (formData) => {

    console.log(formData);
    try {
      const response = await APIService.Instance.put(
        URLS.UPDATEDONATIONOFUSER, formData
      );
      console.log(response);
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        //   toast.error(err?.message);
        console.log("Hello");
      }
    }
  },

  // get user details by donor id
  getDetailsByDonorId: async (donorId) => {
    console.log(donorId);
    donorId = (await EncryptionService.encrypt(donorId)).toString();
    donorId = encodeURI(donorId);
    const response = await APIService.Instance.get(
      URLS.GETUSERDETAILSBYDONORID + donorId
    );
    console.log(response);
    return response?.data;
  },



  AddNewDonation: async (data, config) => {
    console.log(data);
    try {
      const response = await APIService.Instance.post(
        URLS.ADDNEWDONATIONS,
        data,
        config
      );
      console.log(response);
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        //   toast.error(err?.message);
        console.log("Hello");
      }
    }
  },



  // updateDonation: async (formData) => {

  //   console.log(formData);
  //   try {
  //     const response = await APIService.Instance.post(
  //       URLS.UPDATEDONATIONOFUSER, formData
  //     );
  //     console.log(response);
  //     return response?.data;
  //   } catch (err) {
  //     if (err?.response?.data) {
  //       return err?.response?.data;
  //     } else {
  //       //   toast.error(err?.message);
  //       console.log("Hello");
  //     }
  //   }
  // },


  // get user details by donor id
  getDetailsByDonorId: async (donorId) => {
    console.log(donorId);
    donorId = (await EncryptionService.encrypt(donorId)).toString();
    const response = await APIService.Instance.get(
      URLS.GETUSERDETAILSBYDONORID + donorId
    );
    console.log(response);
    return response?.data;
  },



  AddNewDonation: async (data, config) => {
    console.log(data);
    try {
      const response = await APIService.Instance.post(
        URLS.ADDNEWDONATIONS,
        data,
        config
      );
      console.log(response);
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        //   toast.error(err?.message);
        console.log("Hello");
      }
    }
  },

  getAllDonarId: async () => {
    try {
      const response = await APIService.Instance.get(
        URLS.GETDONARIDLIST
      );
      return response;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },
  getAllUserId: async () => {
    try {
      const response = await APIService.Instance.get(
        URLS.GETALLUSERIDLIST
      );
      return response;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },

  sendOtp: async (email) => {
    console.log(email);
    const response = await APIService.Instance.post(
      URLS.SENDOTP + `?email=${email}`,
    );
    return response?.data;
  },

  verifiyOtp: async (userId, otp) => {
    console.log(userId);
    userId = (await EncryptionService.encrypt(userId)).toString();
    otp = (await EncryptionService.encrypt(otp)).toString();
    const response = await APIService.Instance.post(
      URLS.VERIFYOTPONLINE + `?donarIdOrEmail=${userId}&otp=${otp}`,
    );
    return response?.data;
  },
  getAllReceiptByUser: async (UserId) => {
    try {
      const response = await APIService.Instance.get(
        URLS.GETALLRECEIPTSBYUSER + `?emailId=${UserId}`
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },
  downloadReceipt: async (receiptId) => {
    try {
      const response = await APIService.Instance.get(
        URLS.DOWNLOADRECEIPT + receiptId,
        { responseType: "blob" }
      );
      return response;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },
  getAllActiveAccount: async () => {
    try {
      const response = await APIService.Instance.get(
        URLS.GET_ALL_ACTIVE_BANK_ACCOUNT
      );
      return response;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },

  getAllActiveBanks: async () => {
    try {
      const response = await APIService.Instance.get(
        URLS.GET_ALL_ACTIVE_BANKS
      );
      return response.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },

}