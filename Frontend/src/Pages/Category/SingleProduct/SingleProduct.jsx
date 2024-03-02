import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../../Component/Authonicate/Authonicate";
import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'
import { BsArrowRight } from 'react-icons/bs';
import { Rating, Star } from '@smastrom/react-rating'
import { CardContext } from "../../../Component/HandleContext/HandleContext";
import toast, { Toaster } from 'react-hot-toast';

const SingleProduct = ({ product }) => {
    const [favourite, setFavourite] = useState(false);
    const { addProductCart, addFavourite, getFavourite } = useContext(CardContext);
    const { userInfo } = useContext(authContext);
    const navig = useNavigate();

    const myStyles = {
        itemShapes: Star,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#C5C3D8'
    }

    const handleAddCart = (product) => {
        if (userInfo) {
            addProductCart({ ...product, email: userInfo.email })
        }
        else {
            navig("/login")
        }
    }

    const addFavouriteProduct = (productInfo) => {
        setFavourite(!favourite)
        if (!userInfo) {
            navig("/login")
        }
        else {
            addFavourite({ ...productInfo, email: userInfo.email })
                .then(({ data }) => {
                    getFavourite()
                    if (data.status) {
                        toast.success(data.message)
                    }
                    else {
                        toast.error(data.message)
                    }
                })
                .catch(() => {
                    toast.error('Something wents wrong, try again')
                })
        }

    }

    return (
        <div className="flex justify-center">
            <div className="group relative border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border shadow-md bg-white">
                <Link to={`/product/${product?.category}/${product.id}`} className="relative mx-8 mt-3 flex justify-center h-32 md:h-48 lg:h-48 overflow-hidden rounded-xl">
                    <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={product?.image} alt="product image" />
                    <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={product?.image} alt="product image" />

                </Link>
                <div className="mt-1 px-5 pb-5">
                    <Link to={`/product/${product?.category}/${product.id}`}>
                        <h5 className="text-base md:text-lg font-medium font-sans tracking-tight truncate">{product.product_model}</h5>
                    </Link>
                    <div className="mb-3 flex items-center justify-between">
                        <p>
                            <span className="text-lg md:text-xl font-bold text-slate-900">${product.price}</span>
                            {
                                (parseInt(product.discount) > 0) && <span className="text-xs md:text-sm text-slate-900 line-through font-medium">${parseInt(product.price) + (parseInt(product.price) * parseInt(product.discount) / 100)}</span>
                            }
                        </p>
                        <div className="flex items-center w-14 md:w-20">
                            <Rating style={{ maxWidth: 500 }} readOnly value={product?.rating} itemStyles={myStyles} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={() => handleAddCart(product)} className="hover:border-white/40 w-full hover:bg-orange-500 flex items-center justify-center rounded-md border border-transparent bg-orange-400 px-5 py-1.5 md:py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 duration-200 focus:ring-orange-300">
                            Add to cart
                            <BsArrowRight className="ml-1"></BsArrowRight>
                        </button>
                    </div>
                </div>
                <div className="absolute top-0 right-0 duration-500 flex justify-between items-center transition-all p-3">
                    {
                        !favourite && <MdFavoriteBorder onClick={() => addFavouriteProduct(product)} className="text-2xl text-orange-400 cursor-pointer"></MdFavoriteBorder>
                    }
                    {
                        favourite && <MdOutlineFavorite className="text-2xl text-orange-400 cursor-pointer"></MdOutlineFavorite>
                    }
                </div>
                <Toaster></Toaster>
            </div>
        </div>
    );
};

export default SingleProduct;