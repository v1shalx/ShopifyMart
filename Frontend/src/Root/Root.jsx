import { Outlet, ScrollRestoration } from "react-router-dom"
import Navbar from "../Pages/Navbar/Navbar"
import Footer from "../Pages/Footer/Footer"

function Root() {
  return (
    <div>
      <Navbar></Navbar>

      <Outlet></Outlet>

      <div className="bg-[#F2F2F2]">
        <div className="max-w-7xl mx-auto">
          <Footer></Footer>
        </div>

      </div>
      <ScrollRestoration />
    </div>

  )
}

export default Root