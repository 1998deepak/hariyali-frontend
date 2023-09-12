import { URLS } from "../../components/constants/urls";
import { APIService } from "../api/api-service";
import { toast } from "react-toastify";


export const PlantationService =  {
    UploadExcel: async (formData) => {
      console.log(formData);
      try {
        const response = await APIService.Instance.post(
          URLS.UPLOADPLANTATIONEXCEL,formData
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
        ExportExcel: async (formData) => {
          console.log(formData);
          try {
            const response = await APIService.Instance.post(
              URLS.EXPORTEXCEL, formData ,{
                responseType: 'blob', // Ensure the responseType is set to 'blob'
              }
            );
            return response;
          } catch (err) {
            if (err?.response?.data) {
              return err?.response?.data;
            } else {
              //   toast.error(err?.message);
              console.log("Hello");
                 }
              }
            }
    };