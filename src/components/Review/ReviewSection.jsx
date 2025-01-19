

// import required modules

import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SingleReviewCard from './SingleReviewCard';



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
        <div className=' py-10'>
            <p className='text-center text-4xl font-bold pb-10'>Participant Review Section</p>
            <div className='grid md:grid-cols-4 gap-5 items-center justify-center'>
                {review?.slice(0, 8).map(item => <SingleReviewCard item={item} key={item._id}></SingleReviewCard>)}
            </div>
        </div>
    )
}

export default ReviewSection
