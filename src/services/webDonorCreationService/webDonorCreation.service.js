import { URLS } from "../../components/constants/urls";
import { APIService } from "../api/api-service";
import { toast } from "react-toastify";



export const WebDonorCreationService = {

  getAllUserWithWebID: async (pageRequest) => {
    try {
      const response = await APIService.Instance.post(
        URLS.GETALLUSERWITHWEBID, pageRequest
      );
      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
      return err?.response;
    }
  },

  approveDonation: async (data) => {
    console.log(data);
    try {
      const response = await APIService.Instance.post(
        URLS.APPROVEDONATION, data
      ).catch(error => {
        console.log(error);
        throw error;
      });
      return response?.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },

  getUserDonations: async (data) => {
    console.log(data);
    try {
      const response = await APIService.Instance.post(
        URLS.GET_USER_DONATIONS, data
      ).catch(error => {
        console.log(error);
        throw error;
      });
      return response?.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },

  approveUserDonation: async (data) => {
    console.log(data);
    try {
      const response = await APIService.Instance.post(
        URLS.APPROVE_USER_DONATION, data
      ).catch(error => {
        console.log(error);
        throw error;
      });
      return response?.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },

  getUserDocuments: async (data) => {
    console.log(data);
    try {
      const response = await APIService.Instance.post(
        URLS.GET_USER_DOCUMENTS, data
      ).catch(error => {
        console.log(error);
        throw error;
      });
      return response?.data;
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
        toast.error(err?.message);
      }
    }
  },

  downloadDocument: async (data) => {
    try {
      const response = await APIService.Instance.post(
        URLS.DoWNLOAD_USER_DOCUMENT, data, {
        responseType: 'blob', // Ensure the responseType is set to 'blob'
      }
      );
      return response;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
      }
    }
  },

  downloadDonationReport: async (data) => {
    try {
      const response = await APIService.Instance.post(
        URLS.DoWNLOAD_DONATION_REPORT, data, {
        responseType: 'blob', // Ensure the responseType is set to 'blob'
      }
      );
      return response;
    } catch (err) {
      if (err?.response?.data) {
        return err?.response?.data;
      } else {
      }
    }
  },

};

