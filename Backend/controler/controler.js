const productModel = require("../model/productModel");
const favourite = require('../model/favouriteModel');
const userCart = require("../model/userCart");
const users = require("../model/users");
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const getFilterProduct = async (req, res) => {
    try {
        // const reqbody = {
        //     category: "Watch",
        //     priceRange: [1000, 3000],
        //     rating: 4,
        //     stock: 1
        // }
        const page_num = parseInt(req.body.activePage);
        const limit = req.body.limit;
        const result = {}

        // creat product finding object
        for (let x in req.body) {
            if (x == 'priceRange' || x == 'rating' || x == 'stock') {
                if (x == 'priceRange') {
                    result.price = {
                        $gt: req.body[`${x}`][0],
                        $lt: req.body[`${x}`][1]
                    }
                }
                else if (x == 'rating') {
                    result.rating = { $gte: req.body[`${x}`] }
                }
                else if (x == 'stock' && req.body.stock == true) {
                    result.stock = { $gt: 0 }
                }
            }
            else if (x == 'category' && req.body.category != 'all') {
                result[x] = req.body[`${x}`]
            }
        }
        const datas = await productModel.find(result).sort({ createdAt: -1 }).skip((page_num - 1) * limit).limit(limit)
        res.send({
            status: true,
            message: "All product get successfully",
            datas
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

const getLength = async (req, res) => {
    try {
        // const reqbody = {
        //     category: "Watch",
        //     priceRange: [1000, 3000],
        //     rating: 4,
        //     stock: 1
        //     limit : 9,
        //     activePage : 1,
        // }
        
        const result = {}

        for (let x in req.body) {
            if (x == 'priceRange' || x == 'rating' || x == 'stock') {
                if (x == 'priceRange') {
                    result.price = {
                        $gt: req.body[`${x}`][0],
                        $lt: req.body[`${x}`][1]
                    }
                }
                else if (x == 'rating') {
                    result.rating = { $gt: req.body[`${x}`] }
                }
                else if (x == 'stock' && req.body.stock == true) {
                    result.stock = { $gt: 0 }
                }
            }
            else if (x == 'category' && req.body.category != 'all') {
                result[x] = req.body[`${x}`]
            }
        }

        const length = await productModel.find(result).countDocuments();
        res.send({
            status: true,
            message: `${length} product found`,
            data: length
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

const getSingleProduct = async (req, res) => {
    try {
        const query = { id: req.params.id }
        const data = await productModel.findOne(query);
        res.send({
            status: true,
            message: "All product get successfully",
            data
        })
    }
    catch (err) {
        res.send({
            status: false,
            message: "Get product Something wents wrong",
            error: err
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const query = { id: req.query.id }
        await productModel.deleteOne(query)
        res.send({
            status: true,
            message: "Product delete successfully",
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

// update product
const upDateProduct = async (req, res) => {
    try {
        const query = { id: req.query.id };

        const updateProductInfo = {
            product_name: req.body.productName,
            product_model: req.body.productModel,
            brand: req.body.brand,
            stock: req.body.stock,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.categoryName,
            createdAt: Date.now(),
            rating : req.body.rating,
        }
        if (req.body.img) {
            updateProductInfo.image = req.body.img;
        }
        const productInfo = await {
            $set: updateProductInfo
        }
        await productModel.updateOne(query, productInfo)
        res.send({
            status: true,
            message: "Product update successfully",
        })
    } catch (err) {
        console.log(err)
        res.send({
            status: false,
            message: err.message,
            error: err
        })
    }

}

// add new product
const postData = async (req, res) => {
    try {
        const newProduct = await productModel({
            id: uuidv4(),
            product_name: req.body.productName,
            product_model: req.body.productModel,
            image : req.body.image,
            brand: req.body.brand,
            stock: req.body.stock,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.categoryName,
            createdAt: Date.now(),
            rating : req.body.rating,
        })
        await newProduct.save();
        await res.send({
            status: true,
            message: "Added new product successfully",
            data: newProduct
        })
    }
    catch (err) {
        res.send({
            status: false,
            message: "Added new product something wents wrong",
            error: err
        })
    }

}

//add to cart by email
const addToCart = async (req, res) => {
    try {
        const filter = { id: req.body.id };
        const options = { upsert: true };
        const updateDoc = {
            $set: {
                id: req.body.id,
                product_model: req.body.productModel,
                stock: req.body.stock,
                price: req.body.price,
                discount: req.body.discount,
                email: req.body.email,
                quantity: req.body.quantity,
                image: req.body.image,
            },
        };
        await userCart.updateOne(filter, updateDoc, options);
        res.send({
            status: true,
            message: "Added cart SuccessFully",
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

//get user added cart
const userGetCart = async (req, res) => {
    try {
        const email = req.params.email;
        const query = { email }
        const carts = await userCart.find(query)
        res.send({
            status: true,
            message: "Cart product get successfully",
            carts
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

//delete add to cart product
const deleteCart = async (req, res) => {
    const id = req.params.id;
    const query = { id }
    await userCart.deleteOne(query)
}

//delete add to cart product
const deleteManyCart = async (req, res) => {
    const email = req.params.email;
    const query = { email }
    await userCart.deleteMany(query)
    res.send({
        status: true,
        message: "Delete cart product successfully",
    })
}

// favourite product added
const favouriteCart = async (req, res) => {
    try {
        const filter = { id: req.body.id };
        const options = { upsert: true };
        const updateDoc = {
            $set: req.body,
        };
        await favourite.updateOne(filter, updateDoc, options);
        res.send({
            status: true,
            message: "Favourite added successfully",
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

//get favourite product
const getFavourite = async (req, res) => {
    try {
        const email = req.params.email;
        const query = { email }
        const datas = await favourite.find(query)
        res.send({
            status: true,
            message: "Favourite product get successfully",
            datas
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

//delete favourite product
const deleteFavourite = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { id }
        await favourite.deleteOne(query);
        res.send({
            status: false,
            message: 'Delete successfully',
        })
    } catch (err) {
        res.send({
            status: false,
            message: err.message,
            error: err
        })
    }
}


//handle User 

//create new user
const createUser = async (req, res) => {
    try {
        const userInfo = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            profile_pic: " ",
            createdAt: Date.now(),
        }
        const newUser = await users(userInfo)
        await newUser.save();
        res.send({
            status: true,
            message: "creat user Successfully",
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

//get user
const getuser = async (req, res) => {
    try {
        if (req.user.email !== req.query.email) {
            res.status(403).send({ message: "unOthorize person" });
        }
        const userQuery = { email: req.query.email }
        const userData = await users.findOne(userQuery)
        res.send({
            status: true,
            message: "user info get successfully",
            userData
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

//updarte user
const updateUser = async (req, res) => {
    try {
        const userQuery = { email: req.query.email }
        const options = { upsert: true };
        const updateDoc = {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            },
        };
        await users.updateOne(userQuery, updateDoc, options);

        res.send({
            status: true,
            message: "update successfully",
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

//update password 
const updateUserPass = async (req, res) => {
    try {
        if (req.user.email !== req.query.email) {
            res.status(403).send({ message: "unOthorize person" });
        }
        const userQuery = { email: req.query.email }
        const updateDoc = {
            $set: {
                password: req.body.password
            },
        };
        await users.updateOne(userQuery, updateDoc);
        res.send({
            status: true,
            message: "password update successfully",
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
    getFilterProduct,
    getLength,
    getSingleProduct,
    deleteProduct,
    upDateProduct,
    postData,
    addToCart,
    userGetCart,
    deleteCart,
    deleteManyCart,
    createUser,
    getuser,
    updateUser,
    updateUserPass,
    favouriteCart,
    getFavourite,
    deleteFavourite
}