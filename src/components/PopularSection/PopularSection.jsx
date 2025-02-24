
import { useQuery } from '@tanstack/react-query'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import CampCard from '../CampCard/CampCard'
import Loading from '../Loading/Loading'

const PopularSection = () => {

    const axiosPublic = useAxiosPublic()

    const { data: popular = [], isLoading } = useQuery({
        queryKey: ['popularCamp'],
        queryFn: async () => {
            const { data } = await axiosPublic('/popular-camp')
            return data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
 
    return (
        <div>
            <p className='text-center text-4xl font-bold my-10'>Most Popular Camp</p>
            <div className="grid gap-5 md:grid-cols-4">
                {popular?.map(item => <CampCard key={item._id} camp={item}></CampCard>)}
            </div>
            <div className="flex justify-center items-center py-10">
                <Link to={'/all-camps'}><Button>See All Camps</Button></Link>
            </div>
        </div >
    )
}

export default PopularSection
