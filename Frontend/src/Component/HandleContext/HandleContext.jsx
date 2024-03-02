import PropTypes from 'prop-types'
import { useContext, useState } from 'react';
import { createContext } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { authContext } from '../Authonicate/Authonicate';
import AxiosPublic from '../../Hooks/AxiosPublic/AxiosPublic';

export const CardContext = createContext(null);
function HandleContext({ children }) {
    const { userInfo } = useContext(authContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [favouriteProduct, setFavouriteProduct] = useState([]);
    const axiosPublic = AxiosPublic();

    const getCartProduct = (email) => {
        axiosPublic.get(`/getCart/${email}`)
            .then(res => setCartProducts(res.data.carts))
    }

    //get favourite product
    const getFavourite = ()=>{
        axiosPublic.get(`/getFavourite/${userInfo.email}`)
        .then(({data})=>{
            setFavouriteProduct(data.datas)
        })
    }

    //add to cart product
    const addProductCart = (getProduct) => {
        let { id, product_model, price, discount, stock, email, image } = getProduct;
        var form = new FormData();
        form.append("productModel", product_model);
        form.append("stock", stock);
        form.append("price", price);
        form.append("discount", discount);
        form.append("id", id);
        form.append("email", email);
        form.append("image", image);

        const findData = cartProducts.find((cartprod) => cartprod.id == id)
        if (!findData) {
            form.append("quantity", 1)
            postCart(form)
                .then((data) => {
                    if (data.data.status) {
                        getCartProduct(userInfo.email)
                        Swal.fire({
                            text: `${data.data.message}`,
                            icon: "success",
                            confirmButtonText: 'close'
                        })
                    }
                    else {
                        Swal.fire({
                            text: `${data.data.message}`,
                            icon: "error",
                            confirmButtonText: 'close'
                        })
                    }
                })
                .catch(() => {
                    Swal.fire({
                        text: 'Something wents wrong, try again',
                        icon: "error",
                        confirmButtonText: 'close'
                    })
                })
        }
        else {
            form.append("quantity", findData.quantity + 1)
            postCart(form)
                .then((data) => {
                    if (data.data.status) {
                        getCartProduct(userInfo.email)
                        Swal.fire({
                            text: `${data.data.message}`,
                            icon: "success",
                            confirmButtonText: 'close'
                        })
                    }
                    else {
                        Swal.fire({
                            text: `${data.data.message}`,
                            icon: "error",
                            confirmButtonText: 'close'
                        })
                    }
                })
                .catch(() => {
                    Swal.fire({
                        text: 'Something wents wrong, try again',
                        icon: "error",
                        confirmButtonText: 'close'
                    })
                })
        }
    }

    //post database cart product
    const postCart = (cartData) => {
        return axiosPublic.put("/addCart", cartData)
    }

    //update cart product
    const updateCartProduct = (updatedFormData)=>{
        postCart(updatedFormData)
        .then((data) => {
            if (data.data.status) {
                getCartProduct(userInfo.email)
                Swal.fire({
                    text: `update successfully`,
                    icon: "success",
                    confirmButtonText: 'close'
                })
            }
            else {
                Swal.fire({
                    text: `${data.data.message}`,
                    icon: "error",
                    confirmButtonText: 'close'
                })
            }
        })
        .catch(() => {
            Swal.fire({
                text: 'Something wents wrong, try again',
                icon: "error",
                confirmButtonText: 'close'
            })
        })

    }

    //add my favourite product
    const addFavourite = (productData)=>{
        return axiosPublic.put("/addFavourite", productData)
    }

    //delete favourite 
    const deleteFavourite = (id)=>{
        axiosPublic.delete(`/deleteFavourite/${id}`)
        const filterData = favouriteProduct.filter(cart => {
            return cart.id !== id
        })
        setFavouriteProduct(filterData)
    }

    //delete cart product
    const deleteCart = (id) => {
        axiosPublic.delete(`/deleteCart/${id}`)
        const filterData = cartProducts.filter(cart => {
            return cart.id !== id
        })
        setCartProducts(filterData)
    }

    const dataList = {
        addProductCart,
        cartProducts,
        updateCartProduct,
        setCartProducts,
        getCartProduct,
        deleteCart,
        addFavourite,
        getFavourite,
        favouriteProduct,
        deleteFavourite,
    }
    return (
        <CardContext.Provider value={dataList}>
            {children}
        </CardContext.Provider>
    )
}

HandleContext.propTypes = {
    children: PropTypes.object
}
export default HandleContext


