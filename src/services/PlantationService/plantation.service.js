import { URLS } from "../../components/constants/urls";
import { APIService } from "../api/api-service";


export const PlantationService = {
  years: async () => {
    try {
      const response = await APIService.Instance.get(
        URLS.PLANTATION_YEARS
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } 
    }
  },
  seasons: async () => {
    try {
      const response = await APIService.Instance.get(
        URLS.PLANTATION_SEASONS
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } 
    }
  },
  districts: async (year) => {
    try {
      const response = await APIService.Instance.get(
        URLS.PLANTATION_DISTRICTS+"?year="+year
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } 
    }
  },
  cities: async (year) => {
    try {
      const response = await APIService.Instance.get(
        URLS.PLANTATION_CITIES+"?year="+year
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } 
    }
  },
  upload: async (file) => {
    console.log(file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      const response = await APIService.Instance.post(
        URLS.PLANTATION_UPLOAD, file, config
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } 
    }
  },
  getPlantationList: async (data) => {
    try {
      
      const response = await APIService.Instance.post(
        URLS.PLANTATION_FINDALLBYFILTER, data
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } 
    }
  },
  exportExcel: async (data) => {
    try {
      const response = await APIService.Instance.post(
        URLS.PLANTATION_EXPORTREPORT, data, {
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