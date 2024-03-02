import { useContext } from "react";
import { CardContext } from "../../Component/HandleContext/HandleContext";
import { Empty } from "antd";
import SingleFavourite from "./SingleFavourite/SingleFavourite";


const FavouriteProducts = () => {
    const {favouriteProduct} = useContext(CardContext);

    return (
        <div>
            <div className="bg-gray-100 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Favourite Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {
                            favouriteProduct.length > 0 ? favouriteProduct.map((cart) => {
                                return (
                                    <SingleFavourite key={cart.id} cart={cart}></SingleFavourite>
                                )
                            }) : <Empty />
                        }

                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default FavouriteProducts;