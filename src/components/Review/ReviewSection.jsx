

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { useQuery } from '@tanstack/react-query';
import { Pagination } from 'swiper/modules';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { Rating } from '@smastrom/react-rating';



const ReviewSection = () => {

    const axiosPublic = useAxiosPublic()


    const { data: review = [] } = useQuery({
        queryKey: ['all-review'],
        queryFn: async () => {
            const { data } = await axiosPublic('/all-review')
            return data
        }
    })

    console.log(review)

    return (
        <div className=' py-20'>
            <>
                <Swiper
                    slidesPerView={4}
                    centeredSlides={true}
                    spaceBetween={30}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {review?.map(item => <SwiperSlide key={item._id}>
                        <div className="border p-3 flex flex-col items-center justify-center ">
                            <div className="">
                                <img className='rounded-full w-20 h-20' src={item?.photo} alt="" />
                            </div>
                            <div className="space-y-3 text-center">
                                <p>Name: {item?.name}</p>
                                <p>Email: {item?.email}</p>
                                <p>Feedback: {item?.review}</p>
                                <p className='flex gap-2'> Rating: <Rating style={{ maxWidth: 100 }} value={item?.rating} readOnly /></p>
                            </div>
                            <div className="flex justify-center items-center py-5">
                                <Link to={`/camp/${item?.registerId}`}><Button>See Camp</Button></Link>
                            </div>
                        </div>
                    </SwiperSlide>)}

                </Swiper>
            </>
        </div>
    )
}

export default ReviewSection
