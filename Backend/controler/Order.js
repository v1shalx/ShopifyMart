const order = require("../model/orderModel");
const { v4: uuidv4 } = require('uuid');

//handle upload user order

const uploadOrder = async (req, res) => {
    try {
        if (req.user.email !== req.body.email) {
            res.status(403).send({ message: "unOthorize person" });
        }
        const orderInfo = req.body;
        const orders = orderInfo.productIds.map(id => {
            return { ...orderInfo, productIds: id, date: Date.now(), id: uuidv4() }
        });

        const data = await order.insertMany(orders);

        res.send({
            status: true,
            message: "Order successfully",
            data
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

const getUserOrder = async (req, res) => {
    try {
        if (req?.user?.email !== req.query.email) {
            res.status(403).send({ message: "unOthorize person" });
        }
        const query = { email: req.query.email };
        const datas = await order.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'productlists',
                    localField: 'productIds',
                    foreignField: 'id',
                    as: 'products'
                }
            }
        ])

        res.send({
            status: true,
            message: "user order get successfully",
            datas
        })
    }
    catch (err) {
        console.log(err)
        res.send({
            status: false,
            message: err.message,
            error: err
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const query = { id: req.body.id };
        const updateDoc = {
            $set: req.body
        };
        const result = await order.updateOne(query, updateDoc);
        res.send({
            status: true,
            message: "order update successfully",
            result
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

const deleteORder = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await order.deleteOne({ id })
        res.send({
            status: true,
            message: "Order delete successfully",
            data
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
    uploadOrder,
    getUserOrder,
    updateOrder,
    deleteORder
}