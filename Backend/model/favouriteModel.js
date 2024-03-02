const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouriteSchema = Schema(
    {
        id: {
            type: String,
            required: true,
        },
        product_model: {
            type: String,
            required: true,
        },
        stock: {
            type: Number, 
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
        },
        email: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
        },
        image: {
            type: String,
        }
    }
);

module.exports = userFavourite = mongoose.model("userFavourite", favouriteSchema);