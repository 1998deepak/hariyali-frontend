import { URLS } from "../../components/constants/urls";
import { APIService } from "../api/api-service";

export const ContactUsService = {
    AddConatct: async (data) => {
        console.log(data);
        try {
          const response = await APIService.Instance.post(
            URLS.CONTACTUSFORM,
            data
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
      }
}
