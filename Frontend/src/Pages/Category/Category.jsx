import { NavLink, Outlet } from 'react-router-dom'
import { MdFilterList } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useContext, useState } from 'react';
import { Radio, Slider, Space } from 'antd'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FilterDataContext } from '../../Component/FilterContext/FilterContext';

function Category() {
    const [collapse, setCollapse] = useState({
        allCollapse: true,
        categoryCollapse: false,
        ratingCollapse: false,
    });
    const { getFilteringData, setFilter, filter } = useContext(FilterDataContext);
    const formatter = (value) => `${value}`;

    const changeSlider = (value) => {
        setFilter({ ...filter, priceRange: value });
        getFilteringData({ ...filter, priceRange: value })
    }

    const onChangeRating = (e) => {
        setFilter({ ...filter, rating: e.target.value })
        getFilteringData({ ...filter, rating: e.target.value })
    };

    const stockOnChange = (e) => {
        if (e.target.checked) {
            setFilter({ ...filter, stock: true });
            getFilteringData({ ...filter, stock: true });
        }
        else {
            setFilter({ ...filter, stock: false });
            getFilteringData({ ...filter, stock: false });
        }
    }


    return (
        <div className="bg-gray-200">
            <div>
                <div className="max-w-7xl mx-auto px-4 lg:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* // sidebar */}
                        <div className="col-span-3 my-3 bg-white px-3 option-list font-serif">
                            <span className='flex flex-row justify-between items-center px-2 py-4 cursor-pointer' onClick={() => setCollapse({ ...collapse, allCollapse: !collapse.allCollapse })}>
                                <h4 className='text-lg font-serif text-gray-600'>Filter</h4>
                                <MdFilterList className='text-2xl hidden lg:block'></MdFilterList>
                                {
                                    collapse.allCollapse ? <FaPlus className='text-xl lg:hidden'></FaPlus> : <FaMinus className='text-xl lg:hidden'></FaMinus>
                                }
                            </span>

                            <div className={`mb-2 duration-200 lg:h-auto w-auto ${collapse.allCollapse ? 'h-0 overflow-hidden' : 'h-auto'}`}>

                                <span onClick={() => setCollapse({ ...collapse, categoryCollapse: !collapse.categoryCollapse })} className='flex flex-row justify-between items-center p-2 cursor-pointer'>
                                    <h4 className='text-base font-serif text-gray-600'>Category</h4>
                                    <RiArrowDropDownLine className={`text-3xl text-gray-800 ${collapse.categoryCollapse ? 'rotate-180' : 'rotate-0'}`}></RiArrowDropDownLine>
                                </span>

                                <div className={`border-b mb-2 duration-200 ${collapse.categoryCollapse ? 'h-0 overflow-hidden' : 'h-auto'}`}>
                                    <div className="flex flex-col ">
                                        <NavLink to="/category/Smart phone" className={({ isActive }) => isActive ? " duration-200 p-2 bg-orange-400 text-white" : "bg-white hover:bg-orange-400 hover:text-white duration-200 p-2"
                                        }>
                                            <span>Smart Phone</span>
                                        </NavLink>
                                        <NavLink to="/category/Laptop" className={({ isActive }) => isActive ? " duration-200 p-2 bg-orange-400 text-white" : "bg-white hover:bg-orange-400 hover:text-white duration-200 p-2"
                                        }>
                                            <span>Laptop</span>
                                        </NavLink>
                                        <NavLink to="/category/Desktop" className={({ isActive }) => isActive ? " duration-200 p-2 bg-orange-400 text-white" : "bg-white hover:bg-orange-400 hover:text-white duration-200 p-2"
                                        }>
                                            <span>Desktop</span>
                                        </NavLink>
                                        <NavLink to="/category/Watch" className={({ isActive }) => isActive ? " duration-200 p-2 bg-orange-400 text-white" : "bg-white hover:bg-orange-400 hover:text-white duration-200 p-2"
                                        }>
                                            <span>Watch</span>
                                        </NavLink>
                                        <NavLink to="/category/T-Shirt" className={({ isActive }) => isActive ? " duration-200 p-2 bg-orange-400 text-white" : "bg-white hover:bg-orange-400 hover:text-white duration-200 p-2"
                                        }>
                                            <span>T-Shirt</span>
                                        </NavLink>
                                        <NavLink to="/category/Bag" className={({ isActive }) => isActive ? " duration-200 p-2 bg-orange-400 text-white" : "bg-white hover:bg-orange-400 hover:text-white duration-200 p-2"
                                        }>
                                            <span>Bag</span>
                                        </NavLink>
                                        <NavLink to="/category/Gift" className={({ isActive }) => isActive ? " duration-200 p-2 bg-orange-400 text-white" : "bg-white hover:bg-orange-400 hover:text-white duration-200 p-2"
                                        }>
                                            <span>Gift</span>
                                        </NavLink>
                                        <NavLink to="/category/Cosmetics" className={({ isActive }) => isActive ? " duration-200 p-2 bg-orange-400 text-white" : "bg-white hover:bg-orange-400 hover:text-white duration-200 p-2"
                                        }>
                                            <span>Cosmetics</span>
                                        </NavLink>
                                    </div>
                                </div>


                                <span className='flex flex-row justify-between items-center p-2'>
                                    <h4 className='text-base font-serif text-gray-600'>Price</h4>
                                </span>
                                <div className='p-2 border-b'>
                                    <Slider
                                        onAfterChange={changeSlider}
                                        defaultValue={[0, 200000]}
                                        railBg='rgb(255, 102, 0)'
                                        range={{
                                            draggableTrack: true,
                                        }}

                                        max={200000}
                                        tooltip={{
                                            formatter,
                                            placement: "bottom",
                                        }}
                                    />
                                </div>


                                <span onClick={() => setCollapse({ ...collapse, ratingCollapse: !collapse.ratingCollapse })} className='flex flex-row justify-between items-center p-2 cursor-pointer'>
                                    <h4 className='text-base font-serif text-gray-600'>Rating</h4>
                                    <RiArrowDropDownLine className={`text-3xl text-gray-800 ${collapse.ratingCollapse ? 'rotate-180' : 'rotate-0'}`}></RiArrowDropDownLine>
                                </span>
                                <div className={`border-b mb-2 duration-200 ${collapse.ratingCollapse ? 'h-0 overflow-hidden' : 'h-auto'}`}>
                                    <Radio.Group onChange={onChangeRating} defaultValue={filter.rating} value={filter.rating}>
                                        <Space direction="vertical">
                                            <Radio value={1}>up to 1 Star</Radio>
                                            <Radio value={2}>up to 2 Star</Radio>
                                            <Radio value={3}>up to 3 Star</Radio>
                                            <Radio value={4}>up to 4 Star</Radio>
                                            <Radio value={5}>up to 5 Star</Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>

                                <div className='pb-5'>
                                    <span className='flex flex-row justify-between items-center p-2'>
                                        <h4 className='text-base font-serif text-gray-600'>Only stock</h4>
                                    </span>

                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input checked={filter.stock} onChange={stockOnChange} type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900">minimum 1</span>
                                    </label>

                                </div>



                            </div>


                        </div>



                        <div className="col-span-9">

                            <Outlet></Outlet>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Category