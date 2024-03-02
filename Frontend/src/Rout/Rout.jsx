import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home"
import Error from "../Pages/Error/Error"
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ForgetPass from "../Pages/ForgetPass/ForgetPass";
import RsetPassEmail from "../Pages/EmailManager/ResetPassEmail/RsetPassEmail";
import Category from "../Pages/Category/Category";
import Product from "../Pages/Category/Product";
import ProductSingle from "../Pages/ProductSingle/ProductSingle";
import MyCart from "../Pages/MyCart/MyCart";
// import Admin from "../Pages/Admin/Admin";
import Private from "../Component/Private/Private"
import Checkout from "../Pages/Checkout/Checkout";
import UserProfile from "../Pages/Profile/UserProfile";
import EditAccount from "../Pages/Profile/EditAccount";
import ChangePassword from "../Pages/Profile/ChangePassword";
import Contact from "../Pages/Contact/Contact";
import AdminCom from "../Pages/AdminCom/AdminCom"
import Dashboard from "../Pages/AdminCom/Dashboard/Dashboard";
import Products from "../Pages/AdminCom/Products/Products"
import Orders from "../Pages/AdminCom/Orders/Orders"
import Users from "../Pages/AdminCom/Users/Users"
import ViewOrder from "../Pages/Profile/ViewOrder/ViewOrder";
import FavouriteProducts from "../Pages/FavouriteProducts/FavouriteProducts";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/contact",
        element: <Contact></Contact>
      },
      {
        path: "/category",
        element: <Category></Category>,
        children: [
          {
            path: "/category/:categoryName",
            element: <Product></Product>
          },
        ]
      },
      {
        path: "/product/:categoryName/:id",
        element: <ProductSingle></ProductSingle>
      },
      {
        path: "/mycart",
        element: <Private><MyCart></MyCart></Private>
      },
      {
        path: "/favourite",
        element: <Private><FavouriteProducts></FavouriteProducts></Private>
      },
      {
        path: "/checkout",
        element: <Private><Checkout></Checkout></Private>
      },
      {
        path: "/profile",
        element: <Private><UserProfile></UserProfile></Private>
      },
      {
        path: "/profile/EditAccount",
        element: <Private><EditAccount></EditAccount></Private>
      },
      {
        path: "/profile/changePassword",
        element: <Private><ChangePassword></ChangePassword></Private>
      },
      {
        path: "/profile/viewOrder",
        element: <Private><ViewOrder></ViewOrder></Private>
      },
    ]

  },
  {
    path: "/register",
    element: <Register></Register>
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/forgetPass",
    element: <ForgetPass></ForgetPass>
  },
  {
    path: "/resetPassEmail",
    element: <RsetPassEmail></RsetPassEmail>
  },
  {
    path: "/admin",
    element: <Private><AdminCom></AdminCom></Private>,
    children: [
      {
        path: "/admin",
        element: <Private><Dashboard></Dashboard></Private>
      },
      {
        path: "/admin/products",
        element: <Products></Products>
      },
      {
        path: "/admin/orders",
        element: <Orders></Orders>
      },
      {
        path: "/admin/users",
        element: <Users></Users>
      }
    ]
  }
])

export default Router;