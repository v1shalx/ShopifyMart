import { useNavigate, useParams } from "react-router-dom"
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { BsCartCheck } from 'react-icons/bs';
import { useContext, useEffect, useState } from "react";
import { CardContext } from "../../Component/HandleContext/HandleContext";
import { authContext } from "../../Component/Authonicate/Authonicate";
import AxiosPublic from "../../Hooks/AxiosPublic/AxiosPublic";
import SwiperSlider from "./SwiperSlider";
import { Image } from "antd";

function ProductSingle() {
  const { addProductCart } = useContext(CardContext);
  const navig = useNavigate();
  const { userInfo } = useContext(authContext);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true)
  const [relatedPRoducts, setRelatedProducts] = useState([]);
  const axiosPublic = AxiosPublic();
  const myStyles = {
    itemShapes: Star,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#C5C3D8'
  }
  const { categoryName, id } = useParams();

  useEffect(() => {
    axiosPublic.get(`/product/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data)
        setLoading(false)
      })
  }, [categoryName, id])

  useEffect(() => {
    axiosPublic.post('/filter', { category: categoryName, activePage: 1, limit: 10 })
      .then(({ data }) => {
        setRelatedProducts(data.datas)
      })
  }, [])

  const handleAddCart = (product) => {
    if (userInfo) {
      addProductCart({ ...product, email: userInfo.email })
    }
    else {
      navig("/login")
    }
  }


  return (
    <div className="bg-gray-100 ">
      {
        loading ?

          <div className=" p-6 rounded-md shadow-md">
            <div className="animate-pulse">
              {/* Product Image Skeleton */}
              <div className="w-64 lg:h-64 md:h-52 h-48 rounded-lg bg-gray-300 mb-4"></div>
              {/* Product Title Skeleton */}
              <div className="w-2/3 h-8 rounded-lg bg-gray-300 mb-4"></div>
              {/* Product Description Skeleton */}
              <div className="w-full h-16 rounded-lg bg-gray-300 mb-4"></div>
            </div>
          </div>

          :

          <div className="max-w-7xl mx-auto px-4">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-0 md:gap-x-5 py-10">
              <div className="flex justify-center items-center lg:col-span-2">
                <div>
                  
                  <Image
                    width={350}
                    src={productDetails?.image}
                  />

                  <div className="w-32 md:w-40 mx-auto mt-5">
                    <Rating style={{ maxWidth: 500 }} readOnly value={productDetails?.rating} itemStyles={myStyles} />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 flex items-center">
                <div className="w-full">
                  <table className="table">
                    <caption className="text-xl md:text-2xl lg:text-3xl font-medium  my-5">{productDetails?.product_name}</caption>
                    <tbody>
                      <tr>
                        <td className="text-lg font-medium ">Product Model</td>
                        <td className="text-base font-medium ">{productDetails?.product_model}</td>
                      </tr>
                      <tr>
                        <td className="text-lg font-medium ">Brand</td>
                        <td className="text-base font-medium ">{productDetails?.brand}</td>
                      </tr>
                      {/* row 1 */}
                      <tr>
                        <td className="text-lg font-medium ">Category</td>
                        <td className="text-base font-medium ">{productDetails?.category}</td>
                      </tr>
                      <tr>
                        <td className="text-lg font-medium ">Stock</td>
                        <td className="text-base font-medium ">{productDetails?.stock}</td>
                      </tr>
                      <tr>
                        <td className="text-lg font-medium ">Discount</td>
                        <td className="text-base font-medium ">{productDetails?.discount}%</td>
                      </tr>
                      {/* row 2 */}

                      <tr className="bg-gray-500 rounded-lg text-white">
                        <td className="text-lg font-medium">Price</td>
                        <td className="text-base font-medium">${productDetails?.price}</td>
                      </tr>
                    </tbody>

                  </table>
                  <button onClick={() => handleAddCart(productDetails)} className="hover:border-white/40 w-full mt-8 hover:bg-blue-700 flex items-center justify-center rounded-md border border-transparent bg-blue-600 p-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 duration-200 focus:ring-blue-300">
                    <BsCartCheck className="text-lg font-bold mr-1"></BsCartCheck> Add to cart</button>
                </div>

              </div>
            </div>
            <div className="py-3 min-h-16">
              <h3 className="text-lg font-medium underline underline-offset-4">Description : </h3>
              <p className="p-5 text-justify">{productDetails?.description}</p>
            </div>

            {/* //related product */}

            {
              relatedPRoducts.length > 0 &&
              <div className="pt-3 pb-5 min-h-16">
                <h3 className="text-lg font-medium underline underline-offset-4 mb-4">Related Product</h3>

                <SwiperSlider products={relatedPRoducts}></SwiperSlider>
              </div>
            }

          </div>
      }

    </div>
  )
}

export default ProductSingle