import { URLS } from "../../components/constants/urls";
import { APIService } from "../api/api-service";


export const Form10BService = {
    formBUpload : async (file) => {
    console.log(file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      const response = await APIService.Instance.post(
        URLS.FORM10B_UPLOAD, file, config
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } 
    }
  }
}