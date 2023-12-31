
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { APIService } from "../api/api-service";



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
      }
    
    };

