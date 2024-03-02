import axios from "axios";

const AxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'http://localhost:4000/api',
        // withCredentials : true,
    })
    return (
        axiosPublic
    );
};

export default AxiosPublic;