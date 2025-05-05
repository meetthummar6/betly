import axios from "axios";

const Api=axios.create({
    baseURL:process.env.VITE_API_URL,
    withCredentials:true,
});

Api.interceptors.response.use((res)=>res,
    (err)=> Promise.reject(err));

export default Api;