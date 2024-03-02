import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CardContext } from "../../../Component/HandleContext/HandleContext";
import { SlRefresh } from "react-icons/sl";
import { AiOutlineDelete } from "react-icons/ai";

const SingleCart = ({ cart }) => {
    const { deleteCart, updateCartProduct } = useContext(CardContext);
    const [quantity, setQuantity] = useState(cart.quantity);

    const increaseQuantity = () => {
        if (quantity > 0 && quantity < 10) {
            setQuantity(quantity + 1);
        }
    }
    const decreaseQuantity = () => {
        if(quantity>1)
        setQuantity(quantity - 1);
    }

    const updateQuantity = () => {
        let { id, email } = cart;

        var form = new FormData();
        form.append("id", id);
        form.append("email", email);
        form.append("quantity", quantity)
        updateCartProduct(form)
    }

    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start items-center">
            <Link to={`/product/${cart.category}/${cart.id}`}>
                <img src={cart?.image} alt="product-image" className="w-60 rounded-lg sm:w-40 mx-auto" />
            </Link>
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0 flex flex-col items-center" >
                    <Link to={`/product/${cart.category}/${cart.id}`} className="text-base lg:text-lg font-bold text-gray-900 block align-middle hover:text-orange-400 duration-200">{cart.product_model}</Link>

                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center border-gray-100">
                            <span onClick={decreaseQuantity} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-orange-400 hover:text-blue-50"> - </span>
                            

                            <span className=" bg-white py-1 px-3 duration-100 border border-orange-500 text-sm">{quantity}</span>

                            <span onClick={increaseQuantity} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-orange-400 hover:text-blue-50"> + </span>
                        </div>
                        <span onClick={updateQuantity} className="cursor-pointer rounded p-2 duration-100 bg-orange-400 text-blue-50 tooltip" data-tip="update"> <SlRefresh></SlRefresh> </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="font-medium text-base">{cart.price} $</p>
                        <button onClick={() => deleteCart(cart.id)} className="bg-orange-500 p-1 text-white rounded tooltip" data-tip="delete">
                            <AiOutlineDelete className="text-lg"></AiOutlineDelete>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCart;