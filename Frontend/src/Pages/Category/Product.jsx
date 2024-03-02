import { useNavigate, useParams } from "react-router-dom"
import { BsArrowRightShort } from 'react-icons/bs';
import '@smastrom/react-rating/style.css'
import { useContext, useEffect, useState } from "react";
import { Pagination } from 'antd';
import SingleProduct from "./SingleProduct/SingleProduct";
import LoadingProducts from "../LoadingProducts/LoadingProducts";
import { FilterDataContext } from "../../Component/FilterContext/FilterContext";


function Product() {
    const {
        products,
        loading,
        setLoading,
        productLength,
        limit,
        filter,
        setFilter,
        getFilteringData,
        getFilterwiseDataLength
    } = useContext(FilterDataContext);

    const navig = useNavigate();
    const [activePag, setActivePag] = useState(1)
    const { categoryName } = useParams();

    //change pagination active page
    const onChange = (pageNumber) => {
        setActivePag(pageNumber);
    };

    //get product length
    useEffect(() => {
        setLoading(true)
        getFilterwiseDataLength({ ...filter })
    }, [filter])

    //get initial category wise product
    useEffect(() => {
        setActivePag(1)
        setFilter({
            rating: 0,
            category: categoryName,
            priceRange: [0, 200000],
            stock: false,
            limit: 9,
            activePage: 1,
        });
        setLoading(true)
        getFilteringData({
            ...filter,
            rating: 0,
            category: categoryName,
            activePage: activePag,
        })
    }, [categoryName])

    //get page wise filter product
    useEffect(() => {
        setLoading(true)
        getFilteringData({
            ...filter,
            category: categoryName,
            activePage: activePag,
        })
    }, [activePag])

    return (
        <>
            {
                loading ? <LoadingProducts></LoadingProducts> :
                    <div>
                        {
                            !products?.length > 0 ? <div className="lg:min-h-[428px] min-h-[300px] flex flex-col justify-center items-center">
                                <img className="h-60 w-96" src="https://i.ibb.co/K6hbJRH/no-product-found.png"></img>
                                <button onClick={() => navig(-1)} className="btn btn-neutral btn-sm mt-3">Go back<BsArrowRightShort className="text-2xl"></BsArrowRightShort></button>
                            </div> : <div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:m-5 gap-x-3 gap-y-5 md:gap-5">
                                    {
                                        products && products.map((product) => {
                                            return <SingleProduct key={product.id} product={product}></SingleProduct>
                                        })
                                    }
                                </div>
                            </div>

                        }
                        {
                            products?.length > 0 && <div className="mx-auto flex justify-center py-10 ">
                                <Pagination showQuickJumper defaultCurrent={1} current={activePag} pageSize={limit} total={productLength} onChange={onChange} />
                                <br />
                            </div>
                        }
                    </div>
            }


        </>



    )
}

export default Product