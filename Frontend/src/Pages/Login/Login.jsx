import { useContext, useState } from "react";
import { authContext } from "../../Component/Authonicate/Authonicate";
import Swal from 'sweetalert2'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MailOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import AxiosPublic from '../../Hooks/AxiosPublic/AxiosPublic'
import axios from "axios";

function Login() {
    const { userLogin, googleLogin } = useContext(authContext)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { state } = useLocation();
    const navig = useNavigate();
    const axiosPublic = AxiosPublic();

    // email & password login
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        userLogin(email, password)
            .then(({user}) => {
                form.reset();
                const userInfo = { email: user.email }
                axios.put("http://localhost:4000/api/crtJwt", userInfo, { withCredentials: true })

                state ? navig(`${state}`) : navig(`/`)
            })
            .catch(() => {
                Swal.fire({
                    title: 'error',
                    text: 'Enter valid Email or Password',
                    icon: 'error',
                    confirmButtonText: 'Go Back'
                })
            })
    }

    // google login
    const handleGoogleSign = () => {
        googleLogin()
            .then(({ user }) => {
                const userData = { name: user.displayName, email: user.email, phone: user.phone, password: null }
                axiosPublic.put(`/updateUser?email=${user.email}`, userData)
                .then(()=>{
                    const userInfo = { email: user.email }
                    axios.put("http://localhost:4000/api/crtJwt", userInfo, { withCredentials: true })
                    state ? navig(`${state}`) : navig(`/`)
                })
            })
            .catch((err) => {
                Swal.fire({
                    title: 'error',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'Go Back'
                })
            })
    }

    return (
        <>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                SignIn your account
                            </h1>
                            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <Space direction="horizontal" className="w-full mx-auto">
                                    <Input size="large" type="email" name="email" id="email" placeholder="name@gmail.com" required prefix={<MailOutlined />} /> 
                                    </Space>
                                </div>
                                <div>                                
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <Space direction="horizontal" className="w-full mx-auto">
                                        <Input.Password size="large" name="password" id="password" required
                                            placeholder="password..."
                                            visibilityToggle={{
                                                visible: passwordVisible,
                                                onVisibleChange: setPasswordVisible,
                                            }}
                                        />
                                    </Space>

                                    <p className="mt-3 text-right text-gray-500"><Link to={"/forgetPass"}>Forget password!</Link></p>
                                </div>


                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Sign In</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Dont have an account? <Link to="/register" className="font-medium text-gray-800 hover:underline">Register now</Link>
                                </p>

                                <div className="group w-full flex justify-center items-center mt-5 h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 cursor-pointer" onClick={handleGoogleSign}>
                                    <div className="relative flex justify-between items-center space-x-7">
                                        <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="absolute left-0 w-4" alt="google logo" />
                                        <span className="text-base font-bold text-gray-700 transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login