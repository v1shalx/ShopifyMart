import { MdWifiCalling2, MdEmail, MdOutlineLocationOn, MdShoppingCartCheckout } from 'react-icons/md';
import { FcBusinessman } from 'react-icons/fc';
import { RiMenu3Line, RiArrowDropDownLine } from 'react-icons/ri';
import { BiLogInCircle, BiLogIn } from 'react-icons/bi';
import { Link, NavLink } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useContext, useState } from 'react';
import { CardContext } from '../../Component/HandleContext/HandleContext';
import { authContext } from '../../Component/Authonicate/Authonicate';
import { useEffect } from 'react';
import { HiOutlineBars3 } from 'react-icons/hi2';
import Sticky from 'react-stickynode';
import { MdFavoriteBorder } from "react-icons/md";
import { MdCompare } from "react-icons/md";

function Navbar() {
    let { cartProducts, getCartProduct, deleteCart, getFavourite, favouriteProduct } = useContext(CardContext);
    const { userInfo } = useContext(authContext)
    const [slide, setSlide] = useState(false)

    useEffect(() => {
        if (userInfo) {
            getCartProduct(userInfo.email);
            getFavourite();
        }
    }, [userInfo])

    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <div className='container mx-auto px-4 md:px-0 py-5'>
                    <div className='flex flex-col gap-y-4 lg:flex-row justify-between items-center'>
                        <div className='flex gap-x-2items-center'>
                            <div className='flex gap-x-1 items-center border-r border-r-gray-400 px-2 md:px-3 font-medium'>
                                <MdWifiCalling2 className='text-orange-400 text-xs md:text-sm'></MdWifiCalling2>
                                <p className='text-sm'>+91 8554565565</p>
                            </div>
                            <div className='flex items-center gap-x-2 px-2 md:px-3 text-sm'>
                                <MdEmail className='text-orange-400 text-xs md:text-sm'></MdEmail>
                                <p>.com</p>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <div className='border-r border-r-gray-400 pr-2 text-sm'>
                                <Link to="/" className='flex items-center gap-x-1 hover:text-orange-400 duration-300'>
                                    <MdOutlineLocationOn className='text-orange-400 text-sm md:text-lg'></MdOutlineLocationOn>
                                    <p className='text-sm md:text-base font-serif'>location</p>
                                </Link>
                            </div>
                            <div className='flex items-center border-r-gray-400 text-sm'>
                                <div className='border-r border-r-gray-400 px-1 md:px-2 text-sm'>
                                    <Link to="/profile" className='flex gap-x-1 items-center hover:text-orange-400 duration-300'>
                                        <FcBusinessman className='text-orange-400 text-sm md:text-lg'></FcBusinessman>
                                        <p className='text-sm md:text-base font-serif'>My account</p>
                                    </Link>
                                </div>
                            </div>
                            <div className='flex items-center border-r border-r-gray-400  text-sm'>
                                <div className='border-r-gray-400 px-1 md:px-2 text-sm'>
                                    <Link to="/login" className='flex gap-x-1 items-center hover:text-orange-400 duration-300'>
                                        <BiLogInCircle className='text-orange-400 text-sm md:text-lg'></BiLogInCircle>
                                        <p className='text-sm md:text-base font-serif'>Login</p>
                                    </Link>
                                </div>
                            </div>
                            <div className='flex items-center border-r border-r-gray-400 text-sm'>
                                <div className='px-1 md:px-2 text-sm'>
                                    <Link to="/register" className='flex gap-x-1 items-center hover:text-orange-400 duration-300'>
                                        <BiLogIn className='text-orange-400 text-sm md:text-lg'></BiLogIn>
                                        <p className='text-sm md:text-base font-serif'>Register</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className='max-w-7xl mx-auto'>
                <div className='container mx-auto px-4 md:px-0 py-0 md:py-8'>
                    <div className='hidden md:grid grid-cols-3 items-center'>
                        <Link to={"/"}>
                            <div className='flex flex-row items-center'>
                                <img src="https://i.ibb.co/Ld6BLNW/logo-eshop-removebg-preview.png" height={"50"} width={"50"} alt="logo" />
                                <h1 className='text-2xl text-bold font-medium text-transparent bg-clip-text bg-gradient-to-r from-black to-orange-600  text-center uppercase'>ShopifyMart</h1>
                            </div>
                        </Link>
                        <div>
                            <div className="relative max-w-sm mx-auto">
                                <input className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600" type="search" placeholder="Search" />
                                <button className="absolute duration-300 group inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-900 focus:border-orange-600 ">
                                    <svg className="h-5 w-5 text-orange-600 group-hover:text-white duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className='flex justify-end items-center'>

                            <div className="indicator ">
                                {
                                    favouriteProduct.length > 0 && <span className="indicator-item indicator-start badge badge-neutral">{favouriteProduct.length}</span>
                                }
                                

                                <div className='relative group flex items-center justify-center mr-3'>
                                    <Link to="/favourite" className='mr-2'><MdFavoriteBorder className='text-4xl text-orange-600 p-2 border-orange-600 hover:bg-orange-600 hover:text-white duration-200 rounded-full border'></MdFavoriteBorder></Link>
                                </div>
                            </div>

                            <div className='relative group flex items-center justify-center mr-3'>
                                <Link to="/" className='mr-2'><MdCompare className='text-4xl text-orange-600 hover:bg-orange-600 hover:text-white duration-200 p-2 border-orange-600 rounded-full border'></MdCompare></Link>
                            </div>

                            <div className='relative group flex items-center justify-center mr-3'>
                                <div className="indicator">
                                    {
                                        cartProducts.length > 0 && <span className="indicator-item indicator-start badge badge-neutral">{cartProducts.length}</span>
                                    }
                                    

                                    <Link to='/mycart' className='cursor-pointer'>
                                        <MdShoppingCartCheckout className='text-4xl text-orange-600 p-2 border-orange-600 hover:bg-orange-600 hover:text-white duration-200 rounded-full border'></MdShoppingCartCheckout>
                                    </Link>
                                </div>

                                <div className='absolute top-0 mt-14 group-hover:mt-9 right-0 transition duration-700 bg-white border z-[99] p-3 w-60 hidden group-hover:inline shadow-2xl'>
                                    <div className='flex justify-between pb-1 border-b-2'>
                                        <p>{cartProducts.length} items</p>
                                        {cartProducts.length > 0 ? <Link className='text-orange-400 hover:text-orange-500 duration-150 underline' to="/mycart">view cart</Link> : <p>No cart</p>}
                                    </div>
                                    {
                                        cartProducts && cartProducts.map((cart) => {
                                            return <div key={cart.id} className='grid grid-cols-2 justify-between items-center p-2 border-b-2'>
                                                <div>
                                                    <span className='flex gap-x-2'>
                                                        <Link to={`/product/${cart.category}/${cart.id}`} className='text-xs font-normal hover:text-orange-400 duration-200'>{cart.product_model}</Link>
                                                        <p className='text-xs text-orange-400'>x{cart?.quantity}</p>
                                                    </span>
                                                    <p className='text-xs font-bold'>{cart.price} $</p>
                                                    <RxCross2 onClick={() => deleteCart(cart.id)} className='border border-black mt-1 hover:bg-black hover:text-white duration-200 p-1 text-xl cursor-pointer'></RxCross2>
                                                </div>
                                                <img className='h-16' src={cart?.image} alt="image" />
                                            </div>
                                        })
                                    }
                                    {
                                        cartProducts.length > 0 && <Link to="/checkout" className={`hover:border-white/40 w-full hover:bg-orange-400 flex items-center justify-center rounded-md border border-transparent bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 duration-200 focus:ring-orange-600 mt-2`}>Checkout</Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Sticky top="#header" bottomBoundary="#content" innerZ={50}>
                <nav className="bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 md:px-0">
                        <div className="grid grid-cols-4 justify-between items-center">
                            <div className="col-span-1 bg-orange-400">
                                <NavLink to="/category/all" className='flex items-center justify-between gap-x-2 px-5 py-3 md:py-5 bg-orange-400 duration-300 text-white'>
                                    <h1 className='text-lg md:text-xl font-medium font-serif'>See All</h1>
                                    <RiMenu3Line className='text-xl hidden md:block'></RiMenu3Line>
                                </NavLink>
                            </div>
                            <div className="hidden md:inline md:col-span-3">
                                <ul className="flex gap-x-10 justify-center items-center font-serif">
                                    <li>
                                        <Link to="/" className="block py-5 pl-3 text-white pr-4 border-b-2 border-orange-400 border-opacity-0 hover:border-opacity-100 hover:text-orange-400 duration-200 cursor-pointer font-serif">Home</Link>
                                    </li>
                                    <li className='lg:hidden'>
                                        <span className='relative group'>
                                            <p className="flex items-center  py-5 pl-3 text-white pr-4  border-opacity-0 hover:border-opacity-100 hover:text-orange-400 duration-200 cursor-pointer">Categorys<RiArrowDropDownLine className="text-2xl group-hover:rotate-180 duration-300"></RiArrowDropDownLine></p>
                                            <div className='absolute hidden group-hover:grid grid-cols-2 gap-x-3 justify-between items-center w-72 top-0 bg-gray-100 rounded rounded-t-none border-t-4 border-t-orange-600 mt-[40px] shadow-2xl'>
                                                <NavLink to="/category/Smart phone" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm"
                                                }>Smart Phone</NavLink>
                                                <NavLink to="/category/Laptop" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm mt-2" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm mt-2"
                                                }>Laptop</NavLink>
                                                <NavLink to="/category/Desktop" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm " : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm"
                                                }>Desktop</NavLink>
                                                <NavLink to="/category/Watch" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm mt-2" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm mt-2"
                                                }>Watch</NavLink>
                                                <NavLink to="/category/T-Shirt" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm mt-2" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm mt-2"
                                                }>Shirt</NavLink>
                                                <NavLink to="/category/Bag" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm mt-2" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm mt-2"
                                                }>Bag</NavLink>
                                                <NavLink to="/category/Gift" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm mt-2" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm mt-2"
                                                }>Gift</NavLink>
                                                <NavLink to="/category/Cosmetics" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm mt-2" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm mt-2"
                                                }>Cosmetics</NavLink>
                                            </div>
                                        </span>
                                    </li>
                                    <li>
                                        <Link to="/mycart" className="block py-5 pl-3 text-white pr-4 border-b-2 border-orange-400 border-opacity-0 hover:border-opacity-100 hover:text-orange-400 duration-200 cursor-pointer">My Cart</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact" className="block py-5 pl-3 text-white pr-4 border-b-2 border-orange-400 border-opacity-0 hover:border-opacity-100 hover:text-orange-400 duration-200 cursor-pointer">Contact</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='md:hidden flex justify-end col-span-3'>
                                {
                                    !slide && <HiOutlineBars3 className='text-2xl text-white cursor-pointer' onClick={() => setSlide(true)}></HiOutlineBars3>
                                }
                                {
                                    slide && <RxCross2 className='text-2xl text-white cursor-pointer' onClick={() => setSlide(false)}></RxCross2>
                                }
                            </div>
                        </div>
                    </div>

                    {/* //mobile device */}
                    <div className={`absolute border-t border-gray-500 top-0 left-0 py-5 shadow-2xl bg-gray-800 mt-12 w-full ${slide ? "z-50 translate-x-0" : "-translate-x-full"} duration-300 font-serif`}>
                        <div className='px-4'>
                            <ul className="border border-white p-5 rounded-md font-serif">
                                <li>
                                    <Link onClick={() => setSlide(false)} to="/" className="block py-2 pl-3 text-white pr-4 border-b-2 border-orange-400 border-opacity-0 hover:border-opacity-100 hover:text-orange-400 duration-200 cursor-pointer">Home</Link>
                                </li>
                                <li>
                                    <span className='relative group'>
                                        <p className="flex items-center py-2 pl-3 text-white pr-4  border-opacity-0 hover:border-opacity-100 hover:text-orange-400 duration-200 cursor-pointer">Categorys<RiArrowDropDownLine className="text-2xl group-hover:rotate-180 duration-300"></RiArrowDropDownLine></p>
                                        <div className='absolute hidden group-hover:grid grid-cols-2 gap-x-3 justify-between items-center w-72 top-0 bg-gray-100 rounded rounded-t-none border-t-4 border-t-orange-600 mt-[40px]'>
                                            <NavLink onClick={() => setSlide(false)} to="/category/Smart phone" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm"
                                            }>Smart Phone</NavLink>
                                            <NavLink onClick={() => setSlide(false)} to="/category/Laptop" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm mt-2" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm mt-2"
                                            }>Laptop</NavLink>
                                            <NavLink onClick={() => setSlide(false)} to="/category/Desktop" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm " : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm"
                                            }>Desktop</NavLink>
                                            <NavLink onClick={() => setSlide(false)} to="/category/Watch" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm mt-2" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm mt-2"
                                            }>Watch</NavLink>
                                            <NavLink onClick={() => setSlide(false)} to="/category/T-Shirt" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm mt-2" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm mt-2"
                                            }>Shirt</NavLink>
                                            <NavLink onClick={() => setSlide(false)} to="/category/Bag" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm mt-2" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm mt-2"
                                            }>Bag</NavLink>
                                            <NavLink onClick={() => setSlide(false)} to="/category/Gift" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm mt-2" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm mt-2"
                                            }>Gift</NavLink>
                                            <NavLink onClick={() => setSlide(false)} to="/category/Cosmetics" className={({ isActive }) => isActive ? " duration-200 px-6 py-3 border-r-2 bg-white border-orange-600 text-sm mt-2" : "hover:border-orange-600 hover:border-r-2 duration-100 px-6 py-3 hover:bg-white text-sm mt-2"
                                            }>Cosmetics</NavLink>
                                        </div>
                                    </span>
                                </li>
                                <li>
                                    <Link onClick={() => setSlide(false)} to="/myCart" className="block py-2 pl-3 text-white pr-4 border-b-2 border-orange-400 border-opacity-0 hover:border-opacity-100 hover:text-orange-400 duration-200 cursor-pointer">My Cart</Link>
                                </li>
                                
                                <li>
                                    <Link onClick={() => setSlide(false)} to="/" className="block py-2 pl-3 text-white pr-4 border-b-2 border-orange-400 border-opacity-0 hover:border-opacity-100 hover:text-orange-400 duration-200 cursor-pointer">Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </nav>
            </Sticky>

        </div>
    )
}

export default Navbar