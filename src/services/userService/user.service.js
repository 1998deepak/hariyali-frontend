
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { APIService } from "../api/api-service";
import { URLS } from "../../components/constants/urls";



export const UserService = {
    userDetails:()=> {
        const token = APIService.Instance.getToken();
        if (token) {
        const decoded = jwt_decode(token);
        console.log(decoded);
        const email = decoded.sub;
        const role = decoded.roleName;
        const expiryTime = decoded.exp;
        return {email,role,expiryTime};
        }
      },

      getUserDetailsFromToken:(token)=> {
        if (token) {
        const decoded = jwt_decode(token);
        console.log(decoded);
        const email = decoded.sub;
        const role = decoded.roleName;
        const roleId = decoded.roleId;
        const expiryTime = decoded.exp;
        return {email,role,roleId,expiryTime};
        }
      },
      resendOtp: async (userId) => {
        console.log(userId);
        // userId = (await EncryptionService.encrypt(userId)).toString();
        // otp = (await EncryptionService.encrypt(otp)).toString(); 
        const response = await APIService.Instance.post(
          URLS.RESEND_OTP + `?donarIdOrEmail=${userId}`,
        );
        return response?.data;
      },
    
    };

