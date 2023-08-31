import { URLS } from "../../components/constants/urls";
import { APIService } from "../api/api-service";
import { toast } from "react-toastify";



export const WebDonorCreationService = {

  getAllUserWithWebID: async () => {
        try {
           const response = await APIService.Instance.get(
            URLS.GETALLUSERWITHWEBID
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
    
      approveDonation: async (data) => {
        console.log(data);
        try{
          const response = await APIService.Instance.post(
            URLS.APPROVEDONATION,data
          ).catch(error =>{
            console.log(error);
            throw error;
          });
          return response?.data;
        } catch(err){
          console.log(err);
          if (err?.response?.data) {
            return err?.response?.data;
          }else{
          toast.error(err?.message);
           }
        }
      },

    };

   