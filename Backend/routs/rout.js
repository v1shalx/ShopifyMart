const express = require("express");
const { postData, demoControler, getSingleProduct, addToCart, userGetCart, deleteCart, createUser, getuser, updateUser, updateUserPass, deleteProduct, upDateProduct, favouriteCart, getFavourite, deleteFavourite, getFilterProduct, getLength, deleteManyCart } = require("../controler/controler");
const router = express.Router();
const path = require("path");
var bodyParser = require('body-parser');
const { getallUsers, usersLength, deleteUser, getallOrder } = require("../controler/Admin");
const { uploadOrder, getUserOrder, deleteORder, updateOrder } = require("../controler/Order");
const { creatJwtToken, deleteJwtToken, verifyToken } = require("../controler/SecureApi");
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


//get filter product
router.post('/filter', getFilterProduct);

//get product length, filter wise
router.post('/getLength', getLength);

//get single product
router.get("/product/:id", getSingleProduct);

//delete product
router.delete("/deleteProduct", deleteProduct);

//update product
router.put("/updateProduct", verifyToken, upDateProduct);

//upload product
router.post("/postData", verifyToken, postData);

// add to cart
router.put("/addCart", addToCart);

//get user added cart
router.get("/getCart/:email", userGetCart)

//delete add to cart product
router.delete("/deleteCart/:id", deleteCart)

//delete many cart product
router.delete("/deleteManyCart/:email", deleteManyCart)

//add favourite
router.put('/addFavourite', favouriteCart);

//get favourite product
router.get('/getFavourite/:email', getFavourite)

//delete favourite
router.delete('/deleteFavourite/:id', deleteFavourite);


//handle user

//create user
router.post("/createUser", createUser)

//get user
router.get("/getuser", verifyToken, getuser)

//update user info 
router.put("/updateUser", updateUser)

//update user password
router.put("/updatePassword", verifyToken, updateUserPass)


//handle admin

//get all users
router.get("/allUsers", verifyToken, getallUsers)

//get all users length
router.get("/usersLength", verifyToken,  usersLength)

//get all orders
router.get("/allOrder", verifyToken, getallOrder)

//delete user
router.delete("/deleteUser", verifyToken,  deleteUser);


//handle product order

router.put("/addOrder", verifyToken, uploadOrder);

//get order by user
router.get("/getOrder", verifyToken, getUserOrder)

// update order
router.put("/updateOrder", verifyToken, updateOrder)

//delete specefiq order
router.delete("/deleteOrder/:id", verifyToken, deleteORder)

//           api secure

// creat jwt token
router.put("/crtJwt", creatJwtToken)

//delete jwt token
router.put("/dltJwt", deleteJwtToken)


module.exports = router;