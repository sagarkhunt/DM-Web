import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export const axiosApi = axios.create({
  baseURL: process.env.DESIGNER_MARKETPLACE_API_URL,
});
if (typeof window !== "undefined") {
  axiosApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("access")}`;
  axiosApi.defaults.headers["Access-Control-Allow-Origin"] = "*";
  axiosApi.defaults.headers["ngrok-skip-browser-warning"] = "any";
}

axiosApi.interceptors.request.use(
  (config) => {
    // trigger 'loading=true' event here
    return config;
  },
  (error) => {
    // trigger 'loading=false' event here
    return Promise.reject(error);
  }
);
axiosApi.interceptors.response.use(
  (response) => {
    if (response?.data?.message) {
      toast.success(response?.data?.message);
    }
    return response;
  },
  (error) => {
    // if (axiosApi.isCancel()) {
    //   return false;
    // }
    const _status = error.response.status;
    switch (_status) {
      case 401:
        toast.error("You are not authorized !");
        // 1. redirect to login
        Cookies.remove("token");
        typeof window !== "undefined" && localStorage.clear();
        window.location.href = "/auth/login";
        // localStorage.getItem("access");
        break;
      case 500:
        toast.error("Internal server Error !");
        break;
      default:
        toast.error(error.response?.data?.message);
    }
    return Promise.reject(error);
  }
);

/** set get response */
export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

/** set post response */
export async function post(url, data, config = {}) {
  return await axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}
/** form data post method */
export async function postFormData(url, data, config = {}) {
  return await axiosApi
    .post(url, data, { ...config })
    .then((response) => response.data);
}
/** form data put api method */
export async function putFormData(url, data, config = {}) {
  return await axiosApi
    .put(url, data, { ...config })
    .then((response) => response.data);
}

export async function putApi(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
