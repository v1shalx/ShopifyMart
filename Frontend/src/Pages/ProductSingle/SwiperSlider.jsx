import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Rating, Star } from '@smastrom/react-rating'


const SwiperSlider = ({ products }) => {
    const [slideView, setSlideView] = useState(2);
    const myStyles = {
        itemShapes: Star,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#C5C3D8'
    }

    const handleWidth = () => {
        if (window.screen.width <= 767) {
            //small device
            setSlideView(2)
        }
        else if (window.screen.width <= 1023) {
            //tablet device
            setSlideView(3)
        }
        else {
            //large device
            setSlideView(4)
        }
    }
    useEffect(() => {
        handleWidth()
    }, [])
    useEffect(() => {
        window.addEventListener('resize', handleWidth);
        return () => window.removeEventListener('resize', handleWidth);
    }, []);

    return (
        <Swiper
            // install Swiper modules
            modules={[Autoplay, Navigation]}
            slidesPerView={slideView}
            spaceBetween={30}
            loop={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            navigation={true}
            className="mySwiper"
        >
            {
                products && products.map((product) => {
                    return <SwiperSlide key={product.id}>
                        <Link to={`/product/${product?.category}/${product.id}`} className="flex justify-center">
                            <div className="group relative border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border shadow-md bg-white">
                                <div className="relative mx-3 mt-3 flex justify-center overflow-hidden rounded-xl">
                                    <img loading='lazy' className="h-40 lg:44 w-auto object-cover" src={product?.image} alt="product image" />
                                </div>
                                <div className="mt-1 px-5 pb-5">
                                    <div>
                                        <h5 className="text-base md:text-lg font-medium font-sans tracking-tight truncate mt-3">{product.product_model}</h5>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p>
                                            <span className="text-lg md:text-xl font-bold text-slate-900">${product.price}</span>
                                            {
                                                (parseInt(product.discount) > 0) && <span className="text-xs md:text-sm text-slate-900 line-through font-medium">${parseInt(product.price) + (parseInt(product.price) * parseInt(product.discount) / 100)}</span>
                                            }
                                        </p>
                                        <div className="flex items-center w-14 md:w-20">
                                            <Rating style={{ maxWidth: 500 }} readOnly value={product?.rating} itemStyles={myStyles} />
                                        </div>

                                    </div>

                                </div>


                            </div>
                        </Link>
                    </SwiperSlide>
                })
            }


        </Swiper>
    );
};

export default SwiperSlider;