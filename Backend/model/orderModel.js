const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
    {
        id: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true
        },
        paymentMethod: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        isPending: {
            type: Boolean,
            required: true
        },
        completePay: {
            type: Boolean,
            required: true,
        },
        productIds: {
            type: Array,
            required: true
        },
        products: {
            type: Array
        },
        date: {
            type: String,
        },

    }
);

module.exports = orderModel = mongoose.model("orderModel", orderSchema);