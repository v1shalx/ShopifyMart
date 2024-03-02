const users = require("../model/users")
const orderlist = require("../model/orderModel")

const getallUsers = async (req, res) => {
    try {
        const currentpage = req.query.currentPage;
        const pageLimit = req.query.pageLimit;
        const userInfo = await users.find({}).sort({ createdAt: -1 }).skip((currentpage - 1) * pageLimit).limit(pageLimit)
        res.send({
            status: true,
            message: "user info get successfully",
            datas: userInfo
        })
    }
    catch (err) {
        res.send({
            status: false,
            message: err.message,
            error: err
        })
    }
}

const usersLength = async (req, res) => {
    try {
        const length = await users.estimatedDocumentCount();
        res.send({
            status: true,
            message: "users length get successfully",
            datas: length
        })
    }
    catch (err) {
        res.send({
            status: false,
            message: err.message,
            error: err
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userEmail = req.query.email;
        await users.deleteOne({ email : userEmail })
        res.send({
            status: true,
            message: "user delete successfully",
        })
    } catch (err) {
        res.send({
            status: false,
            message: err.message,
            error: err
        })
    }
}

const getallOrder = async (req, res) => {
    try {
        
        const orders = await orderlist.find({})
        res.send({
            status: true,
            message: "all orders get successfully",
            datas: orders
        })
    }
    catch (err) {
        res.send({
            status: false,
            message: err.message,
            error: err
        })
    }
}

module.exports = {
    getallUsers,
    usersLength,
    deleteUser,
    getallOrder
}