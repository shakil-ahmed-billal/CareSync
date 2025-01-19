import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import image1 from '../assets/banner1.webp'
import image2 from '../assets/banner3.webp'


const Slider = () => {
    return (
        <div className=''>
            <>
                <Swiper
                    
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide><img className='w-full h-[600px] object-cover' src={image1} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='w-full h-[600px] object-cover' src={image2} alt="" /></SwiperSlide>
               
                </Swiper>
            </>
        </div>
    )
}

export default Slider
