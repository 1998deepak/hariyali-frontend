
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { APIService } from "../api/api-service";
import { EncryptionService } from "../encryption.service";



export const UserService = {
    userDetails:()=> {
        const token = APIService.Instance.getToken();
        console.log(token);
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
      }
    
    };

