import { Button, Empty, Spin } from "antd";
import { useEffect, useState } from "react"
import ClipLoader from "react-spinners/ClipLoader";
import { EditOutlined } from '@ant-design/icons';
import AxiosSecure from "../../../Hooks/AxiosSecure/AxiosSecure";
import { TiTick } from "react-icons/ti";
import Swal from 'sweetalert2/dist/sweetalert2.js'

function Orders() {
  const [ordes, setOrders] = useState([]);
  const [loading, setLoading] = useState(true)
  const axiosSecure = AxiosSecure();

  const fetchOrder = () => {
    axiosSecure.get("/allOrder")
      .then(res => {
        setOrders(res.data.datas)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  const updateORderStatus = (id) => {
    axiosSecure.put('/updateOrder', { id: id, isPending: false })
      .then(({ data }) => {
        if (data.status) {
          Swal.fire({
            text: 'Order status update done.',
            icon: `success`,
            confirmButtonText: 'close'
          })
          fetchOrder();
        }
        else {
          Swal.fire({
            text: 'Order status update failed',
            icon: `error`,
            confirmButtonText: 'close'
          })
        }
      })
  }

  return (
    <Spin spinning={loading} size="large">
      <div className="p-4 mt-8 bg-white rounded-md min-h-[200px]">
        {
          ordes.length > 0 ?


            <div className="overflow-x-auto">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>product Id</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>District</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Change status</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      ordes && ordes.map((order) => {
                        return (
                          <>
                            {
                              (order && order.productIds) && order.productIds.map((prod, ind) => {
                                return (
                                  <tr key={ind}>
                                    <tr>{prod}</tr>
                                    <td>{order?.fullName}</td>
                                    <td>{order?.phone}</td>
                                    <td>{order?.district}</td>
                                    <td>{order?.location}</td>
                                    <td className="ext-center mx-auto">{order?.isPending ? <ClipLoader
                                      color="#1677ff"
                                      size={15}
                                    /> : <TiTick className="text-green-500 text-lg mx-auto" />}</td>
                                    <td className="text-center">
                                      <Button disabled={!order?.isPending} onClick={() => updateORderStatus(order.id)} type="primary" icon={<EditOutlined />} size={"small"} />
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </>
                        )
                      })
                    }

                  </tbody>
                </table>
              </div>
            </div>



            : <Empty></Empty>
        }
      </div>
    </Spin>
  )
}

export default Orders