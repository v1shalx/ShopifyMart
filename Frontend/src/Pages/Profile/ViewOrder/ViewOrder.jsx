import { useContext, useEffect } from "react"
import { authContext } from "../../../Component/Authonicate/Authonicate"
import { useState } from "react"
import { Button, Empty, Spin } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Link } from 'react-router-dom';
import AxiosSecure from "../../../Hooks/AxiosSecure/AxiosSecure";
import { TiTick } from "react-icons/ti";

function ViewOrder() {
    const { userInfo } = useContext(authContext);
    const [orderDatas, setOrderDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = AxiosSecure();

    // get my ordered product information
    useEffect(() => {
        axiosSecure.get(`/getOrder?email=${userInfo.email}`)
            .then(res => {
                // console.log(res.data.datas[0])
                setOrderDatas(res.data.datas)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    // delete ordered product
    const handledltProduct = (id) => {
        Swal.fire({
            text: "Are you sure want to delete this ordered products!",
            icon: `warning`,
            cancelButtonText: "No",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            showCloseButton: true,
        })
            .then(result => {
                setLoading(true)
                const filter = orderDatas.filter(data => {
                    return data.id !== id;
                })
                if (result.isConfirmed) {
                    axiosSecure.delete(`/deleteOrder/${id}`)
                        .then(() => {
                            setOrderDatas(filter)
                            setLoading(false)
                        })
                }
                if (result.isDismissed) {
                    setLoading(false)
                }
            })
    }


    return (
        <Spin spinning={loading} size="large">
            <div className="bg-gray-200 font-serif">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="min-h-[calc(100vh-479px)] flex items-center justify-center">
                        {
                            !orderDatas.length > 0 ? <Empty></Empty> :
                                <div className="py-8">
                                    <table className="table bg-white">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Location</th>
                                                <th>Phone</th>
                                                <th>Product Name</th>
                                                <th>Payment Method</th>
                                                <th>Order Date</th>
                                                <th>Status</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                orderDatas && orderDatas.map((details, index) => {
                                                    return (
                                                        <tr key={details.id}>
                                                            <th>{index + 1}</th>
                                                            <td>
                                                                <Link to={`/product/${details?.products[0]?.category}/${details?.products[0]?.id}`} className="flex items-center space-x-3">
                                                                    <div className="avatar">
                                                                        <div className=" w-12 h-12">
                                                                            <img src={details?.products[0]?.image} alt="Avatar Tailwind CSS Component" />
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                {details?.fullName}
                                                            </td>
                                                            <td>
                                                                {details?.location}
                                                            </td>
                                                            <td className='font-medium font-sans'>
                                                                {details?.phone}
                                                            </td>
                                                            <td className='font-sans'>
                                                                {details?.products[0]?.product_model}
                                                            </td>

                                                            <td>
                                                                {details?.paymentMethod}
                                                            </td>
                                                            <td className="font-sans">
                                                                {(new Date(parseInt(details?.date)).getDate()) + '/' + (new Date(parseInt(details?.date)).getMonth() + 1) + '/' + (new Date(parseInt(details?.date)).getFullYear())}
                                                            </td>

                                                            <td>
                                                                {details?.isPending ? <ClipLoader
                                                                    color="#1677ff"
                                                                    size={15}
                                                                /> : <TiTick className="text-green-500 text-lg mx-auto" />}
                                                            </td>

                                                            <td>
                                                                <Button onClick={() => handledltProduct(details.id)} disabled={!details?.isPending} type="primary" icon={<DeleteOutlined />} />
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default ViewOrder