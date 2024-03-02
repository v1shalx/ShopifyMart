import axios from "axios"
import { useContext, useEffect } from "react";
import { authContext } from "../../Component/Authonicate/Authonicate";


const secure = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
})

const AxiosSecure = () => {
    const { logOut } = useContext(authContext);

    useEffect(() => {
        secure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error.response.status) {
                logOut()
                    .then(() => {
                        axios.put("baseURL: 'http://localhost:4000/api/dltJwt", { withCredentials: true })
                    })
            }
        })
    }, [])
    return secure
};

export default AxiosSecure;