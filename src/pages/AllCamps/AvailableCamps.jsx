import { useQuery } from "@tanstack/react-query"
import CampCard from "../../components/CampCard/CampCard"
import useAxiosPublic from "../../hooks/useAxiosPublic"

const AvailableCamps = () => {

    const axiosPublic = useAxiosPublic()

    const { data } = useQuery({
        queryKey: ['all-camps'],
        queryFn: async () => {
            const { data } = await axiosPublic('/all-camps')
            return data
        }
    })
    console.log(data)
    return (
        <div className="dark:text-light2 py-10">
            
            <div className="grid md:grid-cols-4 gap-5">
                {data?.map(item => <CampCard camp={item} key={item._id}></CampCard>)}
            </div>
        </div>
    )
}

export default AvailableCamps
