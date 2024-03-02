import { useContext } from "react"
import { CardContext } from "../../Component/HandleContext/HandleContext"
import { Link } from "react-router-dom";
import { Empty } from 'antd';
import SingleCart from "./SingleCart/SingleCart";

function MyCart() {
    const { cartProducts } = useContext(CardContext);
    let totalPrice = 0;
    let allDiscount = 0;
    let shiping = 0;
    if(cartProducts){
        for(let i = 0; i < cartProducts.length; i++){
            shiping += 120
           allDiscount += (parseInt(cartProducts[i].price)*(parseInt(cartProducts[i].discount)/100))*cartProducts[i].quantity;

           totalPrice += (parseInt(cartProducts[i].price)*(parseInt(cartProducts[i].discount)/100) + parseInt(cartProducts[i].price))*cartProducts[i].quantity;
        }
    }

    return (
        <div>
            <div className="bg-gray-100 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {
                            cartProducts.length>0 ? cartProducts.map((cart) => {
                                return (
                                    <SingleCart key={cart.id} cart={cart}></SingleCart>
                                )
                            }) : <Empty  />
                        }
                        
                    </div>

                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Main Balance</p>
                            <p className="text-gray-700">${Math.ceil(totalPrice)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Discount</p>
                            <p className="text-gray-700">${allDiscount}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shiping</p>
                            <p className="text-gray-700">${shiping}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">${Math.ceil(totalPrice-allDiscount + shiping)}</p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                        </div>
                        {
                            cartProducts.length>0 ? <Link to="/checkout" className="mt-6 block text-center rounded-md bg-orange-400 py-2 px-5 font-medium text-blue-50 hover:bg-orange-500 duration-200">Check out</Link> : <Link to="/" className="mt-6 block text-center rounded-md bg-orange-400 py-2 px-5 font-medium text-blue-50 hover:bg-orange-500 duration-200">Continue</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCart