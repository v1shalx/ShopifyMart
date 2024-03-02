import { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CardContext } from "../../../Component/HandleContext/HandleContext";
import { MdOutlineFavorite } from "react-icons/md";


const SingleFavourite = ({cart}) => {
    const {deleteFavourite} = useContext(CardContext);

    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start items-center">
            <Link to={`/product/${cart.category}/${cart.id}`}>
                <img src={cart.image} alt="product-image" className="w-32 rounded-lg sm:w-40 mx-auto" />
            </Link>
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0 flex flex-col items-center" >
                    <Link to={`/product/${cart.category}/${cart.id}`} className="text-base lg:text-lg font-bold text-gray-900 block align-middle hover:text-orange-400 duration-200">{cart.product_model}</Link>
                </div>
                <div className="mt-2 flex justify-center sm:space-y-3 sm:mt-0 sm:block sm:space-x-6">
                    <span className="flex justify-center items-center">
                        <MdOutlineFavorite className="text-2xl text-orange-400"></MdOutlineFavorite>
                    </span>
                    <div className="flex items-center space-x-4">
                        <p className="font-medium text-lg">{cart.price} $</p>
                        <button onClick={()=>deleteFavourite(cart.id)} className="bg-orange-500 p-1 text-white rounded tooltip" data-tip="delete">
                            <AiOutlineDelete className="text-lg"></AiOutlineDelete>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleFavourite;