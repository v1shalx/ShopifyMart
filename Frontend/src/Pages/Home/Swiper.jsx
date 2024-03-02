import { Navigation, Pagination, Scrollbar, A11y, EffectCreative, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function SwiperSComp() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectCreative, Autoplay]}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      grabCursor={true}
      effect={'creative'}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }}
      className="mySwiper"
    >
      <SwiperSlide>
        <img className='h-56 mt-4 lg:mt-0 md:h-80 lg:h-[448px] w-full object-cover' src="https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="banner" />
      </SwiperSlide>
      <SwiperSlide>
        <img className='h-56 mt-4 lg:mt-0 md:h-80 lg:h-[448px] w-full object-cover' src="https://images.pexels.com/photos/5872364/pexels-photo-5872364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="banner" />
      </SwiperSlide>

      <SwiperSlide>
        <img className='h-56 mt-4 lg:mt-0 md:h-80 lg:h-[448px] w-full object-cover' src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="banner" />
      </SwiperSlide>
    </Swiper>
  )
}

export default SwiperSComp
