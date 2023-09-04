import { TOKEN ,USER_DETAILS } from "../../components/constants/constants";
import { Axios } from "./axios-class";
import { toast } from "react-toastify";
export class APIService extends Axios {
  static _instance = null;

   constructor(conf) {
    super(conf);
    this._axiosInstance.interceptors.request.use(
      (config) =>
      {
        if (config && config.headers && localStorage.getItem("token"))
        {
          config.headers.Authorization = `Bearer ${localStorage.getItem("token") || ""
        }`;
      }
        return config;
      },
      (error) => {
        // handling error
      },
    );

    this._axiosInstance.interceptors.response.use(
      res => res,
      err => {
        if (err.message == "Network Error") {
          toast.error(err.message);
        }else
        if (err.response.status === 403 || err.response.status === 401) {
          // toast.error("Session Expired");
          // localStorage.removeItem(TOKEN);
          // localStorage.removeItem(USER_DETAILS);
          // localStorage.clear();
          // window.location.href = "/";
        }
        // else if(err.response.data.message){
        //   toast.error(err.response.data.message)
        // }
      }
    )
   }

  static get Instance() {
    if (this._instance) {
      return this._instance;
    }

    const config = {
      baseURL: process.env.REACT_APP_API_BASEPATH,
    };
    
    this._instance = new this(config);
    return this._instance;
  }

  static checkNested(objTemp, argTemp) {
    let obj = JSON.parse(objTemp);
    // eslint-disable-next-line prefer-rest-params
    const args = Array.prototype.slice.call(arguments, 1);
    for (let i = 0; i < args.length; i++) {
      if (!obj || !obj.hasOwnProperty(args[i])) {
        return "";
      }
      obj = obj[args[i]];
    }
    return obj;
  }

  getToken = () => {
    return localStorage.getItem(TOKEN);
  };

  removeToken = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_DETAILS);
  };

  getUserName = () => {
    const userInfo = localStorage.getItem(USER_DETAILS);
    const info = APIService.checkNested(userInfo, "name");
    if (info !== null && info !== undefined && !info.includes("undefined")) {
      return info;
    }
    return APIService.checkNested(userInfo, "username");
  };

  get = (url, config = {}) => {
    return this._axiosInstance.get(url, config);
  };

  post = (url, data = {},config = {}) => {
    return this._axiosInstance.post(url, data, config);
  };

  put = (url = {}, data = {}, config = {}) => {
    return this._axiosInstance.put(url, data, config);
  };

  delete = (url = {}, data = {}, config = {}) => {
    return this._axiosInstance.delete(url, config);
  };
}
