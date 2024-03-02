import { createContext, useState } from "react";
import AxiosPublic from "../../Hooks/AxiosPublic/AxiosPublic";

export const FilterDataContext = createContext(null);
const FilterContext = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [productLength, setProductLength] = useState(0);
    const [loading, setLoading] = useState(true);
    const limit = 9;
    const axiosPublic = AxiosPublic();
    const [filter, setFilter] = useState({
        rating: 0,
        stock : false,
        limit : 9,
        activePage : 1,
    });

    //get filtering data category wise
    const getFilteringData = (filterObj) => {
        axiosPublic.post('/filter', filterObj)
        .then(({data})=>{
            setProducts(data.datas)
            setLoading(false)
        })
    }

    //get data length
    const getFilterwiseDataLength = (filterObj) => {
        axiosPublic.post(`/getLength`, filterObj)
        .then(({data})=>{
            setProductLength(data.data)
        })
    }


    const datas = {
        products,
        getFilteringData,
        loading,
        setLoading,
        getFilterwiseDataLength,
        setProducts,
        productLength,
        limit,
        setFilter,
        filter
    };

    return (
        <FilterDataContext.Provider value={datas}>
            {children}
        </FilterDataContext.Provider>
    );
};

export default FilterContext;