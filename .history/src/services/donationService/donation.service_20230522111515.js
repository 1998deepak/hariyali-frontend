import { URLS } from "../../components/constants/urls";
import { APIService } from "../api/api-service";
import { toast } from "react-toastify";



<<<<<<< HEAD
export const DonationService = {
=======
export const UserService = {
>>>>>>> f2fda960543b55888fa42072bf4e21b00466b0a7
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
<<<<<<< HEAD

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
    
=======
>>>>>>> f2fda960543b55888fa42072bf4e21b00466b0a7
    };

   