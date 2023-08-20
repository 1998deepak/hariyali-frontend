import { URLS } from "../../components/constants/urls";
import { APIService } from "../api/api-service";
import { toast } from "react-toastify";



export const DonationService = {
    Adduser: async (data,config) => {
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
          }else{
        //   toast.error(err?.message);
        console.log("Hello");
           }
        }
      },
      AddOnlineuser: async (data,config) => {
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
          }else{
        //   toast.error(err?.message);
        console.log("Hello");
           }
        }
      },
      AddOnlineuser: async (data,config) => {
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
          }else{
        //   toast.error(err?.message);
        console.log("Hello");
           }
        }
      },
 AddOnlineuser: async (data,config) => {
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
        }else{
      //   toast.error(err?.message);
      console.log("Hello");
         }
      }
    },
    
      getDetailsByEmailId: async (emailId) => {
        console.log(emailId);
        const response = await APIService.Instance.get(
          URLS.GETBYEMAILID+emailId
        );
        console.log(response);
        return response?.data;
        // try {
        //   const response = await APIService.Instance.get(
        //     URLS.GETBYEMAILID+emailId
           
        //   );
        //   console.log(response.data.message);
        //   console.log(JSON.stringify(response));
        //   // return response;
        // } catch (response) {
        //   console.log(response);
        //   // if (err?.response?.data) {
            
        //   //   return err?.response?.data;
            

        //   }
        //   // else{
        //   // toast.error(err?.message);
          
        //   //  }
        // // }
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
          }else{
          toast.error(err?.message);
           }
        }
      },
    
      getPaymentInformation: async (paymentId) => {
        try {
           const response = await APIService.Instance.get(
            URLS.GETPAYMENTINFO+paymentId
          );
          return response?.data;
        } catch (err) {
          if (err?.response?.data) {
            return err?.response?.data;
          }else{
          toast.error(err?.message);
           }
        }
      },

      getAllUserDonation : async () => {
      
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
          }else{
            toast.error(err?.message);
           }
        }
      },



      getAllDonationOfUser: async (emailId) => {
        console.log(emailId);
        const response = await APIService.Instance.get(
          URLS.GETALLDONATIONOFUSER+emailId
        );
        console.log(response.data);
        return response?.data;
        
      },

      getDonationById: async (donationId) => {
        console.log(donationId);
        const response = await APIService.Instance.get(
          URLS.GETDONATIONBYID+donationId
        );
        console.log(response);
        return response?.data;
        
      },

      getUserDetails: async (emailId) => {
        console.log(emailId);
        const response = await APIService.Instance.get(
          URLS.GETUSERDETAILS+emailId
        );
        console.log(response);
        return response?.data;
        
      },



      updateUser: async (emailId,formData) => {
        console.log(emailId);
        console.log(formData);
        try {
          const response = await APIService.Instance.put(
            URLS.UPDATEUSER+"?emailId="+emailId, formData
          );
          console.log(response);
          return response?.data;
        } catch (err) {
          if (err?.response?.data) {
            return err?.response?.data;
          }else{
        //   toast.error(err?.message);
        console.log("Hello");
           }
        }
      },




      updateDonation: async (formData) => {
      
        console.log(formData);
        try {
          const response = await APIService.Instance.post(
            URLS.UPDATEDONATIONOFUSER,formData
          );
          console.log(response);
          return response?.data;
        } catch (err) {
          if (err?.response?.data) {
            return err?.response?.data;
          }else{
        //   toast.error(err?.message);
        console.log("Hello");
           }
        }
      },






      // get user details by donor id
      getDetailsByDonorId: async (donorId) => {
        console.log(donorId);
        const response = await APIService.Instance.get(
          URLS.GETUSERDETAILSBYDONORID+donorId
        );
        console.log(response);
        return response?.data;
    },



    AddNewDonation: async (data,config) => {
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
        }else{
      //   toast.error(err?.message);
      console.log("Hello");
         }
      }
    },

  }