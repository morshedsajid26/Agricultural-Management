import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import Cookies from "js-cookie";
import { BASE_URL } from "../config/api";


const AxiosSecure = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true
})

const useAxiosSecure = () => {

    const navigate = useNavigate()
    const {logOutUser} = useAuth()

    AxiosSecure.interceptors.request.use(function (config) {
        const token = Cookies.get('token')
        if (token) {
            config.headers.authorization = `Bearer ${token}`
        }
        return config;

    }, function (error) {
        return Promise.reject(error)
    })

    AxiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {

        const status = error.response?.status;
        if(status === 401 || status === 403){
            await logOutUser();
            navigate('/login') // Make sure this route exists
        }
        
        return Promise.reject(error);
    });
    return AxiosSecure;
};

export default useAxiosSecure;