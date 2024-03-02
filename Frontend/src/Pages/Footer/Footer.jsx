import { Link } from "react-router-dom"
import { BiLogoFacebook } from 'react-icons/bi';
import { BsTwitter } from 'react-icons/bs';
import { DiGithubBadge } from 'react-icons/di';

function Footer() {
    return (
        <footer className="footer p-10 items-center bg-base-200 text-base-content">
            <Link to={"/"}>
                <div className='flex flex-col items-center gap-y-2'>
                    <img src="https://i.ibb.co/Ld6BLNW/logo-eshop-removebg-preview.png" height={"50"} width={"50"} alt="logo" />
                    <h1 className='text-2xl text-bold font-medium text-transparent bg-clip-text bg-gradient-to-r from-black to-orange-600  text-center uppercase'>ShopifyMart</h1>
                </div>
            </Link>
            <nav>
                <header className="footer-title">Services</header>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <header className="footer-title">Company</header>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <header className="footer-title">Legal</header>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>


                <div className="flex flex-row justify-center gap-x-2 mt-2">
                    <a href="https://www.facebook.com/93/" className="inline-flex items-center justify-center h-8 w-8 border border-gray-600 rounded-full mr-1 hover:text-orange-400 hover:border-orange-400">
                        <BiLogoFacebook className="text-xl"></BiLogoFacebook>
                    </a>
                    <a href="#" className="inline-flex items-center justify-center h-8 w-8 border border-gray-600 rounded-full mr-1 hover:text-orange-400 hover:border-orange-400">
                        <BsTwitter className="text-xl"></BsTwitter>
                    </a>
                    <a href="https://git" className="inline-flex items-center justify-center h-8 w-8 border border-gray-600 rounded-full mr-1 hover:text-orange-400 hover:border-orange-400">
                        <DiGithubBadge className="text-xl"></DiGithubBadge>
                    </a>
                </div>



            </nav>
        </footer>
    )
}

export default Footer