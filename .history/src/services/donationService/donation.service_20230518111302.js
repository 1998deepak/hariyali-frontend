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
    };

   